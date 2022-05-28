const express = require('express');
const client = require('../db/db.js');
const controller =  require('../controllers/upload.js');

module.exports = function(app) {
   
   //route to upload single image
   app.post('/upload_file', controller.upload.single('icon'), controller.uploadSingleImage);

};

