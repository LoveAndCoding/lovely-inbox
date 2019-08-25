const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = [
	// Add support for native node modules
	{
		test: /\.node$/,
		use: "node-loader",
	},
	{
		test: /\.(m?js|node)$/,
		parser: { amd: false },
		use: {
			loader: "@marshallofsound/webpack-asset-relocator-loader",
			options: {
				outputAssetBase: "native_modules",
			},
		},
	},
	{
		test: /\.tsx?$/,
		exclude: /(node_modules|.webpack)/,
		loaders: [
			{
				loader: "ts-loader",
				options: {
					transpileOnly: true,
				},
			},
		],
	},
	{
		test: /\.less$/,
		use: [
			{
				loader: MiniCssExtractPlugin.loader,
			},
			{
				loader: "css-loader",
			},
			{
				loader: "less-loader",
			},
		],
	},
	{
		test: /\.(ico|png|jpe?g|gif|svg)$/,
		use: [
			{
				loader: "url-loader",
			},
		],
	},
	{
		test: /\.(eot|otf|woff2?|ttf)$/,
		use: [
			{
				loader: "file-loader",
			},
		],
	},
];
