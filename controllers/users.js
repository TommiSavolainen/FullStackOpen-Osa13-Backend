const router = require('express').Router();
const { Blog, User, ReadingList } = require('../models');
const { tokenExtractor, userExtractor } = require('../util/middleware');

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
        return res.status(400).json({ error: error.message });
    }
});

router.get('/:id', tokenExtractor, userExtractor, async (req, res) => {
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

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        let readings = user.ReadingLists.map((reading) => ({
            id: reading.Blog.id,
            url: reading.Blog.url,
            title: reading.Blog.title,
            author: reading.Blog.author,
            likes: reading.Blog.likes,
            year: reading.Blog.year,
            readinglists: [
                {
                    read: reading.read,
                    id: reading.id,
                },
            ],
        }));

        if (req.query.read) {
            const readFilter = req.query.read === 'true';
            readings = readings.filter((reading) => reading.readinglists[0].read === readFilter);
        }

        res.json({
            name: user.name,
            username: user.username,
            readings,
        });
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
        return res.status(400).json({ error: error.message });
    }
});

module.exports = router;
