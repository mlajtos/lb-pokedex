import React from "react";

import "./style.scss";

export default ({ active, children }) => (
    <div className={`DetailPanel ${active ? "DetailPanel__active" : ""}`}>
        {children}
    </div>
);