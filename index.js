const express = require("express");
const cookieParser = require('cookie-parser');
const {search} = require("./src/dal/search.dal");
const {logQuery, logger} = require("./src/logger");
const jwt = require("jsonwebtoken");
const app = express();

const redirectWithNotification = (res, page, title, message, type) => {
    res.redirect(`${page}?notification-title=${title}&notification-message=${message}&notification-type=${type}`);
}

app.set('view engine', 'ejs');
app.use(cookieParser());

app.use(express.static("static", {
    extensions: ["html"]
}));

app.use("/api", require('./src/routes/api'))

app.get("/", (req, res) => {
    res.sendFile(process.cwd() + "/static/index.html");
});

app.get(`/search`, async (req, res) => {
    const token = req.cookies.token;
    if (!token) {
        return redirectWithNotification(res, "/", "Error", "You must be logged in to search", "error");
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        const queries = req.query;
        if (!user) {
            redirectWithNotification(res, "/", "Error", "User not found, please log in again", "error");
        } else if (queries.q) {
            const query = queries.q || "";
            const database = queries.db || "pg";
            logQuery(query, user.id);
            search(query, database).then((data) => {
                res.render("search.ejs", {results: data});
            }).catch((err) => {
                logger.error(`An error occurred while searching: ${err.message}`);
                res.render("error.ejs", {error: "An error occurred while searching"});
            });
        } else {
            res.render("search.ejs", {results: []});
        }
    });
})

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});