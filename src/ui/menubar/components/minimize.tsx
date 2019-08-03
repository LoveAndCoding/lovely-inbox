import * as React from "react";

import MenuStyles from "./styles";

interface IMinimizeProps {
	disabled: boolean;
	onLightBackground: boolean;
}

export default class WindowMinimize extends React.Component<IMinimizeProps> {
	public render() {
		return (
			<button
				className={
					this.props.onLightBackground
						? MenuStyles.buttonDark
						: MenuStyles.button
				}
				title="Minimize Window"
			>
				_
			</button>
		);
	}
}
