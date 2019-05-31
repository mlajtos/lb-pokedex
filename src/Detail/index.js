import React, { useEffect, useState, useCallback, memo } from "react";

import Pokeball from "../Pokeball";
import AttentionSeeker from "../AttentionSeeker";
import Tilt from "../Tilt";
import Image from "../Image";
import Stats from "../Stats";
import Types from "../Types";
import RemoveButton from "../RemoveButton";

import "./style.scss";
import { fetchPokemonDetail } from "./service";

const Detail = ({ pokemon, onRemove, onSelect, active, reference }) => {
    const [pokemonDetail, setPokemonDetail] = useState(null);

    useEffect(() => {
        fetchPokemonDetail(pokemon).then(setPokemonDetail);
    }, [pokemon]);

    const selectCallback = useCallback(
        (
            pokemonDetail
                ? () => onSelect(pokemon, pokemonDetail)
                : () => { }
        ),
        [pokemon, pokemonDetail]
    );

    const removeCallback = useCallback(
        () => onRemove(pokemon),
        [pokemon]
    );

    if (pokemonDetail === null) {
        return <DummyDetail />;
    }

    return (
        <Tilt>
            <AttentionSeeker>
                <div
                    className={`Detail ${active ? "Detail__active" : ""}`}
                    onClick={(e) => { e.stopPropagation(); selectCallback(); }}
                >
                    <Types data={pokemonDetail.types} />
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

                    <RemoveButton
                        className="Detail_removeButton"
                        onClick={removeCallback}
                    />
                </div>
            </AttentionSeeker>
        </Tilt>
    );
};

const DummyDetail = memo(
    () => (
        <AttentionSeeker>
            <div className="Detail">
                <Pokeball />
            </div>
        </AttentionSeeker>
    )
);

export default memo(Detail);