const { login, getUser, logout } = require('../controllers/authController')
const checkToken = require('../middleware/checkToken')

const Router = require('express').Router

const authRouter = Router()

authRouter.post('/login', login)
authRouter.get('/get-user', checkToken, getUser)
authRouter.get('/logout', logout)

module.exports = authRouter