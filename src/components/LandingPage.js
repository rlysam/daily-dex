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
import { Autocomplete, Stack, Container, Box, Grid } from "@mui/material";
import { maxHeight } from "@mui/system";

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
	let allNames = [];

	const fetchPokemonNames = async () => {
		const response = await axios.get(
			"https://pokeapi.co/api/v2/pokemon?limit=493"
		);
		const names = response.data.results.map((pokemon) => pokemon.name);
		setPokemonNames(names);
		allNames = pokemonNames;
	};

	useEffect(() => {
		fetchPokemonNames();
	}, []);

	return pokemonData && pokemonImageUrl ? (
		<>
			<Container
				sx={{
					display: "flex",
					height: "100vh",
					// width: "100vw",
					backgroundImage: `url(${pokemonImageUrl})`,
					backgroundSize: "100%",
					backgroundPosition: "center",

					backgroundRepeat: "no-repeat",
					position: "relative",
					maskImage: `url(${pokemonImageUrl})`,
					maskSize: "cover",
					maskPosition: "center",

					flexDirection: "column",
					minHeight: "100vh",
					// filter: "contrast(0%) brightness(10%)",
				}}
			>
				<div
					style={{
						content: '""',
						position: "absolute",
						top: "0",
						left: "0",
						width: "100%",
						height: "100%",
						backgroundColor: "black",
						opacity: "1",
						// filter: "contrast(0%) brightness(10%)",
					}}
				/>
				<Box sx={{ flex: 1 }} />
			</Container>

				<Stack
					paddingBottom="8px"
					justifyContent={"center"}
					alignItems="center"
				>
					<Typography variant="h2" color="initial">
						Gawing Kagaya nung FAB
						<br />
						Who's That Pokémon?
					</Typography>
					<Autocomplete
						disablePortal
						options={pokemonNames}
						autoFocus={true}
						value={guess}
						onChange={handleInputChange}
						onSelect={handleInputChange}
						type={"text"}
						clearOnBlur={false}
						freeSolo={true}
						renderInput={(params) => <TextField {...params} label="Answer" />}
					/>

					<Button
						variant="contained"
						size="large"
						color="primary"
						type="submit"
						onClick={handleSubmit}
					>
						Submit
					</Button>
				</Stack>
		</>
	) : (
		<div>
			<Typography variant="h2" color="initial">
				Loading...
			</Typography>
		</div>
	);
};

export default LandingPage;
