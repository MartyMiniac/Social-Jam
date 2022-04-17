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
                addSongOptions()
            })
        })
    }, 1000)
})

const qryInRes = () => {
    const val = document.getElementById("songSearchInput").value;
    const opts = document.getElementById('songList').options;
    for (let i = 0; i < opts.length; i++) {
        if (opts[i].value === val) {
            addSongToPlaylist(i)
            document.getElementById("songSearchInput").value=''
            return true;
        }
    }

    return false
}

const addSongOptions = () => {
    $('#songList').html('')
    for(let i in songSearch) {
        const ele = songSearch[i]
        $('#songList').append(`
            <option value="${ele.song}" songId = ${ele.id}>${ele.primary_artists}</option>
        `)
    }
}

const addSongToPlaylist = (id) => {
    const sng = songSearch[id]
    lobby.playlist.push(sng)
    renderPlaylist(sng)
}