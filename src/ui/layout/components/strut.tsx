import * as React from "react";

import { StyleSheet } from "../../styles";
import View from "./view";

export enum StrutSizes {
	xxsmall = 4,
	xsmall = 6,
	small = 10,
	medium = 14,
	large = 20,
	xlarge = 26,
	xxlarge = 32,
}

export default class Strut extends React.Component<{
	size: number;
}> {
	private static defaultProps = {
		size: StrutSizes.medium,
	};

	public render(): React.ReactElement {
		return (
			<View styles={[styles(this.props.size).strut]} aria-hidden={true} />
		);
	}
}

const styles = (size: number) =>
	StyleSheet.create({
		strut: {
			flexBasis: size,
		},
	});
