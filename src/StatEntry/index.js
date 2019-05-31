import React from "react";

import "./style.scss";

const StatEntry = ({ label, value, referenceValue, unit }) => (
    <div className="StatEntry">
        {
            referenceValue
                ? <RelativeValue>{value - referenceValue}</RelativeValue>
                : null
        }
        <AbsoluteValue>{value}</AbsoluteValue>
        <span className="StatEntry_unit">{unit}</span>
        <div className="StatEntry_label">{label}</div>
    </div>
);

export default StatEntry;

const AbsoluteValue = ({ children: value }) => {
    return (
        <span className={`StatEntry_absoluteValue`}>
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
        <span className={`StatEntry_relativeValue StatEntry_relativeValue__${className}`}>
            {+Math.abs(value).toFixed(1)}
        </span>
    );
};