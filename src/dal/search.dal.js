const {postgresSearch} = require("./search.pg.dal");
const {mongodbSearch} = require("./search.mgd.dal");
const {logger} = require("../logger");

const search = async (query, database) => {
    const results = [];
    if (database === "pg" || database === "both") {
        results.push(
            ...await postgresSearch(query).catch((err) => {
                logger.error(err.message);
                return [];
            })
        )
    }
    if (database === "mongo" || database === "both") {
        results.push(
            ...await mongodbSearch(query).catch((err) => {
                logger.error(err.message);
                return [];
            })
        );
    }

    return results;
}

module.exports = {
    search
}