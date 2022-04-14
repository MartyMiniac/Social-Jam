const express = require('express')
const router = express.Router()
const songEngine = require('../../controller/songEngine')

router.get('/search', (req, res) => {
    if(!req.query.q) {
        res.sendStatus(400)
    }
    songEngine.searchSong(req.query.q)
    .then(data => {
        res.json(data)
    })
})

module.exports = router