const express = require('express');
const router = express.Router();
const votesController = require('../../controllers/v1/votes');
const authMiddleware = require('../../middleware/authMiddleware');
const { get } = require('mongoose');

// Routes
router.get('/', votesController.getAll);
router.get('/me', authMiddleware, votesController.getMyVotes);
router.get('/:id', votesController.getById);
router.post('/', authMiddleware, votesController.create);

module.exports = router;