const Router = require('express').Router;
const userController = require('../controllers/user-c');
const {check} = require('express-validator')
const ProjectController = require('../controllers/project-c')
const checkAuth= require('../middleware/checkAuth')

const router = new Router();

router.post('/registration',[
    check('password', "пароль не может быть пустым").notEmpty(),
    check('email', "это не почта").isEmail(),
    check('password', "пароль не может состоять из пробелов").matches(/^\S+$/)
], userController.registration)
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.get('/activate/:link', userController.activate);
router.get('/refresh', userController.refresh);
router.post('/project',checkAuth, ProjectController.create)
router.post('/registration/student',checkAuth, userController.registrationStudent)
router.post('/registration/employer',checkAuth, userController.registrationEmployer)

module.exports = router;
