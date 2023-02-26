import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import PokemonPage from "./sample";
import Pokemon from "./components/Pokemon";
import SilhouettePage from "./components/GuessPage";
import "./App.css";

function App() {
	const [pokemonImageUrl, setPokemonImageUrl] = useState("");

	let name = "pikachu";

	const getPokemonImageUrl = async () => {
		try {
			const response = await axios.get(
				// "https://pokeapi.co/api/v2/pokemon/" +
				// 	Math.floor(Math.random() * 898) +
				// 	1
`https://pokeapi.co/api/v2/pokemon/${name}`
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

	const [pokemonData, setPokemonData] = useState(null);

	useEffect(() => {
		axios
			.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
			.then((response) => {
				setPokemonData(response.data);
			})
			.catch((error) => {
				console.log(error);
			});
	}, [name]);

	// return (
	// 	<div className="App">
	// 		<p>{pokemonImageUrl}</p>
	// 		<Button variant="contained">Hello World</Button>
	// 		<img
	// 			className="picture"
	// 			src={
	// 				"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/493.png"
	// 			}
	// 			alt="Pokemon"
	// 		/>
	// 	</div>
	// );
	// return (<PokemonPage></PokemonPage>);

	return (
		//<Pokemon name={name}></Pokemon>

		pokemonData && pokemonImageUrl ? (
			<SilhouettePage
				pokemonName={pokemonData.name}
				imageUrl={pokemonData.sprites.front_default}
			></SilhouettePage>
		) : (
			<div>Loading...</div>
		)
	);
}

export default App;
