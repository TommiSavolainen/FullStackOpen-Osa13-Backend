const router = require('express').Router();
const { ReadingList, User } = require('../models');
const { tokenExtractor, userExtractor } = require('../util/middleware');

router.post('/', async (req, res) => {
    const { blog_id, user_id } = req.body;

    try {
        const readingListEntry = await ReadingList.create({
            blogId: blog_id,
            userId: user_id,
        });
        res.status(201).json(readingListEntry);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.put('/:id', tokenExtractor, userExtractor, async (req, res) => {
    const { read } = req.body;
    const readingListEntry = await ReadingList.findByPk(req.params.id);

    if (!readingListEntry) {
        return res.status(404).json({ error: 'Reading list entry not found' });
    }

    if (readingListEntry.userId !== req.user.id) {
        return res.status(403).json({ error: 'You can only update your own reading list' });
    }

    try {
        readingListEntry.read = read;
        await readingListEntry.save();
        res.status(200).json(readingListEntry);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
