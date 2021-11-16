const express = require('express')
const router = express.Router()

const scheduleController = require('../controllers/ScheduleController')

router.get('/all-events', scheduleController.get_all_events)

router.post('/create-event', scheduleController.create_event)

router.post('/get-available-hours', scheduleController.get_available_hours)

router.post('/delete-event', scheduleController.delete_event)

router.get('/send', scheduleController.send_confirmation_email)

module.exports = router