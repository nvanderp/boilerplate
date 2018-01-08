const path = require('path')
const express = require('express')
const volleyball = require('volleyball')
const bodyParser = require('body-parser')
const session = require('express-session')
const passport = require('passport')
const User = require('./db/models/User')

const app = express()

// session middleware
app.use(session({
    secret: process.env.SESSION_SECRET || 'a secret to everybody',
    resave: false,
    saveUninitialized: false
}))

// passport
app.use(passport.initialize())
app.use(passport.session())

passport.serializeUser((user, done) => {
    try {
        done(null, user.id)
    } catch(err) {
        done(err)
    }
})

passport.deserializeUser((id, done) => {
    User.findById(id)
        .then(user => done(null, user))
        .catch(done)
})

app.use((req, res, next) => {
    console.log('SESSION USER: ', req.user && req.user.id)
    next()
})

// logging middleware
app.use(volleyball)

// body parsing middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// static middleware
app.use(express.static(path.join(__dirname, '../public')))
app.use('/api', require('./apiRoutes')) // include our routes!
app.use('/auth', require('./auth'))

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

module.exports = app