var multer  = require('multer')
const path = require('path')
const client = require('../db/db.js')


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./uploads")
    },

    filename: function(req, file, cb) {
        cb(null, Date.now() + "_" + file.originalname)
    },
})

exports.upload = multer({
    storage: storage,
  });


exports.uploadSingleImage = async (req,res) => {
    try {
        const allquery = await client.query(`INSERT INTO users(name, icon) VALUES ('${req.body.name}', '${req.file.filename}')`);
    
        res.status(200).json({'statusCode':200, 'status':true, message: 'Image added','data':[]})
        
    } catch (error) {
        console.log("not connecting to db", error)
    }
       
   }