const {postgresSearch} = require("./search.pg.dal");
const {mongodbSearch} = require("./search.mgd.dal");


const search = async (query, database) => {
    const results = [];
    if (database === "pg" || database === "both") {
        results.push(
            ...await postgresSearch(query).catch((err) => {
                console.error(err)
                return [];
            })
        )
    }
    if (database === "mongo" || database === "both") {
        results.push(
            ...await mongodbSearch(query).catch((err) => {
                console.error(err)
                return [];
            })
        );
    }

    return results;
}

module.exports = {
    search
}