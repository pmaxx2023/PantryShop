let processor, model, loading;
let queue = Promise.resolve();
const post = message => self.postMessage({type: 'progress', message});

async function initialize() {
  if (model) return;
  if (loading) return loading;
  loading = (async () => {
    post('Loading the bundled vision engine…');
    let transformers;
    try {
      transformers = await import('/vendor/transformers/transformers.js');
    } catch {
      throw new Error('The on-device vision engine is not in this build. Name the foods yourself. PShop does not download recognition code.');
    }
    const {AutoProcessor, AutoModelForVision2Seq, env} = transformers;
    env.allowRemoteModels = false;
    env.allowLocalModels = true;
    env.localModelPath = '/models/';
    env.backends.onnx.wasm.wasmPaths = '/vendor/transformers/';
    const id = 'SmolVLM-256M-Instruct';
    try {
      processor = await AutoProcessor.from_pretrained(id, {local_files_only: true});
      model = await AutoModelForVision2Seq.from_pretrained(id, {dtype: 'q4', device: 'wasm', local_files_only: true});
    } catch {
      throw new Error('The bundled SmolVLM weights are not in this install. Enter the ingredients yourself. PShop will not download the model.');
    }
  })();
  try {
    await loading;
  } catch (error) {
    loading = null;
    model = null;
    throw error;
  }
}

self.onmessage = event => {
  if (event.data.type !== 'recognize') return;
  const {url} = event.data;
  queue = queue.catch(() => {}).then(async () => {
    try {
      await initialize();
      post('Looking for visible foods and package labels…');
      const {load_image} = await import('/vendor/transformers/transformers.js');
      const image = await load_image(url);
      const messages = [{role: 'user', content: [{type: 'image'}, {type: 'text', text: 'List the food ingredients and food packages clearly visible in this photo. Return one short food name per line. Do not guess hidden food, quantities, dates or freshness. Do not include cookware. If you are unsure, omit the item.'}]}];
      const text = processor.apply_chat_template(messages, {add_generation_prompt: true});
      const inputs = await processor(text, [image], {do_image_splitting: false});
      const result = await model.generate({...inputs, do_sample: false, repetition_penalty: 1.15, max_new_tokens: 180});
      const generated = result.slice(null, [inputs.input_ids.dims.at(-1), null]);
      const output = processor.batch_decode(generated, {skip_special_tokens: true})[0];
      self.postMessage({type: 'result', text: output});
    } catch (error) {
      self.postMessage({type: 'error', message: error?.message || 'On-device recognition could not finish. Your photo is still saved.'});
    }
  });
};
