import {env} from 'cloudflare:workers';
import {privateJson,sameOrigin} from '@/lib/api';
export const dynamic='force-dynamic';
export async function GET(request:Request,{params}:any){
  const {id}=await params;if(!/^[a-f0-9]{64}$/.test(id))return new Response('Not found',{status:404});
  const object=await env.BUCKET?.get('photos/'+id);if(!object)return new Response('Not found',{status:404});
  return new Response(object.body,{headers:{'Content-Type':object.httpMetadata?.contentType||'image/jpeg','Cache-Control':'private, max-age=300','X-Content-Type-Options':'nosniff'}});
}
export async function DELETE(request:Request,{params}:any){
  if(!sameOrigin(request))return privateJson({error:'Invalid request origin.'},403);
  const {id}=await params;if(!/^[a-f0-9]{64}$/.test(id))return privateJson({error:'Invalid photo.'},400);
  await env.BUCKET?.delete('photos/'+id);return privateJson({deleted:true});
}
