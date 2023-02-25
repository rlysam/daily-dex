import React, { useState, useEffect } from "react";
import axios from "axios";

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
			hello
			<img src={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png" } alt="Pokemon" />
		</div>
	);
}

export default App;
