var passportInit = require('./passport/init');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');
var passport = require('passport');
var mongoose = require('mongoose');
var config = require('./config');
var express = require('express');
var logger = require('morgan');
var cors = require('cors');

//index products
var seeds = require('./seeds');
seeds.index();

// connect to our database
mongoose.connect(config.mongoConnection);
passportInit(passport);

var api = require('./api/api.routes');

var app = express();
app.use(express.static('public'));
app.use(express.static('./api/products/uploads'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(cors());

// required for passport
app.use(session({secret: config.authentication.local.sessionSecret})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

var conn = mongoose.connection;
var Grid = require ('gridfs-stream');
Grid.mongo = mongoose.mongo;
var gfs = Grid (conn.db);

app.get('/:filename', function(req, res) {
    gfs.findOne({ filename: req.params.filename }, function (err, file) {
        if (err) return res.status(400).send(err);
        if (!file) return res.status(404).send('');

        res.set('Content-Type', file.contentType);
        res.set('Content-Disposition', 'attachment; filename="' + file.filename + '"');

        var readstream = gfs.createReadStream({
            _id: file._id
        });

        readstream.on("error", function(err) {
            console.log("Got error while processing stream " + err.message);
            res.end();
        });

        readstream.pipe(res);
    });
});

app.use('/api', api);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.json({
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.json({
        message: err.message,
        error: {}
    });
});


module.exports = app;
