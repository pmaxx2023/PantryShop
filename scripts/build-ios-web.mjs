import {spawn} from 'node:child_process';
import path from 'node:path';

function run(command, args, env = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {stdio: 'inherit', env: {...process.env, ...env}});
    child.on('exit', code => code === 0 ? resolve() : reject(new Error(`${command} ${args.join(' ')} exited ${code}`)));
  });
}

const node = process.execPath;
await run(node, [path.join('scripts', 'stage-recognition.mjs')]);
if (process.env.PSHOP_FETCH_MODEL === '1') await run(node, [path.join('scripts', 'fetch-model.mjs')]);
await run(node, [path.join('scripts', 'render-legal.mjs')]);
await run(node, [path.join('scripts', 'run-framework.mjs'), 'build'], {PSHOP_STATIC_EXPORT: '1'});
process.stdout.write('Static web bundle is in dist/client. On a Mac, run npx cap sync ios from this checkout after the model files are present.\n');
