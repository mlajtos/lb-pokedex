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
                : () => { }
        ),
        [pokemonDetail, onSelect]
    );

    const removeCallback = useCallback(
        (
            pokemonDetail
                ? onRemove.bind(null, pokemonDetail.name)
                : () => { }
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

const Types = ({ data }) => (
    <div className="Detail_types">
        <div className="Detail_typesWrapper">
            {
                data.map(({ type: { name } }) => (
                    <div
                        key={name}
                        className={`Detail_type Detail_type__${name}`}
                        style={{ background: `${colorFromType(name)}` }}
                        title={name}
                    >
                        <span className="Detail_typeName">{name}</span>
                    </div>
                ))
            }
        </div>
    </div>
);

// stolen from https://pokemon.fandom.com/wiki/Types
const colorFromType = (() => {
    const colors = {
        "normal": "#A8A878",
        "fighting": "#C03028",
        "flying": "#A890F0",
        "poison": "#A040A0",
        "ground": "#E0C068",
        "rock": "#B8A038",
        "bug": "#B8A038",
        "ghost": "#705898",
        "steel": "#B8B8D0",
        "fire": "#F08030",
        "water": "#6890F0",
        "grass": "#78C850",
        "electric": "#F8D030",
        "psychic": "#F85888",
        "ice": "#98D8D8",
        "dragon": "#7038F8",
        "dark": "#705848",
        "fairy": "#F0B6BC",
        "unknown": "#6AA596",
        "shadow": "#705898"
    };
    
    return (type) => colors[type];
})();