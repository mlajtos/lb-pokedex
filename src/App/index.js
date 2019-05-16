import React, { useState, useEffect, useMemo } from "react";
import { HashRouter as Router, Route } from "react-router-dom";

import Filter from "../Filter";
import Detail from "../Detail";
import ListItem from "../ListItem";
import List from "../List";
import Statusbar from "../Statusbar";
import Grid from "../Grid";

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

                <Route
                    path="/p/:ids"
                    component={
                        (props) => (
                            <div>
                                {props.match.params.ids.split("+").join(", ")}
                            </div>
                        )
                    }
                />

                <Route
                    path="/:pokemonId"
                    component={
                        (props) => (
                            <List
                                data={
                                    pokemons.filter(
                                        (pokemon) => pokemon.name.includes(filter)
                                    )
                                }
                                Delegate={ListItem}
                                selected={props.match.params.pokemonId}
                            />
                        )
                    }
                />

                <Statusbar
                    selectedCount={0}
                    totalCount={pokemons.length}
                />
            </NavigationPanel>

            <DetailPanel>
                {/* <Route
                    path="/:pokemonId"
                    component={
                        (props) => <Detail pokemon={props.match.params.pokemonId} />
                    }
                /> */}

                <Grid>
                    {
                        // ["pikachu", "pichu", "bulbasaur"].map(
                        pokemons.map(
                            (pokemon) => <Detail pokemon={pokemon.name} />
                        )
                    }
                </Grid>
            </DetailPanel>
        </Router>
    );
};