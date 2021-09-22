const express = require('express')
const router = express.Router()

router.get('/create-event', async (req, res) => {
  res.render('create-event')
})

router.post('/create-event', async (req, res) => {
  console.log(req.body)
})

module.exports = router