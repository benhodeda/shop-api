module.exports = initializeLocal;

var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');

var emailStrategy = {
    // by default, local strategy uses username and password, we will override with email
    usernameField: 'email',
    passwordField: 'id',
    passReqToCallback: true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
};

function initializeLocal(passport) {

    passport.use('auth', new LocalStrategy(emailStrategy,
        function (req, email, password, done) {
            // asynchronous
            process.nextTick(function () {
                User.findOne({'local.email': email}, function (err, user) {
                    // if there are any errors, return the error
                    if (err)
                        return done(err);

                    // if no user is found, return the message
                    if (!user) {
                        // create the user
                        insertUser(new User(), req.body, done);
                    }
                    // all is well, return user
                    else
                        return done(null, user);
                });
            });
        }));


    function insertUser(user, data, done) {
        user.local = {
            name: data.name,
            email: data.email,
            id: user.generateHash(data.id)
        };
        if (data.picture)
            user.local.picture = data.picture;
        if (data.settings)
            user.local.settings = data.settings;
        user.save(function (err) {
            if (err)
                throw err;
            return done(null, user);
        });
    }
}