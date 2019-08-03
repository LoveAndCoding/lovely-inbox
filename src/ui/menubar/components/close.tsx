import * as React from "react";

import MenuStyles from "./styles";

interface ICloseProps {
	disabled: boolean;
	onLightBackground: boolean;
}

export default class WindowClose extends React.Component<ICloseProps> {
	public render() {
		return (
			<button
				className={
					this.props.onLightBackground
						? MenuStyles.buttonDark
						: MenuStyles.button
				}
				title="Close Window"
			>
				X
			</button>
		);
	}
}
