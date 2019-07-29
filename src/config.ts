export const Config = {
	isDev:
		"ELECTRON_IS_DEV" in process.env && process.env.ELECTRON_IS_DEV === "1",
};
