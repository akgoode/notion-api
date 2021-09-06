const { Client } = require("@notionhq/client")
const { payloadTemplate, dataTypeValues } = require('../helpers/notion-utils')


class NotionService {
    constructor(notionToken) {
        this.notion = new Client({
            auth: notionToken || process.env.NOTIONKEY,
        })
        this.dbIds = {}
        this.dbMappingFunctions = {}
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

        this.dbMappingFunctions[dbName] = body => {
            Object.entries(body).forEach(([key, value]) => {
                const ids = idLookup[key.toLowerCase()]
                const validProp = ids && ids.find(id => isPropertyValid(id) && properties[id])
                if(validProp) {
                    const dataTypeFunction = dataTypeValues[properties[validProp].type]
                    template.properties[validProp] = dataTypeFunction(value)
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

    list(dbName) {
        return this.notion.databases.query({ database_id: this.getDbId(dbName) })
    }
    
    get(id) {
        return this.notion.pages.retrieve({ page_id: id })
    }

    create(dbName, body) {
        const notionPayload = this.dbMappingFunctions[dbName](body)
        console.log(notionPayload)
        return this.notion.pages.create(notionPayload)
    }
}

module.exports = NotionService