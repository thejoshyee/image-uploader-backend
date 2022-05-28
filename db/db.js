require('dotenv').config()
const { Client } = require("pg");

const client = new Client({
    user: process.env.USER_NAME,
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: 5432,
});


client.connect()
    .then(console.log("Connected to DB"))
    .catch((err) => {console.log("Something went wrong!",err.message)});

module.exports = client;