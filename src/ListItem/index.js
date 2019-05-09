import React from "react";
import { Link } from "react-router-dom";

import "./style.scss";

export default ({ pokemon }) => (
    <li>
        <Link to={`/${pokemon}`}>
            {pokemon}
        </Link>
    </li>
);