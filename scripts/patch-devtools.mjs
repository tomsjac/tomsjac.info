import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';

// DevTools 3.4.2 still imports the default export removed in simple-git 4.
// Keep the stable DevTools release while using the security-fixed Git library.
const require = createRequire(import.meta.url);
const nuxtDir = dirname(require.resolve('nuxt/package.json'));
const roots = [
  join(nuxtDir, 'node_modules/@nuxt/devtools'),
  join(nuxtDir, '../@nuxt/devtools'),
];
const root = roots.find(path => existsSync(join(path, 'package.json')));
if (!root) throw new Error('Cannot locate Nuxt DevTools for the simple-git compatibility patch.');
const { version } = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'));
if (version !== '3.4.2') {
  throw new Error(`Review the simple-git compatibility patch for DevTools ${version}.`);
}
const path = join(root, 'dist/chunks/module-main.mjs');
const source = readFileSync(path, 'utf8');
const before = "import Git from 'simple-git';";
const after = "import { simpleGit as Git } from 'simple-git';";
if (source.includes(after) && !source.includes(before)) {
  console.log('Nuxt DevTools simple-git compatibility patch already applied.');
} else {
  if (source.split(before).length !== 2) {
    throw new Error('Unexpected DevTools source: refusing to apply the compatibility patch.');
  }
  writeFileSync(path, source.replace(before, after));
  console.log('Applied Nuxt DevTools simple-git compatibility patch.');
}
