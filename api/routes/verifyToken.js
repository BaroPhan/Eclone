const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
    const header = req.headers.token
    if (header) {
        const token = header.split(" ")[1]
        jwt.verify(token, process.env.JWT_SEC_KEY, (err, user) => {
            if (err) res.status(403).json("Token isnt valid!")
            req.user = user
            next()
        })

    } else res.status(401).json("You arent authenticated")
}

const verifyTokenAndAuthorization = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.id === req.params.id || req.user.id === req.body._id || req.user.isAdmin) {
            next()
        } else res.status(403).json("You arent allowed to do that")
    })
}

const verifyTokenAndAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.isAdmin) {
            next()
        } else res.status(403).json("You arent allowed to do that")
    })
}

module.exports = { verifyTokenAndAuthorization, verifyTokenAndAdmin }