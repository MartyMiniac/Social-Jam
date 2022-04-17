const PLAY_PAUSE = 0b1
const POS = 0b10
const SEEK = 0b100
const ADDSONG = 0b1000
const REMOVESONG = 0b10000
const PLAYLIST = 0b100000


class Player {
    constructor() {
        this.playlist = new Playlist()
        this.playing=false
        this.pos = 0
        this.player = document.getElementById('audioPlayer')
        this.autoPlay=true
        this.loop=false
        this.syncProtection=false
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
        if(!this.syncProtection) {
            this.getSync(PLAY_PAUSE)
        }
    }
    getPlayingStatus() {
        return this.playing
    }
    pause() {
        this.player.pause()
        if(!this.syncProtection) {
            this.getSync(PLAY_PAUSE)
        }
    }
    setVolume() {
        //todo: implement volume controls 
    }
    getVolume() {
        //todo: implement volume controls 
    }
    seek(percent) {
        let time = percent*(this.player.duration/100)
        this.player.currentTime = time
        if(!this.syncProtection) {
            this.getSync(SEEK)
        }
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
        if(!this.syncProtection) {
            console.log('test')
            this.getSync(ADDSONG, sng)
        }
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
            playing: this.playing,
            playlist: this.playlist.getPlaylist()
        }
    }
    setPlayerInfo(data) {
        this.syncProtection=true
        this.playlist.setPlaylist(data.playlist)
        this.pos=data.pos
        this.autoPlay=data.autoplay
        this.loop=data.loop
        this.load()
        this.seekTime(data.seek)
        if(data.playing) {
            this.play()
        }
        this.syncProtection=false
    }
    getSync(flags, data) {
        // debugger;
        console.log(flags)
        console.log(data)
        let rt = {}
        if((flags&PLAY_PAUSE)===PLAY_PAUSE) {
            rt.playing = this.getPlayingStatus()
            rt.pos = this.getPos()
            rt.seek = this.getCurrentSeekTime()
        }
        if((flags&POS)===POS) {
            rt.pos = this.getPos()
        }
        if((flags&SEEK)===SEEK) {
            rt.seek = this.getCurrentSeekTime()
        }
        if((flags&ADDSONG)===ADDSONG) {
            rt.addSong = data
        }
        if((flags&REMOVESONG)===REMOVESONG) {
            rt.delSongId = data
        }
        if((flags&PLAYLIST)===PLAYLIST) {
            rt.playlist = this.playlist.getPlaylist()
        }
        sendSyncSignal(rt)
    }
    setSync(data) {
        this.syncProtection=true
        if(data.hasOwnProperty('playing')) {
            this.pos=data.pos
            this.load()
            this.seekTime(data.seek)            
            if(data.playing) {
                this.pause()
            }
            else {
                this.play()
            }
        }
        else if(data.hasOwnProperty('pos')) {
            this.setPos(data.pos)
        }
        else if(data.hasOwnProperty('seek')) {
            this.seekTime(data.seek)
        }
        else if(data.hasOwnProperty('addSong')) {
            this.addSong(data.addSong)
        }
        else if(data.hasOwnProperty('delSongId')) {
            //todo: implement song removal
        }
        else if(data.hasOwnProperty('playlist')) {
            this.playlist.setPlaylist(data.playlist)
        }
        else {
            alert('unexpected sync property detected')
        }
        this.syncProtection=false   
    }
    getSyncInfo(flags, data) {
        // debugger;
        console.log(flags)
        data = {}
        if((flags&PLAY_PAUSE)===PLAY_PAUSE) {
            data.playing = this.getPlayingStatus()
            data.pos = this.getPos()
            data.seek = this.getCurrentSeekTime()
        }
        if((flags&POS)===POS) {
            data.pos = this.getPos()
        }
        if((flags&SEEK)===SEEK) {
            data.seek = this.getCurrentSeekTime()
        }
        if((flags&ADDSONG)===ADDSONG) {
            data.addSong = data
        }
        if((flags&REMOVESONG)===REMOVESONG) {
            data.delSongId = data
        }
        if((flags&PLAYLIST)===PLAYLIST) {
            data.playlist = this.playlist.getPlaylist()
        }
        return data
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