import React from "react";

import "./style.scss";

const DetailPanel = ({ active, onClick, children }) => (
    <div
        className={`DetailPanel ${active ? "DetailPanel__active" : ""}`}
        onClick={onClick}
    >
        {children}
    </div>
);

export default DetailPanel;