const userService = require('../service/user-s')

class UserController {
    async registration(req,res) {
        try {
            const {email, password,role} = req.body
            const userData = await userService.registration(email,password,role)
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30*24*60*60*1000, httpOnly: true})
            return res.json(userData)
        }
        catch (e) {
            console.log(e)
            res.json({message:"пиздец в реге"})
        }
    }

    async login(req,res) {
        try {
            const {email, password} = req.body
            const userData = await userService.login(email, password)
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30*24*60*60*1000, httpOnly: true})
            return res.json(userData)
        }
        catch (e) {
            res.json({message: "пиздец в логине"})
        }
    }

    async logout(req,res) {
        try {
            const {refreshToken} = req.cookies
            const token = await userService.logout(refreshToken)
            res.clearCookie('refreshToken')
            return res.json(token)
        }
        catch (e) {

        }
    }

    async active(req,res) {
        try {

        }
        catch (e) {

        }
    }

    async refresh(req,res) {
        try {
            const {refreshToken} = req.cookies
            const userData = await userService.refresh(refreshToken)
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30*24*60*60*1000, httpOnly: true})
            return res.json(userData)
        }
        catch (e) {

        }
    }
}

module.exports = new UserController()