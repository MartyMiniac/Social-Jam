const userActionListener = () => {
    document.addEventListener('userAction', () => {
        sendJoinEvent()
        renderAddUserUI(sessionStorage.playerName+' (You)', 'userMe')
    })
}

if(sessionStorage.roomID===undefined) {
    window.location.href='/'
}
else {
    $('#roomID').html(sessionStorage.roomID)
    SocketIOJoinRoom(sessionStorage.roomID)
    userActionListener()
    promptUserAction()
}