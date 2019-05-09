import React, { useState, useEffect, useMemo } from "react";
import { HashRouter as Router, Route } from "react-router-dom";

import Filter from "../Filter";
import Detail from "../Detail";
import ListItem from "../ListItem";
import List from "../List";

import NavigationPanel from "../NavigationPanel";
import DetailPanel from "../DetailPanel";

import { fetchPokemonList } from "../List/service";

import "./style.scss";

export default () => {
    const [pokemons, setPokemons] = useState([]);
    const [filter, setFilter] = useState("");

    useEffect(() => {
        fetchPokemonList().then(setPokemons);
    }, []);

    return (
        <Router>
            <NavigationPanel>
                <Filter
                    value={filter}
                    setValue={setFilter}
                />

                <List
                    data={
                        pokemons.filter(
                            (pokemon) => pokemon.name.includes(filter)
                        )
                    }
                    Delegate={ListItem}
                />

                <div className="StatusBar">
                    2 Selected<br />876 Total
                </div>
            </NavigationPanel>

            <DetailPanel>
                <Route
                    path="/:pokemonId"
                    component={
                        (props) => <Detail pokemon={props.match.params.pokemonId} />
                    }
                />
            </DetailPanel>
        </Router>
    );
};