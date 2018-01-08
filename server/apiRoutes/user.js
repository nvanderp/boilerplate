const router = require('express').Router()
const User = require('../db/models/User')

router.param('id', (req, res, next, id) => {
    User.findById(id)
        .then(user => {
            if (!user) throw HttpError(404)
            req.requestedUser = user
            next()
        })
        .catch(next)
})

router.get('/', (req, res, next) => {
    User.findAll()
        .then(users => res.json(users))
        .catch(next)
})

module.exports = router