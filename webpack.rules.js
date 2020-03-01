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
		test: /\.css$/,
		use: [
			{
				loader: "style-loader",
			},
			{
				loader: "css-loader",
			},
		],
	},
	{
		test: /\.(ico|png|jpe?g|gif|svg)$/,
		use: [
			{
				loader: "url-loader",
				options: {
					limit: 16384,
					name: "images/[name].[ext]",
				},
			},
		],
	},
	{
		test: /\.(eot|otf|woff2?|ttf)$/,
		use: [
			{
				loader: "file-loader",
				options: {
					name: "fonts/[name].[ext]",
				},
			},
		],
	},
];
