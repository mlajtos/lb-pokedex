import React from "react";

import "./style.scss";
import searchIcon from "./icons/search.svg";
import clearIcon from "./icons/clear.svg";

export default ({ value, setValue }) => (
    <div className="Filter">
        <img src={searchIcon} className="Filter_searchIcon" />
        <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value.toLocaleLowerCase())}
            placeholder="Search..."
            className="Filter_input"
        />
        {
            value !== ""
                ? <img src={clearIcon} onClick={(e) => setValue("")} className="Filter_clearIcon" />
                : null
        }
        
    </div>
);