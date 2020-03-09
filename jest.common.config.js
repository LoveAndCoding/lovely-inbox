module.exports = {
	preset: "ts-jest",
	moduleNameMapper: {
		"^images/(.+)$": "<rootDir>/images/$1",
		"^src/(.+)$": "<rootDir>/src/$1",
	},
	testEnvironment: "node",
};
