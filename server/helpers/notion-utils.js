const dataTypeValues = {
    multi_select: items => ({multi_select: items.map(item => ({ name: item }))}),
    title: text => ({
        title: [
            {
                text: {
                    content: text,
                }
            }
        ]
    }),
    rich_text: text => ({
        rich_text: [
            {
                type: 'text',
                text: {
                    content: text,
                },
            },
        ]
    }),
    email: email => ({ email: email }),
    phone_number: num => ({phone_number: num}),
    date: (start, end) => {
        const date = {
            date: {
                start: new Date(start).toISOString()
            }
        }

        if(end) date.date.end = new Date(end).toISOString()
        return date
    },
    select: name => ({select: { name: name }})
}

const payloadTemplate = dbId => {
    return {
        parent: {
            database_id: dbId
        },
        properties: {}
    }
}

module.exports = {
    payloadTemplate,
    dataTypeValues
}