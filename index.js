const express = require("express")
const upload = require("./upload")
const multer = require("multer")
const cors = require("cors")

const app = express()

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

app.post('/upload_file', upload.single('file'), function (req, res) {
    if (!req.file) {
        throw Error("FILE_MISSING")
    } else {
        res.send({ status: "success" })
    }
})

app.use(function (err, req, res, next) {
    if (err instanceof multer.MulterError) {
        res.statusCode = 400
        res.send({ code: err.code })
    } else if(err) {
        if (err.message === "FILE_MISSING") {
            res.statusCode = 400
            res.send({ code: "FILE_MISSING"})
        } else {
            res.statusCode = 500
            res.send({ code: "GENERIC_ERROR" })
        }
    }
})

const server = app.listen(8081, function() {
    const port = server.address().port

    console.log("App started at http://localhost:%s", port)
})