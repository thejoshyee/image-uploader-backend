const express = require("express")
const bodyParser = require("body-parser")
const path = require('path')
const cors = require("cors")
const db = require('./models/sequelize');
const categoryApi = require('./controllers/category');
require('dotenv').config()

const app = express()
const port = process.env.PORT || 8000

// const whitelist = ["http://localhost:8000"]
// const corsOptions = {
//     origin: function (origin, callback) {
//         if (!origin || whitelist.indexOf(origin) !== -1) {
//             callback(null, true)
//         } else {
//             callback(new Error("Not allowed by CORS"))
//         }
//     },
//     credentials: true,
// }

// app.use(cors(corsOptions))

app.use(express.static('build'))

app.use('/uploads',express.static('uploads'))

global.appRoot = __dirname

app.use(bodyParser.json())

categoryApi(app, db)

app.listen(port, () => console.log(`Application started on Port ${port}.`))