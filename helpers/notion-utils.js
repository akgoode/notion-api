const databaseId = process.env.DATABASEID

const createItemBody = req => {

    const itemBodyTemplate = req => {
        const getTags = () => ({multi_select: req.tags.map(tag => ({ name: tag }))})
        return {
            parent: {
                database_id: databaseId
            },
            properties: {
                Name: {
                    title: [
                        {
                            text: {
                                content: req.name,
                            },
                        },
                    ],
                },
                Description: {
                    rich_text: [
                        {
                            type: 'text',
                            text: {
                                content: req.description,
                            },
                        },
                    ],
                },
                Tags: getTags()
            }
        }
    }
    return itemBodyTemplate(req)
}

module.exports = {
    createItemBody
}