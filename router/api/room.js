const express = require('express')
const router = express.Router()
const roomController = require('../../controller/room')

router.get('/generateRoomID', (req, res) => {
    res.send(roomController.generateRoomID())
})

module.exports = router