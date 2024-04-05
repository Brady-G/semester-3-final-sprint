const database = require("./mdb");

/**
 * Search for a query in the mongo collection
 * @param query {string} - The search query
 * @return {Promise<any[]>}
 */
const search = (query) => {
    return database.connect()
        .then(() => database.db(process.env.MONGO_DATABASE).collection("data").aggregate([{
            $search: {
                index: "text",
                text: {
                    query: query,
                    path: ["title", "description"]
                }
            }
        }]))
        .then(cursor => cursor.toArray())
        .then(result => {
            if (!result) {
                throw "No results found";
            }
            return result;
        });
}

module.exports = {
    mongodbSearch: search
}