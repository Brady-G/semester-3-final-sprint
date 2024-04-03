const express = require("express");
const cookieParser = require('cookie-parser');
const app = express();

app.use(cookieParser());

app.use("/api", require('./src/routes/api'))

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});