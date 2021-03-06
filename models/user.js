// load the things we need
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

// define the schema for our user model
var userSchema = mongoose.Schema({
    local: {
        name: String,
        email: String,
        id: String,
        picture: {
            data: {
                is_silhouette: Boolean,
                url: String
            }
        },
        settings: {
            defaultOrg: {
                name: String,
                email: String
            },
            defaultPercents: Number
        },
        rating: {
            total: Number,
            raters: [String],
            rate: Number
        }
    }
});

// methods ======================
// generating a hash
userSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.local.password);
};

userSchema.static('findByFid', function (fid, callback) {
    return this.findOne({ "local.id": fid }, callback);
});

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);