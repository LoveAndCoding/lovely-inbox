import { IpcMainEvent } from "electron";

export interface IServerNotifyChannels {
	"config.onboarding": [boolean];

	"window.minimize": [];
}
