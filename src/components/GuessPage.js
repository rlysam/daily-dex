import React, { useState } from "react";
import "./../App.css";

const SilhouettePage = ({ pokemonName, imageUrl }) => {
	const [guess, setGuess] = useState("");
	const [isCorrect, setIsCorrect] = useState(false);

	const handleInputChange = (event) => {
		setGuess(event.target.value.toLowerCase());
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		if (guess === pokemonName.toLowerCase()) {
			setIsCorrect(true);
		}
	};

	return (
		<div className="silhouette-page">
			{!isCorrect && (
				<div className="silhouette-container">
					<form onSubmit={handleSubmit}>
						<label htmlFor="guess-input">Who's that Pokemon?</label>

						<img
							src={imageUrl}
							alt={pokemonName}
							style={{ filter: "contrast(0%) brightness(0%)" }}
						/>

						<input
							id="guess-input"
							type="text"
							value={guess}
							onChange={handleInputChange}
						/>
						<button type="submit">Guess</button>
					</form>
				</div>
			)}
			{isCorrect && (
				<div className="pokemon-container">
					<h2>{pokemonName}</h2>
					<img
						src={imageUrl}
						alt={pokemonName}
						// style={{ filter: "contrast(0%) brightness(10%)" }}
					/>
					<p>Congratulations! You guessed correctly.</p>
				</div>
			)}
		</div>
	);
};

export default SilhouettePage;
