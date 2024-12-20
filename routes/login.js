const express = require('express');
const { check, validationResult } = require('express-validator');
const router = express.Router();
const authController = require('../controllers/authController');

// router.post('/register', [
//   check('username').isLength({ min: 3 }).withMessage('O nome de usuário deve ter pelo menos 3 caracteres'),
//   check('email').isEmail().withMessage('Insira um e-mail válido'),
//   check('password').isLength({ min: 6 }).withMessage('A senha deve ter pelo menos 6 caracteres')
// ], authController.register);


// router.get('/', authController.getUsers);
router.post('/', authController.login);

module.exports = router;
