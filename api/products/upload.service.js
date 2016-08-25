var multer  =   require('multer');
var uuid = require('uuid');
var fs = require('fs');

var dir = './api/products/uploads';

if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
}

var storage =   multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, dir);
    },
    filename: function (req, file, callback) {
        var ext = file.originalname.split('.');
        ext = ext[ext.length - 1];
        file.fieldname = uuid.v1() +  '.' + ext;
        callback(null, file.fieldname);
    }
});

module.exports = multer({ storage : storage}).single('userPhoto');