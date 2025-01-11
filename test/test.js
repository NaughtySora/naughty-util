
const SUCCESS = "SUCCESS";
const FAIL = "FAIL";

const sync = (tests) => {
  const results = [];
  const status = [];
  for (const test of tests) {
    try {
      test();
      status.push({ name: test.name, status: SUCCESS });
    } catch (reason) {
      results.push(reason);
      status.push({ name: test.name, status: FAIL });
    }
  }
  results.length && console.table(results);
  console.table(status);
};

const async = async (tests) => {
  const results = [];
  const status = [];
  for (const test of tests) {
    try {
      await test();
      status.push({ name: test.name, status: SUCCESS });
    } catch (reason) {
      results.push(reason);
      status.push({ name: test.name, status: FAIL });
    }
  }
  results.length && console.table(results);
  console.table(status);
};


module.exports = {
  sync,
  async,
};
