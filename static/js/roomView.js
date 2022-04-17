const renderUserPrompt = () => {
    $(document.body).append(`
        <div id="promptUserAction" style="position: absolute; z-index: 200; top: 0; bottom: 0; left: 0; right: 0; background-color: rgba(0, 0, 0, 0.8); display: flex; align-items: center; justify-content: center;">
            <div style="z-index: 200; width: 50%; height: fit-content; background-color: #353b3f; padding: 2em; color: white; font-family: 'PT Sans';">
                <p>
                    Our application uses a Media Autoplay functionalities of the HTML player. As per the new Norms Introduced in Chrome 66
                    a user needs to perform an action on the page to enable autoplay feature. This window make sure that a user action is
                    performed before the site's logic comes into Affect. 
                </p>
                <p>To Read more about it on the link below</p>
                <a href="https://developer.chrome.com/blog/autoplay/" target="_blank" style="color: white;">https://developer.chrome.com/blog/autoplay/</a>
                <p>Click anywhere on the site to continue joining the room</p>
            </div>
        </div>
    `)
}
const renderAddUserUI = (name, id) => {
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
const renderSentMsg = (msg) => {
    $('.chatArea').append(`
        <div class="chatBubble bubbleRight">
            ${msg}
        </div>
    `)
}
const renderReceivedMsg = (msg) => {
    $('.chatArea').append(`
        <div class="chatBubble">
            ${msg}
        </div>
    `)
}
const renderChangeStatus = (id) => {
    $('#status'+id).html('typing')
    setTimeout(() => {
        $('#status'+id).html('chilling')
    }, 1000)
}
const renderPlaylist = (sng) => {
    $('.rightPane').append(`
        <div class="PlaylistEntity" id="${sng.id}">
            <img src="${sng.image}" alt="">
            <div class="PlaylistEntityInfo">
                <p>${sng.song}</p>
                <p>${sng.album}</p>
                <p>${sng.primary_artists}</p>
            </div>
        </div>
    `)
}