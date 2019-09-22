import * as React from "react";
import { HashRouter as Router, Link, Route } from "react-router-dom";

import View from "../layout/components/view";
import { css, StyleSheet } from "../styles";
import InitialOnboardScreen from "./initial.screen";

function AppRouter() {
	return (
		<Router>
			<View styles={[styles.page]}>
				<Route path="/" exact component={InitialOnboardScreen} />
			</View>
		</Router>
	);
}

export default AppRouter;

const styles = StyleSheet.create({
	page: {
		height: "100vh",
		overflow: "hidden",
	},
});
