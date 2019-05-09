import React, { useEffect, useState } from "react";

export default ({ pokemon }) => {
    const [pokemonDetail, setPokemonDetail] = useState(null);

    useEffect(() => {
        const fetchPokemonDetail = async (pokemon) => {
            if (pokemon) {
                const result = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}/`);
                const data = await result.json();
                setPokemonDetail(data);
            }
        };

        fetchPokemonDetail(pokemon);
    }, [pokemon]);

    return (
        pokemonDetail
            ? <img src={pokemonDetail.sprites.front_default} />
            : null
    );
};