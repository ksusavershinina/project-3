const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
    try {
        const token = req.headers.authorization.replace(/Bearer\s?/,'')
        if (!token) {
            return res.json({message: ":))"})
        }
        const decoded = jwt.verify(token, process.env.JWT_ACCSES_SECRET)
        req.user = decoded.id
        next()
    } catch (e) {
        console.log(e)
        res.json({message: "пользователь не залогинен"})
    }
}
