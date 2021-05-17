import {
	faWindowMinimize,
	IconDefinition,
} from "@fortawesome/free-solid-svg-icons";

import * as ipc from "../../communication/ipc";
import WindowBarButton from "./button";

export default class WindowMinimize extends WindowBarButton {
	protected get icon(): IconDefinition {
		return faWindowMinimize;
	}
	protected get text(): string {
		return "Minimize Window";
	}

	protected handleClick(): void {
		ipc.notify("window.minimize");
	}
}
