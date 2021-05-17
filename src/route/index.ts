import { attachHandlers as attachAccountHandlers } from "../account/handlers";
import { attachHandlers as attachServerHandlers } from "../server/handlers";
import Router from "./router";

export function createAppRouter(): Router {
	const appRouter = new Router();

	// Here is where we attach our route handlers
	attachAccountHandlers(appRouter);
	attachServerHandlers(appRouter);

	return appRouter;
}
