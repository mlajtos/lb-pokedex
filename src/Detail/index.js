import React, { useEffect, useState, useCallback, memo } from "react";

import Pokeball from "../Pokeball";
import AttentionSeeker from "../AttentionSeeker";
import Tilt from "../Tilt";
import Image from "../Image";
import Stats from "../Stats";

import "./style.scss";
import { fetchPokemonDetail } from "./service";

export default memo(({ pokemon, onRemove, onSelect, active, reference }) => {
    const [pokemonDetail, setPokemonDetail] = useState(null);

    useEffect(() => {
        fetchPokemonDetail(pokemon).then(setPokemonDetail);
    }, [pokemon]);

    const selectCallback = useCallback(
        (
            pokemonDetail
                ? onSelect.bind(null, pokemonDetail.name, pokemonDetail)
                : () => {}
        ),
        [pokemonDetail, onSelect]
    );

    const removeCallback = useCallback(
        (
            pokemonDetail
                ? onRemove.bind(null, pokemonDetail.name)
                : () => {}
        ),
        [pokemonDetail, onRemove]
    );

    if (pokemonDetail === null) {
        return (
            <AttentionSeeker>
                <div className="Detail">
                    <Pokeball />
                </div>
            </AttentionSeeker>
        );
    }

    return (
        <Tilt>
            <AttentionSeeker>
                <div
                    className={`Detail ${active ? "Detail__active" : ""}`}
                    onClick={selectCallback}
                >
                    <Image
                        className="Detail_image"
                        src={pokemonDetail.sprites.front_default}
                    />
                    <div className="Detail_name">
                        {pokemonDetail.name}
                    </div>

                    <Stats
                        data={pokemonDetail}
                        reference={reference}
                    />

                    <RemoveButton onClick={removeCallback} />
                </div>
            </AttentionSeeker>
        </Tilt>
    );
});

const RemoveButton = memo(
    ({ onClick }) => (
        <button
            className="Detail_removeButton"
            onClick={(e) => { e.stopPropagation(); onClick(); }}
            title="Remove"
        >
            ✕
        </button>
    )
);