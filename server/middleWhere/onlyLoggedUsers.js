module.exports.onlyLoggedUsers = (req, res, next) => {
    if (req.session.username) {
        next()
    } else {
        res.status(401).send({err:"sensetive content for logged users only, plesae log in"})
    }
}