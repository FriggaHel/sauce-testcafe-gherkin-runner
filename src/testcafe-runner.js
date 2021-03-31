const fs = require("fs");
const path = require('path');
const { getArgs } = require('sauce-testrunner-utils');
const { sauceReporter } = require('sauce-testcafe-runner/src/sauce-testreporter');

const tcPath = require.resolve('sauce-testcafe-runner/src/testcafe-runner');
console.log(`Final: ${tcPath}`);
const tcCode = fs.readFileSync(tcPath).toString()
    .replace("const createTestCafe = require('testcafe');", "const createTestCafe = require('gherkin-testcafe');")
    .replace("const { sauceReporter } = require('./sauce-testreporter');", "")
    .replace("if (require.main === module) {", "if (false) {");

eval(tcCode);

if (require.main === module) {
  console.log(`Sauce TestCafe Runner ${require(path.join(__dirname, '..', 'package.json')).version}`);
  console.log("OK");
  const { runCfgPath, suiteName } = getArgs();
  console.log(runCfgPath);

  run(runCfgPath, suiteName)
      // eslint-disable-next-line promise/prefer-await-to-then
      .then((passed) => {
        process.exit(passed ? 0 : 1);
      })
      // eslint-disable-next-line promise/prefer-await-to-callbacks
      .catch((err) => {
        console.log(err);
        process.exit(1);
      });
}

module.exports = { run };
