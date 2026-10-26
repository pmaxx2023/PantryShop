import {assertConsumerAccount, photoObjectKey} from './account.mjs';
import {validateKitchen} from './kitchen-schema.mjs';

const PHOTO_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/heic', 'image/heif']);
const PHOTO_LIMIT = 6_000_000;
const PHOTO_QUOTA = 200;

export function createMemoryStore() {
  const kitchens = new Map();
  const photos = new Map();
  const deleted = new Set();
  const idempotency = new Map();
  const subjects = new Map();
  return {
    async isDeleted(accountId) { return deleted.has(accountId); },
    async getKitchen(accountId) { return kitchens.get(accountId) || null; },
    async insertKitchen(accountId, data, now) {
      if (kitchens.has(accountId)) return false;
      kitchens.set(accountId, {data, revision: 1, updatedAt: now});
      return true;
    },
    async updateKitchen(accountId, data, revision, now) {
      const row = kitchens.get(accountId);
      if (!row || row.revision !== revision) return false;
      kitchens.set(accountId, {data, revision: revision + 1, updatedAt: now});
      return true;
    },
    async markDeleted(accountId, now) {
      deleted.add(accountId);
      kitchens.delete(accountId);
      for (const key of [...photos.keys()]) if (key.startsWith(accountId + '/')) photos.delete(key);
      for (const [sub, owner] of subjects) if (owner === accountId) subjects.delete(sub);
      idempotency.delete(accountId);
      return now;
    },
    async getIdempotent(accountId, key) { return idempotency.get(accountId)?.get(key) || null; },
    async putIdempotent(accountId, key, response) {
      if (!idempotency.has(accountId)) idempotency.set(accountId, new Map());
      idempotency.get(accountId).set(key, response);
    },
    async countPhotos(accountId) { return [...photos.keys()].filter(key => key.startsWith(accountId + '/')).length; },
    async putPhoto(accountId, hash, bytes, type, location, now) {
      photos.set(accountId + '/' + hash, {bytes, type, location, createdAt: now});
    },
    async getPhoto(accountId, hash) { return photos.get(accountId + '/' + hash) || null; },
    async deletePhoto(accountId, hash) { return photos.delete(accountId + '/' + hash); },
    async linkApple(accountId, sub) {
      const owner = subjects.get(sub);
      if (owner && owner !== accountId) return {ok: false, error: 'That Apple ID is already linked to another PShop account.'};
      subjects.set(sub, accountId);
      return {ok: true};
    }
  };
}

export function createKitchenService(store, {now = () => new Date().toISOString(), limit = 60} = {}) {
  const hits = new Map();
  function allow(accountId) {
    const stamp = Date.now();
    const recent = (hits.get(accountId) || []).filter(item => stamp - item < 60_000);
    if (recent.length >= limit) return false;
    recent.push(stamp);
    hits.set(accountId, recent);
    return true;
  }
  return {
    async getKitchen(accountId) {
      assertConsumerAccount(accountId);
      if (await store.isDeleted(accountId)) return {status: 410, error: 'This account was deleted.'};
      const row = await store.getKitchen(accountId);
      return {status: 200, state: row ? JSON.parse(row.data) : null, revision: row?.revision || 0, photoRecognition: 'on-device'};
    },
    async putKitchen(accountId, body, idempotencyKey) {
      assertConsumerAccount(accountId);
      if (await store.isDeleted(accountId)) return {status: 410, error: 'This account was deleted.'};
      if (!allow(accountId)) return {status: 429, error: 'Too many saves. Wait a minute and retry.'};
      if (idempotencyKey) {
        const prior = await store.getIdempotent(accountId, idempotencyKey);
        if (prior) return prior;
      }
      const errors = validateKitchen(body?.state);
      if (errors.length || !Number.isInteger(body?.revision) || body.revision < 0) return {status: 400, error: errors[0] || 'Invalid kitchen data.'};
      const data = JSON.stringify(body.state);
      if (data.length > 900000) return {status: 413, error: 'Kitchen is too large to save.'};
      const stamp = now();
      let response;
      if (body.revision === 0) {
        const created = await store.insertKitchen(accountId, data, stamp);
        response = created ? {status: 200, revision: 1} : {status: 409, error: 'This kitchen was updated on another device. Reload before saving.'};
      } else {
        const updated = await store.updateKitchen(accountId, data, body.revision, stamp);
        response = updated ? {status: 200, revision: body.revision + 1} : {status: 409, error: 'This kitchen was updated on another device. Reload before saving.'};
      }
      if (idempotencyKey && response.status === 200) await store.putIdempotent(accountId, idempotencyKey, response);
      return response;
    },
    async deleteAccount(accountId) {
      assertConsumerAccount(accountId);
      await store.markDeleted(accountId, now());
      return {status: 200, deleted: true, retained: 'No kitchen, photo or Apple link is kept for this account. Purchase records, if any, remain with Apple.'};
    },
    async addPhoto(accountId, {bytes, type, location}) {
      assertConsumerAccount(accountId);
      if (await store.isDeleted(accountId)) return {status: 410, error: 'This account was deleted.'};
      if (!PHOTO_TYPES.has(type) || !bytes || bytes.byteLength > PHOTO_LIMIT || !['Pantry', 'Fridge', 'Freezer'].includes(location)) return {status: 400, error: 'Choose a JPG, PNG, WebP or HEIC photo under 6 MB.'};
      if (await store.countPhotos(accountId) >= PHOTO_QUOTA) return {status: 413, error: 'This account has reached the 200 photo limit. Delete one before adding another.'};
      const digest = await crypto.subtle.digest('SHA-256', bytes);
      const hash = [...new Uint8Array(digest)].map(byte => byte.toString(16).padStart(2, '0')).join('');
      const key = photoObjectKey(accountId, hash);
      if (!key.startsWith(`accounts/${accountId}/`)) return {status: 403, error: 'Photo path rejected.'};
      await store.putPhoto(accountId, hash, bytes, type, location, now());
      return {status: 200, photo: {id: hash, url: `/api/photos/${hash}`, location, createdAt: now()}, photoRecognition: 'on-device'};
    },
    async readPhoto(accountId, hash) {
      assertConsumerAccount(accountId);
      if (!/^[a-f0-9]{64}$/.test(hash || '')) return {status: 404};
      const photo = await store.getPhoto(accountId, hash);
      if (!photo) return {status: 404};
      return {status: 200, ...photo};
    },
    async removePhoto(accountId, hash) {
      assertConsumerAccount(accountId);
      if (!/^[a-f0-9]{64}$/.test(hash || '')) return {status: 400, error: 'Invalid photo.'};
      const removed = await store.deletePhoto(accountId, hash);
      return removed ? {status: 200, deleted: true} : {status: 404, error: 'Photo not found.'};
    },
    async linkApple(accountId, sub) {
      assertConsumerAccount(accountId);
      if (await store.isDeleted(accountId)) return {status: 410, error: 'This account was deleted.'};
      if (!sub) return {status: 400, error: 'Missing Apple subject.'};
      const linked = await store.linkApple(accountId, sub);
      return linked.ok ? {status: 200, linked: true} : {status: 409, error: linked.error};
    }
  };
}
