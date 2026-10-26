const TOKEN = /^pshop_[A-Za-z0-9_-]{32,}$/;
const ACCOUNT = /^a_[a-f0-9]{40}$/;
const HASH = /^[a-f0-9]{64}$/;

export function parseBearer(header) {
  const match = String(header || '').match(/^Bearer\s+(pshop_[A-Za-z0-9_-]{32,})$/);
  return match ? match[1] : null;
}

export function newDeviceToken() {
  const bytes = new Uint8Array(32);
  crypto.getRandomValues(bytes);
  let binary = '';
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return 'pshop_' + btoa(binary).replaceAll('+', '-').replaceAll('/', '_').replaceAll('=', '');
}

export async function accountIdForToken(token) {
  if (!TOKEN.test(token || '')) throw new Error('Invalid device token.');
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(token));
  const hex = [...new Uint8Array(digest)].map(byte => byte.toString(16).padStart(2, '0')).join('');
  return 'a_' + hex.slice(0, 40);
}

export function photoObjectKey(accountId, hash) {
  if (!ACCOUNT.test(accountId) || !HASH.test(hash)) throw new Error('Invalid photo path.');
  return `accounts/${accountId}/photos/${hash}`;
}

export function assertConsumerAccount(accountId) {
  if (accountId === 'owner-kitchen' || !ACCOUNT.test(accountId)) throw new Error('Consumer storage is not the shared demo kitchen.');
}

export function chooseKitchen({local, remote}) {
  if (local?.dirty && local.state) return {state: local.state, revision: local.revision || 0, source: 'device'};
  if (remote?.state && (remote.revision || 0) >= (local?.revision || 0)) return {state: remote.state, revision: remote.revision, source: 'account'};
  if (local?.state) return {state: local.state, revision: local.revision || 0, source: 'device'};
  if (remote?.state) return {state: remote.state, revision: remote.revision, source: 'account'};
  return {state: null, revision: 0, source: 'empty'};
}
