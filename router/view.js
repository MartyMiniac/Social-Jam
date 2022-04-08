const express = require('express')
const path  = require('path')
const router = express.Router()

const UI_PATH = path.resolve(__dirname, '../view')+'\\'

router.get('/', (req, res) => {
    res.sendFile(`${UI_PATH}index.html`)
})

module.exports = router