const express = require('express')
const path  = require('path')
const router = express.Router()

const UI_PATH = path.resolve(__dirname, '../view')+'/'

router.get('/', (req, res) => {
    res.sendFile(`${UI_PATH}index.html`)
})

router.get('/room', (req, res) => {
    res.sendFile(`${UI_PATH}room.html`)
})

router.get('/room/:id', (req, res) => {    
    res.sendFile(`${UI_PATH}joinRoom.html`)
})

module.exports = router