import React from "react";

export default ({ data }) => (
    data
        ? <img src={data.sprites.front_default} />
        : null
);