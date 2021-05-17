import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as React from "react";

import { ButtonSizes, ButtonTypes } from "../../../forms/components/button";
import { InputFieldSizes } from "../../../forms/components/input.field";
import Spring from "../../../layout/components/spring";
import View, { ViewTags } from "../../../layout/components/view";
import { css, StyleSheet } from "../../../styles";
import ActionPaneSmall from "../../common/components/action.pane.small";
import EmailInputField from "../containers/email.input";
import EmailNextButton from "../containers/email.next.button";
import EmailNameField from "../containers/name.input";

import LogoUrl from "images/icon.dark.svg";

interface IOnboardAccountAddProps {
	onNext?: () => void;
}

export default class OnboardAccountAdd extends React.Component<IOnboardAccountAddProps> {
	constructor(props: IOnboardAccountAddProps) {
		super(props);
	}

	public render(): React.ReactElement {
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
					<EmailNameField
						label="Your Name"
						placeholder="Kairi Uchida"
						size={InputFieldSizes.large}
						required={false}
						type="text"
					/>
					<EmailInputField
						label="Email"
						placeholder="kairi@destiny.island"
						size={InputFieldSizes.large}
						required={true}
						type="email"
					/>
					<View styles={[styles.buttonBar]}>
						<Spring />
						<EmailNextButton
							size={ButtonSizes.large}
							type={ButtonTypes.submit}
						>
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

	private handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (this.props.onNext) {
			this.props.onNext();
		}
	};
}

const styles = StyleSheet.create({
	buttonBar: {
		flexDirection: "row",
		margin: "20px 0px",
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
		fontStyle: "italic",
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
