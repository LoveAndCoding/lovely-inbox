const commonConfig = require("./jest.common.config");

module.exports = Object.assign({}, commonConfig, {
	testMatch: ["**/test/e2e/**/*.+(spec|test|fixture).[jt]s?(x)"],
	testTimeout: 10000,
});
