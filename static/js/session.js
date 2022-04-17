let lobby = {
    users: {},
    playlist: []
}

const promptUserAction = () => {
    renderUserPrompt()
    document.getElementById('promptUserAction').onclick = () => {
        document.dispatchEvent(new Event('userAction'))
        $('#promptUserAction').remove()
    }
}