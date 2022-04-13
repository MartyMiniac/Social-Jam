if(sessionStorage.roomID===undefined) {
    window.location.href='/'
}
else {
    $('#roomID').html(sessionStorage.roomID)
    SocketIOJoinRoom(sessionStorage.roomID)
}