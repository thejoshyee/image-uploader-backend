const express = require("express")
const bodyParser = require("body-parser")
const path = require('path')
const app = express()
const router = express.Router()
const { Client } = require('pg')
const multer = require("multer")
const cors = require("cors")


const whitelist = ["http://localhost:3000"]
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


app.use('/uploads',express.static('uploads'))

// load the routes
require('./routes/image_routes.js')(app);

// app.use(function (err, req, res, next) {
//     if (err instanceof multer.MulterError) {
//         res.statusCode = 400
//         res.send({ code: err.code })
//         console.log("error bro")
//     } else if(err) {
//         if (err.message === "FILE_MISSING") {
//             res.statusCode = 400
//             res.send({ code: "FILE_MISSING"})
//         } else {
//             res.statusCode = 500
//             res.send({ code: "GENERIC_ERROR" })
//         }
//     }
// })

const server = app.listen(8081, () => {
    const PORT = server.address().port
    console.log("App started at http://localhost:%s", PORT)
})