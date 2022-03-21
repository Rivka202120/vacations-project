module.exports.onlyAdmin = (req, res, next) => {
    if (req.session.is_admin) { // if you admin = 1
        next()
    } else {
        res.status(401).send({err:"Access option For the manager only"})
    }
}