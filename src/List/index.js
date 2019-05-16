import React from "react";

import "./style.scss";

const onKeyDown = (e) => {
    //e.preventDefault();
};

export default ({ data, selected, Delegate }) => (
    <ol className="List" tabIndex="0" onKeyDown={onKeyDown}>
        {
            data
                .map(
                    (pokemon) => (
                        <Delegate
                            key={pokemon.name}
                            pokemon={pokemon.name}
                            selected={selected === pokemon.name}
                        />
                    )
                )
        }
    </ol>
);