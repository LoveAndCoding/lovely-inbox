export enum IMAPAuthKeys {
	"Plain" = "password",
}

export default abstract class AuthenticationScheme {
	constructor(
		public readonly imapConfigKey: IMAPAuthKeys = IMAPAuthKeys.Plain,
	) {}

	/**
	 * Challenge the user for authentication
	 */
	public abstract challenge(
		checkFn: (password: string) => Promise<boolean>,
	): Promise<[string, boolean]>;
}
