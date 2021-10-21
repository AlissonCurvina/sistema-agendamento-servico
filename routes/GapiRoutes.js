const express = require('express')
const router = express.Router()

const gapiController = require('../controllers/GapiController')

router.get('/auth', gapiController.get_google_consent_page)

router.get('/get-access-token/', gapiController.get_access_token)

module.exports = router