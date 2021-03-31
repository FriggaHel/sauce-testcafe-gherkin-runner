#!/usr/bin/env node

const fs = require('fs');
const file = require.resolve('sauce-testcafe-runner/src/console-wrapper');
const { getArgs } = require('sauce-testrunner-utils');
const code = fs.readFileSync(file);

module.exports = eval(code.toString()
  .replace("#!/usr/bin/env node", "")
  .replace("if (require.main === module) {", "if (false) {"));

if (require.main === module) {
  const { runCfgPath, suiteName } = getArgs();

  console.log(runCfgPath);
  testCafeRunner(runCfgPath, suiteName)
      // eslint-disable-next-line promise/prefer-await-to-then
      .then(() => {
        process.exit(0);
      })
      // eslint-disable-next-line promise/prefer-await-to-callbacks
      .catch((err) => {
        console.log(err);
        process.exit(1);
      });
}

module.exports = { testCafeRunner };