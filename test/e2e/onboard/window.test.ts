import { Application } from "spectron";

import { ELECTRON_PATH, ROOT_DIR } from "../test.utils";

describe("Onboarding.Window", () => {
	describe("Launching", () => {
		let app: Application;

		afterEach(async () => {
			if (app && app.isRunning()) {
				return app.stop();
			}
		});

		test("shows onboarding window when it has not been done", async () => {
			// Arrange
			app = new Application({
				args: [ROOT_DIR],
				chromeDriverArgs: ["--disable-dev-shm-usage", "--no-sandbox"],
				path: ELECTRON_PATH,
			});

			// Act
			await app.start();
			const count = await app.client.getWindowCount();
			const title = await app.client.getTitle();

			// Assert
			expect(count).toBe(1);
			expect(title).toBe("Lovely Inbox Onboarding");
		});
	});
});
