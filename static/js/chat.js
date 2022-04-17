var socket = io()
var roomID = null
let isFirst = true

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
        rcvMsgUI(`${users.getUser(data.id)} said: ${data.data}`)
    }
    if(data.type==='typing') {
        renderChangeStatus(data.id)
    }
    if(data.type==='sync') {
        songPlayer.setSync(data.data)
    }
    if(data.type==='reqsync') {
        sendPrivateSyncSignal(data.data, data.id)
    }
    if(data.type==='join') {
        users.addUser(data.data, data.id)
        sendJoinAckEvent(data.id)
    }
    if(data.type==='leave') {
        users.removeUser(data.id)
    }
})

socket.on('prvmsg', data => {
    console.log(data)
    if(data.type=='ack') {
        users.addUser(data.data, data.id)
        if(isFirst) {
            isFirst=false
            requestPlayerInfo(data.id)
        }
    }
    if(data.type=='playerInit') {
        sendPlayerInfo(data.id)
    }
    if(data.type=='playerInfo') {
        songPlayer.setPlayerInfo(data.data)
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

const requestPlayerInfo = (id) => {
    socket.emit('prvmsg', {
        type: 'playerInit',
        id: id
    })
}

const sendPlayerInfo = (id) => {
    socket.emit('prvmsg', {
        type: 'playerInfo',
        data: songPlayer.getPlayerInfo(),
        id: id
    })
}

const sendSyncSignal = (data) => {
    console.log(data)
    socket.emit('msg', {
        type: 'sync',
        data: data,
        roomID: roomID
    })
}

const reqSyncSignal = (data) => {
    socket.emit('msg', {
        type: 'reqsync',
        data: data,
        roomID: roomID
    })
}

const sendPrivateSyncSignal = (data, id) => {
    socket.emit('prvmsg', {
        type: 'sync',
        data: songPlayer.getSyncInfo(data),
        id: id
    })
}