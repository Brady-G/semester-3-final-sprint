const {postgresSearch} = require("./search.pg.dal");


const search = async (query, database) => {
    const results = [];
    if (database === "pg" || database === "both") {
        results.push(
            ...await postgresSearch(query).then((data) => data).catch((err) => {
                console.error(err)
                return [];
            })
        )
    }
    if (database === "mongo" || database === "both") {
        results.push(...[
            { name: "Mango 1", description: "This is item 1", image: "https://game-icons.net/icons/ffffff/000000/1x1/delapouite/sea-urchin.svg" },
            { name: "Apple 2", description: "This is item 2", image: "https://game-icons.net/icons/ffffff/000000/1x1/delapouite/sea-urchin.svg" },
            { name: "Mongo 3", description: "This is item 3", image: "https://game-icons.net/icons/ffffff/000000/1x1/delapouite/sea-urchin.svg" },
            { name: "Mongo 4", description: "This is item 4", image: "https://game-icons.net/icons/ffffff/000000/1x1/delapouite/sea-urchin.svg" },
            { name: "Mongo 5", description: "This is item 5", image: "https://game-icons.net/icons/ffffff/000000/1x1/delapouite/sea-urchin.svg" },
            { name: "Mongo 6", description: "This is item 6", image: "https://game-icons.net/icons/ffffff/000000/1x1/delapouite/sea-urchin.svg" },
            { name: "Mongo 7", description: "This is item 7", image: "https://game-icons.net/icons/ffffff/000000/1x1/delapouite/sea-urchin.svg" },
            { name: "Mongo 8", description: "This is item 8", image: "https://game-icons.net/icons/ffffff/000000/1x1/delapouite/sea-urchin.svg" },
            { name: "Mongo 9", description: "This is item 9", image: "https://game-icons.net/icons/ffffff/000000/1x1/delapouite/sea-urchin.svg" },
            { name: "Mongo 0", description: "This is item 0", image: "https://game-icons.net/icons/ffffff/000000/1x1/delapouite/sea-urchin.svg" },
        ])
    }

    return results;
}

module.exports = {
    search
}