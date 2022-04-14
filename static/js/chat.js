var socket = io()
var roomID = null

//join room
const SocketIOJoinRoom = (roomId) => {
    roomID=roomId
    socket.emit('joinRoom', {
        roomID: roomId
    })
}

socket.on('msg', data => {
    console.log(data)
    if(data.type==='msg') {
        rcvMsgUI(`${lobby.users[data.id]} said: ${data.data}`)
    }
    if(data.type==='typing') {
        // console.log(data)
        changeStatus(data.id)
    }
    if(data.type=='join') {
        console.log(data.data)
        addUserUI(data.data, data.id)
        sendJoinAckEvent(data.id)
        lobby.users[data.id]=data.data
    }
    if(data.type=='leave') {
        delete lobby.users[data.id]
        $('#'+data.id).remove()
    }
})

socket.on('prvmsg', data => {
    console.log(data)
    if(data.type=='ack') {
        console.log(data.data)
        addUserUI(data.data, data.id)
        lobby.users[data.id]=data.data
    }
})

const sendMsg = (msg) => {
    socket.emit('msg', {
        type: 'msg',
        data: msg,
        roomID: roomID
    })
}

const sendJoinEvent = () => {
    socket.emit('msg', {
        type: 'join',
        data: sessionStorage.playerName,
        roomID: roomID
    })
}
const sendTypingEvent = () => {
    socket.emit('msg', {
        type: 'typing',
        data: sessionStorage.playerName,
        roomID: roomID
    })
}

const sendJoinAckEvent = (id) => {
    socket.emit('prvmsg', {
        type: 'ack',
        data: sessionStorage.playerName,
        id: id
    })
}