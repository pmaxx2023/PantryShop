import {mkdir, writeFile} from 'node:fs/promises';
import path from 'node:path';
import {LEGAL_UPDATED, privacy, support, terms, WORKING_NAME} from '../lib/legal.mjs';

function page(title, sections) {
  const body = sections.map(section => `<h2>${section.h}</h2>${section.p.map(paragraph => `<p>${paragraph}</p>`).join('')}`).join('\n');
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title} — ${WORKING_NAME}</title>
<style>
body{margin:0;background:#faf7ef;color:#243028;font:16px/1.6 Georgia,serif}
main{max-width:740px;margin:0 auto;padding:32px 22px 80px}
h1{font-size:42px;margin:8px 0 18px}
h2{font-size:26px;margin:28px 0 8px}
p{margin:0 0 12px}
a{color:#234b3d}
</style>
</head>
<body>
<main>
<p><a href="./privacy.html">Privacy</a> · <a href="./terms.html">Terms</a> · <a href="./support.html">Support</a></p>
<h1>${title}</h1>
<p>Updated ${LEGAL_UPDATED}. Working name: ${WORKING_NAME}.</p>
${body}
</main>
</body>
</html>
`;
}

const dest = path.join(process.cwd(), 'public', 'legal');
await mkdir(dest, {recursive: true});
await writeFile(path.join(dest, 'privacy.html'), page('Privacy policy', privacy));
await writeFile(path.join(dest, 'terms.html'), page('Terms of service', terms));
await writeFile(path.join(dest, 'support.html'), page('Support', support));
process.stdout.write('wrote public/legal/{privacy,terms,support}.html\n');
