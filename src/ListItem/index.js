import React from "react";

import "./style.scss";

const ListItem = ({ pokemon, selected, onSelect }) => (
    <li className={"ListItem " + (selected ? "ListItem__selected" : "")}>
        <a
            className={"ListItem_link"}
            onClick={e => onSelect(pokemon)
        }>
            <input
                className="ListItem_checkbox"
                type="checkbox"
                checked={selected}
                readOnly
            />
            {pokemon}
        </a>
    </li>
);

export default ListItem;