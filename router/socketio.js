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
        
        socket.on('joinRoom', data => {
            console.log(data)
            socket.join(data.roomID)
            socket.to(data.roomID).emit('msg', {
                type: 'roomInfo',
                data: 'Somebody Hoped in the room'
            })
        })

        socket.on('msg', data => {
            console.log(data)
            socket.to(data.roomID).emit('msg', {
                type: data.type,
                data: data.data
            })
        })
        
        socket.on('disconnect', () => {
            console.log('A user Disconnected')
        })
    })
}

module.exports = socketioFunction