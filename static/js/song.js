let searchTimer = null
let songSearch = null
$('#songSearchInput').keyup(() => {
    clearTimeout(searchTimer)
    let qry = $('#songSearchInput').val()
    if(qry==='' || qryInRes()) {
        return;
    }
    searchTimer = setTimeout(() => {
        fetch(`/api/song/search?q=${qry}`)
        .then(data => {
            data.json().then(data => {
                songSearch=data
                console.log(data)
                renderSongOptions(songSearch)
            })
        })
    }, 1000)
})

const qryInRes = () => {
    const val = document.getElementById("songSearchInput").value;
    const opts = document.getElementById('songList').options;
    for (let i = 0; i < opts.length; i++) {
        if (opts[i].value === val) {
            const sng = songSearch[i]
            addSongToPlaylist(sng)
            document.getElementById("songSearchInput").value=''
            return true;
        }
    }

    return false
}

const addSongToPlaylist = (sng) => {
    songPlayer.addSong(sng)
}