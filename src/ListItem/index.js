import React from "react";
import { Link } from "react-router-dom";

import "./style.scss";

export default ({ pokemon, selected }) => (
    <li className={"ListItem " + (selected ? "ListItem__selected" : "")}>
        <Link to={`/${pokemon}`} className={"ListItem_link " + (selected ? "ListItem_link__selected" : "")}>
            {pokemon}
        </Link>
    </li>
);