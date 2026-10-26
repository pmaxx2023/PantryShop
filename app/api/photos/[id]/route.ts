import {env} from 'cloudflare:workers';
import {privateJson} from '@/lib/api';
import {accountIdForToken, parseBearer} from '@/lib/account.mjs';
import {createD1Store} from '@/lib/d1-store.mjs';
import {createKitchenService} from '@/lib/kitchen-api.mjs';

export const dynamic = 'force-dynamic';

async function serviceFor(request: Request) {
  const token = parseBearer(request.headers.get('authorization'));
  if (!token || !env.DB) return null;
  return {api: createKitchenService(createD1Store(env)), accountId: await accountIdForToken(token)};
}

export async function GET(request: Request, {params}: {params: Promise<{id: string}>}) {
  const context = await serviceFor(request);
  if (!context) return new Response('Not found', {status: 404});
  const {id} = await params;
  const photo = await context.api.readPhoto(context.accountId, id);
  if (photo.status !== 200) return new Response('Not found', {status: 404});
  return new Response(photo.bytes, {headers: {'Content-Type': photo.type || 'image/jpeg', 'Cache-Control': 'private, max-age=300', 'X-Content-Type-Options': 'nosniff'}});
}

export async function DELETE(request: Request, {params}: {params: Promise<{id: string}>}) {
  const context = await serviceFor(request);
  if (!context) return privateJson({error: 'Photo deletion needs this device account.'}, 401);
  const {id} = await params;
  const result = await context.api.removePhoto(context.accountId, id);
  return privateJson(result, result.status);
}
