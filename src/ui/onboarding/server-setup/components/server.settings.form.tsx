import * as React from "react";

import Email from "../../../../common/email";
import HeartBeatLoadingIcon from "../../../communication/loading";
import InputField, {
	InputFieldSizes,
} from "../../../forms/components/input.field";
import View, { ViewTags } from "../../../layout/components/view";
import { COLORS, css, StyleSheet } from "../../../styles";
import { IServerConfig } from "../../store/server-config/types";

export interface IServerSettingsFormProps {
	config: IServerConfig;
	email: Email;
}

export default class ServerSettingsForm extends React.Component<
	IServerSettingsFormProps
> {
	public handleChange = (event: Event) => {};

	public render() {
		const { incoming, outgoing, source } = this.props.config;
		const fieldsetClass = css(styles.fieldset);
		const configGroupLabelClass = css(styles.configGroupLabel);

		return (
			<View
				onChange={this.handleChange}
				styles={styles.configGroup}
				tag={ViewTags.form}
			>
				<InputField
					defaultValue={this.props.email.address}
					inline={true}
					label="Username"
					placeholder="kairi@destiny.island"
					size={InputFieldSizes.small}
					type="text"
				/>
				<InputField
					defaultValue={incoming.server.host}
					inline={true}
					label="IMAP Server"
					placeholder="imap.example.com"
					size={InputFieldSizes.small}
					type="url"
				/>
				<InputField
					defaultValue={outgoing.server.host}
					inline={true}
					label="SMTP Server"
					placeholder="smtp.example.com"
					size={InputFieldSizes.small}
					type="url"
				/>
			</View>
		);
	}
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
		margin: 5,
		gridColumn: "span 2",
	},
	fieldset: {
		// Workaround for chrome bug
		// https://bugs.chromium.org/p/chromium/issues/detail?id=375693
		display: "contents",
	},
});
