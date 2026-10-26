import {createHash} from 'node:crypto';
import {createWriteStream} from 'node:fs';
import {mkdir, readFile, stat, writeFile} from 'node:fs/promises';
import path from 'node:path';
import {pipeline} from 'node:stream/promises';

const ROOT = process.cwd();
const DEST = path.join(ROOT, 'public', 'models', 'SmolVLM-256M-Instruct');
const CHECKSUMS = path.join(ROOT, 'models', 'CHECKSUMS.sha256');
const SOURCE = 'https://huggingface.co/HuggingFaceTB/SmolVLM-256M-Instruct/resolve/main';

export const MODEL_FILES = [
  'config.json',
  'generation_config.json',
  'preprocessor_config.json',
  'processor_config.json',
  'tokenizer.json',
  'tokenizer_config.json',
  'special_tokens_map.json',
  'chat_template.json',
  'added_tokens.json',
  'onnx/vision_encoder_q4.onnx',
  'onnx/decoder_model_merged_q4.onnx',
  'onnx/embed_tokens_q4.onnx'
];

async function sha256(file) {
  const hash = createHash('sha256');
  hash.update(await readFile(file));
  return hash.digest('hex');
}

async function download(relative) {
  const target = path.join(DEST, relative);
  await mkdir(path.dirname(target), {recursive: true});
  const response = await fetch(`${SOURCE}/${relative}`);
  if (!response.ok || !response.body) throw new Error(`${relative} returned ${response.status}`);
  await pipeline(response.body, createWriteStream(target));
  const info = await stat(target);
  if (info.size < 32) throw new Error(`${relative} is too small to be a model file`);
  return {relative, bytes: info.size, sha256: await sha256(target)};
}

const rows = [];
for (const relative of MODEL_FILES) {
  process.stdout.write(`fetch ${relative}\n`);
  rows.push(await download(relative));
}
const body = [
  '# sha256  bytes  path',
  '# Source: HuggingFaceTB/SmolVLM-256M-Instruct (Apache-2.0). q4 ONNX only.',
  '# These files are fetched into public/models at release build time and copied into the app bundle.',
  '# The installed app does not download them.',
  ...rows.map(row => `${row.sha256}  ${row.bytes}  ${row.relative}`)
].join('\n') + '\n';
await mkdir(path.dirname(CHECKSUMS), {recursive: true});
await writeFile(CHECKSUMS, body);
process.stdout.write(`wrote ${CHECKSUMS}\n`);
