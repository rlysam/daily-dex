import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import PokemonPage from "./sample";
import Pokemon from "./components/Pokemon";
import SilhouettePage from "./components/GuessPage";
import "./App.css";

function App() {
	let name = "pikachu"; // ! sample remove after

	const today = new Date();

	const day = today.getDate();
	const month = today.getMonth() + 1;
	const year = today.getFullYear();

	const dateString = `${day}-${month}-${year}`;

	//Generate a Seed from current date to ensure that Pokemons are unique everyday
	function hashCode(str) {
		let hash = 0;
		for (let i = 0; i < str.length; i++) {
			hash = (hash << 5) - hash + str.charCodeAt(i);
			hash |= 0;
		}
		return hash;
	}

	const pokemonIndex = Math.abs(hashCode(dateString)) % 493; // There are currently 898 Pokemon in the PokeAPI

	const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonIndex}/`;

	const [pokemonImageUrl, setPokemonImageUrl] = useState("");

	const getPokemonImageUrl = async () => {
		try {
			const response = await axios.get(pokemonUrl);
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
			.get(pokemonUrl)
			.then((response) => {
				setPokemonData(response.data);
			})
			.catch((error) => {
				console.log(error);
			});
	}, [name]);

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
