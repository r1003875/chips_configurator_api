const express = require('express');
const router = express.Router();
const bagsController = require('../../controllers/v1/bags');

// Routes
router.get ('/', bagsController.getAll);
router.get ('/:id', bagsController.getById);
router.post('/', bagsController.create);
router.put('/', bagsController.update);
router.delete('/:id', bagsController.destroy);

module.exports = router;