import React, { useState, useEffect, useMemo } from "react";
import { HashRouter as Router, Route } from "react-router-dom";

import Filter from "../Filter";
import Detail from "../Detail";
import ListItem from "../ListItem";
import List from "../List";

import "./style.scss";

export default () => {
    const [pokemons, setPokemons] = useState([]);
    const [filter, setFilter] = useState("");

    useEffect(() => {
        const fetchPokemonList = async () => {
            const result = await fetch("https://pokeapi.co/api/v2/pokemon/?limit=807");
            const data = await result.json();
            setPokemons(data.results);
        };

        fetchPokemonList();
    }, []);

    return (
        <Router>
            <Filter
                value={filter}
                setValue={setFilter}
            />

            <Route
                path="/:pokemonId"
                component={
                    (props) => <Detail pokemon={props.match.params.pokemonId} />
                }
            />

            <List
                data={
                    pokemons.filter(
                        (pokemon) => pokemon.name.includes(filter)
                    )
                }
                Delegate={ListItem}
            />
        </Router>
    );
};