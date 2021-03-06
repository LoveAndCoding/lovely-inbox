import * as React from "react";

import Email from "../../../../common/email";
import InputField, {
	InputFieldSizes,
} from "../../../forms/components/input.field";
import View, { ViewTags } from "../../../layout/components/view";
import { StyleSheet } from "../../../styles";
import { IServerConfig } from "../../store/server-config/types";

export interface IServerSettingsFormDispatchProps {
	onIncomingHostChange: (host: string) => void;
	onOutgoingHostChange: (host: string) => void;
	onUsernameChange: (username: string) => void;
}

export interface IServerSettingsFormProps {
	config: IServerConfig;
	email: Email;
}

export default class ServerSettingsForm extends React.Component<
	IServerSettingsFormProps & IServerSettingsFormDispatchProps
> {
	public render(): React.ReactElement {
		const { incoming, outgoing, username } = this.props.config;

		return (
			<View styles={[styles.configGroup]} tag={ViewTags.form}>
				<InputField
					defaultValue={username}
					inline={true}
					label="Username"
					onChange={this.handleUsernameChange}
					placeholder="kairi@destiny.island"
					size={InputFieldSizes.small}
					type="text"
				/>
				<InputField
					defaultValue={incoming?.server.host}
					inline={true}
					label="IMAP Server"
					onChange={this.handleIncomingServerHostChange}
					placeholder="imap.example.com"
					size={InputFieldSizes.small}
					type="url"
				/>
				<InputField
					defaultValue={outgoing?.server.host}
					inline={true}
					label="SMTP Server"
					onChange={this.handleOutgoingServerHostChange}
					placeholder="smtp.example.com"
					size={InputFieldSizes.small}
					type="url"
				/>
			</View>
		);
	}

	public handleIncomingServerHostChange = (host: string): void => {
		this.props.onIncomingHostChange(host);
	};
	public handleOutgoingServerHostChange = (host: string): void => {
		this.props.onOutgoingHostChange(host);
	};
	public handleUsernameChange = (username: string): void => {
		this.props.onUsernameChange(username);
	};
}

const styles = StyleSheet.create({
	configGroup: {
		display: "grid",
		gridAutoColumns: "1fr 2fr",
		gridGapColumn: 10,
		gridTemplateAreas: "'label field'",
	},
	configGroupLabel: {
		fontSize: 16,
		gridColumn: "span 2",
		margin: 5,
	},
	fieldset: {
		// Workaround for chrome bug
		// https://bugs.chromium.org/p/chromium/issues/detail?id=375693
		display: "contents",
	},
});
