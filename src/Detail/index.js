import React, { useEffect, useState } from "react";

import "./style.scss";
import { fetchPokemonDetail } from "./service";

export default ({ pokemon }) => {
    const [pokemonDetail, setPokemonDetail] = useState(null);

    useEffect(() => {
        fetchPokemonDetail(pokemon).then(setPokemonDetail);
    }, [pokemon]);

    return (
        pokemonDetail
            ? (
                <div className="Detail">
                    <div className="Detail_name">{pokemonDetail.name}</div>
                    <img key={pokemonDetail.name} className="Detail_image" src={pokemonDetail.sprites.front_default} />
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
                </div>
            )
            : null
    );
};