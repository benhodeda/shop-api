module.exports = {
    unlink: unlink
};

function unlink(user) {
    user.local.email = undefined;
    user.local.password = undefined;
    return user.save();
}
