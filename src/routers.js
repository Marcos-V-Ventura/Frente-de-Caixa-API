const express = require('express')
const router = express.Router()

const { auth } = require('./middlewares')
const { login, editUser } = require('./controllers')

router.post('/login', login)

router.use(auth)

router.put('/usuario', editUser)

module.exports = router

