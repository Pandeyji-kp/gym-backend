// app/routes/website/dietRoutes.js
const express = require('express');
const { protect } = require('../../middleware/website/authMiddleware');
const {
  getAllDiets,
  createOrUpdateDiet,
  getTodayDiet,
  getMemberDiets, // ✅ add this
} = require('../../controllers/website/dietController');

const router = express.Router();

router.get('/', protect, getAllDiets);
router.post('/', protect, createOrUpdateDiet);
router.get('/today/:userId', protect, getTodayDiet);
router.get('/member/:userId', protect, getMemberDiets); // ✅ this line

module.exports = router;
