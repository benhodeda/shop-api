module.exports = {
    unlink: unlink
};

function unlink(user) {
    user.google.token = undefined;
    return user.save();
}
