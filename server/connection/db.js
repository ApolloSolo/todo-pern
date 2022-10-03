require("dotenv").config();
const Pool = require('pg').Pool;

const db = new Pool({
    user: process.env.SQL_USER,
    password: process.env.SQL_PASSWORD,
    host: 'localhost',
    database: 'to_do',
    port: 5432
});

module.exports = db;