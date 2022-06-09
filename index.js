const express = require("express")
const bodyParser = require("body-parser")
const path = require('path')
const cors = require("cors")
const db = require('./models/sequelize');
const categoryApi = require('./controllers/category');
require('dotenv').config()

let router = express.Router();


let AWS = require('aws-sdk')
const fileUpload = require('express-fileupload')
let Buffer = require('buffer').Buffer

const http = require('http')
const https = require('https')
const fs = require('fs')

const app = express()
const port = process.env.PORT || 8000

// const whitelist = ["http://198.74.51.154"]
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

app.use(cors());


// app.use(express.static(__dirname + 'build', { dotfiles: 'allow' }))

// app.use('/uploads',express.static('uploads'))

// global.appRoot = __dirname

app.use(bodyParser.json())

categoryApi(app, db)

app.use(express.static('build'))


app.listen(port, () => console.log(`Application started on Port ${port}.`))


// http.createServer(app).listen(80, () => {
//     console.log('Listening...')
//   })

// https
//   .createServer(
//     {
//       key: fs.readFileSync('/etc/letsencrypt/live/joshyee.xyz/privkey.pem', 'utf8'),
//       cert: fs.readFileSync('/etc/letsencrypt/live/joshyee.xyz/cert.pem', 'utf8'),
//       ca: fs.readFileSync('/etc/letsencrypt/live/joshyee.xyz/chain.pem', 'utf8'),
//     },
//     app
//   )
//   .listen(443, () => {
//     console.log('Listening...')
//   })

