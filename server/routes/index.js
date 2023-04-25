const Router = require('express').Router;
const userController = require('../controllers/user-c');
const {check} = require('express-validator')

const router = new Router();

router.post('/registration',[
    check('email', "email не может быть пустым").notEmpty(),
    check('password', "пароль не может быть пустым").notEmpty(),
    check('email', "это не почта").contains('@'),
    check('email', "почта не может состоять из проебелов").matches(/^\S+$/),
    check('password', "пароль не может состоять из пробелов").matches(/^\S+$/)
], userController.registration)
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.get('/activate/:link', userController.activate); // нету
router.get('/refresh', userController.refresh);



module.exports = router;