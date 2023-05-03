const userService = require('../service/user-s')
const {validationResult} = require("express-validator");
const student = require('../models/StudentModel')

class UserController {
    async registration(req,res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.json({message: "пиздец в реге, чето хуйню ввёл", errors})
            }
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
    async registrationStudent(req,res) {
        try {
            const { Name,Telegram, Skills } = req.body;
            const studentUser = new student({ Name,Telegram, Skills, createdBy: req.user });
            await studentUser.save();
            res.json(studentUser)
        }
        catch (e) {
            console.log(e)
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

    async activate(req,res) {
        try {
            const activationLink = req.params.link
            await userService.activate(activationLink)
            return res.redirect(process.env.CLIENT_URL)
        }
        catch (e) {
            console.log(e)
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