import * as React from "react";

import Email from "../../../../common/email";
import HeartBeatLoadingIcon from "../../../communication/loading";
import View, { ViewTags } from "../../../layout/components/view";
import { COLORS, css, StyleSheet } from "../../../styles";
import { IServerConfig } from "../../store/server-config/types";
import { thunkGuessConfig } from "../thunks";

export interface IGuessServerSettingsProps {
	config: IServerConfig;
	email: Email;
	error: Error;
	loading: boolean;

	guessConfig: typeof thunkGuessConfig;
}

export default class GuessServerSettings extends React.Component<
	IGuessServerSettingsProps
> {
	public componentDidMount() {
		this.props.guessConfig(this.props.email);
	}

	public render() {
		if (this.props.loading) {
			return (
				<View styles={styles.container}>
					<HeartBeatLoadingIcon styles={styles.workingIcon} />
					<p className={css(styles.loadingText)}>
						Finding that email&hellip;
					</p>
				</View>
			);
		} else if (this.props.error) {
			return (
				<View styles={styles.container}>
					<p className={css(styles.loadingText)}>
						Uh Oh! We hit an unknown error!
					</p>
				</View>
			);
		} else if (this.props.config) {
			return (
				<View styles={styles.container}>
					<p className={css(styles.loadingText)}>
						We found all the information we need!
					</p>
				</View>
			);
		} else {
			return (
				<View styles={styles.container}>
					<p className={css(styles.loadingText)}>
						We may need some help finding the right info
					</p>
				</View>
			);
		}
	}
}

const styles = StyleSheet.create({
	container: {
		margin: "auto",
	},
	loadingText: {
		fontSize: "90%",
	},
	workingIcon: {
		display: "block",
		height: 200,
		margin: "auto",
		width: 200,
	},
});
