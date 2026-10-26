import {env} from 'cloudflare:workers';
import {privateJson} from '@/lib/api';
import {accountIdForToken, parseBearer} from '@/lib/account.mjs';
import {fetchAppleKeys, verifyAppleIdentityToken} from '@/lib/apple-identity.mjs';
import {createD1Store} from '@/lib/d1-store.mjs';
import {createKitchenService} from '@/lib/kitchen-api.mjs';

export const dynamic = 'force-dynamic';

async function context(request: Request) {
  const token = parseBearer(request.headers.get('authorization'));
  if (!token) return null;
  if (!env.DB) return {unavailable: true};
  return {api: createKitchenService(createD1Store(env)), accountId: await accountIdForToken(token)};
}

export async function POST(request: Request) {
  const current = await context(request);
  if (!current) return privateJson({error: 'Linking Apple needs this device account.'}, 401);
  if ('unavailable' in current) return privateJson({error: 'Cloud accounts are unavailable. This device kitchen still works.'}, 503);
  let body: {identityToken?: string; nonce?: string};
  try { body = await request.json(); } catch { return privateJson({error: 'Missing Apple identity token.'}, 400); }
  let keys;
  try { keys = await fetchAppleKeys(); } catch { return privateJson({error: 'Apple could not be reached to check the sign-in token.'}, 503); }
  const verified = await verifyAppleIdentityToken(body.identityToken, {keys, nonce: body.nonce});
  if (!verified.ok) return privateJson({error: 'Apple did not accept that sign-in.'}, 401);
  const linked = await current.api.linkApple(current.accountId, verified.sub);
  return privateJson(linked, linked.status);
}

export async function DELETE(request: Request) {
  const current = await context(request);
  if (!current) return privateJson({error: 'Account deletion needs this device account.'}, 401);
  if ('unavailable' in current) return privateJson({error: 'Cloud accounts are unavailable. Clear this device from Household.'}, 503);
  const result = await current.api.deleteAccount(current.accountId);
  return privateJson(result, result.status);
}
