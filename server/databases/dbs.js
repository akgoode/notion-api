const NotionService = require('../services/notion')

const notion = new NotionService()

module.exports = async () => {
    try {
        const allDbs = await notion.listDatabases()
        const dbs = allDbs.results.filter(db => db.object === 'database')
        console.log(dbs)
        // dbs.forEach(console.log)
        return dbs
    } catch(e) {
        console.log(e)
    }
}