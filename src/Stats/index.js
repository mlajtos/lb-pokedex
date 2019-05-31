import React, { memo } from "react";

import StatEntry from "../StatEntry";
import Versus from "../Versus";

import { abbreviateStatName } from "./utils";
import "./style.scss";

const Stats = ({ data, reference }) => {
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
                            <StatEntry
                                key={entry.stat.name}
                                label={abbreviateStatName(entry.stat.name)}
                                value={entry.base_stat}
                                referenceValue={reference ? reference.stats[i].base_stat : null}
                                unit=""
                            />
                        ))
                }
                <StatEntry
                    label="Height"
                    value={data.height / 10}
                    referenceValue={reference ? reference.height / 10 : null}
                    unit="m"
                />
                <StatEntry
                    label="Weight"
                    value={data.weight / 10}
                    referenceValue={reference ? reference.weight / 10 : null}
                    unit="kg"
                />
            </div>
        </div>
    );
};

export default Stats;