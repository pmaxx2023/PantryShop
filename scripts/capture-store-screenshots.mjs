import {spawn} from 'node:child_process';
import {mkdir, writeFile} from 'node:fs/promises';
import path from 'node:path';

const appUrl = process.env.PSHOP_URL || 'http://127.0.0.1:3000';
const outDir = path.join(process.cwd(), 'docs', 'app-store');
const chrome = process.env.CHROME || '/usr/bin/google-chrome';

function launch() {
  return spawn(chrome, [
    '--headless=new',
    '--disable-gpu',
    '--no-sandbox',
    '--remote-debugging-port=9222',
    '--remote-allow-origins=*',
    `--user-data-dir=${path.join('/tmp', 'pshop-chrome')}`,
    'about:blank'
  ], {stdio: 'ignore'});
}

async function browserVersion() {
  for (let attempt = 0; attempt < 40; attempt += 1) {
    try {
      const response = await fetch('http://127.0.0.1:9222/json/version');
      if (response.ok) return response.json();
    } catch {}
    await new Promise(resolve => setTimeout(resolve, 250));
  }
  throw new Error('Chrome DevTools did not open.');
}

function cdp(url) {
  const socket = new WebSocket(url);
  let next = 0;
  const pending = new Map();
  const opened = new Promise((resolve, reject) => {
    socket.addEventListener('open', resolve);
    socket.addEventListener('error', reject);
  });
  socket.addEventListener('message', event => {
    const message = JSON.parse(event.data);
    if (message.id && pending.has(message.id)) {
      const {resolve, reject} = pending.get(message.id);
      pending.delete(message.id);
      if (message.error) reject(new Error(JSON.stringify(message.error)));
      else resolve(message.result);
    }
  });
  return {
    async send(method, params = {}) {
      await opened;
      const id = ++next;
      const result = new Promise((resolve, reject) => pending.set(id, {resolve, reject}));
      socket.send(JSON.stringify({id, method, params}));
      return result;
    },
    close() { socket.close(); }
  };
}

async function waitFor(client, source) {
  for (let attempt = 0; attempt < 40; attempt += 1) {
    const value = await client.send('Runtime.evaluate', {expression: source, returnByValue: true});
    if (value.result?.value) return;
    await new Promise(resolve => setTimeout(resolve, 250));
  }
  throw new Error(`Timed out: ${source}`);
}

async function click(client, label) {
  const clicked = await client.send('Runtime.evaluate', {
    expression: `(() => { const button = [...document.querySelectorAll('button')].find(node => node.textContent && node.textContent.includes(${JSON.stringify(label)})); if (!button) return false; button.click(); return true; })()`,
    returnByValue: true
  });
  if (!clicked.result?.value) throw new Error(`No button containing ${label}`);
  await new Promise(resolve => setTimeout(resolve, 400));
}

async function shot(client, name) {
  const image = await client.send('Page.captureScreenshot', {format: 'png', fromSurface: true});
  const file = path.join(outDir, name);
  await writeFile(file, Buffer.from(image.data, 'base64'));
  process.stdout.write(`${name}\n`);
}

const sizes = [
  ['6.9', 440, 956],
  ['6.5', 428, 926]
];
const frames = [
  ['menu', async () => {}],
  ['recipe', async client => {
    const clicked = await client.send('Runtime.evaluate', {expression: `(() => { const node = document.querySelector('.dish-photo'); if (!node) return false; node.click(); return true; })()`, returnByValue: true});
    if (!clicked.result?.value) throw new Error('No dish photo');
    await new Promise(resolve => setTimeout(resolve, 400));
  }],
  ['kitchen', async client => click(client, 'My kitchen')],
  ['groceries', async client => click(client, 'Groceries')],
  ['household', async client => click(client, 'Household')]
];

await mkdir(outDir, {recursive: true});
const child = launch();
try {
  await browserVersion();
  const pages = await (await fetch('http://127.0.0.1:9222/json/list')).json();
  const page = pages.find(item => item.type === 'page');
  if (!page) throw new Error('Chrome did not open a page.');
  const client = cdp(page.webSocketDebuggerUrl);
  await client.send('Page.enable');
  await client.send('Runtime.enable');
  for (const [sizeName, width, height] of sizes) {
    await client.send('Emulation.setDeviceMetricsOverride', {width, height, deviceScaleFactor: 3, mobile: true});
    for (const [frame, prepare] of frames) {
      await client.send('Page.navigate', {url: appUrl});
      await waitFor(client, `document.body && document.body.innerText.includes('Sample kitchen')`);
      await prepare(client);
      await shot(client, `iphone-${sizeName}-${frame}.png`);
    }
  }
  client.close();
} finally {
  child.kill('SIGKILL');
}
