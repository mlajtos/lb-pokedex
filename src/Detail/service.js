export const fetchPokemonDetail = async (pokemon) => {
    if (pokemon) {
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}/`);
            if (response.status === 200) {
                const data = await response.json();
                return augmentData(data);
            } else {
                return null;
            }
        } catch (e) {
            return null;
        }
    }
};

const augmentData = (data) => {
    return {
        ...data,
        stats: (
            data.stats
                .concat() // clone
                .sort(statsComparator)
        )
    };
};

const statsOrder = ["attack", "defense", "special-attack", "special-defense", "speed", "hp"];
const statsComparator = (a, b) => (
    statsOrder.indexOf(a.stat.name) > statsOrder.indexOf(b.stat.name)
        ? 1
        : -1
);