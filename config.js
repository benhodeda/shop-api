var config = {
    mongoConnection: 'mongodb://heroku_t2515wmc:nn2b48909ctombbf7ubp279v4k@ds011248.mongolab.com:11248/heroku_t2515wmc',
    authentication: {
        local: {
            sessionSecret: 'ilovescotchscotchyscotchscotch'
        },
        facebook: {
            clientID: '924847737628667', // your App ID
            clientSecret: '56bbb2a6463f3f81b51cf87c507818b2', // your App Secret
            callbackURL: '/auth/facebook/callback',
            profileFields: ['id', 'email', 'gender', 'link', 'locale', 'name', 'timezone', 'updated_time', 'verified'],
            passReqToCallback: true
        },
        twitter: {
            consumerKey: 'Jz8gOhquYsFZ8gslHp0Bw73Va',
            consumerSecret: 'lCphvUaPxhZRPvKbbPpXhNx2gemLqOaqfg1cjEU9lFrDgsu9sB',
            callbackURL: '/auth/twitter/callback',
            passReqToCallback: true
        },
        google: {
            clientID: '219363586021-h8co5qvamel3emgrfoh480ivbbqg5ial.apps.googleusercontent.com',
            clientSecret: '7wvF7Mlk2LGr9Idqb79sBmXR',
            callbackURL: '/auth/google/callback'
        }
    }
};

module.exports = config;