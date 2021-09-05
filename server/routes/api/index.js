
const NotionService = require('../../services/notion')
const notion = new NotionService()

const router = require('express').Router()

const itemsRouter = require('./items')(notion)
router.use('/items', itemsRouter)

module.exports = router