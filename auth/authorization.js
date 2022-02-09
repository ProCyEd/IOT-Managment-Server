const jwt = require('jsonwebtoken')

function authenticateToken(req, res, next) {
    const authHeader = req.headers['cookie']
    const token = authHeader && authHeader.split('=')[1]
    if(token == null) return res.send({status: "No Token", verified: false})

    jwt.verify(token, "secret_key", (err, data) => {
        if(err) res.send({status: "Invalid Token", verified: false})
        req.data = data
        return next();
    })
}

module.exports = authenticateToken;