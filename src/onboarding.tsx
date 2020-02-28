import * as ReactDOM from "react-dom";

import app from "./ui/onboarding/app";

const mainEl = document.getElementById("root");

if (!mainEl) {
	throw new Error("Unable to find root element");
}

ReactDOM.render(app(), mainEl);
