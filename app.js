const express = require('express')
const app = express()
const http = require('http').Server(app)

app.use(express.json())

app.use('/static', express.static('static'))

app.get('/', (req, res) => {
    res.send('Hello world')
})

module.exports = http