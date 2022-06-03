const express = require("express")
const bodyParser = require("body-parser")
const path = require('path')
const cors = require("cors")
const db = require('./models/sequelize');
const categoryApi = require('./controllers/category');
require('dotenv').config()

const app = express()
const port = process.env.PORT || 8088


const whitelist = ["http://localhost:8088"]
const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error("Not allowed by CORS"))
        }
    },
    credentials: true,
}

app.use(cors(corsOptions))

// app.use(express.static('build'))
app.use(express.static(path.join(__dirname, 'build')))

app.use('/uploads',express.static('uploads'))

app.get("*", async (req, res) => {
    res.sendFile(path.join(__dirname, "build", "index.html"))
})

global.appRoot = __dirname

app.use(bodyParser.json())

categoryApi(app,db)


app.listen(port, () => console.log(`Application started on Port ${port}.`))