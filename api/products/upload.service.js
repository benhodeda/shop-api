var multer  =   require('multer');
var uuid = require('uuid');

var storage = require('gridfs-storage-engine')({
    url: 'mongodb://heroku_t2515wmc:nn2b48909ctombbf7ubp279v4k@ds011248.mongolab.com:11248/heroku_t2515wmc',
    filename: function (req, file, callback) {
        var ext = file.originalname.split('.');
        ext = ext[ext.length - 1];
        file.fieldname = uuid.v1() +  '.' + ext;
        callback(null, file.fieldname);
    }
});

module.exports = multer({ storage : storage}).single('userPhoto');