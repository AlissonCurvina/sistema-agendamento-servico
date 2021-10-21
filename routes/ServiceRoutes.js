const express = require('express');
const router = express.Router();

const serviceController = require('../controllers/ServiceController')

router.get('/services', serviceController.get_services)

router.get('/service/:id', serviceController.get_service)

router.post('/create-service/', serviceController.create_service)

router.get('/edit-service/:id', serviceController.edit_service)

router.put('/update-service/:id', serviceController.update_service)

router.post('/delete-service', serviceController.delete_service)

module.exports = router