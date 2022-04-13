const ShortUniqueID = require('short-unique-id')
const uid = new ShortUniqueID({length: 10})

exports.generateRoomID = () => {
    return uid()
}