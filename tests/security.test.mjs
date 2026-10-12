import assert from 'node:assert/strict';
import { test } from 'node:test';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const braces = require('braces');
const forge = require('node-forge');

test('braces preserves ordinary globs and expansion', () => {
  assert.deepEqual(braces.expand('src/{pages,components}/*.{vue,ts}'), [
    'src/pages/*.vue', 'src/pages/*.ts', 'src/components/*.vue', 'src/components/*.ts',
  ]);
  assert.equal(braces.compile('src/{a,b}.vue'), 'src/(a|b).vue');
  assert.equal(braces.stringify('src/{a,b}.vue'), 'src/{a,b}.vue');
  assert.deepEqual(braces.expand('{1..3}'), ['1', '2', '3']);
});

for (const operation of ['compile', 'stringify', 'expand']) {
  test(`braces.${operation} rejects malicious nesting without stack overflow`, () => {
    for (const [open, close] of [['{', '}'], ['(', ')'], ['{(', ')}']]) {
      const pattern = open.repeat(2000) + 'a,b' + close.repeat(2000);
      assert.throws(() => braces[operation](pattern), {
        name: 'SyntaxError', message: /nesting exceeds security limit/,
      });
    }
    // AST input must not bypass the parser's depth limit.
    let ast = { type: 'text', value: 'leaf' };
    for (let i = 0; i < 5000; i++) ast = { type: 'root', nodes: [ast] };
    assert.throws(() => braces[operation](ast), {
      name: 'SyntaxError', message: /nesting exceeds security limit/,
    });
  });
}

const keys = forge.pki.rsa.generateKeyPair({ bits: 1024, e: 0x10001 });
const digest = () => forge.md.sha256.create().update('security regression fixture');
const asn1 = forge.asn1;
const oid = () => asn1.create(asn1.Class.UNIVERSAL, asn1.Type.OID, false,
  asn1.oidToDer(forge.pki.oids.sha256).getBytes());
const nullNode = () => asn1.create(asn1.Class.UNIVERSAL, asn1.Type.NULL, false, '');
function signDigestInfo(algorithmChildren) {
  const info = asn1.create(asn1.Class.UNIVERSAL, asn1.Type.SEQUENCE, true, [
    asn1.create(asn1.Class.UNIVERSAL, asn1.Type.SEQUENCE, true, algorithmChildren),
    asn1.create(asn1.Class.UNIVERSAL, asn1.Type.OCTETSTRING, false, digest().digest().getBytes()),
  ]);
  return keys.privateKey.sign(asn1.toDer(info).getBytes(), 'NONE');
}

test('node-forge still verifies valid SHA-256 PKCS#1 v1.5 signatures', () => {
  assert.equal(keys.publicKey.verify(digest().digest().getBytes(), keys.privateKey.sign(digest())), true);
  assert.equal(keys.publicKey.verify(digest().digest().getBytes(), signDigestInfo([oid()])), true);
  assert.equal(keys.publicKey.verify(digest().digest().getBytes(), signDigestInfo([oid(), nullNode()])), true);
  assert.equal(keys.publicKey.verify(forge.md.sha256.create().update('tampered').digest().getBytes(),
    keys.privateKey.sign(digest())), false);
});

test('node-forge rejects extra elements inside DigestAlgorithm', () => {
  for (const extra of [nullNode(), oid(), asn1.create(asn1.Class.UNIVERSAL, asn1.Type.SEQUENCE, true, [])]) {
    const signature = signDigestInfo([oid(), nullNode(), extra]);
    assert.throws(() => keys.publicKey.verify(digest().digest().getBytes(), signature), /DigestInfo/);
  }
});
