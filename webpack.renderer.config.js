module.exports = {
	plugins: [],
	resolve: {
		extensions: [".ts", ".tsx", ".js", ".json"],
	},
	// Put your normal webpack config below here
	module: {
		rules: require("./webpack.rules"),
	},
};
