$('#sndMsgBtn').click(() => {
    sndMsgUI()
})

$('#sndMsgText').on("keypress", e => {
    sendTypingEvent()
    if (e.keyCode == 13) {
        sndMsgUI()
        return false;
    }
});

const sndMsgUI = () => {
    const msg = $('#sndMsgText').val()
    if(msg=='') {
        return
    }
    $('#sndMsgText').val('')
    $('.chatArea').append(`
    <div class="chatBubble bubbleRight">
        ${msg}
    </div>
    `)
    sendMsg(msg)
    console.log(msg)
    $('.chatArea').scrollTop($('.chatArea').height())
}
const rcvMsgUI = (msg) => {
    $('.chatArea').append(`
    <div class="chatBubble">
        ${msg}
    </div>
    `)
    $('.chatArea').scrollTop($('.chatArea').height())
}

const changeStatus = (id) => {
    $('#status'+id).html('typing')
    setTimeout(() => {
        $('#status'+id).html('chilling')
    }, 1000)
}