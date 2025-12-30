const express = require('express');
const router = express.Router();
const authController = require('../../controllers/v1/auth');
const usersController = require('../../controllers/v1/users');

router.get('/', usersController.getAll);
router.get('/:id', usersController.getById);
router.post('/', usersController.create);
router.post('/signup', authController.signup);
router.post('/login', authController.login);

module.exports = router;