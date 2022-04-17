class Player {
    constructor() {
        this.playing=false
        this.pos = 0
        this.player = document.getElementById('audioPlayer')
        this.autoPlay=true
        this.loop=false
        this.startAutoPlay()
        this.init()
    }
    load() {        
        this.player.src=lobby.playlist[this.pos].media_url
        document.getElementById('player-songName').innerHTML=lobby.playlist[this.pos].song
        document.getElementById('player-albumName').innerHTML=lobby.playlist[this.pos].primary_artists
        document.getElementById('player-songCover').src=lobby.playlist[this.pos].image
    }
    play() {
        if(this.player.src=='') {
            this.load()
        }
        this.player.play()
    }
    pause() {
        this.player.pause()
    }
    next() {
        this.pos=(this.pos+1)%lobby.playlist.length
        this.load()
        this.play()
    }
    previous() {
        this.pos=(this.pos-1)%lobby.playlist.length        
        this.load()
        this.play()
    }
    setVolume() {

    }
    getVolume() {

    }
    seek(percent) {
        let time = percent*(this.player.duration/100)
        this.player.currentTime = Math.floor(time)
    }
    getCurrentSeek() {
        return (this.player.currentTime/this.player.duration)*100
    }
    seekTime(time) {
        this.player.currentTime = Math.floor(time)
    }
    getCurrentSeekTime() {
        return this.player.currentTime
    }
    getPos() {
        return this.pos
    }
    setPos(p) {
        this.pos=p>0 && p<lobby.playlist.length?p:this.pos
        this.seek(0)
        this.load()
        this.play()
    }
    startAutoPlay() {
        this.player.onended=() => {
            if(this.pos<lobby.playlist.length-1) {
                this.pos++
                this.load()
                this.play()
            }
        }
    }
    stopAutoPlay() {
        this.player.onended=() => {}
    }
    getPlayingStatus() {
        return this.playing
    }
    getPlayerInfo() {
        return {
            pos: this.pos,
            seek: this.getCurrentSeekTime(),
            autoplay: this.autoPlay,
            loop: this.loop,
            playlist: lobby.playlist
        }
    }
    setPlayerInfo(data) {
        lobby.playlist=data.playlist
        this.pos=data.pos
        this.autoPlay=data.autoplay
        this.loop=data.loop
        this.load()
        this.seekTime(data.seek)
        this.play()
    }


    init() {
        this.player.onplay = () => {
            document.getElementById('player-playpause-btn').src="/static/icons/pause.svg"
            this.playing=true
        }
        this.player.onpause = () => {
            document.getElementById('player-playpause-btn').src="/static/icons/play.svg"
            this.playing=false
        }
    }
}

const player = new Player()

setInterval(() => {
    $('#range').val(isNaN(player.getCurrentSeek())?0:player.getCurrentSeek()*10)
}, 100)

$('#player-playpause-btn').click(() => {
    if(player.getPlayingStatus()) {
        player.pause()
    }
    else {
        player.play()
    }
})

$('#player-back-btn').click(() => {
    player.previous()
})
$('#player-next-btn').click(() => {
    player.next()
})

$("#range").on("input change", () => {
    player.seek($('#range').val()/10)
})