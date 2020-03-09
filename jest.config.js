const commonConfig = require("./jest.common.config");

module.exports = Object.assign({}, commonConfig, {
	setupFiles: ["<rootDir>/test/jest.setup.worker.ts"],
	testMatch: [
		"**/test/(unit|integration|fixture)/**/*.+(spec|test|fixture).[jt]s?(x)",
	],
});
