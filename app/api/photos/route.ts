import {env} from 'cloudflare:workers';
import {privateJson,sameOrigin} from '@/lib/api';
export const dynamic='force-dynamic';
export async function POST(request:Request){
  if(!sameOrigin(request))return privateJson({error:'Invalid request origin.'},403);
  if(!env.BUCKET)return privateJson({error:'Photo storage is unavailable.'},503);
  const form=await request.formData();const file=form.get('photo');const location=String(form.get('location')||'Pantry');
  if(!(file instanceof File)||!['image/jpeg','image/png','image/webp'].includes(file.type)||file.size>6000000||!['Pantry','Fridge','Freezer'].includes(location))return privateJson({error:'Choose a JPG, PNG or WebP photo under 6 MB.'},400);
  const bytes=await file.arrayBuffer();const digest=await crypto.subtle.digest('SHA-256',bytes);const id=Array.from(new Uint8Array(digest),b=>b.toString(16).padStart(2,'0')).join('');
  await env.BUCKET.put('photos/'+id,bytes,{httpMetadata:{contentType:file.type},customMetadata:{location}});
  return privateJson({photo:{id,url:'/api/photos/'+id,location,createdAt:new Date().toISOString()},photoRecognition:'on-device'});
}
