import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as React from "react";
import BalanceText from "react-balance-text";

import Email from "../../../../common/email";
import HeartBeatLoadingIcon from "../../../communication/loading";
import LovelyButton, {
	ButtonColors,
	ButtonSizes,
} from "../../../forms/components/button";
import View, { ViewTags } from "../../../layout/components/view";
import { css, StyleSheet } from "../../../styles";
import { CONFIG_SOURCE, IServerConfig } from "../../store/server-config/types";
import ServerSettingsForm from "../containers/server.settings.form";

export interface IGuessSettingsStateProps {
	config: IServerConfig;
	email: Email;
	error: Error;
	loading: boolean;
}

export interface IGuessSettingsDispatchProps {
	guessConfig: (email: Email) => void;
}

export type IGuessServerSettingsProps = IGuessSettingsStateProps &
	IGuessSettingsDispatchProps;

interface IGuessserverSettingsState {
	editDetails: void | boolean;
}

export default class GuessServerSettings extends React.Component<
	IGuessServerSettingsProps,
	IGuessserverSettingsState
> {
	constructor(props: IGuessServerSettingsProps) {
		super(props);
		this.state = { editDetails: null };
	}

	public componentDidMount(): void {
		this.props.guessConfig(this.props.email);
	}

	public render(): React.ReactElement {
		if (this.props.loading || (!this.props.error && !this.props.config)) {
			// Our empty and loading states should show the message we're
			// finding stuff
			return (
				<View styles={[styles.loadingContainer]}>
					<HeartBeatLoadingIcon styles={[styles.workingIcon]} />
					<p className={css(styles.loadingText)}>
						Finding that email&hellip;
					</p>
				</View>
			);
		} else {
			let headerText = "Alright";
			let infoText = "We need a bit more info to get you logged in";
			let openDetails = true;

			// See if we can get more detailed text
			if (this.props.error) {
				headerText = "Uh Oh!";
				infoText = "Uh Oh! We hit an unknown error!";
			} else if (
				this.props.config.source === CONFIG_SOURCE.Known_DNS ||
				this.props.config.source === CONFIG_SOURCE.Known_Domain
			) {
				headerText = "Perfect";
				infoText = "We know just where to login at";
				openDetails = false;
			} else if (this.props.config.source === CONFIG_SOURCE.Guess) {
				headerText = "Great";
				infoText =
					"We believe we found all the right info to log you in";
				openDetails = false;
			}

			if (typeof this.state.editDetails === "boolean") {
				openDetails = this.state.editDetails;
			}

			return (
				<View styles={[styles.foundContainer]}>
					<h2 className={css(styles.foundHeader)}>{headerText}</h2>
					<BalanceText className={css(styles.foundText)}>
						{infoText}
					</BalanceText>
					<View tag={ViewTags.section}>
						<div className={css(styles.buttonRow)}>
							<LovelyButton
								color={ButtonColors.transparentLight}
								onPress={this.toggleShowDetails}
								size={ButtonSizes.xsmall}
							>
								Edit Settings
								<FontAwesomeIcon
									className={css(styles.expandDetailIcon)}
									icon={openDetails ? faCaretUp : faCaretDown}
								/>
							</LovelyButton>
						</div>
						{openDetails ? <ServerSettingsForm /> : ""}
					</View>
				</View>
			);
		}
	}

	private toggleShowDetails = (): void => {
		this.setState({
			editDetails: !this.state.editDetails,
		});
	};
}

const styles = StyleSheet.create({
	buttonRow: {
		marginBottom: 15,
	},
	expandDetailIcon: {
		alignSelf: "baseline",
		marginLeft: 4,
	},
	foundContainer: {
		margin: "0px 0px auto",
		padding: 30,
	},
	foundHeader: {
		fontSize: "48px",
		fontWeight: 300,
		marginBottom: 5,
	},
	foundText: {
		fontSize: "16px",
		fontWeight: 300,
		lineHeight: 1.4,
		marginBottom: 15,
		marginLeft: 15,
		opacity: 0.8,
	},
	loadingContainer: {
		margin: "auto",
	},
	loadingText: {
		fontSize: 20,
	},
	workingIcon: {
		display: "block",
		height: 200,
		margin: "auto",
		width: 200,
	},
});
