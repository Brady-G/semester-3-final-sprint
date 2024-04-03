const express = require("express");
const cookieParser = require('cookie-parser');
const app = express();

app.use(cookieParser());

app.use(express.static("static", {
    extensions: ["html"]
}));

app.use("/api", require('./src/routes/api'))

app.get("/", (req, res) => {
    res.sendFile(process.cwd() + "/static/index.html");
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});