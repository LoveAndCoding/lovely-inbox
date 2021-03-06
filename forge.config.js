const childProcess = require("child_process");

const pkg = require("./package.json");

const ALLOWED_CONFIGS = ["production", "beta", "alpha", "test"];

function getBuildConfig() {
	const config = (process.env.NODE_ENV || "").toLowerCase();

	if (ALLOWED_CONFIGS.includes(config)) {
		return config;
	}
	return "nightly";
}

const gitRevision = childProcess
	.execSync("git rev-parse HEAD", { encoding: "utf8" })
	.trim();

module.exports = {
	buildIdentifier: `../build/${getBuildConfig()}`,

	packagerConfig: {
		appVersion: `${pkg.version}-${gitRevision.substr(0, 6)}`,
	},

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
							name: "Inbox",
						},

						// Onboarding Window
						{
							additionalChunks: ["styles"],
							html: "./templates/index.html",
							js: "./src/onboarding.tsx",
							name: "Onboarding",
						},

						// The Password Modal CSS file
						{
							js: "./styles/password.css",
							name: "password-styles",
						},

						// Password Modal Window
						{
							additionalChunks: ["password-styles"],
							// Use special template so we can isolate password
							// code from third party code as much as possible
							html: "./templates/password.html",
							js: "./src/ui/modals/password/app.tsx",
							name: "Password_Modal",
						},
					],
				},
			},
		],
	],
};
