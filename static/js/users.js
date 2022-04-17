class Users {
    constructor() {
        this.users = {}
    }
    addUser(name, id) {
        this.users[id]=name
        renderAddUserUI(name, id)
    }
    removeUser(id) {        
        delete this.users[id]
        renderRemoveUserUI(id)
    }
    getUser(id) {
        return this.users[id]
    }
}