import React, { useState, useEffect } from "react";
import axios from "axios";

const Pokemon = ({ name }) => {
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

const FirstHalf = () => {
	return ( 
<div className="FirstHalf">

      {pokemonData ? (
				<div>
					hello i am {pokemonData.name}
				</div>
			)
			: (
				<p>Loading...</p>
			)
		}
</div>
	 );
}
 
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





          {/* <p>Height: {pokemonData.height}</p>
          <p>Weight: {pokemonData.weight}</p>
          <p>Abilities:</p>
          <ul>
            {pokemonData.abilities.map((ability, index) => (
              <li key={index}>{ability.ability.name}</li>
            ))}
          </ul> */}
<FirstHalf/>


        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Pokemon;
