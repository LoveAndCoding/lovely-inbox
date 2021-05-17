import { faTimes, IconDefinition } from "@fortawesome/free-solid-svg-icons";

import WindowBarButton from "./button";

export default class WindowClose extends WindowBarButton {
	protected get icon(): IconDefinition {
		return faTimes;
	}
	protected get text(): string {
		return "Close Window";
	}

	protected handleClick(): void {
		window.close();
	}
}
