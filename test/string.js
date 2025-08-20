'use strict';

const { string } = require('../main');
const { describe, it } = require('node:test');
const assert = require('node:assert');

describe('string', () => {
  it('capitalize', () => {
    assert.strictEqual(string.capitalize('hello'), 'Hello');
    assert.strictEqual(string.capitalize('WORLD'), 'World');
    assert.strictEqual(string.capitalize('vAlue'), 'Value');
  });
  it('lower', () => {
    assert.strictEqual(string.lower('Hello'), 'hello');
    assert.strictEqual(string.lower('WORLD'), 'world');
    assert.strictEqual(string.lower('value'), 'value');
  });
  it('upper', () => {
    assert.strictEqual(string.upper('hello'), 'HELLO');
    assert.strictEqual(string.upper('WORLD'), 'WORLD');
    assert.strictEqual(string.upper('Value'), 'VALUE');
  });
  it('slug', () => {
    assert.strictEqual(string.slug('he-llo wor@ld'), 'he-llo-world');
    assert.strictEqual(string.slug('hello wor@ld'), 'hello-world');
    assert.strictEqual(string.slug(''), '');
    assert.strictEqual(string.slug('hello-world'), 'hello-world');
    assert.strictEqual(string.slug('h e l l 0!@#$%'), 'h-e-l-l-0');
    assert.strictEqual(string.slug('hell--o'), 'hell-o');
    assert.strictEqual(string.slug('hell---o'), 'hell-o');
    assert.strictEqual(string.slug('hell-o'), 'hell-o');
  });
});