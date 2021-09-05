require('dotenv').config()

const express = require('express')
const app = express()

app.use(express.json())

require('./middleware')(app)
require('./routes')(app)

app.listen(process.env.PORT || 3000)