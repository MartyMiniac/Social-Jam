const express = require('express')
const router = express.Router()
const axios = require('axios')

router.get('/', (req, res) => {
    if(!req.query.site) {
        return res.status(400).json({
            success: false,
            message: 'Expected site parameter in site query'
        })
    }
    axios({
        method: 'GET',
        responseType: 'stream',
        url: req.query.site
    })
    .then(resp => {
        for(i in resp.headers) {
            res.setHeader(i, resp.headers[i])
        }
        // console.log(JSON.stringify(resp))
        resp.data.pipe(res)
        // res.sendStatus(200)
    })
})

module.exports = router