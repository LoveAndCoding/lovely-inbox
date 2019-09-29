import * as React from "react";
import { Provider } from "react-redux";
import { HashRouter as Router, Link, Route } from "react-router-dom";
import { createStore } from "redux";

import View from "../layout/components/view";
import { css, StyleSheet } from "../styles";
import InitialOnboardScreen from "./initial.screen";
import onboardingStore from "./reducers";

const store = createStore(onboardingStore);

function AppRouter() {
	return (
		<Router>
			<Provider store={store}>
				<View styles={[styles.page]}>
					<Route path="/" exact component={InitialOnboardScreen} />
				</View>
			</Provider>
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
