const envs = require('dotenv').config({path: `${__dirname}/../.env`})
const NotionService = require('../services/notion')

const notion = new NotionService()

const init = async () => {
    try {
        const allDbs = await notion.listDatabases()
        const dbs = allDbs.results.filter(db => db.object === 'database')
        // console.log(dbs)
        dbs.forEach(db => {
            console.log(JSON.stringify(db, 2, 2))
        })
    } catch(e) {
        console.log(e)
    }
}

init()