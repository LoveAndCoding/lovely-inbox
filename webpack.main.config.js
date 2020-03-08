const path = require("path");

module.exports = {
	/**
	 * This is the main entry point for your application, it's the first file
	 * that runs in the main process.
	 */
	entry: "./src/main.ts",
	resolve: {
		alias: {
			logform$: path.resolve(
				__dirname,
				"node_modules",
				"logform",
				"dist",
				"browser",
			),
		},
		extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
	},
	// Put your normal webpack config below here
	module: {
		rules: require("./webpack.rules"),
	},
};
