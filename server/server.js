const path = require('path')
const express = require('express')
const volleyball = require('volleyball')
const bodyParser = require('body-parser')

const app = express()

//logging middleware
app.use(volleyball)

//body parsing middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// static middleware
app.use(express.static(path.join(__dirname, '../public')))
app.use('/api', require('./apiRoutes')); // include our routes!

// Any routes or other various middlewares should go here!

// Send index.html for any other requests
app.get('*', function (req, res, next) {
    res.sendFile(path.join(__dirname, '../public/index.html'))
})

//error handling middleware
app.use((err, req, res, next) => {
    console.error(err)
    console.error(err.stack)
    res.status(err.status || 500).send(err.message || 'Internal server error')
})

module.export = app