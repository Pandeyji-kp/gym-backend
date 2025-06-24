const Diet = require('../../modals/diet');


// ✅ New function to fetch diets for specific user
exports.getMemberDiets = async (req, res) => {
    try {
        const { userId } = req.params;
        const diets = await Diet.find({ user: userId }).sort({ date: -1 });
        res.json({ diets });
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch diet plans' });
    }
};

// Create or update a diet plan for a user
exports.createOrUpdateDiet = async (req, res) => {
    try {
        const { userId, date, meal1, meal2, meal3 } = req.body;

        const existing = await Diet.findOne({ user: userId, date });
        if (existing) {
            existing.meal1 = meal1;
            existing.meal2 = meal2;
            existing.meal3 = meal3;
            await existing.save();
            return res.status(200).json({ diet: existing });
        }

        const newDiet = await Diet.create({ user: userId, date, meal1, meal2, meal3 });
        res.status(201).json({ diet: newDiet });
    } catch (err) {
        res.status(500).json({ message: 'Error saving diet plan' });
    }
};

// Get all diet plans
exports.getAllDiets = async (req, res) => {
    const diets = await Diet.find().populate('user', 'name email');
    res.json({ diets });
};

// Get today’s diet for a user
exports.getTodayDiet = async (req, res) => {
    const { userId } = req.params;
    const today = new Date().setHours(0, 0, 0, 0);
    const diet = await Diet.findOne({ user: userId, date: today });
    res.json({ diet });
};
