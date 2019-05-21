import React from "react";

import "./style.scss";

export default ({ data, selected, ItemComponent, onSelectItem }) => (
    <ol className="List">
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