const express = require('express')
const router = express.Router()

const pagesController = require('../controllers/PageController')

router.get('/', pagesController.get_index_page)

router.get('/cadastrar-usuario', pagesController.get_create_user_page)

router.get('/meus-dados', pagesController.get_data_page)

router.get('/about', pagesController.get_about_page)

module.exports = router