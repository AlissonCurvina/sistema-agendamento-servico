const express = require('express')
const router = express.Router()

const scheduleController = require('../controllers/ScheduleController')

router.get('/all-events', scheduleController.get_all_events)

router.post('/create-event', async (req, res) => {
  console.log(req.body)
})

module.exports = router