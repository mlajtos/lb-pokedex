import React, { useState, useEffect, useCallback } from "react";
import { withRouter } from "react-router-dom";

import NavigationPanel from "../NavigationPanel";
import Filter from "../Filter";
import List from "../List";
import ListItem from "../ListItem";
import Statusbar from "../Statusbar";
import DetailPanel from "../DetailPanel";
import Detail from "../Detail";
import Grid from "../Grid";
import EmptySelection from "../EmptySelection";

import { fetchPokemonList } from "../List/service";

import "./style.scss";

export default withRouter((props) => {
    const [pokemons, setPokemons] = useState([]);
    const [selected, setSelected] = useState(props.selected);
    const [filter, setFilter] = useState("");
    const [reference, setReference] = useState("");
    const [referenceData, setReferenceData] = useState(null);

    useEffect(() => {
        fetchPokemonList().then(setPokemons);
    }, []);

    useEffect(() => {
        props.history.push(`/${selected.join("+")}`);
    }, [selected]);

    const selectItem = useCallback(
        (item) => (
            selected.includes(item)
                ? setSelected(selected.filter(i => i !== item))
                : setSelected(selected.concat(item))
        )
    );

    const removeItem = useCallback(
        (item) => {
            setSelected(selected.filter(i => i !== item));
            if (reference === item) {
                selectReference(reference);
            }
        },
        [selected, reference]
    );

    const selectReference = useCallback(
        (name, data) => {
            if (reference === name) {
                setReference("");
                setReferenceData(null);
            } else {
                setReference(name);
                setReferenceData(data);
            }
        },
        [reference]
    );

    return (
        <>
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
                    ItemComponent={ListItem}
                    selected={selected}
                    onSelectItem={selectItem}
                />

                <Statusbar
                    selectedCount={selected.length}
                    totalCount={pokemons.length}
                />
            </NavigationPanel>

            <DetailPanel active={selected.length !== 0}>
                {
                    selected.length === 0
                        ? <EmptySelection />
                        : (
                            <Grid>
                                {
                                    selected.map(
                                        (pokemon) => (
                                            <Detail
                                                key={pokemon}
                                                pokemon={pokemon}
                                                onRemove={removeItem}
                                                onSelect={selectReference}
                                                active={reference === pokemon}
                                                reference={referenceData}
                                            />
                                        )
                                    )
                                }
                            </Grid>
                        )
                }
            </DetailPanel>
        </>
    );
});