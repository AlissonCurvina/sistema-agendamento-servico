const express = require('express');
const router = express.Router();

const userController = require('../controllers/UserController')

router.get('/', userController.get_index)

router.get('/about', userController.get_about_page)

router.get('/cadastrar-usuario', userController.get_create_user_page)

router.post('/', userController.login)

router.post('/cadastrar-usuario', userController.create_user)

router.get('/meus-dados', userController.get_my_data)

router.patch('/edit-info', userController.edit_info)

router.delete('/excluir-dados', userController.delete_user)

router.get('/logout', userController.logout)

module.exports = router;