import React, { useState, useCallback } from "react";

import "./style.scss";

/*
    Position in rectangle:

    [-100, -100]
                *-----*
                |     |
                |     |
                *-----*
                       [100, 100]

    [0, 0] is in the center.
*/
const getPos = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const ax = e.clientX - rect.left;
    const ay = e.clientY - rect.top;
    const x = clamp(((ax / rect.width) * 200) - 100);
    const y = clamp(((ay / rect.height) * 200) - 100);
    return {x, y};
};

const clamp = (value) => Math.max(Math.min(value, 100), -100);

export default ({ children }) => {
    const maxRotation = 0.07;
    const maxScale = 1.07;
    const maxShadowDisplacement = 0.1;
    const shadowRadius = "20px"; 
    const shadowColor = "rgba(0, 0, 0, 0.5)";
    const enterTransitionTime = 100;
    const leaveTransitionTime = 250;
    const perspective = "600px";
    const easingCurve = "ease-in-out";

    const [pos, setPos] = useState({ x: 0, y: 0 });
    const [transitionTime, setTransitionTime] = useState(enterTransitionTime);

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

    const hovering = (pos.x || pos.y);

    return (
        <div
            className="Tilt"
            onMouseEnter={onMouseEnter}
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
        >
            <div
                className="Tilt_wrapper"
                style={{
                    filter: (
                        hovering
                            ? `
                                drop-shadow(
                                    ${pos.x * maxShadowDisplacement}px
                                    ${pos.y * maxShadowDisplacement}px
                                    ${shadowRadius}
                                    ${shadowColor}
                                )
                            `
                            : ""
                    ),
                    transform: `
                        perspective(${perspective})
                        rotateY(${-maxRotation * pos.x}deg)
                        rotateX(${maxRotation * pos.y}deg)
                        ${
                            hovering
                                ? `scale3d(${maxScale}, ${maxScale}, ${maxScale})`
                                : ""
                        }
                    `,
                    transition: (
                        transitionTime
                            ? `
                                transform ${transitionTime}ms ${easingCurve},
                                filter ${transitionTime}ms ${easingCurve}
                            `
                            : ""
                    )
                }}
            >
                {children}
            </div>
        </div>
    );
};