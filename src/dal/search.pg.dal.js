const database = require("./pg");

const search = (query) => {
    //TODO fix up
    return new Promise((resolve, reject) => {
        const sql = "SELECT name, desacription, image FROM public.data ORDER BY name ASC WHERE name LIKE $1 OR description LIKE $1;";
        database.query(sql, [query, query], (err, result) => {
            if (err) {
                reject(err);
            } else if (!result) {
                reject("No results found")
            } else {
                resolve(result.rows);
            }
        });
    });
}

module.exports = {
    postgresSearch: search
}