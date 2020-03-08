const ALLOWED_CONFIGS = ["production", "beta", "alpha"];

function getBuildConfig() {
	const config = (process.env.NODE_ENV || "").toLowerCase();

	if (ALLOWED_CONFIGS.includes(config)) {
		return config;
	}
	return "nightly";
}

module.exports = {
	buildIdentifier: `../build/${getBuildConfig()}`,

	makers: [
		{
			name: "@electron-forge/maker-squirrel",
			config: {
				name: "LovelyInbox",
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
