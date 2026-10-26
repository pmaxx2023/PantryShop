import {photoObjectKey} from './account.mjs';

let ready = null;

export function createD1Store(env) {
  async function ensure() {
    if (!env.DB) return;
    if (!ready) ready = Promise.all([
      env.DB.prepare('CREATE TABLE IF NOT EXISTS kitchens (id text primary key, data text not null, revision integer not null default 1, updated_at text not null)').run(),
      env.DB.prepare('CREATE TABLE IF NOT EXISTS deleted_accounts (id text primary key, deleted_at text not null)').run(),
      env.DB.prepare('CREATE TABLE IF NOT EXISTS photo_index (account_id text not null, hash text not null, content_type text, location text, created_at text not null, primary key (account_id, hash))').run(),
      env.DB.prepare('CREATE TABLE IF NOT EXISTS idempotency_keys (account_id text not null, key text not null, response text not null, primary key (account_id, key))').run(),
      env.DB.prepare('CREATE TABLE IF NOT EXISTS apple_subjects (sub text primary key, account_id text not null)').run()
    ]);
    await ready;
  }
  return {
    async isDeleted(accountId) {
      await ensure();
      return Boolean(await env.DB.prepare('SELECT id FROM deleted_accounts WHERE id = ?').bind(accountId).first());
    },
    async getKitchen(accountId) {
      await ensure();
      const row = await env.DB.prepare('SELECT data, revision, updated_at FROM kitchens WHERE id = ?').bind(accountId).first();
      return row ? {data: row.data, revision: row.revision, updatedAt: row.updated_at} : null;
    },
    async insertKitchen(accountId, data, now) {
      await ensure();
      const created = await env.DB.prepare('INSERT OR IGNORE INTO kitchens (id, data, revision, updated_at) VALUES (?, ?, 1, ?)').bind(accountId, data, now).run();
      return Boolean(created.meta?.changes);
    },
    async updateKitchen(accountId, data, revision, now) {
      await ensure();
      const updated = await env.DB.prepare('UPDATE kitchens SET data = ?, revision = revision + 1, updated_at = ? WHERE id = ? AND revision = ?').bind(data, now, accountId, revision).run();
      return Boolean(updated.meta?.changes);
    },
    async markDeleted(accountId, now) {
      await ensure();
      const photos = await env.DB.prepare('SELECT hash FROM photo_index WHERE account_id = ?').bind(accountId).all();
      for (const row of photos.results || []) {
        if (env.BUCKET) await env.BUCKET.delete(photoObjectKey(accountId, row.hash));
      }
      await env.DB.batch([
        env.DB.prepare('INSERT OR REPLACE INTO deleted_accounts (id, deleted_at) VALUES (?, ?)').bind(accountId, now),
        env.DB.prepare('DELETE FROM kitchens WHERE id = ?').bind(accountId),
        env.DB.prepare('DELETE FROM photo_index WHERE account_id = ?').bind(accountId),
        env.DB.prepare('DELETE FROM apple_subjects WHERE account_id = ?').bind(accountId),
        env.DB.prepare('DELETE FROM idempotency_keys WHERE account_id = ?').bind(accountId)
      ]);
      return now;
    },
    async getIdempotent(accountId, key) {
      await ensure();
      const row = await env.DB.prepare('SELECT response FROM idempotency_keys WHERE account_id = ? AND key = ?').bind(accountId, key).first();
      return row ? JSON.parse(row.response) : null;
    },
    async putIdempotent(accountId, key, response) {
      await ensure();
      await env.DB.prepare('INSERT OR REPLACE INTO idempotency_keys (account_id, key, response) VALUES (?, ?, ?)').bind(accountId, key, JSON.stringify(response)).run();
    },
    async countPhotos(accountId) {
      await ensure();
      const row = await env.DB.prepare('SELECT COUNT(*) AS n FROM photo_index WHERE account_id = ?').bind(accountId).first();
      return Number(row?.n || 0);
    },
    async putPhoto(accountId, hash, bytes, type, location, now) {
      await ensure();
      if (!env.BUCKET) throw new Error('Photo storage is unavailable.');
      await env.BUCKET.put(photoObjectKey(accountId, hash), bytes, {httpMetadata: {contentType: type}, customMetadata: {location, accountId}});
      await env.DB.prepare('INSERT OR REPLACE INTO photo_index (account_id, hash, content_type, location, created_at) VALUES (?, ?, ?, ?, ?)').bind(accountId, hash, type, location, now).run();
    },
    async getPhoto(accountId, hash) {
      await ensure();
      const row = await env.DB.prepare('SELECT content_type, location, created_at FROM photo_index WHERE account_id = ? AND hash = ?').bind(accountId, hash).first();
      if (!row || !env.BUCKET) return null;
      const object = await env.BUCKET.get(photoObjectKey(accountId, hash));
      if (!object) return null;
      return {bytes: await object.arrayBuffer(), type: row.content_type, location: row.location, createdAt: row.created_at};
    },
    async deletePhoto(accountId, hash) {
      await ensure();
      const row = await env.DB.prepare('SELECT hash FROM photo_index WHERE account_id = ? AND hash = ?').bind(accountId, hash).first();
      if (!row) return false;
      if (env.BUCKET) await env.BUCKET.delete(photoObjectKey(accountId, hash));
      await env.DB.prepare('DELETE FROM photo_index WHERE account_id = ? AND hash = ?').bind(accountId, hash).run();
      return true;
    },
    async linkApple(accountId, sub) {
      await ensure();
      const existing = await env.DB.prepare('SELECT account_id FROM apple_subjects WHERE sub = ?').bind(sub).first();
      if (existing && existing.account_id !== accountId) return {ok: false, error: 'That Apple ID is already linked to another PShop account.'};
      await env.DB.prepare('INSERT OR REPLACE INTO apple_subjects (sub, account_id) VALUES (?, ?)').bind(sub, accountId).run();
      return {ok: true};
    }
  };
}
