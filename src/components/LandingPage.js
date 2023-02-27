//  ! how to make Nav Links
// <Link to={{ pathname: "/second-page", state: { pokemonData } }}>
// 	Go to Second Page
// </Link>

import React, { useState, useEffect } from "react";
import axios from "axios";
import {
	BrowserRouter as Router,
	Link,
	Route,
	Switch,
	useHistory,
} from "react-router-dom";
import "./../App.css";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { Autocomplete, Stack } from "@mui/material";

const LandingPage = () => {
	//TODO Other Data (see figma)
	const [pokemonName, setpokemonName] = useState();

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

	const history = useHistory();

	const pokemonIndex = Math.abs(hashCode(dateString)) % 493; // * 493 = last gen 4

	const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonIndex}/`;

	const [pokemonData, setPokemonData] = useState(null);
	const [pokemonImageUrl, setPokemonImageUrl] = useState("");

	useEffect(() => {
		axios
			.get(pokemonUrl)
			.then((response) => {
				setPokemonData(response.data);
				setpokemonName(pokemonData.name);
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

	useEffect(() => {
		if (isCorrect) {
			history.push("/second-page", { pokemonData });
		}
	}, [isCorrect]);

	// All Pokemon
	// Names only
	const [pokemonNames, setPokemonNames] = useState([]);
	let allNames = []

	const fetchPokemonNames = async () => {
		const response = await axios.get(
			"https://pokeapi.co/api/v2/pokemon?limit=493"
		);
		const names = response.data.results.map((pokemon) => pokemon.name);
		setPokemonNames(names);
		allNames=pokemonNames;
	};

	useEffect(() => {
		fetchPokemonNames();
	}, []);

	return pokemonData && pokemonImageUrl ? (
		<Stack
			spacing={4}
			direction="column"
			alignItems="center"
			justifyContent="center"
			style={{ minHeight: "100vh" }}
		>
			{!isCorrect && (
				<Stack>
					<Typography variant="h2" color="initial">
						Who's that Pokemon?
					</Typography>
					<img
						src={pokemonImageUrl}
						alt={pokemonName}
						style={{
							filter: "contrast(0%) brightness(10%)",
						}}
					/>
					<Autocomplete
						disablePortal
						options={pokemonNames}
						autoFocus={true}
						value={guess}
						onChange={handleInputChange}
						onSelect={handleInputChange}
						type={"text"}
						clearOnBlur={false}
						renderInput={(params) => <TextField {...params} label="Answer" />}
					/>
					{/* <TextField
						id="guess-input"
						label="Asnwer"
						type={"text"}
						value={guess}
						onChange={handleInputChange}
						autoFocus="true"
					/> */}
					<Button
						variant="contained"
						color="primary"
						type="submit"
						onClick={handleSubmit}
					>
						Submit
					</Button>
				</Stack>
			)}
			{isCorrect && (
				<div className="pokemon-container">
					<Typography variant="h2" color="initial">
						{pokemonName}
					</Typography>
					<img src={pokemonImageUrl} alt={pokemonName} />
					<Typography variant="h4" color="initial">
						Congratulations! You guessed correctly.
					</Typography>
				</div>
			)}
		</Stack>
	) : (
		// <div className="silhouette-page"> </div>
		<div>
			<Typography variant="h2" color="initial">
				Loading...
			</Typography>
		</div>
	);
};

export default LandingPage;
