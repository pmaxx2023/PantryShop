import {newDeviceToken} from './account.mjs';

export function createMemoryKv() {
  const map = new Map();
  return {
    async get(key) { return map.has(key) ? map.get(key) : null; },
    async set(key, value) { map.set(key, value); },
    async delete(key) { map.delete(key); },
    async clear() { map.clear(); }
  };
}

export function openIndexedDbKv() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('pshop', 1);
    request.onupgradeneeded = () => request.result.createObjectStore('kv');
    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      const db = request.result;
      const op = (mode, run) => new Promise((done, fail) => {
        const tx = db.transaction('kv', mode);
        const result = run(tx.objectStore('kv'));
        tx.oncomplete = () => done(result?.result);
        tx.onerror = () => fail(tx.error);
      });
      resolve({
        get: key => op('readonly', store => store.get(key)),
        set: (key, value) => op('readwrite', store => store.put(value, key)),
        delete: key => op('readwrite', store => store.delete(key)),
        clear: () => op('readwrite', store => store.clear())
      });
    };
  });
}

export function deviceAccount(kv) {
  return {
    async token() {
      const existing = await kv.get('device-token');
      if (existing) return existing;
      const created = newDeviceToken();
      await kv.set('device-token', created);
      return created;
    },
    async replaceToken() {
      const created = newDeviceToken();
      await kv.set('device-token', created);
      return created;
    },
    async load() { return kv.get('kitchen'); },
    async save(envelope) { await kv.set('kitchen', envelope); },
    async clearAccount() {
      await kv.delete('device-token');
      await kv.delete('kitchen');
      await kv.delete('sync-queue');
    }
  };
}
