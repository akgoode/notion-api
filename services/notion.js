const { Client } = require("@notionhq/client")

const notion = new Client({
  auth: process.env.NOTIONKEY,
})

class NotionService {
    constructor() {

    }

    async getItems() {
        return notion.databases.query({ database_id: process.env.DATABASEID })
    }

    async createItem() {

    }
}

module.exports = NotionService