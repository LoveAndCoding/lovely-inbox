import baseStyles from "../styles/base.less";
baseStyles; // We need to access it to get this to insert

import * as ReactDOM from "react-dom";

import app from "./ui/app.tsx";

const mainEl = document.getElementById("root");

if (!mainEl) {
	throw new Error("Unable to find root element");
}

ReactDOM.render(app(), mainEl);
