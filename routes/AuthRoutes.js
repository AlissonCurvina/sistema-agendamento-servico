const express = require('express')
const router = express.Router()
const passport = require('passport')

router.get('/auth/google', passport.authenticate('google', {
  scope: ['profile','https://www.googleapis.com/auth/calendar.events'],
  prompt: 'consent'
})) 

router.get('/auth/google/redirect', passport.authenticate('google'), (req, res) => {
  res.redirect('/')
})

module.exports = router