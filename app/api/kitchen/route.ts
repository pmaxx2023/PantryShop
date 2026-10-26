import {env} from 'cloudflare:workers';
import {privateJson} from '@/lib/api';
import {accountIdForToken, parseBearer} from '@/lib/account.mjs';
import {createD1Store} from '@/lib/d1-store.mjs';
import {createKitchenService} from '@/lib/kitchen-api.mjs';

export const dynamic = 'force-dynamic';

async function account(request: Request) {
  const token = parseBearer(request.headers.get('authorization'));
  if (!token) return null;
  return accountIdForToken(token);
}

function service() {
  if (!env.DB) return null;
  return createKitchenService(createD1Store(env));
}

export async function GET(request: Request) {
  const id = await account(request);
  if (!id) return privateJson({error: 'Sign in is not required, but cloud sync needs this device account.'}, 401);
  const api = service();
  if (!api) return privateJson({error: 'Cloud sync is unavailable. This device copy still works.'}, 503);
  const result = await api.getKitchen(id);
  return privateJson(result, result.status);
}

export async function PUT(request: Request) {
  const id = await account(request);
  if (!id) return privateJson({error: 'Cloud sync needs this device account.'}, 401);
  const api = service();
  if (!api) return privateJson({error: 'Cloud sync is unavailable. This device copy still works.'}, 503);
  const raw = await request.text();
  if (raw.length > 900000) return privateJson({error: 'Kitchen is too large to save.'}, 413);
  let body;
  try { body = JSON.parse(raw); } catch { return privateJson({error: 'Invalid kitchen data.'}, 400); }
  const result = await api.putKitchen(id, body, request.headers.get('idempotency-key'));
  return privateJson(result, result.status);
}
