import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import Pokemon from "./components/Pokemon";
import IndexPage from "./components/IndexPage";
import React, { useState, useEffect } from "react";
import "./App.css";
import sound from "./assets/1.mp3";
import { Howl, Howler } from "howler";
import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

// handles routing
function App() {

	useEffect(() => {
		const music = new Howl({
			src: [sound],
			volume: 0.5,
			onload: true,
			loop: true,
		});
		music.play();
	}, []);

	return (
		<div className="outer-container">
			<Router>
				<Switch>
					<Route path="/" exact component={IndexPage} />
					<Route path="/second-page" component={Pokemon} />
				</Switch>
			</Router>
			<Fab
			 onClick={() => {
				console.log("FAB");
			 }}
				style={{
					position: "fixed",
					bottom: "24px",
					right: "24px",
					zIndex: 2,
				}}
				color="primary"
				aria-label="add"
			>
				<AddIcon />
			</Fab>
		</div>
	);
}

export default App;
