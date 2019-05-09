import React from "react";

import "./style.scss";
import searchIcon from "./icons/search.svg";
import clearIcon from "./icons/clear.svg";

export default ({ value, setValue }) => (
    <div className="SearchBox">
        <img src={searchIcon} className="SearchBox__SearchIcon" />
        <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Search..."
        />
        {
            value !== ""
                ? <img src={clearIcon} onClick={(e) => setValue("")} className="SearchBox__ClearIcon" />
                : null
        }
        
    </div>
);