'use strict';

const SUCCESS = 'SUCCESS';
const FAIL = 'FAIL';

const sync = (tests, testName = 'untitled',) => {
  const failed = [];
  const status = [];
  for (const test of tests) {
    try {
      test();
      status.push({ case: testName, name: test.name, status: SUCCESS });
    } catch ({ actual, expected, operator }) {
      failed.push({ case: testName, name: test.name, actual, expected, operator });
      status.push({ case: testName, name: test.name, status: FAIL });
    }
  }
  if (failed.length) console.table(failed);
  console.table(status);
  return failed;
};

const async = async (tests, testName = 'untitled',) => {
  const failed = [];
  const status = [];
  for (const test of tests) {
    try {
      await test();
      status.push({ case: testName, name: test.name, status: SUCCESS });
    } catch ({ actual, expected, operator }) {
      failed.push({ case: testName, name: test.name, actual, expected, operator });
      status.push({ case: testName, name: test.name, status: FAIL });
    }
  }
  if (failed.length) console.table(failed);
  console.table(status);
  return failed;
};


module.exports = {
  sync,
  async,
};
