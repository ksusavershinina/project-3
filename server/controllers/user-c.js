const userService = require('../service/user-s')
const {validationResult} = require("express-validator");
const student = require('../models/StudentModel')
const Employer = require('../models/EmployerModel')
const User =require ('../models/User')
const {dirname} = require('path')
const {fileUrlToPath} = require('url')
const Multer = require('multer')
const path = require('path');

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
            const { Name, Telegram, Skills } = req.body;
            const studentUser = new student({ Name, Telegram, Skills, createdBy: req.user ,password: req.password, email: req.email,  isActivated: req.isActivated });
            const fileName = req.body.filename;
            const imagePath = path.join('uploads', fileName);
            studentUser.Avatar = imagePath;


            await studentUser.save();

            const user = await User.findById(req.user);
            user.modelS = studentUser;
            await user.save();

            res.json(studentUser);
        }
        catch (e) {
            console.log(e)
        }
    }

    async registrationEmployer(req,res) {
        try {
            const { NameCompany,Website, Name,Telegram } = req.body;
            const EmployerUser = new Employer({ NameCompany,Website, Name,Telegram, createdBy: req.user,email: req.email, password: req.password, isActivated: req.isActivated   });
            const avatarFileName = req.body.avatarFileName;
            const avatarImagePath = path.join('uploads', avatarFileName);
            EmployerUser.Avatar = avatarImagePath;

            const companyLogoFileName = req.body.logoFileName;
            const companyLogoImagePath = path.join('uploads', companyLogoFileName);
            EmployerUser.CompanyLogo = companyLogoImagePath;

            await EmployerUser.save();

            const user = await User.findById(req.user)
            user.modelsE = EmployerUser
            await user.save()

            res.json(EmployerUser)
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
    
    async projects(req,res) {
        try {
            const projects = await userService.projects()
            return res.json(projects)
        }
        catch (e) {
            res.json({message: "не выдаёт проекты ептить :)"})
        }
    }

    async myProjects(req,res) {
        try {
            const myProjects = await userService.myProjects(req.user)
            return res.json(myProjects)
        }

        catch (e) {
            res.json({message: "пропиздон в myproject"})
        }
    }
    
    async
}

module.exports = new UserController()