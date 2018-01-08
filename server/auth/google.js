const router = require('express').Router()
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
const passport = require('passport')
const User = require('../db/models/User')

// collect our google configuration into an object
const googleConfig = {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK
}

// configure the strategy with our config object, and write the function that passport will invoke after google sends
// us the user's profile and access token
const strategy = new GoogleStrategy(googleConfig, function(token, refreshToken, profile, done) {
    const googleId = profile.id
    const name = profile.displayName
    const email = profile.emails[0].value
  
    User.findOne({ where: { googleId: googleId }})
        .then(function (user) {
            if (!user) {
                return User.create({ name, email, googleId })
                    .then(function(user) {
                        done(null, user)
                    })
            } else {
                done(null, user)
            }
        })
        .catch(done)
});

passport.use(strategy)

// 1. Client request to login through Google -- `http://localhost:3000/auth/google`
router.get('/', passport.authenticate('google', { scope: 'email' }))

// 2. Client hits this once they have verified with the provider (the callback URL)
   // `http://localhost:3000/auth/google/callback`
router.get('/callback', passport.authenticate('google', { failureRedirect: '/' }),      // should this be auth/google/callback? I don't believe so
    (req, res) => {
        // res.redirect('/')
        res.send('Google authentication complete!')
    }
)

module.exports = router
