const Pool = require('pg').Pool
require('dotenv').config()

const pool = new Pool({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASS,
    port: process.env.PG_PORT,
});

module.exports = pool;