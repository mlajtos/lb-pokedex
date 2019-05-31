import React from "react";

import "./style.scss";

const Statusbar = ({ selectedCount, totalCount }) => (
    <div className="Statusbar">
        {
            selectedCount !== 0
                ? <span className="Statusbar_selectedCount">{selectedCount} Selected</span>
                : null
        }
        <span className="Statusbar_totalCount">{totalCount} Total</span>
    </div>
);

export default Statusbar;