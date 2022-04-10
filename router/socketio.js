const socketioFunction = (http) => {
    //TODO: change the cors configuration for security
    const io = require('socket.io')(http, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    })
    io.on('connection', socket => {

        console.log('A user Connected')
        
        socket.on('roomJoiningRequest', data => {
            console.log(data)
        })
        
        socket.on('disconnect', () => {
            console.log('A user Disconnected')
        })
    })
}

module.exports = socketioFunction