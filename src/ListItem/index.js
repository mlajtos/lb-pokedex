import React from "react";

import "./style.scss";

export default ({ pokemon, selected, onSelect }) => (
    <li className={"ListItem " + (selected ? "ListItem__selected" : "")}>
        <a className={"ListItem_link " + (selected ? "ListItem_link__selected" : "")} onClick={e => onSelect(pokemon)}>
            {pokemon}
        </a>
    </li>
);