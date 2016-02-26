module.exports = {
    unlink: unlink
};

function unlink(user) {
    user.facebook.token = undefined;
    return user.save();
}
