const User = require('../../modals/user')

exports.getAllMembers = async (req, res) => {
  try {
    const members = await User.find({ role: 'member' }).sort({ createdAt: -1 }).select('-password')
    res.json({ members })
  } catch (err) {
    res.status(500).json({ message: 'Server error fetching members' })
  }
}

exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id)
    res.json({ message: 'User deleted successfully' })
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete user' })
  }
}
