import { createAppNotifier } from "../notify";
import { createAppRouter } from "../route";
import WindowManager from "./window.manager";

export default new WindowManager(createAppRouter(), createAppNotifier());
