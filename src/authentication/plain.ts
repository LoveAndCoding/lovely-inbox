import WindowManager from "../window";
import PasswordModalWindow from "../window/modals/password.modal";
import AuthenticationScheme, { IMAPAuthKeys } from "./scheme";

export class PasswordEntryCancel {}

let NEXT_CHALLENGE_ID = 1;

export default class PlainAuthScheme extends AuthenticationScheme {
	private static currentHandlers: Map<
		number,
		(password: string, save: boolean) => Promise<boolean>
	> = new Map();

	public static getHandler(
		id: number,
	): ((password: string, save: boolean) => Promise<boolean>) | void {
		return PlainAuthScheme.currentHandlers.get(id);
	}

	constructor(public readonly username?: string) {
		super(IMAPAuthKeys.Plain);
	}

	public challenge(
		checkFn: (password: string) => Promise<boolean>,
	): Promise<[string, boolean]> {
		return new Promise((resolve, reject) => {
			const challengeId = NEXT_CHALLENGE_ID++;
			PlainAuthScheme.currentHandlers.set(
				challengeId,
				async (password: string, save: boolean) => {
					const worked = await checkFn(password);
					if (worked) {
						PlainAuthScheme.currentHandlers.delete(challengeId);
						resolve([password, save]);
					}
					return worked;
				},
			);
			const modal = WindowManager.popupModal(PasswordModalWindow, {
				challengeId: `${challengeId}`,
				username: this.username,
			});
			modal.browserWindow.on("closed", () => {
				PlainAuthScheme.currentHandlers.delete(challengeId);
				reject(new PasswordEntryCancel());
			});
		});
	}
}
