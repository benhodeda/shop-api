var multer  =   require('multer');

var storage =   multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './uploads');
    },
    filename: function (req, file, callback) {
        callback(null, file.fieldname);
    }
});

module.exports = multer({ storage : storage}).single('userPhoto');