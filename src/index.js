const express = require('express')
const app = express()

require('dotenv').config()

app.use(express.json())

const router = require('./routers')

app.use('/', router)

app.listen(process.env.PORT || 3000)

