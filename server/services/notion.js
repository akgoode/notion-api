const { Client } = require("@notionhq/client")
const { payloadTemplate, dataTypeValues } = require('../helpers/notion-utils')


class NotionService {
    constructor(notionToken) {
        this.notion = new Client({
            auth: notionToken || process.env.NOTIONKEY,
        })
        this.dbIds = {}
        this.dbMaps = {}
    }

    setDbId(key, id) {
        this.dbIds[key] = id
    }

    getDbId(key) {
        return this.dbIds[key]
    }

    mapRequestToDbRecord(db, dbName) {

        const titleCase = str => `${str[0].toUpperCase()}${str.substring(1)}`
        const isPropertyValid = property => validProperties.find(prop => prop === property)

        const template = payloadTemplate(db.id)
        const properties = db.properties
        const idLookup = {}

        const validProperties = Object.keys(properties).map(prop => {
            idLookup[prop.toLowerCase()] = [prop.toLowerCase(), titleCase(prop)]
            return prop
        })

        this.dbMaps[dbName] = body => {
            Object.keys(body).forEach(property => {
                const ids = idLookup[property.toLowerCase()]
                const validProp = ids.find(id => isPropertyValid(id) && properties[id])
                const dataTypeFunction = dataTypeValues[properties[validProp].type]
                if(isPropertyValid(validProp)) {
                    template.properties[validProp] = dataTypeFunction(body[property])
                }
            })
            return template
        }
    }

    initializeDb(db) {
        const dbName = db.title[0].plain_text,
        id = db.id

        this.setDbId(dbName, id)
        this.mapRequestToDbRecord(db, dbName)
        return dbName
    }

    listDatabases() {
        return this.notion.search()
    }

    async list(dbName) {
        return this.notion.databases.query({ database_id: this.getDbId(dbName) })
    }

    async create(dbName, body) {
        const notionPayload = this.dbMaps[dbName](body)
        console.log(notionPayload)
        return this.notion.pages.create(notionPayload)
    }
}

module.exports = NotionService