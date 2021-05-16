import { faTimes } from "@fortawesome/free-solid-svg-icons";
import * as React from "react";

import WindowBarButton from "./button";

export default class WindowClose extends WindowBarButton {
	protected get icon() {
		return faTimes;
	}
	protected get text() {
		return "Close Window";
	}

	protected handleClick() {
		window.close();
	}
}
