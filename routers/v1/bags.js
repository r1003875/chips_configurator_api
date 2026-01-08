const express = require('express');
const router = express.Router();
const bagsController = require('../../controllers/v1/bags');
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage });
const authMiddleware = require('../../middleware/authMiddleware');

// Routes
router.get ('/', bagsController.getAll);
router.get ('/:id', bagsController.getById);
router.post('/', authMiddleware, upload.fields([{ name: "image", maxCount: 1 }, { name: "screenshot", maxCount: 1 }]), bagsController.create);
router.put('/', bagsController.update);
router.delete('/:id', bagsController.destroy);

module.exports = router;