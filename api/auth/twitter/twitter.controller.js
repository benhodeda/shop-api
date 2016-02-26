module.exports = {
    unlink: unlink
};

function unlink(user) {
    user.twitter.token = undefined;
    return user.save();
}
