module.exports = async client => {
    try {
        const allDbs = await client.listDatabases()
        const dbs = allDbs.results.filter(db => db.object === 'database')
        return dbs
    } catch(e) {
        console.log(e)
        return []
    }
}