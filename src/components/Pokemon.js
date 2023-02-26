import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import axios from "axios";

const Pokemon = (props) => {
	const { pokemonData } = props.location.state;

	// const FirstHalf = () => {
	// 	return (
	// <div className="FirstHalf">

	//       {pokemonData ? (
	// 				<div>
	// 					hello i am {pokemonData.name}
	// 				</div>
	// 			)
	// 			: (
	// 				<p>Loading...</p>
	// 			)
	// 		}
	// </div>
	// 	 );
	// }

	return (
		<div>
			{pokemonData ? (
				<div>
					{/* <h2>{pokemonData.name}</h2> */}
					{/* <img
            src={pokemonData.sprites.front_default}
            alt={pokemonData.name}
            style={{ height: "100vh" }}
          /> */}
					<img
						src={pokemonData.sprites.front_default}
						alt={pokemonData.name}
						style={{ heigth: "100%", width: "auto" }}
					/>
					<h1>{pokemonData.name}</h1>

					{/* <p>Height: {pokemonData.height}</p>
          <p>Weight: {pokemonData.weight}</p>
          <p>Abilities:</p>
          <ul>
            {pokemonData.abilities.map((ability, index) => (
              <li key={index}>{ability.ability.name}</li>
            ))}
          </ul> */}
					{/* <FirstHalf /> */}
				</div>
			) : (
				<p>Loading...</p>
			)}
		</div>
	);
};

export default Pokemon;
