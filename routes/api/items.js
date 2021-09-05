const express = require('express')
const router = express.Router()

module.exports = notion => {
    
    router.get('/', async (req, res) => {
        console.log('getting items')
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