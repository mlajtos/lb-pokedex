import { useReducer } from "react";

const initialState = {
    pokemons: [],
    selected: [],
    filter: "",
    reference: "",
    referenceData: null,
};

const reducers = {
    setFilter: (state, filter) => ({
        ...state,
        filter
    }),
    setData: (state, data) => ({
        ...state,
        pokemons: data
    }),
    setReference: (state, reference) => ({
        ...state,
        reference
    }),
    setReferenceData: (state, referenceData) => ({
        ...state,
        referenceData
    }),
    setSelected: (state, selected) => ({
        ...state,
        selected
    })
};

const stateReducer = (state, action) => {
    console.log(state, action);

    const reducer = reducers[action.type];

    if (reducer) {
        return reducer(state, action.payload);
    } else {
        console.error(`Action "${action.type}" not associated with any reducer.`);
        return null;
    }
};

export const useAppState = () => {
    return useReducer(stateReducer, initialState);
};