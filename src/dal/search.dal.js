const {postgresSearch} = require("./search.pg.dal");
const {mongodbSearch} = require("./search.mgd.dal");
const {logger} = require("../logger");

/**
 * @typedef {'pg'|'both'|'mongo'} Database
 */

/**
 * Search for a query in the specified database(s)
 * @param query {string} - The search query
 * @param database {Database} - The database(s) to search in
 * @return {Promise<*[]>}
 */
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