module.exports = {
	preset: "ts-jest",
	moduleNameMapper: {
		"^src/(.+)$": "<rootDir>/src/$1",
	},
	setupFiles: ["<rootDir>/test/jest.setup.worker.ts"],
	testEnvironment: "node",
	testMatch: ["**/*.+(spec|test|fixture).[jt]s?(x)"],
};
