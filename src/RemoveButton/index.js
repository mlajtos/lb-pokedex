import React, { memo } from "react";

import "./style.scss";

const RemoveButton = ({ onClick, className }) => (
    <button
        className={`RemoveButton ${className}`}
        onClick={(e) => { e.stopPropagation(); onClick(); }}
        title="Remove"
    >
        ✕
    </button>
);

export default memo(RemoveButton);