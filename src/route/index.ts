import * as Account from "../account/handlers";
import Router from "./router";

export function createAppRouter() {
	const appRouter = new Router();

	// Here is where we attach our route handlers
	Account.attachHandlers(appRouter);

	return appRouter;
}
