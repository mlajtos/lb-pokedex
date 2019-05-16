export const fetchPokemonList = async () => {
    const result = await fetch("https://pokeapi.co/api/v2/pokemon/?limit=802");
    const data = await result.json();
    return data.results;
};

import mockData from "./mockData.json";

export const fetchPokemonList2 = async () => mockData.results;