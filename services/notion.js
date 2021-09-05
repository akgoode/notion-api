const { Client } = require("@notionhq/client")
const { createItemBody } = require('../helpers/notion-utils')


class NotionService {
    constructor() {
        this.notion = new Client({
            auth: process.env.NOTIONKEY,
        })
    }

    async getItems() {
        return this.notion.databases.query({ database_id: process.env.DATABASEID })
    }

    async createItem(body) {
        const notionPayload = createItemBody(body)
        return this.notion.pages.create(notionPayload)
    }
}

module.exports = NotionService