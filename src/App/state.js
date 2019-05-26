import { useReducer } from "react";

const reducers = {
    init: () => ({
        pokemons: [],
        selected: [],
        filter: "",
        reference: "",
        referenceData: null,
    }),
    setFilter: (state, [filter]) => ({
        ...state,
        filter
    }),
    setData: (state, [data]) => ({
        ...state,
        pokemons: data
    }),
    setSelected: (state, [selected]) => ({
        ...state,
        selected
    }),
    selectReference: (state, [reference, referenceData]) => ({
        ...state,
        ...(
            (state.reference === reference)
                ? { // same as deselectReference
                    reference: "",
                    referenceData: null
                }
                : {
                    reference,
                    referenceData
                }
        )
    }),
    deselectReference: (state) => ({
        ...state,
        reference: "",
        referenceData: null
    }),
    selectItem: (state, [item]) => ({
        ...state,
        selected: (
            state.selected.includes(item)
                ? state.selected.filter(i => i !== item)
                : state.selected.concat(item)
        )
    }),
    removeItem: (state, [item]) => ({
        ...state,
        selected: state.selected.filter(i => i !== item),
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

const useActions = (reducers, dispatch) => {
    const actionMap = (
        Object.keys(reducers)
            .map(
                r => ({
                    [r]: (...args) => dispatch({ type: r, payload: args })
                })
            )
    );
    const stateActions = Object.assign({}, ...actionMap);

    return stateActions;
};

export const useAppState = () => {
    const [state, dispatch] = useReducer(stateReducer, undefined, reducers.init);
    const actions = useActions(reducers, dispatch);

    return [state, actions];
};