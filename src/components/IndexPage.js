import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import "./../App.css";
import Button from "@mui/material/Button";

const IndexPage = () => {
	//TODO Other Data (see figma)
	let pokemonName;
	let imageUrl;

	// for getting pokemon data
	// * Date Seed
	const today = new Date();
	const day = today.getDate();
	const month = today.getMonth() + 1;
	const year = today.getFullYear();
	const dateString = `${day}-${month}-${year}`;
	// * Generate a Seed from current date to ensure that Pokemons are unique everyday
	function hashCode(str) {
		let hash = 0;
		for (let i = 0; i < str.length; i++) {
			hash = (hash << 5) - hash + str.charCodeAt(i);
			hash |= 0;
		}
		return hash;
	}

	const pokemonIndex = Math.abs(hashCode(dateString)) % 493; // * 493 = last gen 4

	const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonIndex}/`;

	const [pokemonData, setPokemonData] = useState(null);
	const [pokemonImageUrl, setPokemonImageUrl] = useState("");

	useEffect(() => {
		axios
			.get(pokemonUrl)
			.then((response) => {
				setPokemonData(response.data);
			})
			.catch((error) => {
				console.log(error);
			});
	});

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

	// * for guessing
	const [guess, setGuess] = useState("");
	const [isCorrect, setIsCorrect] = useState(false);

	// * for guessing
	const handleInputChange = (event) => {
		setGuess(event.target.value.toLowerCase());
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		if (guess === pokemonData.name.toLowerCase()) {
			setIsCorrect(true);
		}
	};

	return pokemonData && pokemonImageUrl ? (
		<div className="silhouette-page">
			{!isCorrect && (
				<div className="silhouette-container">
					<form onSubmit={handleSubmit}>
						<label htmlFor="guess-input">Who's that Pokemon?</label>

						<img
							src={pokemonImageUrl}
							alt={pokemonName}
							style={{ filter: "contrast(0%) brightness(10%)" }}
						/>
						<input
							id="guess-input"
							type="text"
							value={guess}
							onChange={handleInputChange}
						/>
						<button type="submit">Guess</button>
					</form>

					<Link to={{ pathname: "/second-page", state: { pokemonData } }}>
						Go to Second Page
					</Link>
				</div>
			)}
			{isCorrect && (
				<div className="pokemon-container">
					<h2>{pokemonName}</h2>
					<img src={pokemonImageUrl} alt={pokemonName} />
					<p>Congratulations! You guessed correctly.</p>
				</div>
			)}
		</div>
	) : (
		<div>Loading...</div>
	);
};

export default IndexPage;
