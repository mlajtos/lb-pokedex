export const fetchPokemonDetail = async (pokemon) => {
    if (pokemon) {
        const result = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}/`);
        const data = result.json();
        return data;
    }
};

import mockData from "./mockData.json";

export const fetchPokemonDetail2 = async (pokemon) => mockData;