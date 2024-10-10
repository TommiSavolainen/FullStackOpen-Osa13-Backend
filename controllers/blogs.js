const router = require('express').Router();
const { tokenExtractor, userExtractor } = require('../util/middleware');
// const { Blog } = require('../models');
const User = require('../models/user');
const Blog = require('../models/blog');
const { Op } = require('sequelize');

const blogFinder = async (req, res, next) => {
    req.blog = await Blog.findByPk(req.params.id);
    next();
};

router.get('/', async (req, res) => {
    try {
        const search = req.query.search;
        let blogs;

        if (search) {
            blogs = await Blog.findAll({
                where: {
                    [Op.or]: [{ title: { [Op.iLike]: `%${search}%` } }, { author: { [Op.iLike]: `%${search}%` } }],
                },
                order: [['likes', 'DESC']],
            });
        } else {
            blogs = await Blog.findAll({
                order: [['likes', 'DESC']],
            });
        }

        res.status(200).json(blogs);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get('/:id', blogFinder, async (req, res) => {
    try {
        if (req.blog) {
            res.status(200).json(req.blog);
        } else {
            res.status(404).json({ error: 'Blog not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.post('/', tokenExtractor, userExtractor, async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ error: 'token missing or invalid' });
        }
        const blog = await Blog.create({
            ...req.body,
            userId: req.user.id,
        });

        res.status(201).json(blog);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.put('/:id', blogFinder, async (req, res) => {
    try {
        if (req.blog) {
            await req.blog.update(req.body);
            res.status(200).json(req.blog);
        } else {
            res.status(404).json({ error: 'Blog not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.put('/:id/likes', blogFinder, async (req, res) => {
    try {
        if (req.blog) {
            req.blog.likes = req.body.likes;
            await req.blog.save();
            res.status(200).json(req.blog);
        } else {
            res.status(404).json({ error: 'Blog not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.delete('/:id', tokenExtractor, userExtractor, blogFinder, async (req, res) => {
    try {
        if (!req.blog) {
            return res.status(404).json({ error: 'Blog not found' });
        }

        if (req.blog.userId !== req.user.id) {
            return res.status(403).json({ error: 'You do not have permission to delete this blog' });
        }

        await req.blog.destroy();
        res.status(204).end();
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
