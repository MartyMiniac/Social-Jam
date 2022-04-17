const users = new Users()
const songPlayer = new Player()

const promptUserAction = () => {
    renderUserPrompt()
    document.getElementById('promptUserAction').onclick = () => {
        document.dispatchEvent(new Event('userAction'))
        $('#promptUserAction').remove()
    }
}