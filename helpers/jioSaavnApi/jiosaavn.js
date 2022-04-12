const JioSaavnEndpoints = require('./endpoints')
const helpers = require('./helper')
const axios = require('axios')

exports.search_for_song = (query, lyrics, songData) => {
    return new Promise((resolve, refuse) => {
        const apiCallUrl = JioSaavnEndpoints.search_base_url+query.replace(' ', '%20')
        axios.get(apiCallUrl)
        .then(data => {
            let song_response = data.data.songs.data
            if(!song_response) {
                return song_response
            }
            Promise.all(song_response.map(song => {
                return new Promise((resolve, refuse) => {
                    const id = song.id
                    this.get_song(id, lyrics)
                    .then(data => {
                        resolve(data)
                    })
                })
            }))
            .then(songs => {
                resolve(songs)
            })
        })
        
    })
}

exports.get_song = (id, lyrics) => {
    return new Promise((resolve, refuse) => {
        const song_details_base_url = JioSaavnEndpoints.song_details_base_url+id
        axios.get(song_details_base_url)
        .then(data => {
            const key = Object.keys(data.data)
            const song = data.data[key]
            const song_data = helpers.format_song(song, lyrics)
            if(song_data) {
                resolve(song_data)
            }
        })
    })
}