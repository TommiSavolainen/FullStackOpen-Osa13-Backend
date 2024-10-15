const router = require('express').Router();
const { Blog, User, ReadingList } = require('../models');

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

router.get('/:id', async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id, {
            include: {
                model: ReadingList,
                include: {
                    model: Blog,
                    attributes: ['id', 'url', 'title', 'author', 'likes', 'year'],
                },
            },
        });

        if (user) {
            res.json({
                name: user.name,
                username: user.username,
                readings: user.ReadingLists.map((reading) => reading.Blog),
            });
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
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
