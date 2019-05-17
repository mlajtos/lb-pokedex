import React, { useState, useCallback } from "react";

import Pokeball from "../Pokeball";

import "./style.scss";

export default (props) => {
    const [loaded, setLoaded] = useState(false);
    const onLoad = useCallback(() => setLoaded(true));

    return (
        <div className="Image">
            {
                !loaded
                    ? (
                        <div className="Image_overlay">
                            <Pokeball />
                        </div>
                    )
                    : null
            }
            <img {...props} onLoad={onLoad} />
        </div>
    );
};