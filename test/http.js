"use strict";
const assert = require("node:assert");
const test = require("./framework.js");
const { http } = require("../main");

const parseHost = () => {
  const mock = ["", 'domain.com', 'localhost', 'domain.com:8080', 'localhost:8080'];
  const expected = ['no-host-name-in-http-headers', 'domain.com', 'localhost', 'domain.com', 'localhost'];
  for (let i = 0; i < mock.length; i++) {
    const actual = http.parseHost(mock[i]);
    assert.strictEqual(actual, expected[i])
  }
};

const parseCookies = () => {
  const mock = ["a=1;b=2", 'a=1 ;b= 2', 'a=1; b = 2', 'a=1'];
  const expected = [{ a: '1', b: '2' }, { a: '1', b: '2' }, { a: '1', b: '2' }, { a: '1' }];
  for (let i = 0; i < mock.length; i++) {
    const actual = http.parseCookies(mock[i]);
    assert.deepEqual(actual, expected[i]);
  }
};

const parseParams = () => {
  const mock = ['a=1&b=2', 'a=1b=2', 'a=1', 'a=1&', 'a=', 'a'];
  const expected = [{ a: '1', b: '2' }, { a: '1b=2' }, { a: '1' }, { a: '1' }, { a: '' }, { a: '' }];
  for (let i = 0; i < mock.length; i++) {
    const actual = http.parseParams(mock[i]);
    assert.deepEqual(actual, expected[i]);
  }
};

const createParams = () => {
  const mock = [
    [["user", "batman"], ["status", "active"], ["published", "true"]],
    { search: "hello", category: "tech" },
    "a=true&b=false&c=42",
    null,
    {},
    [],
  ];
  const expected = [
    "?user=batman&status=active&published=true",
    "?search=hello&category=tech",
    "?a=true&b=false&c=42",
    "",
    "",
    "",
  ];
  for (let i = 0; i < mock.length; i++) {
    const actual = http.createParams(mock[i]);
    assert.deepEqual(actual, expected[i]);
  }
};

const parseURL = () => {
  const mock = ["", "/project", "/user?admin=true", "/user/projects", "/", ".", 123, {}];
  const expected = [undefined, "/project", "/user", "/user/projects", "/", undefined, undefined, undefined];
  for (let i = 0; i < mock.length; i++) {
    const actual = http.parseURL(mock[i]);
    assert.deepEqual(actual?.pathname, expected[i]);
  }
};

test.sync([parseHost, parseCookies, createParams, parseParams, parseURL], "http");