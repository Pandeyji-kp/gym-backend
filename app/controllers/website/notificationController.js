const Notification = require('../../modals/Notification');

// GET all notifications (with optional role filter)
exports.getAll = async (req, res) => {
    try {
        const role = req.query.role;
        const filter = role && role !== 'all' ? { role: { $in: ['all', role] } } : {};
        const notifications = await Notification.find(filter).sort({ createdAt: -1 });
        res.json({ notifications });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

// CREATE a new notification
exports.create = async (req, res) => {
    try {
        const { title, message, role, recipient } = req.body;

        if (!title || !message) {
            return res.status(400).json({ message: 'Title and message are required' });
        }

        // If recipient is present, role becomes optional
        if (!recipient && !role) {
            return res.status(400).json({ message: 'Either role or recipient is required' });
        }

        const notification = new Notification({
            title,
            message,
            role: recipient ? undefined : role || 'all',
            recipient: recipient || undefined,
        });

        await notification.save();
        res.status(201).json({ notification });
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: 'Failed to create notification' });
    }
};

// MARK as read (optional)
exports.markAsRead = async (req, res) => {
    try {
        const { id } = req.params;
        const notification = await Notification.findByIdAndUpdate(id, { isRead: true }, { new: true });
        res.json({ notification });
    } catch (err) {
        res.status(400).json({ message: 'Failed to update notification' });
    }
};
