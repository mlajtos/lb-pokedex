import React, { memo } from "react";

import "./style.scss";

const EmptySelection = () => (
    <div className="EmptySelection">
        <div className="EmptySelection_message">No selection</div>
    </div>
);

export default memo(EmptySelection);