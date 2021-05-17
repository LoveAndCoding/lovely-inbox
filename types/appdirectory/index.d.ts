/// <reference types="node" />

declare module "appdirectory" {
	type Platforms =
		| "aix"
		| "darwin"
		| "freebsd"
		| "linux"
		| "openbsd"
		| "sunos"
		| "win32";

	interface AppDirectoryOptions {
		appName: string;
		appAuthor?: string;
		appVersion?: string;
		platform?: Platforms;
		useRoaming?: boolean;
	}

	class AppDirectory {
		constructor(appName: string);
		constructor(options: AppDirectoryOptions);

		public useRoaming: boolean;
		public platform: Platforms;

		siteConfig(): string;
		siteData(): string;
		userCache(): string;
		userConfig(): string;
		userData(): string;
		userLogs(): string;
	}

	export = AppDirectory;
}
