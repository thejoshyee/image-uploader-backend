var multer  = require('multer')
const fs = require('fs')
const path = require('path')

const upload = multer({ dest: '/tmp/'})

  module.exports = (app, db) => {
    app.get( "/upload_file", (req, res) =>
        db.Upload.findAll({raw: true})
            .then( (result) => res.json(result) )
    );

    app.post('/upload_file', upload.single('file'), (req,res) => {
        const file = global.appRoot + '/uploads/' + req.file.filename + path.extname(req.file.originalname);
        fs.rename(req.file.path, file, function(err) {
            if (err) {
                console.log(err);
                res.send(500);
            } 
            else {
                  db.Upload.create({
                        name: req.body.name,
                        description: req.body.description,
                        poster : req.file.filename
                    })
                    .then(r =>  {
                    res.send(r.get({plain:true}));
                    });
            }
          });
    })
}


