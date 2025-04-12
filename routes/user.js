const express = require('express');
const multer = require('multer');

const router = express.Router();

// database
const User = require('../models/User');

const storage = multer({ storage: null });

router.get('/', async (req, res) => {
    try {
        let users = await User.find();
        res.status(200).json({ users });
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.post("/add", storage.none(), async (req, res) => {
    try {
        const data = req.body;
        const user = new User(data);
        await user.save();
        res.status(200).json({ message: 'Add user successfully!' });
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Update a task
router.put('/change/:id', storage.none(), async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        Object.assign(user, req.body);
        const updatedUser = await user.save();
        // res.json(updatedUser);
        res.json({ message: 'user change successfully!' })
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        await user.deleteOne();
        res.json({ message: 'User deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;