const express = require("express");
const cookieParser = require('cookie-parser');
const {search} = require("./src/dal/search.dal");
const app = express();

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
    const queries = req.query;
    if (queries.q) {
        const query = queries.q || "";
        const database = queries.db || "pg";
        const data = await search(query, database);
        res.render("search.ejs", { results: data });
    } else {
        res.render("search.ejs", { results: [] });
    }
})

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});