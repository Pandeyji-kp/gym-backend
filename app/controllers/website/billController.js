const Bill = require('../../modals/Bill') // ✅ Make sure the filename is correct: should be `models`, not `modals`

// Create a new bill
exports.createBill = async (req, res) => {
  try {
    const { member, amount, dueDate, description } = req.body;
    if (!member) return res.status(400).json({ message: 'Member ID is required' });

    const newBill = new Bill({ member, amount, dueDate, description });
    await newBill.save();
    res.status(201).json({ bill: newBill });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all bills
exports.getAllBills = async (req, res) => {
  try {
    const bills = await Bill.find().populate('member');
    res.json(bills);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch bills' });
  }
};

// Get bills by member ID
exports.getBillsByMember = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id || id === 'undefined') {
      return res.status(400).json({ message: 'Member ID is required' });
    }

    const bills = await Bill.find({ member: id }).populate('member');
    res.json({ bills });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching member bills' });
  }
};

// Delete bill
exports.deleteBill = async (req, res) => {
  try {
    const { id } = req.params;
    await Bill.findByIdAndDelete(id);
    res.json({ message: 'Bill deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete bill' });
  }
};
