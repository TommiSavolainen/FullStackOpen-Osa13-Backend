const router = require('express').Router();
const Blog = require('../models/blog');
const { fn, col, literal } = require('sequelize');

router.get('/', async (req, res) => {
    try {
        const authors = await Blog.findAll({
            attributes: ['author', [fn('COUNT', col('id')), 'blogs'], [fn('SUM', col('likes')), 'likes']],
            group: ['author'],
            order: [[literal('likes'), 'DESC']],
        });

        res.status(200).json(authors);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
