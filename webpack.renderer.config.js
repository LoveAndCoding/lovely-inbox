const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

module.exports = {
	plugins: [],
	resolve: {
		extensions: [".ts", ".tsx", ".js", ".json"],
		plugins: [new TsconfigPathsPlugin()],
	},
	// Put your normal webpack config below here
	module: {
		rules: require("./webpack.rules"),
	},
};
