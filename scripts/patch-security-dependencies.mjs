import { readFileSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';

const require = createRequire(import.meta.url);
function patch(name, version, file, changes) {
  const root = dirname(require.resolve(`${name}/package.json`));
  const installed = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8')).version;
  if (installed !== version) throw new Error(`Review security patch for ${name} ${installed}.`);
  const path = join(root, file);
  let source = readFileSync(path, 'utf8');
  for (const [before, after] of changes) {
    if (source.split(after).length === 2) continue;
    if (source.split(before).length !== 2) {
      throw new Error(`Unexpected ${name}/${file}: refusing to apply security patch.`);
    }
    source = source.replace(before, after);
  }
  writeFileSync(path, source);
  console.log(`Security patch verified: ${name}/${file}`);
}

// GHSA-vfj7-8cjw-p6xm: bound parser nesting and every recursive AST walker.
// Normal build globs are shallow; reject excessive depth before stack exhaustion.
const guard = "    if (depth > 128) throw new SyntaxError('Brace nesting exceeds security limit (128)');\n";
patch('braces', '3.0.3', 'lib/parse.js', [[
  '  const push = node => {\n',
  "  const push = node => {\n    if (node.nodes && stack.length >= 128) {\n      throw new SyntaxError('Brace nesting exceeds security limit (128)');\n    }\n",
]]);
patch('braces', '3.0.3', 'lib/compile.js', [
  ['  const walk = (node, parent = {}) => {\n', '  const walk = (node, parent = {}, depth = 0) => {\n' + guard],
  ['output += walk(child, node);', 'output += walk(child, node, depth + 1);'],
]);
patch('braces', '3.0.3', 'lib/stringify.js', [
  ['  const stringify = (node, parent = {}) => {\n', '  const stringify = (node, parent = {}, depth = 0) => {\n' + guard],
  ['output += stringify(child);', 'output += stringify(child, {}, depth + 1);'],
]);
patch('braces', '3.0.3', 'lib/expand.js', [
  ['  const walk = (node, parent = {}) => {\n', '  const walk = (node, parent = {}, depth = 0) => {\n' + guard],
  ['walk(child, node);', 'walk(child, node, depth + 1);'],
]);

// GHSA-86w9-cpqp-85rv: backport the upstream fix from digitalbazaar/forge#1152,
// commit ceba34402e329f0365134f23fe19898756527d65. Preserve all signature checks.
patch('node-forge', '1.4.0', 'lib/rsa.js', [[
  '            obj.value.length !== 2) {',
  "            obj.value.length !== 2 ||\n            obj.value[0].value.length !==\n              (('parameters' in capture) ? 2 : 1)) {",
]]);
