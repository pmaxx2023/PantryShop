import {env} from 'cloudflare:workers';
import {privateJson, sameOrigin} from '@/lib/api';
export const dynamic='force-dynamic';

export async function GET() {
  if(!env.DB) return privateJson({error:'Kitchen storage is unavailable.'},503);
  const row=await env.DB.prepare('SELECT data, revision FROM kitchens WHERE id = ?').bind('owner-kitchen').first<{data:string; revision:number}>();
  return privateJson({state:row?JSON.parse(row.data):null,revision:row?.revision||0,photoRecognition:'on-device'});
}

export async function PUT(request:Request) {
  if(!sameOrigin(request))return privateJson({error:'Invalid request origin.'},403);
  if(!env.DB)return privateJson({error:'Kitchen storage is unavailable.'},503);
  const raw=await request.text();
  if(raw.length>900000)return privateJson({error:'Kitchen is too large to save.'},413);
  let body;try{body=JSON.parse(raw);}catch{return privateJson({error:'Invalid kitchen data.'},400);}
  if(!body.state||!Array.isArray(body.state.inventory)||!Array.isArray(body.state.plan)||!Array.isArray(body.state.profiles)||!Number.isInteger(body.revision)||body.revision<0||body.state.inventory.length>1500||body.state.plan.length>100||body.state.profiles.length>20)return privateJson({error:'Invalid kitchen data.'},400);
  const now=new Date().toISOString();
  const data=JSON.stringify(body.state);
  if(body.revision===0){
    const created=await env.DB.prepare('INSERT OR IGNORE INTO kitchens (id, data, revision, updated_at) VALUES (?, ?, 1, ?)').bind('owner-kitchen',data,now).run();
    if(!created.meta.changes)return privateJson({error:'This kitchen was updated in another window. Reload before saving.'},409);
    return privateJson({revision:1});
  }
  const updated=await env.DB.prepare('UPDATE kitchens SET data = ?, revision = revision + 1, updated_at = ? WHERE id = ? AND revision = ?').bind(data,now,'owner-kitchen',body.revision).run();
  if(!updated.meta.changes)return privateJson({error:'This kitchen was updated in another window. Reload before saving.'},409);
  return privateJson({revision:body.revision+1});
}
