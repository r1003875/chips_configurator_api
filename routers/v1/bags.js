const express = require('express');
const router = express.Router();
const bagsController = require('../../controllers/v1/bags');
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Routes
router.get ('/', bagsController.getAll);
router.get ('/:id', bagsController.getById);
router.post('/', upload.single("image"), bagsController.create);
router.put('/', bagsController.update);
router.delete('/:id', bagsController.destroy);

module.exports = router;