const express = require('express');
const router = express.Router();

const userController = require('../controllers/UserController')

router.post('/', userController.login)

router.post('/cadastrar-usuario', userController.create_user)

router.patch('/edit-info', userController.edit_info)

router.delete('/excluir-dados', userController.delete_user)

router.get('/logout', userController.logout)

module.exports = router;