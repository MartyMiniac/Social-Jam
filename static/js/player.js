class Player {
    constructor() {
        this.playlist = new Playlist()
        this.playing=false
        this.pos = 0
        this.player = document.getElementById('audioPlayer')
        this.autoPlay=true
        this.loop=false
        this.startAutoPlay()
        this.init()
    }
    //native player controls
    load() {
        const sng = this.playlist.getSong(this.pos)
        this.player.src=sng.media_url
        document.getElementById('player-songName').innerHTML=sng.song
        document.getElementById('player-albumName').innerHTML=sng.primary_artists
        document.getElementById('player-songCover').src=sng.image
    }
    play() {
        if(this.player.src=='') {
            this.load()
        }
        this.player.play()
    }
    getPlayingStatus() {
        return this.playing
    }
    pause() {
        this.player.pause()
    }
    setVolume() {
        //todo: implement volume controls 
    }
    getVolume() {
        //todo: implement volume controls 
    }
    seek(percent) {
        let time = percent*(this.player.duration/100)
        this.player.currentTime = Math.floor(time)
    }
    getCurrentSeek() {
        return (this.player.currentTime/this.player.duration)*100
    }
    seekTime(time) {
        this.player.currentTime = time
    }
    getCurrentSeekTime() {
        return this.player.currentTime
    }

    // implemented player controls
    getPos() {
        return this.pos
    }
    setPos(p) {
        this.pos=p>0 && p<this.playlist.getLength()?p:this.pos
        this.seek(0)
        this.load()
        this.play()
    }
    next() {
        this.pos=(this.pos+1)%this.playlist.getLength()
        this.load()
        this.play()
    }
    previous() {
        this.pos=(this.pos-1)%this.playlist.getLength()    
        this.load()
        this.play()
    }
    addSong(sng) {
        this.playlist.addSong(sng)
    }
    startAutoPlay() {
        this.player.onended= () => {
            if(this.pos<this.playlist.getLength()-1) {
                this.pos++
                this.load()
                this.play()
            }
        }
    }
    stopAutoPlay() {
        this.player.onended= () => {}
    }

    //quick initialization functions
    getPlayerInfo() {
        return {
            pos: this.pos,
            seek: this.getCurrentSeekTime(),
            autoplay: this.autoPlay,
            loop: this.loop,
            playlist: this.playlist.getPlaylist()
        }
    }
    setPlayerInfo(data) {
        this.playlist.setPlaylist(data.playlist)
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
        $('#player-playpause-btn').click(() => {
            if(songPlayer.getPlayingStatus()) {
                songPlayer.pause()
            }
            else {
                songPlayer.play()
            }
        })
        $('#player-back-btn').click(() => {
            songPlayer.previous()
        })
        $('#player-next-btn').click(() => {
            songPlayer.next()
        })
    }
}

setInterval(() => {
    $('#range').val(isNaN(songPlayer.getCurrentSeek())?0:songPlayer.getCurrentSeek()*10)
}, 100)


$("#range").on("input change", () => {
    songPlayer.seek($('#range').val()/10)
})