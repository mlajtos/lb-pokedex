import React from "react";

import "./style.scss";

export default ({ data, Delegate }) => (
    <ol>
        {
            data
                .map(
                    (pokemon) => (
                        <Delegate
                            key={pokemon.name}
                            pokemon={pokemon.name}
                        />
                    )
                )
        }
    </ol>
);