import React, { memo } from "react";

import "./style.scss";

export default ({ data, reference }) => {
    if (reference === data) {
        reference = null;
    }

    return (
        <div className="Stats">
            <Versus>{reference ? reference.name : null}</Versus>
            <div className="Stats_entries">
                {
                    data.stats
                        .map((entry, i) => (
                            <Entry
                                key={entry.stat.name}
                                label={abbreviation(entry.stat.name)}
                                value={entry.base_stat}
                                referenceValue={reference ? reference.stats[i].base_stat : null}
                                unit=""
                            />
                        ))
                }
                <Entry
                    label="Height"
                    value={data.height / 10}
                    referenceValue={reference ? reference.height / 10 : null}
                    unit="m"
                />
                <Entry
                    label="Weight"
                    value={data.weight / 10}
                    referenceValue={reference ? reference.weight / 10 : null}
                    unit="kg"
                />
            </div>
        </div>
    );
};

const abbreviation = (() => {
    const abbreviation = {
        "attack": "atk",
        "defense": "def",
        "special-attack": "sp-atk",
        "special-defense": "sp-def",
        "speed": "spd",
        "hp": "hp"
    };

    return (label) => abbreviation[label];
})();

const Entry = ({ label, value, referenceValue, unit }) => (
    <div className="Stats_entry">
        {
            referenceValue
                ? <RelativeValue>{value - referenceValue}</RelativeValue>
                : null
        }
        <AbsoluteValue>{value}</AbsoluteValue>
        <span className="Stats_entryUnit">{unit}</span>
        <div className="Stats_entryLabel">{label}</div>
    </div>
);

const AbsoluteValue = ({ children: value }) => {
    return (
        <span className={`Stats_entryAbsolute`}>
            {value}
        </span>
    );
};

const RelativeValue = ({ children: value }) => {
    const sign = Math.sign(value);
    let className;
    switch (sign) {
        case -1:
            className = "negative";
            break;
        case 1:
            className = "positive";
            break;
        case 0:
        default:
            className = "neutral";
    };

    return (
        <span className={`Stats_entryRelative Stats_entryRelative__${className}`}>
            {+Math.abs(value).toFixed(1)}
        </span>
    );
};

const Versus = memo(
    ({ children: name }) => (
        name
            ? (
                <div className="Stats_versus">
                    <span className="Stats_versusAcronym">vs.</span>
                    <span className="Stats_versusName">{name}</span>
                </div>
            )
            : <div className="Stats_versus">
                <span className="Stats_versusHint">Click to compare stats</span>
            </div>
    )
);