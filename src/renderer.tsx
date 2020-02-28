import * as ReactDOM from "react-dom";

import app from "./ui/app";

import "../styles/base.css";

const mainEl = document.getElementById("root");

if (!mainEl) {
	throw new Error("Unable to find root element");
}

ReactDOM.render(app(), mainEl);
