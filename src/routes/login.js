const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const {getUser} = require("../dal/users.dal");

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
                    // Check if the password hash in the associated user is
                    // the same as the hash from the users salt and the password inputted
                    if (user.password === hashPassword(password, user.salt)) {
                        // Create a JsonWebToken and return it
                        const token = jwt.sign({
                            id: user.id,
                            name: user.name,
                            email: user.email
                        }, process.env.JWT_SECRET);
                        res.status(200).json({token})
                    } else {
                        // If the password hashes do not equal then its not the same password and incorrect password
                        // error is sent back
                        res.status(403).send("Incorrect password");
                    }
                } else {
                    // Send a bad request error if the email is not associated with an account
                    res.status(400).send("No user with that email");
                }
            })
            .catch(() => res.status(500).send("Internal Server Error"));
    }
};
