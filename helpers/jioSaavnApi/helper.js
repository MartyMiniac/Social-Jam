
exports.format_song = (data, lyrics) => {
    if(!data.media_preview_url) {
        //TODO: implement des decipher
        console.log('test')
    }
    else {
        let url = data.media_preview_url
        url = url.replace('preview', 'aac')
        if(data['320kbps']) {
            url=url.replace('_96_p.mp4', '_320.mp4')
        }
        else {
            url=url.replace('_96_p.mp4', '_160.mp4')
        }
        data['media_url'] = url
    }

    // data['song'] = this.format(data['song'])
    // data['music'] = this.format(data['music'])
    // data['singers'] = this.format(data['singers'])
    // data['starring'] = this.format(data['starring'])
    // data['album'] = this.format(data['album'])
    // data["primary_artists"] = this.format(data["primary_artists"])
    // data['image'] = data['image'].replace("150x150","500x500")

    return data
}

exports.format = (s) => {
    // return s.replace("&quot;","'").replace("&amp;", "&").replace("&#039;", "'")
    return s
}

exports.format_album = (data, lyrics) => {
    data['image'] = data['image'].replace("150x150","500x500")
    data['name'] = this.format(data['name'])
    data['primary_artists'] = this.format(data['primary_artists'])
    data['title'] = this.format(data['title'])
    for(let song in data['songs']) {
        song = this.format_song(song,lyrics)
    }

    return data
}

exports.format_playlist = (data,lyrics) => {
    data['firstname'] = this.format(data['firstname'])
    data['listname'] = this.format(data['listname'])
    for(song in data['songs']) {
        song = this.format_song(song,lyrics)
    }
    return data
}