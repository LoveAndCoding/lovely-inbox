import { faArrowRight } from "@fortawesome/pro-light-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as React from "react";

import { ButtonColors, ButtonSizes } from "../../../forms/components/button";
import { InputFieldSizes } from "../../../forms/components/email.text.field";
import Spring from "../../../layout/components/spring";
import View, { ViewTags } from "../../../layout/components/view";
import { COLORS, css, StyleSheet } from "../../../styles";
import ActionPaneSmall from "../../common/components/action.pane.small";
import EmailInputField from "../containers/email.input";
import EmailNextButton from "../containers/email.next.button";

import LogoUrl from "../../../../../images/icon.dark.svg";

export default class OnboardAccountAdd extends React.Component {
	constructor(props) {
		super(props);

		this.handleSubmit = this.handleSubmit.bind(this);
	}

	public render() {
		return (
			<ActionPaneSmall>
				<h1 className={css(styles.header)}>
					<img
						src={LogoUrl}
						alt=""
						className={css(styles.logoImage)}
					/>
					Lovely Inbox
				</h1>

				<View
					tag={ViewTags.form}
					styles={[styles.form]}
					onSubmit={this.handleSubmit}
				>
					<EmailInputField
						size={InputFieldSizes.large}
						required={true}
					/>
					<View styles={[styles.buttonBar]}>
						<Spring />
						<EmailNextButton size={ButtonSizes.large} type="submit">
							<span className={css(styles.buttonText)}>Next</span>
							<FontAwesomeIcon
								icon={faArrowRight}
								className={css(styles.buttonIcon)}
							/>
						</EmailNextButton>
					</View>
				</View>
			</ActionPaneSmall>
		);
	}

	private handleSubmit(event: Event) {
		event.preventDefault();
		if (this.props.onNext) {
			this.props.onNext();
		}
	}
}

const styles = StyleSheet.create({
	buttonBar: {
		flexDirection: "row",
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
	},
	form: {
		margin: 20,
	},
	header: {
		"-webkit-user-select": "none",
		fontSize: 48,
		fontWeight: 200,
		margin: "auto",
	},
	logoImage: {
		display: "block",
		height: 200,
		marginBottom: -30,
		marginLeft: "auto",
		marginRight: "auto",
		pointerEvents: "none",
		width: 200,
	},
});
