import {cp, mkdir, readdir, stat} from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const dest = path.join(root, 'public', 'vendor', 'transformers');
await mkdir(dest, {recursive: true});

async function find(start, name) {
  const hits = [];
  async function walk(dir, depth) {
    if (depth > 6) return;
    let entries = [];
    try { entries = await readdir(dir, {withFileTypes: true}); } catch { return; }
    for (const entry of entries) {
      if (entry.name === 'node_modules' && depth > 0) continue;
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) await walk(full, depth + 1);
      else if (entry.name === name) hits.push(full);
    }
  }
  await walk(start, 0);
  return hits;
}

const pkgRoot = path.join(root, 'node_modules', '@huggingface', 'transformers');
const pkg = await stat(pkgRoot).catch(() => null);
if (!pkg) throw new Error('Install @huggingface/transformers@3.8.1 before staging the recognition runtime.');

const bundles = [
  path.join(pkgRoot, 'dist', 'transformers.js'),
  path.join(pkgRoot, 'dist', 'transformers.min.js')
];
let bundle = null;
for (const candidate of bundles) {
  if (await stat(candidate).catch(() => null)) { bundle = candidate; break; }
}
if (!bundle) {
  const found = await find(pkgRoot, 'transformers.js');
  bundle = found.find(file => file.includes(`${path.sep}dist${path.sep}`)) || found[0];
}
if (!bundle) throw new Error('Could not find the Transformers.js browser bundle.');
await cp(bundle, path.join(dest, 'transformers.js'));

const wasmDirs = [
  path.join(pkgRoot, 'dist'),
  path.join(root, 'node_modules', 'onnxruntime-web', 'dist')
];
let wasmCount = 0;
for (const dir of wasmDirs) {
  const entries = await readdir(dir).catch(() => []);
  for (const name of entries) {
    if (!name.endsWith('.wasm') && !name.endsWith('.mjs')) continue;
    if (!name.includes('ort') && !name.includes('wasm')) continue;
    await cp(path.join(dir, name), path.join(dest, name));
    if (name.endsWith('.wasm')) wasmCount += 1;
  }
}
if (!wasmCount) throw new Error('No onnxruntime wasm files were staged. Recognition would otherwise fetch them at runtime.');
process.stdout.write(`staged ${path.relative(root, bundle)} and ${wasmCount} wasm files into public/vendor/transformers\n`);
