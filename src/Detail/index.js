import React, { useEffect, useState } from "react";

import "./style.scss";

export default ({ pokemon }) => {
    const [pokemonDetail, setPokemonDetail] = useState(null);

    useEffect(() => {
        const fetchPokemonDetail = async (pokemon) => {
            if (pokemon) {
                const result = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}/`);
                const data = result.json();
                return data;
            }
        };

        fetchPokemonDetail(pokemon).then(setPokemonDetail);
    }, [pokemon]);

    return (
        pokemonDetail
            ? <img className="Image" src={pokemonDetail.sprites.front_default} />
            : null
    );
};