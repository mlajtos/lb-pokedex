import React, { memo } from "react";

const Versus = ({ children: name }) => (
    name
        ? (
            <div className="Stats_versus">
                <span className="Stats_versusAcronym">vs.</span>
                <span className="Stats_versusName">{name}</span>
            </div>
        )
        : <div className="Stats_versus">
            <span key="hint" className="Stats_versusHint">Click to compare stats</span>
        </div>
);

export default memo(Versus);