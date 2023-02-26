import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import Pokemon from "./components/Pokemon";
import IndexPage from "./components/IndexPage";
import "./App.css";

// handles routing
function App() {
	return (
		<Router>
			<Switch>
				<Route path="/" exact component={IndexPage} />
				<Route path="/second-page" component={Pokemon} />
			</Switch>
		</Router>
	);
}

export default App;
