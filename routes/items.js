const express = require('express')

module.exports = notion => {
    const router = express.Router()

    router.get('/', async (req, res) => {
        const items = await notion.getItems()
        res.send(items)
    })

    router.post('/', async (req, res) => {
        const body = req.body;
        console.log(body);
        res.send(body);
    })
    
    return router
}