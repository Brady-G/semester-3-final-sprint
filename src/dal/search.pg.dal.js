const database = require("./pg");

const search = (query) => {
    //TODO fix up
    return new Promise((resolve, reject) => {
        const sql = "SELECT name, description, image FROM public.data WHERE name ~* $1 or description ~* $1";
        database.query(sql, [query.split(" ").join("|")], (err, result) => {
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