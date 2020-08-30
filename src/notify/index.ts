import Notifier from "./notifier";

export function createAppNotifier() {
	const appNotifier = new Notifier();

	// Here is where we attach our route handlers

	return appNotifier;
}
