const express = require('express');
const { createBill, getAllBills, getBillsByMember, deleteBill } = require('../../controllers/website/billController');
const { protect, isAdmin } = require('../../middleware/website/authMiddleware');

const router = express.Router();

router.post('/', protect, isAdmin, createBill);
router.get('/', protect, isAdmin, getAllBills);
router.get('/member/:id', protect, getBillsByMember);
router.delete('/:id', protect, isAdmin, deleteBill);

module.exports = router;