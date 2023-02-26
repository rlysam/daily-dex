import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Typography, CircularProgress, List, ListItem, ListItemText } from "@mui/material";

const Pokemon = ({ name }) => {
  const [pokemonData, setPokemonData] = useState(null);
  const [spriteBackground, setSpriteBackground] = useState("");

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

  useEffect(() => {
    if (pokemonData) {
      const spriteUrl = pokemonData.sprites.front_default;
      setSpriteBackground(`url(${spriteUrl}) no-repeat center center/contain`);
    }
  }, [pokemonData]);

  return (
    <Box sx={{ backgroundColor: "#f5f5f5", padding: "2rem" }}>
      {pokemonData ? (
        <Box sx={{ backgroundColor: "#fff", padding: "2rem" }}>
          <Typography variant="h4">{pokemonData.name}</Typography>
          <Box sx={{
            width: "200px",
            height: "200px",
            margin: "1rem auto",
            backgroundImage: spriteBackground,
            backgroundBlendMode: "screen",
            backgroundPosition: "center",
            backgroundSize: "contain",
            filter: "brightness(120%) saturate(100%)",
          }} />
          <Typography variant="h6" sx={{ mt: 2 }}>Height: {pokemonData.height}</Typography>
          <Typography variant="h6">Weight: {pokemonData.weight}</Typography>
          <Typography variant="h6" sx={{ mt: 2 }}>Abilities:</Typography>
          <List sx={{ mt: 1 }}>
            {pokemonData.abilities.map((ability, index) => (
              <ListItem key={index}>
                <ListItemText primary={ability.ability.name} />
              </ListItem>
            ))}
          </List>
        </Box>
      ) : (
        <CircularProgress sx={{ color: "#3f51b5" }} />
      )}
    </Box>
  );
};

export default Pokemon;
