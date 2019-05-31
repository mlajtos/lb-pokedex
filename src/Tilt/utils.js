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
export const getPositionInRectangle = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const ax = e.clientX - rect.left;
    const ay = e.clientY - rect.top;
    const x = clamp(((ax / rect.width) * 200) - 100);
    const y = clamp(((ay / rect.height) * 200) - 100);
    return {x, y};
};

const clamp = (value) => Math.max(Math.min(value, 100), -100);