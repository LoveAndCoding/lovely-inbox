import * as React from "react";
import { Provider } from "react-redux";
import { MemoryRouter as Router, Route } from "react-router-dom";

import View from "../layout/components/view";
import { css, StyleSheet } from "../styles";
import InitialOnboardScreen from "./account/components/initial.screen";
import ServerSettingsScreen from "./server-setup/components/settings.screen";
import configureStore from "./store";

const store = configureStore();

function AppRouter() {
	return (
		<Router>
			<Provider store={store}>
				<View styles={[styles.page]}>
					<Route path="/" exact component={InitialOnboardScreen} />
					<Route
						path="/server-settings"
						exact
						component={ServerSettingsScreen}
					/>
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
