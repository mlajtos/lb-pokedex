export const fetchPokemonDetail = async (pokemon) => {
    if (pokemon) {
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}/`);
            if (response.status === 200) {
                const data = response.json();
                return data;
            } else {
                return null;
            }
        } catch (e) {
            return null;
        }
    }
};

import mockData from "./mockData.json";

export const fetchPokemonDetail2 = async (pokemon) => mockData;