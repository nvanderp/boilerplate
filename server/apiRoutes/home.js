const router = require('express').Router()

// matches GET requests to /api/home/
router.get('/', function (req, res, next) { /* etc */})

// matches POST requests to /api/home/
router.post('/', function (req, res, next) { /* etc */})

// matches PUT requests to /api/home/:homeId
router.put('/:homeId', function (req, res, next) { /* etc */})

// matches DELTE requests to /api/home/:homeId
router.delete('/:homeId', function (req, res, next) { /* etc */})

module.exports = router