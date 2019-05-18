import React, { useEffect, useState, useRef, memo } from "react";

import Pokeball from "../Pokeball";
import Tilt from "../Tilt";
import Image from "../Image";

import "./style.scss";
import { fetchPokemonDetail } from "./service";

export default memo(({ pokemon, onRemove, onSelect, active }) => {
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
                onClick={onSelect.bind(null, pokemonDetail.name)}

            >
                <Image
                    className="Detail_image"
                    src={pokemonDetail.sprites.front_default}
                />
                <div className="Detail_name">
                    {pokemonDetail.name}
                </div>
                <div className="Detail_stats">
                    <div className="Detail_stat">
                        {pokemonDetail.height / 10}
                        <span className="Detail_unit">m</span>
                    </div>
                    <div className="Detail_stat">
                        {pokemonDetail.weight / 10}
                        <span className="Detail_unit">kg</span>
                    </div>
                </div>
                <button
                    className="Detail_removeButton"
                    onClick={onRemove.bind(null, pokemonDetail.name)}
                >
                    ✕
            </button>
            </div>
        </Tilt>
    );
});