// /app/routes/website/userRoutes.js
const express = require('express')
const { getAllMembers, deleteUser } = require('../../controllers/website/userController')
const { protect, isAdmin } = require('../../middleware/website/authMiddleware')

const router = express.Router()

router.get('/', protect,  getAllMembers)
router.delete('/:id', protect,  deleteUser)

module.exports = router
