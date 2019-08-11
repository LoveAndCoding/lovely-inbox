import * as React from "react";
import { HashRouter as Router, Link, Route } from "react-router-dom";

import View from "../layout/components/view";
import { css, StyleSheet } from "../styles";
import InitialOnboardScreen from "./initial.screen";

function Index() {
	return <h2>Home</h2>;
}

function About() {
	return <h2>About</h2>;
}

function Users() {
	return <h2>Users</h2>;
}

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
