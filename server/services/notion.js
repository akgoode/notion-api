const { Client } = require("@notionhq/client")
const { createItemBody } = require('../helpers/notion-utils')


class NotionService {
    constructor(notionToken) {
        this.notion = new Client({
            auth: notionToken || process.env.NOTIONKEY,
        })
        this.dbs = {}
    }

    setDbId(key, id) {
        this.dbs[key] = id
    }

    getDbId(key) {
        return this.dbs[key]
    }

    listDatabases() {
        return this.notion.search()
    }

    async list(dbName) {
        return this.notion.databases.query({ database_id: this.getDbId(dbName) })
    }

    async create(dbName, body) {
        const notionPayload = createItemBody(this.getDbId(dbName), body)
        return this.notion.pages.create(notionPayload)
    }
}

module.exports = NotionService