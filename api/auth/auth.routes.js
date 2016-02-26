var facebook = require('./facebook/facebook.routes');
var twitter = require('./twitter/twitter.routes');
var google = require('./google/google.routes');
var local = require('./local/local.routes');
var express = require('express');
var router = express.Router();

router.get('/logout', function (req, res) {
    req.logout();
    res.json({
        ok: 200
    });
});

router.use('/facebook', facebook);
router.use('/twitter', twitter);
router.use('/google', google);
router.use('/local', local);

module.exports = router;