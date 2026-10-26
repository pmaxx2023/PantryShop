const APPLE_ISS = 'https://appleid.apple.com';
const AUDIENCE = 'com.cagefreecapital.pshop';

function bytesToBase64Url(bytes) {
  let binary = '';
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replaceAll('+', '-').replaceAll('/', '_').replaceAll('=', '');
}
function base64UrlToBytes(value) {
  const padded = value.replaceAll('-', '+').replaceAll('_', '/') + '==='.slice((value.length + 3) % 4);
  const binary = atob(padded);
  return Uint8Array.from(binary, char => char.charCodeAt(0));
}
function decodeJson(segment) {
  return JSON.parse(new TextDecoder().decode(base64UrlToBytes(segment)));
}

export const APPLE_AUDIENCE = AUDIENCE;

export async function appleRequestNonce(raw) {
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(String(raw)));
  return bytesToBase64Url(new Uint8Array(digest));
}

export async function fetchAppleKeys(fetchImpl = fetch) {
  const response = await fetchImpl('https://appleid.apple.com/auth/keys');
  if (!response.ok) throw new Error('Apple public keys are unavailable.');
  const body = await response.json();
  return body.keys || [];
}

export async function verifyAppleIdentityToken(token, {keys, audience = AUDIENCE, nonce, now = Date.now()} = {}) {
  const parts = String(token || '').split('.');
  if (parts.length !== 3) return {ok: false, error: 'malformed'};
  let header, payload;
  try { header = decodeJson(parts[0]); payload = decodeJson(parts[1]); } catch { return {ok: false, error: 'malformed'}; }
  if (header.alg !== 'ES256') return {ok: false, error: 'alg'};
  const jwk = (keys || []).find(key => key.kid === header.kid);
  if (!jwk) return {ok: false, error: 'key'};
  const key = await crypto.subtle.importKey('jwk', {...jwk, alg: 'ES256', key_ops: ['verify']}, {name: 'ECDSA', namedCurve: 'P-256'}, false, ['verify']);
  const valid = await crypto.subtle.verify({name: 'ECDSA', hash: 'SHA-256'}, key, base64UrlToBytes(parts[2]), new TextEncoder().encode(`${parts[0]}.${parts[1]}`));
  if (!valid) return {ok: false, error: 'signature'};
  if (payload.iss !== APPLE_ISS) return {ok: false, error: 'iss'};
  if (payload.aud !== audience) return {ok: false, error: 'aud'};
  if (!payload.exp || payload.exp * 1000 <= now) return {ok: false, error: 'exp'};
  if (!payload.sub || typeof payload.sub !== 'string') return {ok: false, error: 'sub'};
  if (nonce && payload.nonce !== await appleRequestNonce(nonce)) return {ok: false, error: 'nonce'};
  return {ok: true, sub: payload.sub};
}

export async function signTestIdentityToken({privateJwk, kid, sub, nonce, audience = AUDIENCE, exp}) {
  const header = bytesToBase64Url(new TextEncoder().encode(JSON.stringify({alg: 'ES256', kid})));
  const payload = {iss: APPLE_ISS, aud: audience, sub, exp: exp || Math.floor(Date.now() / 1000) + 600};
  if (nonce) payload.nonce = await appleRequestNonce(nonce);
  const body = bytesToBase64Url(new TextEncoder().encode(JSON.stringify(payload)));
  const key = await crypto.subtle.importKey('jwk', privateJwk, {name: 'ECDSA', namedCurve: 'P-256'}, false, ['sign']);
  const signature = new Uint8Array(await crypto.subtle.sign({name: 'ECDSA', hash: 'SHA-256'}, key, new TextEncoder().encode(`${header}.${body}`)));
  return `${header}.${body}.${bytesToBase64Url(signature)}`;
}
