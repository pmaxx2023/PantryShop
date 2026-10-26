let processor,model,loading;let queue=Promise.resolve();
const post=message=>self.postMessage({type:'progress',message});
async function initialize(){
 if(model)return;if(loading)return loading;
 loading=(async()=>{
  if(!navigator.gpu||!await navigator.gpu.requestAdapter())throw new Error('This device does not provide a WebGPU adapter. Try a recent Chrome or Edge on supported hardware.');
  post('Loading the on-device vision engine…');
  const {AutoProcessor,AutoModelForVision2Seq,env}=await import('https://cdn.jsdelivr.net/npm/@huggingface/transformers@3.8.1');
  env.allowLocalModels=false;const id='HuggingFaceTB/SmolVLM-256M-Instruct';processor=await AutoProcessor.from_pretrained(id);let last=0;
  model=await AutoModelForVision2Seq.from_pretrained(id,{device:'webgpu',dtype:'q4',progress_callback:p=>{const now=Date.now();if(now-last>700){last=now;post(p.status==='progress'?'Downloading the local vision model'+(p.progress?' · '+Math.round(p.progress)+'%':''):'Preparing ingredient recognition…');}}});
 })();try{await loading;}catch(e){loading=null;model=null;throw e;}
}
self.onmessage=event=>{if(event.data.type!=='recognize')return;const {url}=event.data;
 queue=queue.catch(()=>{}).then(async()=>{try{
  await initialize();post('Looking for visible foods and package labels…');
  const {load_image}=await import('https://cdn.jsdelivr.net/npm/@huggingface/transformers@3.8.1');const image=await load_image(url);
  const messages=[{role:'user',content:[{type:'image'},{type:'text',text:'List the food ingredients and food packages clearly visible in this photo. Return one short food name per line. Do not guess hidden food, quantities or freshness. Do not include cookware.'}]}];
  const text=processor.apply_chat_template(messages,{add_generation_prompt:true});const inputs=await processor(text,[image],{do_image_splitting:false});
  const result=await model.generate({...inputs,do_sample:false,repetition_penalty:1.15,max_new_tokens:180});
  const generated=result.slice(null,[inputs.input_ids.dims.at(-1),null]);const output=processor.batch_decode(generated,{skip_special_tokens:true})[0];self.postMessage({type:'result',text:output});
 }catch(error){self.postMessage({type:'error',message:'On-device recognition could not finish. '+(error?.message||'Please retry on a supported WebGPU browser.')});}});
};
