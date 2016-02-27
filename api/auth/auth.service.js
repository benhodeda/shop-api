module.exports = {
    responseUser: responseUser
};

function responseUser(req, res, next) {
    res.json(req.user);
}