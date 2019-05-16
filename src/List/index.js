import React from "react";

import "./style.scss";

const onKeyDown = (e) => {
    //e.preventDefault();
};

export default ({ data, selected, ItemComponent, onSelectItem }) => (
    <ol className="List" tabIndex="0" onKeyDown={onKeyDown}>
        {
            data
                .map(
                    (pokemon) => (
                        <ItemComponent
                            key={pokemon.name}
                            pokemon={pokemon.name}
                            selected={selected.includes(pokemon.name)}
                            onSelect={onSelectItem}
                        />
                    )
                )
        }
    </ol>
);