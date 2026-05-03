'use strict';

const assert = require('node:assert/strict');
const { describe, it } = require('node:test');
const { http } = require('../main');

describe("http", () => {
  it("parseHost", () => {
    const mock = ['', 'domain.com', 'localhost', 'domain.com:8080', 'localhost:8080'];
    const expected = ['no-host-name-in-http-headers', 'domain.com', 'localhost', 'domain.com', 'localhost'];
    for (let i = 0; i < mock.length; i++) {
      const actual = http.parseHost(mock[i]);
      assert.equal(actual, expected[i])
    }
  });

  it("parseCookies", () => {
    const mock = ['a=1;b=2', 'a=1 ;b= 2', 'a=1; b = 2', 'a=1'];
    const expected = [{ a: '1', b: '2' }, { a: '1', b: '2' }, { a: '1', b: '2' }, { a: '1' }];
    for (let i = 0; i < mock.length; i++) {
      const actual = http.parseCookies(mock[i]);
      assert.deepEqual(actual, expected[i]);
    }
  });

  it("parseParams", () => {
    const mock = ['a=1&b=2', 'a=1b=2', 'a=1', 'a=1&', 'a=', 'a'];
    const expected = [{ a: '1', b: '2' }, { a: '1b=2' }, { a: '1' }, { a: '1' }, { a: '' }, { a: '' }];
    for (let i = 0; i < mock.length; i++) {
      const actual = http.parseParams(mock[i]);
      assert.deepEqual(actual, expected[i]);
    }
  });

  it("createParams", () => {
    const mock = [
      [['user', 'batman'], ['status', 'active'], ['published', 'true']],
      { search: 'hello', category: 'tech' },
      'a=true&b=false&c=42',
      null,
      {},
      [],
    ];
    const expected = [
      '?user=batman&status=active&published=true',
      '?search=hello&category=tech',
      '?a=true&b=false&c=42',
      '',
      '',
      '',
    ];
    for (let i = 0; i < mock.length; i++) {
      const actual = http.createParams(mock[i]);
      assert.equal(actual, expected[i]);
    }
  });

  it("parseURL", () => {
    const mock = ['', '/project', '/user?admin=true', '/user/projects', '/', '.', 123, {}];
    const expected = [undefined, '/project', '/user', '/user/projects', '/', undefined, undefined, undefined];
    for (let i = 0; i < mock.length; i++) {
      const actual = http.parseURL(mock[i]);
      assert.equal(actual?.pathname, expected[i]);
    }
  });

  it("CODES", () => {
    assert.ok(Object.isFrozen(http.CODES));
    assert.equal(http.CODES.continue, 100);
    assert.equal(http.CODES["100"], "Continue");
  });

  it('query', () => {
    const path = 'abc/qwerty';
    const params = { a: 1, "c c": true, d: ["a"], c: 'd' };
    assert.equal(http.query(path, params), 'abc/qwerty?a=1&c+c=true&d=a&c=d');
    assert.equal(http.query(path, null), path);
    assert.equal(http.query(path, [1, "a"]), path);
    assert.equal(http.query(null, [1, "a"]), '');
    assert.equal(http.query('', {}), '');
    assert.equal(http.query([], {}), '');
    assert.equal(http.query('abc/', new URLSearchParams([['a', 'b']])), 'abc/?a=b');
  });

  describe('dataUrl', () => {
    const PAYLOAD = 'iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==';
    const MIME = "image/png";
    const URL = `data:${MIME};base64,${PAYLOAD}`;

    it('payload', () => {
      const result = http.dataUrl.payload(URL);
      assert.equal(result, PAYLOAD);
    });

    it('from', () => {
      const result = http.dataUrl.from(PAYLOAD, MIME);
      assert.equal(result, URL);
    });

    it('ext', () => {
      const result = http.dataUrl.mime(URL);
      assert.equal(result, MIME);
    });
  });
});
