import React, { useEffect } from "react";
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
import { useAppState } from "./state";

const App = (props) => {
    const [
        {
            data,
            selected,
            filter,
            reference,
            referenceData
        },
        {
            selectItem,
            removeItem,
            selectReference,
            deselectReference,
            setFilter,
            setSelected,
            setData
        }
    ] = useAppState();

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchPokemonList();
            setData(data);
        };

        fetchData();
    }, []);

    useEffect(() => setSelected(props.selected), []);

    useEffect(() => {
        props.history.replace(`/${selected.join("+")}`);
    }, [selected]);

    return (
        <>
            <NavigationPanel>
                <Filter
                    value={filter}
                    setValue={setFilter}
                />

                <List
                    data={
                        data.filter(
                            (pokemon) => pokemon.name.includes(filter)
                        )
                    }
                    ItemComponent={ListItem}
                    selected={selected}
                    onSelectItem={selectItem}
                />

                <Statusbar
                    selectedCount={selected.length}
                    totalCount={data.length}
                />
            </NavigationPanel>

            <DetailPanel
                active={selected.length !== 0}
                onClick={deselectReference}
            >
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
};

export default withRouter(App);