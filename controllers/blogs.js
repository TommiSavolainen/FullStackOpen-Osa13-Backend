const router = require('express').Router();
const { Blog } = require('../models');

const blogFinder = async (req, res, next) => {
    req.blog = await Blog.findByPk(req.params.id);
    next();
};

router.get('/', async (req, res) => {
    try {
        const blogs = await Blog.findAll();
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

router.post('/', async (req, res) => {
    try {
        const blog = await Blog.create(req.body);
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

router.delete('/:id', blogFinder, async (req, res) => {
    try {
        if (req.blog) {
            await req.blog.destroy();
            res.status(204).end();
        } else {
            res.status(404).json({ error: 'Blog not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
