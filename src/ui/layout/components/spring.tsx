import * as React from "react";

import { StyleSheet } from "../../styles";
import View from "./view";

export default class Spring extends React.Component {
	public render(): React.ReactElement {
		return <View styles={[styles.spring]} aria-hidden={true} />;
	}
}

const styles = StyleSheet.create({
	spring: {
		flexGrow: 1,
	},
});
