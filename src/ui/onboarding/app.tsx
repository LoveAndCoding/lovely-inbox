import * as React from "react";
import { HashRouter as Router, Link, Route } from "react-router-dom";

import { css, StyleSheet } from "../styles";
import OnboardMenuBar from "./components/menubar";

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
			<div className={css(styles.page)}>
				<OnboardMenuBar />
				<nav>
					<ul>
						<li>
							<Link to="/">Home</Link>
						</li>
						<li>
							<Link to="/about/">About</Link>
						</li>
						<li>
							<Link to="/users/">Users</Link>
						</li>
					</ul>
				</nav>

				<Route path="/" exact component={Index} />
				<Route path="/about/" component={About} />
				<Route path="/users/" component={Users} />
			</div>
		</Router>
	);
}

export default AppRouter;

const styles = StyleSheet.create({
	page: {
		height: "100vh",
	},
});
