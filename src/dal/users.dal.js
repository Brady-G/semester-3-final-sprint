const database = require("./pg");

// Get a specific user by their id
const getUserById = (id) => {
    return new Promise((resolve, reject) => {
        database.query("SELECT * FROM public.users WHERE id = $1;", [id], (err, result) => {
            if (err) {
                reject(err);
            } else if (!result) {
                reject("No results found")
            } else {
                resolve(result.rows[0]);
            }
        });
    });
}

// Get a specified user by their email
const getUser = (email) => {
    return new Promise((resolve, reject) => {
        database.query("SELECT * FROM public.users WHERE email = $1;", [email], (err, result) => {
            if (err) {
                reject(err);
            } else if (!result) {
                reject("No results found")
            } else {
                resolve(result.rows[0]);
            }
        });
    });
}

// Add a new user
const addUser = (email, password, salt) => {
    return new Promise((resolve, reject) => {
        database.query("INSERT INTO public.users (password, salt, email) VALUES ($1, $2, $3);", [password, salt, email], (err, result) => {
            if (err) {
                reject(err);
            } else if (!result) {
                reject("No results found")
            } else {
                resolve(result.rowCount === 1); //Check if a user was added
            }
        });
    });
}

module.exports = {
    getUser,
    getUserById,
    addUser,
}