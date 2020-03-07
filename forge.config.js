module.exports = {
	packagerConfig: {},

	makers: [
		{
			name: "@electron-forge/maker-squirrel",
			config: {
				name: "Lovely Inbox",
			},
		},
		{
			name: "@electron-forge/maker-dmg",
		},
	],

	plugins: [
		[
			"@electron-forge/plugin-webpack",
			{
				mainConfig: "./webpack.main.config.js",

				renderer: {
					config: "./webpack.renderer.config.js",
					entryPoints: [
						// The Base CSS file for use in all windows
						{
							js: "./styles/base.css",
							name: "styles",
						},

						// Main/Inbox Window
						{
							additionalChunks: ["styles"],
							html: "./templates/index.html",
							js: "./src/renderer.tsx",
							name: "Lovely Inbox",
						},

						// Onboarding Window
						{
							additionalChunks: ["styles"],
							html: "./templates/index.html",
							js: "./src/onboarding.tsx",
							name: "Lovely Inbox Onboarding",
						},
					],
				},
			},
		],
	],
};
