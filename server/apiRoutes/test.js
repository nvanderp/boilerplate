const router = require('express').Router()
const Test = require('../db/models/Test')

// matches GET requests to /api/home/
router.get('/', (req, res, next) => { res.send('GET request to Test made') })

// matches POST requests to /api/home/
router.post('/', (req, res, next) => { res.send('POST request to Test made') })

// matches PUT requests to /api/home/:homeId
router.put('/:testId', (req, res, next) => { res.send('PUT request to Test made') })

// matches DELTE requests to /api/home/:homeId
router.delete('/:testId', (req, res, next) => { res.send('DELETE request to Test made') })

module.exports = router