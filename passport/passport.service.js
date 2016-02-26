module.exports = {
    generateStrategyCallback: generateStrategyCallback
};

var User = require('../models/user');

function generateStrategyCallback(idField, insertUser, source) {
    return function (req, token, tokenSecret, profile, done) {
        // make the code asynchronous
        // User.findOne won't fire until we have all our data back from source
        process.nextTick(function () {
            // check if the user is already logged in
            if (!req.user) {
                var query = {};
                query[idField] = profile.id;
                User.findOne(query,
                    function (err, user) {
                        // if there is an error, stop everything and return that
                        // ie an error connecting to the database
                        if (err)
                            return done(err);
                        // if the user is found then log them in
                        if (user) {
                            // if there is a user id already but no token (user was linked at one point and then removed)
                            if (!user[source].token) {
                                insertUser(user, token, profile, false, done);
                            }
                            return done(null, user); // user found, return that user
                        } else {
                            insertUser(new User(), token, profile, true, done);
                        }
                    });
            } else {
                insertUser(req.user, token, profile, true, done);
            }
        });
    }
}