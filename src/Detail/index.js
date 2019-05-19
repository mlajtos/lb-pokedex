import React, { useEffect, useState, useRef, memo } from "react";

import Pokeball from "../Pokeball";
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

    const el = useRef();
    useEffect(() => {
        if (el.current) {
            el.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [pokemonDetail]);

    if (pokemonDetail === null) {
        return (
            <div ref={el} className="Detail">
                <Pokeball />
            </div>
        );
    }

    return (
        <Tilt>
            <div
                ref={el}
                className={`Detail ${active ? "Detail__active" : ""}`}
                onClick={onSelect.bind(null, pokemonDetail.name, pokemonDetail)}

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

                <button
                    className="Detail_removeButton"
                    onClick={(e) => { e.stopPropagation(); onRemove(pokemonDetail.name); }}
                >
                    ✕
                </button>
            </div>
        </Tilt>
    );
});