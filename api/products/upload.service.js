var multer  =   require('multer');
var uuid = require('uuid');

var storage =   multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './api/products/uploads');
    },
    filename: function (req, file, callback) {
        var ext = file.originalname.split('.');
        ext = ext[ext.length - 1];
        file.fieldname = uuid.v1() +  '.' + ext;
        callback(null, file.fieldname);
    }
});

module.exports = multer({ storage : storage}).single('userPhoto');