const express = require('express');
const router = express.Router();

const serviceController = require('../controllers/ServiceController')

router.get('/services', serviceController.get_services)

router.post('/create-service', serviceController.create_service)

module.exports = router