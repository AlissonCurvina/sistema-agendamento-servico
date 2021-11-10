const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20')
const keys = require('./keys')
const User = require('../models/User')

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user)
  })
})

passport.use(
  new GoogleStrategy({
    clientID: keys.google.clientID,
    clientSecret: keys.google.clientSecret,
    callbackURL: '/auth/google/redirect',
    access_type: 'offline'
  }, (accessToken, refreshToken, data, done) => {
    User.findOne({googleId: data.id}).then( currentUser => {
      if(currentUser) {
        done(null, currentUser)
      } else {
        new User({
          username: data.displayName,
          googleId: data.id,
          accessToken: accessToken
        }).save().then( newUser => {
          console.log(newUser)
          done(null, newUser)
        })
      }
    }).catch(err => {
      console.log(err)
    })
  }
))