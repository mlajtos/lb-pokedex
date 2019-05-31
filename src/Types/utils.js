export const colorFromType = (() => {
    // stolen from https://pokemon.fandom.com/wiki/Types
    const colors = {
        "normal": "#A8A878",
        "fighting": "#C03028",
        "flying": "#A890F0",
        "poison": "#A040A0",
        "ground": "#E0C068",
        "rock": "#B8A038",
        "bug": "#B8A038",
        "ghost": "#705898",
        "steel": "#B8B8D0",
        "fire": "#F08030",
        "water": "#6890F0",
        "grass": "#78C850",
        "electric": "#F8D030",
        "psychic": "#F85888",
        "ice": "#98D8D8",
        "dragon": "#7038F8",
        "dark": "#705848",
        "fairy": "#F0B6BC",
        "unknown": "#6AA596",
        "shadow": "#705898"
    };

    return (type) => colors[type];
})();