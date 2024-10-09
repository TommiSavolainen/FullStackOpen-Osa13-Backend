const router = require('express').Router();
const { Blog } = require('../models');
const { User } = require('../models');

router.get('/', async (req, res) => {
    try {
        const users = await User.findAll({
            include: {
                model: Blog,
            },
        });
        res.status(200).json(users);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.json(user);
    } catch (error) {
        return res.status(400).json({ error });
    }
});

router.put('/:username', async (req, res) => {
    try {
        const user = await User.findOne({ where: { username: req.params.username } });
        if (user) {
            await user.update(req.body);
            return res.json(user);
        }
        return res.status(404).json({ error: 'User not found' });
    } catch (error) {
        return res.status(400).json({ error });
    }
});

module.exports = router;
