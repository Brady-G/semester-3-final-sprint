const database = require("./pg");

const search = (query) => {
    return new Promise((resolve, reject) => {
        database.query(
            "SELECT name, description, image FROM public.data WHERE name ~* $1 or description ~* $1",
            [query.split(" ").join("|")],
            (err, result) => {
                if (err) {
                    reject(err);
                } else if (!result) {
                    reject("No results found")
                } else {
                    resolve(result.rows);
                }
            }
        );
    });
}

module.exports = {
    postgresSearch: search
}