const crypto = require("crypto");
const {getUser, addUser} = require("../dal/users.dal");

require('dotenv').config()

// Hashes the password using the input and salt
const hashPassword = (password, salt) => {
    return crypto.pbkdf2Sync(
        password, salt,
        1000, 64,
        "sha512"
    ).toString("hex");
}

module.exports = (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    // Require that both the email and password are in the body before trying to perform a login
    if (!email || !password) {
        res.status(400).send("Email and Password are required");
    } else {
        getUser(email)
            .then((user) => {
                if (user) {
                    res.status(400).send("User already exists");
                } else {
                    const salt = crypto.randomBytes(16).toString('hex');
                    const hash = hashPassword(password, salt);
                    addUser(email, hash, salt)
                        .then((success) => {
                            if (success) {
                                res.status(200).send("")
                            } else {
                                res.status(500).send("Internal Server Error")
                            }
                        })
                        .catch((err) => {
                            console.log(err);
                            res.sendStatus(500);
                        });
                }
            })
            .catch(() => res.status(500).send("Internal Server Error"));
    }
};
