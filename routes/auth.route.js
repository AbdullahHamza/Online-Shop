const router = require('express').Router()
const bodyParser = require('body-parser')
const check = require('express-validator').check

const authGuard = require('./guards/auth.guard')

const authController = require("../controllers/auth.controller")

router.get('/signup',authGuard.notAuth, authController.getSignup)

router.post(
    '/signup',
    authGuard.notAuth,
    bodyParser.urlencoded({extended:true}),
    check("username").not().isEmpty().withMessage("username is required"),
    check("email").not().isEmpty().isEmail().withMessage("required and must be email"),
    check("password").isLength({ min:6 }).withMessage("min is 6"),
    check("confirmPassword").custom((value , {req})=>{
        if(value === req.body.password) return true
        else throw "Passwords dont equal"
    }),
    authController.postSignup
    )

router.get('/login',authGuard.notAuth, authController.getLogin)

router.post('/login',authGuard.notAuth,bodyParser.urlencoded({extended:true}), authController.postLogin)

router.all('/logout',authGuard.isAuth,authController.logout)

module.exports = router