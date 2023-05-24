const Router = require('express').Router;
const userController = require('../controllers/user-c');
const {check} = require('express-validator')
const ProjectController = require('../controllers/project-c')
const checkAuth= require('../middleware/checkAuth')
const multer = require('multer')

const router = new Router();

const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        cb(null, 'uploads')
    },
    filename: (_,file,cb) => {
        cb(null,file.originalname)
    }
})

const upload = multer({ storage })


router.post('/registration',[
    check('password', "пароль не может быть пустым").notEmpty(),
    check('email', "это не почта").isEmail(),
    check('password', "пароль не может состоять из пробелов").matches(/^\S+$/)
], userController.registration)
router.post('/login', userController.login);
router.get('/posts', userController.projects)
router.post('/logout', userController.logout);
router.get('/activate/:link', userController.activate);
router.get('/refresh', userController.refresh);
router.post('/project',checkAuth, ProjectController.create)
router.post('/registration/student',checkAuth,upload.single('Avatar'), userController.registrationStudent)
router.post('/registration/employer', checkAuth,
    upload.fields([
        { name: 'Avatar', maxCount: 1 },
        { name: 'CompanyLogo', maxCount: 1 },
    ]),
    userController.registrationEmployer
);

router.post('/upload/avatar', checkAuth, upload.single('Avatar'), (req, res) => {
    res.json({ url: `/api/uploads/${req.file.originalname}` });
});

router.post('/upload/company-logo', checkAuth, upload.single('CompanyLogo'), (req, res) => {
    res.json({ url: `/api/uploads/${req.file.originalname}` });
});

module.exports = router;
