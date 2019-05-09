export const fetchPokemonList = async () => {
    const result = await fetch("https://pokeapi.co/api/v2/pokemon/?limit=807");
    const data = await result.json();
    return data.results;
};