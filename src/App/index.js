import React, { useState, useEffect } from "react";

import Filter from "../Filter";

import "./style.scss";
import PokemonDetail from "../PokemonDetail";

export default () => {
    const [pokemons, setPokemons] = useState([]);
    const [filter, setFilter] = useState("");
    const [pokemonDetailId, setPokemonDetailId] = useState("");
    const [pokemonDetail, setPokemonDetail] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchPokemonList = async () => {
            const result = await fetch("https://pokeapi.co/api/v2/pokemon/?limit=964");
            const data = await result.json();
            setPokemons(data.results);
        };

        fetchPokemonList();
    }, []);

    useEffect(() => {
        const fetchPokemonDetail = async (pokemonName) => {
            if (pokemonName) {
                const result = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}/`);
                const data = await result.json();
                setPokemonDetail(data);
                setLoading(false);
            }
        };

        fetchPokemonDetail(pokemonDetailId);
    }, [pokemonDetailId]);

    const handleClick = (pokemon, e) => {
        e.preventDefault();
        setLoading(true);
        setPokemonDetailId(pokemon);
    };

    return (
        <>
            <Filter value={filter} setValue={setFilter} />

            <div>
                {
                    loading
                        ? "Loading..."
                        : <PokemonDetail data={pokemonDetail} />
                    
                }
            </div>
                
            <ol>
                {
                    pokemons
                        .filter(
                            (pokemon) => pokemon.name.includes(filter)
                        )
                        .map(
                            (pokemon) => (
                                <li key={pokemon.name}>
                                    <a href={`/${pokemon.name}`} onClick={handleClick.bind(null, pokemon.name)}>
                                        {pokemon.name}
                                    </a>
                                </li>
                            )
                        )
                }
            </ol>
        </>
    );
};