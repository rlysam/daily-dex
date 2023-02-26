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

	const blackImage = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 300'%3E%3Crect width='300' height='300' fill='black'/%3E%3C/svg%3E`;

	return (
		<div className="silhouette-page">
			{!isCorrect && (
				<div className="silhouette-container">
					<div
						className="silhouette-image"
						style={{
							backgroundImage: `url(${blackImage}), url(${imageUrl})`,
						}}
					></div>
					<form onSubmit={handleSubmit}>
						<label htmlFor="guess-input">Who's that Pokemon?</label>

						<img
							src={imageUrl}
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
