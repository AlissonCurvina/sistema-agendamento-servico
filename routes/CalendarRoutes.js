const express = require('express')
const router = express.Router()
const passport = require('passport')
const User = require('../models/User')
const axios = require('axios')

router.get('/events', async (req, res) => {
  const {google} = require('googleapis')

  const auth = {accessToken: req.user.accessToken}

  const calendar = google.calendar({version: 'v3', auth});

  console.log(calendar.calendarList.list())
  
})

module.exports = router