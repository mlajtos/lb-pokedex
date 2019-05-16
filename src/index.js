import React from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router, Route } from "react-router-dom";

import App from "./App";

ReactDOM.render(
    (
        <Router>
            <Route
                path="/:selected?"
                render={
                    (props) => {
                        const selected = (
                            props.match.params.selected
                                ? props.match.params.selected.split("+")
                                : []
                        );
                        return <App selected={selected} />;
                    }
                }
            />
        </Router>
    ),
    document.getElementById("container")
);