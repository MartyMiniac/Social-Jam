class Playlist {
    constructor() {
        this.playlist = []
    }
    addSong(sng) {
        this.playlist.push(sng)
        renderPlaylist(sng)
    }
    removeSong() {

    }
    getPlaylist() {
        return this.playlist
    }
    setPlaylist(list) {
        for(let i in list) {
            this.addSong(list[i])
        }
    }
    getSong(pos) {
        return this.playlist[pos]
    }
    getLength() {
        return this.playlist.length
    }
}