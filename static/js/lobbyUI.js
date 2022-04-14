const addUserUI = (name, id) => {
    $('.roomLobyPane').append(`
        <div class="roomLobyEntity" id="${id}">
            <!-- <img src="/static/dp.jpg" alt=""> -->
            <div class="roomLobyEntityInfo">
                <p>${name}</p>
                <p id="status${id}">chilling</p>
            </div>
        </div>
    `)
}

if(sessionStorage.roomID===undefined) {
    window.location.href='/'
}
else {
    $('#roomID').html(sessionStorage.roomID)
    SocketIOJoinRoom(sessionStorage.roomID)
    sendJoinEvent()
    addUserUI(sessionStorage.playerName+' (You)', 'userMe')
}