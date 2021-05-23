import { ApplicationConfig } from "../../config";
import ModalWindow from "../modal.window";

export default class PasswordModalWindow extends ModalWindow {
	public static get url(): string {
		return ApplicationConfig.modals.password;
	}
}
