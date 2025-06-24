// app/routes/website/adminRoutes.js or similar

const express = require('express')
const router = express.Router()
const User = require('../../modals/user')
const Bill = require('../../modals/Bill')
const Notification = require('../../modals/Notification') // if exists

router.get('/stats', async (req, res) => {
  try {
    const members = await User.countDocuments({ role: 'member' })
    const pendingBills = await Bill.countDocuments({ status: 'pending' }) // assumes bill has status field
    const notifications = await Notification.countDocuments() // optional

    res.json({
      members,
      pendingBills,
      notifications
    })
  } catch (error) {
    res.status(500).json({ message: 'Failed to load stats' })
  }
})

module.exports = router
