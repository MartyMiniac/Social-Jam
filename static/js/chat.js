var socket = io()
var roomID = null

socket.on('msg', data => {
    console.log(data)
    if(data.type==='msg') {
        rcvMsgUI(data.data)
    }
})

const SocketIOJoinRoom = (roomId) => {
    roomID=roomId
    socket.emit('joinRoom', {
        roomID: roomId
    })
}

const sendMsg = (msg) => {
    socket.emit('msg', {
        type: 'msg',
        data: msg,
        roomID: roomID
    })
}