const express = require('express');
const router = express.Router();
const votesController = require('../../controllers/v1/votes');

// Routes
router.get('/', votesController.getAll);
router.get('/:id', votesController.getById);
router.post('/', votesController.create);

module.exports = router;