import { faWindowMinimize } from "@fortawesome/pro-light-svg-icons";
import { remote } from "electron";
import * as React from "react";

import WindowBarButton from "./button";

export default class WindowMinimize extends WindowBarButton {
	protected get icon() {
		return faWindowMinimize;
	}
	protected get text() {
		return "Minimize Window";
	}

	protected handleClick() {
		remote.getCurrentWindow().minimize();
	}
}
