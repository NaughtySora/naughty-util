'use strict';

const factorify = (dataset, nullable = null) => (key) => dataset[key] ?? nullable;
const factory = (Interface, ...params) => () => new Interface(...params);
function None() { }
function Some() { }
function Err() { }
function Ok() { }

class Option {

}

class Result {

}

function Tuple() { }
function Record() { }

const match = () => { };
module.exports = {
  factorify,
  factory,
};

