import React, { useState, useCallback } from "react";

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

    const maxRotation = 0.07;
    const maxScale = 1.05;
    const enterTransitionTime = 100;
    const leaveTransitionTime = 250;
    const perspective = "600px";

    const onMouseEnter = useCallback(
        (e) => {
            setPos(getPos(e));
            setTimeout(() => {
                setTransitionTime(0);
            }, transitionTime);
        },
        []
    );

    const onMouseMove = useCallback(
        (e) => {
            if (!transitionTime) {
                setPos(getPos(e));
            }
        },
        [transitionTime]
    );

    const onMouseLeave = useCallback(
        (e) => {
            setTransitionTime(leaveTransitionTime);
            setTimeout(() => {
                setTransitionTime(enterTransitionTime);
            });
            setPos({ x: 0, y: 0 });
        },
        []
    );

    return (
        <div
            className="Card"
            onMouseEnter={onMouseEnter}
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
        >
            <div
                className="Card_wrapper"
                style={{
                    willChange: "transform",
                    transformStyle: "preserve-3d",
                    transformOrigin: "center center",
                    transform: `
                        perspective(${perspective})
                        rotateY(${-maxRotation * pos.x}deg)
                        rotateX(${maxRotation * pos.y}deg)
                        ${
                            (pos.x || pos.y)
                                ? `scale3d(${maxScale}, ${maxScale}, ${maxScale})`
                                : ""
                        }
                    `,
                    transition: (
                        transitionTime
                            ? `transform ${transitionTime}ms ease-in-out`
                            : ""
                    )
                }}
            >
                {children}
            </div>
        </div>
    );
};