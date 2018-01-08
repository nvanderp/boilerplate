const router = require('express').Router()
const db = require('../db')

// You can put all routes in this file; HOWEVER, this file should almost be like a table of contents for the routers you create

router.use('/user', require('./user'))

router.use((req, res, next) => {
    const err = new Error('Not found.')
    err.status = 404
    next(err)
})

module.exports = router