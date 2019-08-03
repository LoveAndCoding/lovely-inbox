import baseStyles from "../styles/base.less";
// tslint:disable-next-line:no-unused-expression
baseStyles; // We need to access it to get this to insert

import * as ReactDOM from "react-dom";

import app from "./ui/onboarding/app";

const mainEl = document.getElementById("root");

if (!mainEl) {
	throw new Error("Unable to find root element");
}

ReactDOM.render(app(), mainEl);
