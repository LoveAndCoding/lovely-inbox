import { attachNotifyListeners as attachConfigNotifyListeners } from "../config/handlers";
import Notifier from "./notifier";

export function createAppNotifier() {
	const appNotifier = new Notifier();

	// Here is where we attach our route handlers
	attachConfigNotifyListeners(appNotifier);

	return appNotifier;
}
