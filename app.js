const express = require('express')
const app = express()
const http = require('http').Server(app)
require('./router/socketio')(http)

app.use(express.json())

app.use('/static', express.static('static'))

app.use('/api/proxy', require('./router/api/proxy'))
app.use('/api/room', require('./router/api/room'))
app.use('/api/song', require('./router/api/song'))

//Views router
app.use('/', require('./router/view'))


//404 page handler
app.all('*', (req, res) => {
    res.sendFile(__dirname+'\\view\\404.html')
})

module.exports = http