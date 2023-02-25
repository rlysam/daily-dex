import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "@mui/material/Button";

function App() {
	const [pokemonImageUrl, setPokemonImageUrl] = useState("");

	const getPokemonImageUrl = async () => {
		try {
			const response = await axios.get(
				"https://pokeapi.co/api/v2/pokemon/" +
					Math.floor(Math.random() * 898) +
					1
			);
			const pokemon = response.data;
			setPokemonImageUrl(pokemon.sprites.front_default);
		} catch (error) {
			console.error(error);
		}
	};
	useEffect(() => {
		getPokemonImageUrl();
	}, []);

	return (
		<div className="App">
			<p>{pokemonImageUrl}</p>
			<Button variant="contained">Hello World</Button>
			<img
				className="picture"
				src={
					"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/493.png"
				}
				alt="Pokemon"
			/>
		</div>
	);
}

export default App;
