
const NotionService = require('../../services/notion')
const notion = new NotionService()

const routerFactory = require('express').Router

const createRouter = db => {
    const router = routerFactory()
    const dbName = db.title[0].plain_text,
          id = db.id
    notion.setDbId(dbName, id)

    
    router.get('/', async (req, res) => {
        console.log(`getting ${dbName}`)
        const items = await notion.list(dbName)
        res.send(items)
    })

    router.post('/', async (req, res) => {
        const body = req.body
        const response = await notion.create(dbName, body)
        res.send(response);
    })
    // console.log(router)

    return router
    
}

const createDBRouters = async () => {
    try {
        const allDbs = await notion.listDatabases()
        const dbs = allDbs.results.filter(db => db.object === 'database')
        const apiRouter = routerFactory()
        dbs.forEach(db => {
            apiRouter.use(`/${db.title[0].plain_text}`, createRouter(db))
        })
        return apiRouter
    } catch (e) {
        console.log(e)
    }
}

module.exports = createDBRouters()