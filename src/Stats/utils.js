export const abbreviateStatName = (() => {
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