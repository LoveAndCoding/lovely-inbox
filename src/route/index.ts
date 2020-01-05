import * as ServerConnections from "../server/handlers";
import Router from "./router";

export function createAppRouter() {
	const appRouter = new Router();

	// Here is where we attach our route handlers
	ServerConnections.attachHandlers(appRouter);

	return appRouter;
}
