const path = require('path')
require('dotenv').config()
let AWS = require('aws-sdk')
const fileUpload = require('express-fileupload')
let Buffer = require('buffer').Buffer

module.exports = (app, db) => {

    app.use(fileUpload())

    app.get( "/categories", (req, res) =>
        db.Category.findAll({raw: true})
            .then( (result) => res.json(result) )
    );

    app.post("/categories", async (req,res) => {

                AWS.config.update({
                    accessKeyId: process.env.ACCESSKEY,
                    secretAccesskey: process.env.SECRET,
                    region: "us-west-1"
                })

                const s3 = new AWS.S3()
                console.log(req.files)
                const fileContent = Buffer.from(req.files.file.data, 'binary')
                

                const params = {
                    Bucket: 'image-uploads-storage',
                    Key: req.files.file.name,
                    Body: fileContent,
                }
                
                s3.upload(params, function(err, data) {
                    if (err) {
                        throw err
                    }
                    res.send({
                        "response_code": 200,
                        "response_message": "Success",
                        "response_data": data
                    })
                })

                  db.Category.create({
                        name: req.body.name,
                        description: req.body.description,
                        poster : req.files.file.name
                    })

          });

}

