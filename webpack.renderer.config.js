const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
	plugins: [
		new MiniCssExtractPlugin({
			// Options similar to the same options in webpackOptions.output
			// both options are optional
			filename: "[name].css",
			chunkFilename: "[id].css",
		}),
	],
	resolve: {
		extensions: [".ts", ".tsx", ".js", ".json"],
	},
	// Put your normal webpack config below here
	module: {
		rules: require("./webpack.rules"),
	},
};
