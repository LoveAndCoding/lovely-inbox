import * as React from "react";
import { Link } from "react-router-dom";
import { IAccountProperties } from "src/common/account";

import Email from "../../../../common/email";
import { IServerConfig } from "../../../../common/server.config";
import { notify, request } from "../../../communication/ipc";
import HeartBeatLoadingIcon from "../../../communication/loading";
import { ButtonSizes } from "../../../forms/components/button";
import View from "../../../layout/components/view";
import { COLORS, css, StyleSheet } from "../../../styles";
import ActionPaneSmall from "../../common/components/action.pane.small";
import GuessNextButton from "../containers/guess.next.button";
import GuessServerSettings from "../containers/guess.settings";

export interface IServerSettingsProps {
	config: IServerConfig;
	email: Email;
}

interface IServerSettingsState {
	submitting: boolean;
}

export default class OnboardServerSettings extends React.Component<
	IServerSettingsProps,
	IServerSettingsState
> {
	constructor(props: IServerSettingsProps) {
		super(props);
		this.state = {
			submitting: false,
		};
	}

	protected handlePress = async (): Promise<void> => {
		this.setState({ submitting: true });
		let acct: IAccountProperties | void;
		try {
			acct = await request(
				// Don't timeout this request because we wait for user input
				Infinity,
				"/account/create",
				this.props.config,
				this.props.email,
			);
		} catch (reason) {
			console.error("Encountered an error while creating an account");
			console.error(reason);
		}
		if (!acct) {
			// If we didn't get an account back, we didn't create a new account
			// successfully, which means the user cancelled the creation.
			this.setState({ submitting: false });
			return;
		}

		notify("config.onboarding", true);
	};

	public render(): React.ReactElement {
		const { submitting } = this.state;

		return (
			<ActionPaneSmall>
				{submitting && (
					<div className={css(styles.overlay)}>
						<HeartBeatLoadingIcon
							alt="Logging you in"
							styles={[styles.overlayIcon]}
						/>
					</div>
				)}
				<GuessServerSettings />
				<View styles={[styles.buttonBar]}>
					<Link to="/" className={css(styles.backLink)}>
						<span className={css(styles.buttonText)}>Back</span>
					</Link>
					<GuessNextButton
						disabled={submitting}
						onPress={this.handlePress}
						size={ButtonSizes.large}
					>
						<span className={css(styles.buttonText)}>Login</span>
					</GuessNextButton>
				</View>
			</ActionPaneSmall>
		);
	}
}

const styles = StyleSheet.create({
	backLink: {
		alignItems: "baseline",
		border: "none",
		borderRadius: 4,
		color: COLORS.white,
		cursor: "pointer",
		display: "flex",
		flexDirection: "row",
		fontSize: 20,
		justifyContent: "center",
		marginRight: 20,
		minWidth: 160,
		padding: "14px 20px",
		textDecoration: "none",
		width: "auto",

		"&:active, &:focus, &:hover": {
			backgroundColor: COLORS.black20,
			textDecoration: "none",
		},
	},
	buttonBar: {
		flexDirection: "row",
		justifyContent: "space-between",
		margin: "40px 20px",
	},
	buttonIcon: {
		// The FA Icon seems to look better centered rather than at baseline
		alignSelf: "center",

		"button:active > &, button:focus > &, button:hover > &": {
			animationDirection: "alternate",
			animationDuration: "0.3s",
			animationFillMode: "forwards",
			animationIterationCount: "3",
			animationName: [
				{
					from: {
						transform: "translate(0px, 0px)",
					},
					to: {
						transform: "translate(6px, 0px)",
					},
				},
			],
		},
	},
	buttonText: {
		flex: 1,
		textAlign: "center",
	},

	overlay: {
		alignItems: "center",
		backgroundColor: "rgba(0, 0, 0, 0.7)",
		bottom: 0,
		display: "grid",
		justifyContent: "center",
		left: 0,
		position: "absolute",
		right: 0,
		top: 0,
		zIndex: 100000,
	},
	overlayIcon: {
		display: "block",
		height: "auto",
		width: 85,
	},
});
