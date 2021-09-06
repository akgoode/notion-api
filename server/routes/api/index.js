const getDbs = require('../../startup/dbs')
const NotionService = require('../../services/notion')
const notion = new NotionService()

const routerFactory = require('express').Router

const createRouter = dbName => {
    const router = routerFactory()
    


    router.get('/', async (req, res) => {
        console.log(`getting ${dbName}`)
        const items = await notion.list(dbName)
        res.send(items)
    })

    router.get('/:id', async (req, res) => {
        const id = req.params.id
        console.log(`getting ${id} from ${dbName}`)
        const item = await notion.get(id)
        if(item) {
            res.send(item)
        }
        res.status(404).send()
    })

    router.post('/', async (req, res) => {
        const body = req.body
        if(body) {
            const response = await notion.create(dbName, body)
            res.send(response);
        } else {
            res.status(400).json({error: 'Bad Request'})
        }
    })
    // console.log(router)

    return router
    
}

const createDBRouters = async () => {
    try {
        const apiRouter = routerFactory()
        const dbs = await getDbs(notion)
        dbs.forEach(db => {
            const dbName = notion.initializeDb(db)
            apiRouter.use(`/${dbName}`, createRouter(dbName))
        })
        return apiRouter
    } catch (e) {
        console.log(e)
    }
}

module.exports = createDBRouters()