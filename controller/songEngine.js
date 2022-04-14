const jiosaavn = require('../helpers/jioSaavnApi/jiosaavn')

exports.searchSong = (query) => {
    return jiosaavn.search_for_song(query)
}