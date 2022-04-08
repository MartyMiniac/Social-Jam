const http = require('./app')
require('dotenv').config()

const PORT = process.env.PORT || 5000
let SERVER_LISTENING = false


if(!SERVER_LISTENING) {
    http.listen(PORT, () => {
        console.log(`Server listening at PORT ${PORT}`)
    })
    SERVER_LISTENING=true
}