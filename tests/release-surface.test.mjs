import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {appleRequestNonce, signTestIdentityToken, verifyAppleIdentityToken} from '../lib/apple-identity.mjs';

const read = relative => readFileSync(new URL(relative, import.meta.url), 'utf8');

test('the iOS shell is bundled, local, and permissioned', () => {
  const config = read('../capacitor.config.ts');
  assert.match(config, /com\.cagefreecapital\.pshop/);
  assert.doesNotMatch(config, /server\s*:/);
  const plist = read('../ios/App/App/Info.plist');
  assert.match(plist, /NSCameraUsageDescription/);
  assert.match(plist, /NSPhotoLibraryUsageDescription/);
  assert.match(plist, /ITSAppUsesNonExemptEncryption/);
  const privacy = read('../ios/App/App/PrivacyInfo.xcprivacy');
  assert.match(privacy, /NSPrivacyTracking/);
  assert.match(privacy, /<false\/>/);
  assert.match(privacy, /NSPrivacyCollectedDataTypePhotosorVideos/);
  assert.match(privacy, /CA92\.1/);
  const project = read('../ios/App/App.xcodeproj/project.pbxproj');
  assert.match(project, /IPHONEOS_DEPLOYMENT_TARGET = 17\.0/);
  assert.match(project, /TARGETED_DEVICE_FAMILY = 1/);
  assert.match(project, /PRODUCT_BUNDLE_IDENTIFIER = com\.cagefreecapital\.pshop/);
  assert.match(read('../wrangler.toml'), /name = "pshop"/);
  assert.match(read('../public/legal/privacy.html'), /does not cancel an Apple subscription/i);
  assert.match(read('../public/legal/support.html'), /No mailbox is claimed/);
  assert.match(read('../app/page.jsx'), /Illustration · standard dish/);
  assert.match(read('../app/page.jsx'), /appleRequestNonce/);
});

test('the Apple request nonce is the hash the token must carry', async () => {
  const pair = await crypto.subtle.generateKey({name: 'ECDSA', namedCurve: 'P-256'}, true, ['sign', 'verify']);
  const privateJwk = await crypto.subtle.exportKey('jwk', pair.privateKey);
  const publicJwk = await crypto.subtle.exportKey('jwk', pair.publicKey);
  publicJwk.kid = 'test-key';
  const raw = 'kitchen-nonce';
  const token = await signTestIdentityToken({privateJwk, kid: 'test-key', sub: 'apple-subject', nonce: raw});
  const payload = JSON.parse(Buffer.from(token.split('.')[1], 'base64url').toString());
  assert.equal(payload.nonce, await appleRequestNonce(raw));
  assert.equal((await verifyAppleIdentityToken(token, {keys: [publicJwk], nonce: raw})).ok, true);
  assert.equal((await verifyAppleIdentityToken(token, {keys: [publicJwk], nonce: payload.nonce})).ok, false);
});
