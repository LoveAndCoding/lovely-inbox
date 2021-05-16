import { faWindowMinimize } from "@fortawesome/free-solid-svg-icons";
import * as React from "react";

import * as ipc from "../../communication/ipc";
import WindowBarButton from "./button";

export default class WindowMinimize extends WindowBarButton {
	protected get icon() {
		return faWindowMinimize;
	}
	protected get text() {
		return "Minimize Window";
	}

	protected handleClick() {
		ipc.notify("window.minimize");
	}
}
