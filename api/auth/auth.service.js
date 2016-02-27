module.exports = {
    responseUser: responseUser
};

function responseUser(req, res, next) {
    res.json({
        ok: 200,
        user: req
    });
}