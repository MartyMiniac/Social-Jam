const socketioFunction = (http) => {
    //TODO: change the cors configuration for security
    const io = require('socket.io')(http, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    })
    io.on('connection', socket => {

        console.log('A user Connected with id ',socket.id)
        
        socket.on('joinRoom', data => {
            console.log(data)
            socket.join(data.roomID)
            // socket.to(data.roomID).emit('msg', {
            //     type: 'roomInfo',
            //     data: 'Somebody Hoped in the room'
            // })
        })

        socket.on('msg', data => {
            console.log('msg', data)
            socket.to(data.roomID).emit('msg', {
                type: data.type,
                data: data.data,
                id: socket.id
            })
        })
        
        socket.on('prvmsg', data => {
            console.log('prvmsg',data)
            socket.to(data.id).emit('prvmsg', {
                type: data.type,
                data: data.data,
                id: socket.id
            })
        })

        socket.on('disconnect', () => {
            io.emit('msg', {
            type: 'leave',
            id: socket.id
        })
            console.log('A user Disconnected with id ', socket.id)
        })
    })
}

module.exports = socketioFunction