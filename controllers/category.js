const path = require('path')
require('dotenv').config()
let AWS = require('aws-sdk')
const fileUpload = require('express-fileupload')
let Buffer = require('buffer').Buffer


const generateGetUrl = (Key) => {
    const s3 = new AWS.S3()
    const Bucket = process.env.BUCKET

    return new Promise((resolve, reject) => {
        const params = {
            Bucket,
            Key,
            Expires: 120
        }
        // operation in this case is getObject
        s3.getSignedUrl('getObject', params, (err, url) => {
          if (err) {
            reject(err);
          } else {
            // If there is no errors we will send back the pre-signed GET URL
            resolve(url);
          }
        });
      });
}


module.exports = (app, db) => {

    app.use(fileUpload())

    app.get('/test', (req, res) => {
        res.send("hello test")
    })

    // GET URL
    app.post("/generate-get-url", (req, res) => {

        const { Key } = req.query

        generateGetUrl(Key)
            .then(getURL => {
                res.type("image/jpeg")
                res.send(getURL)
            })
            .catch(err => {
                res.send(err)
            })

    });

    app.post("/categories", async (req,res) => {

                AWS.config.update({
                    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
                    secretAccesskey: process.env.AWS_SECRET_ACCESS_KEY,
                    region: "us-west-1"
                })

                const s3 = new AWS.S3()
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

