import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import Pokemon from "./components/Pokemon";
import LandingPage from "./components/LandingPage";
import React, { useState, useEffect } from "react";
import "./App.css";
import sound from "./assets/1.mp3";
import { Howl, Howler } from "howler";
import { Fab } from "@mui/material";
import IconVolumeOff from "@mui/icons-material/VolumeOff";

// handles routing
function App() {
	const music = new Howl({
		src: [sound],
		volume: 0.5,
		onload: true,
		loop: true,
	});

	useEffect(() => {
		// music.play();
	}, []);

	function stopMusic() {
		music.stop();
	}

	return (
		<div className="outer-container">
			<Router>
				<Switch>
					<Route path="/" exact component={LandingPage} />
					<Route path="/second-page" component={Pokemon} />
				</Switch>
			</Router>
			<Fab
				onClick={() => {
					stopMusic();
				}}
				//float to bottom-right
				style={{
					position: "fixed",
					bottom: "24px",
					right: "24px",
					zIndex: 2,
				}}
				color="primary"
				aria-label="add"
			>
				<IconVolumeOff />
			</Fab>
		</div>
	);
}

export default App;
