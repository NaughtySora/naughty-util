'use strict';

const { string } = require('../main');
const { describe, it } = require('node:test');
const assert = require('node:assert/strict');

describe('string', () => {

  it('capitalize', () => {
    assert.equal(string.capitalize('hello'), 'Hello');
    assert.equal(string.capitalize('WORLD'), 'World');
    assert.equal(string.capitalize('vAlue'), 'Value');
  });

  it('lower', () => {
    assert.equal(string.lower('Hello'), 'hello');
    assert.equal(string.lower('WORLD'), 'world');
    assert.equal(string.lower('value'), 'value');
  });

  it('upper', () => {
    assert.equal(string.upper('hello'), 'HELLO');
    assert.equal(string.upper('WORLD'), 'WORLD');
    assert.equal(string.upper('Value'), 'VALUE');
  });

  it('slug', () => {
    assert.equal(string.slug('he-llo wor@ld'), 'he-llo-world');
    assert.equal(string.slug('hello wor@ld'), 'hello-world');
    assert.equal(string.slug(''), '');
    assert.equal(string.slug('hello-world'), 'hello-world');
    assert.equal(string.slug('h e l l 0!@#$%'), 'h-e-l-l-0');
    assert.equal(string.slug('hell--o'), 'hell-o');
    assert.equal(string.slug('hell---o'), 'hell-o');
    assert.equal(string.slug('hell-o'), 'hell-o');
    assert.equal(string.slug(' he----  ll  o-'), 'he-ll-o');
  });

  it('valid', () => {
    assert.ok(string.valid('abc'));
    assert.ok(!string.valid(''));
    assert.ok(!string.valid(null));
    assert.ok(!string.valid(undefined));
    assert.ok(!string.valid({}, 3));
    assert.ok(!string.valid(''));
    assert.ok(string.valid('123', 3));
    assert.ok(!string.valid('12', 3));
    assert.ok(!string.valid('', 3));
  });
});
