const express = require('express');
const router = express.Router();
const controller = require('../../controllers/website/notificationController');

router.get('/', controller.getAll);
router.post('/', controller.create);
router.patch('/:id/read', controller.markAsRead); // optional

module.exports = router;
