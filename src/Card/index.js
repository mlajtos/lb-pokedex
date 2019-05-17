import React, { useState } from "react";

import "./style.scss";

const getPos = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const ax = e.clientX - rect.left;
    const ay = e.clientY - rect.top;
    const x = ((ax / rect.width) * 200) - 100;
    const y = ((ay / rect.height) * 200) - 100;
    return {x, y};
};

export default ({ children }) => {
    const [pos, setPos] = useState({ x: 0, y: 0 });
    const [transitionTime, setTransitionTime] = useState(100);

    const maxDelta = 0.07;

    return (
        <div
            className="Card"
            onMouseEnter={(e) => {
                setPos(getPos(e));
                setTimeout(() => {
                    setTransitionTime(0);
                }, transitionTime);
            }}
            onMouseMove={(e) => {
                if (!transitionTime) {
                    setPos(getPos(e));
                }
            }}
            onMouseLeave={(e) => {
                setTransitionTime(250);
                setTimeout(() => {
                    setTransitionTime(100);
                });
                setPos({ x: 0, y: 0 });
            }}
        >
            <div
                className="Card_wrapper"
                style={{
                    transformStyle: "preserve-3d",
                    transformOrigin: "center center",
                    transform: `
                        perspective(500px)
                        ${pos.x ? "scale(1.02)" : ""}
                        rotateY(${-maxDelta * pos.x}deg)
                        rotateX(${maxDelta * pos.y}deg)
                    `,
                    transition: (
                        transitionTime
                            ? `transform ${transitionTime}ms ease-in-out`
                            : "none"
                    )
                }}
            >
                {children}
            </div>
        </div>
    );
};