require('dotenv').config()

const express = require('express')
const app = express()

const winston = require('winston')

app.use(express.json())

require('./startup/logs/http')(app)
require('./middleware')(app)
require('./routes')(app)
require('./startup/logs/error')(app)

app.listen(process.env.PORT || 3000, () => {
    winston.info(`Listening on port ${process.env.PORT || 3000}`)
})