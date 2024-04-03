const express = require("express");
const router = express.Router();

router.post("/login", express.json(), require("./login"));
router.post("/register", express.json(), require("./register"));

module.exports = router;
