const NotionService = require('../services/notion')

const notion = new NotionService()

const itemsRouter = require('./items')(notion)

module.exports = app => {
    app.use('/api/items', itemsRouter)
}
