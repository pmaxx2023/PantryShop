import {env} from 'cloudflare:workers';
import {privateJson} from '@/lib/api';
import {accountIdForToken, parseBearer} from '@/lib/account.mjs';
import {createD1Store} from '@/lib/d1-store.mjs';
import {createKitchenService} from '@/lib/kitchen-api.mjs';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  const token = parseBearer(request.headers.get('authorization'));
  if (!token) return privateJson({error: 'Photo upload needs this device account.'}, 401);
  if (!env.DB || !env.BUCKET) return privateJson({error: 'Photo storage is unavailable. The photo can stay on this device.'}, 503);
  const form = await request.formData();
  const file = form.get('photo');
  const location = String(form.get('location') || 'Pantry');
  if (!(file instanceof File)) return privateJson({error: 'Choose a photo.'}, 400);
  const bytes = await file.arrayBuffer();
  const result = await createKitchenService(createD1Store(env)).addPhoto(await accountIdForToken(token), {bytes, type: file.type, location});
  return privateJson(result, result.status);
}
