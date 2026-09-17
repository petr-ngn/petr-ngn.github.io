#!/usr/bin/env node

// Prerenders build/index.html so crawlers get real markup: builds the SSR entry,
// renders <App /> to a string, and swaps it in for the static shell in #root.
// Server-rendered markup hydrates cleanly, unlike a headless-browser snapshot.

import fs from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { build } from 'vite';

const ROOT = path.resolve(import.meta.dirname, '..');
const INDEX_PATH = path.join(ROOT, 'build', 'index.html');
const SSR_OUT_DIR = path.join(ROOT, 'node_modules', '.cache', 'prerender');
const ROOT_OPEN_TAG = '<div id="root">';

// Returns the index just past the </div> that closes the div opening at `start`.
function findClosingDiv(html, start) {
  const tags = /<div\b|<\/div>/g;
  tags.lastIndex = start;
  let depth = 0;
  for (let match; (match = tags.exec(html)); ) {
    depth += match[0] === '</div>' ? -1 : 1;
    if (depth === 0) return tags.lastIndex;
  }
  throw new Error('Unbalanced <div> tags in build/index.html');
}

await build({
  root: ROOT,
  logLevel: 'warn',
  build: {
    ssr: 'src/entry-server.tsx',
    outDir: SSR_OUT_DIR,
    emptyOutDir: true,
    copyPublicDir: false,
  },
});

try {
  const { render } = await import(pathToFileURL(path.join(SSR_OUT_DIR, 'entry-server.js')).href);
  const html = await fs.readFile(INDEX_PATH, 'utf8');

  const start = html.indexOf(ROOT_OPEN_TAG);
  if (start === -1) throw new Error(`${ROOT_OPEN_TAG} not found in build/index.html`);
  const end = findClosingDiv(html, start);

  await fs.writeFile(
    INDEX_PATH,
    `${html.slice(0, start)}${ROOT_OPEN_TAG}${render()}</div>${html.slice(end)}`
  );
  console.log('Prerendered build/index.html');
} finally {
  await fs.rm(SSR_OUT_DIR, { recursive: true, force: true });
}
