const express = require('express');
const router = express.Router();
const usersController = require('../../controllers/v1/users');

router.get('/', usersController.getAll);
router.get('/:id', usersController.getById);
router.post('/', usersController.create);

module.exports = router;