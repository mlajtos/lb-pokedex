import React from "react";

import "./style.scss";

export default ({ active, onClick, children }) => (
    <div className={`DetailPanel ${active ? "DetailPanel__active" : ""}`} onClickCapture={onClick}>
        {children}
    </div>
);