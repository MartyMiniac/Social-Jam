$('#sndMsgBtn').click(() => {
    sndMsgUI()
})

$('#sndMsgText').on("keypress", e => {
    sendTypingEvent()
    renderChangeStatus('userMe')
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
    renderSentMsg(msg)
    sendMsg(msg)
    console.log(msg)
    $('.chatArea').scrollTop($('.chatArea').height())
}
const rcvMsgUI = (msg) => {
    renderReceivedMsg(msg)    
    $('.chatArea').scrollTop($('.chatArea').height())
}