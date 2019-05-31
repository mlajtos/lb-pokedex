import React from "react";

import { colorFromType } from "./utils";
import "./style.scss";

const Types = ({ data }) => (
    <div className="Types">
        <div className="Types_wrapper">
            {
                data.map(({ type: { name } }) => (
                    <div
                        key={name}
                        className={`Types_type Types_type__${name}`}
                        style={{ background: `${colorFromType(name)}` }}
                        title={name}
                    >
                        <span className="Types_typeName">{name}</span>
                    </div>
                ))
            }
        </div>
    </div>
);

export default Types;