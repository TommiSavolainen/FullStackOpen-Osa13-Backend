const router = require('express').Router();
const { tokenExtractor, userExtractor } = require('../util/middleware');
const { Session } = require('../models');

router.delete('/', tokenExtractor, userExtractor, async (req, res) => {
    await Session.destroy({ where: { userId: req.user.id } });
    res.status(204).end();
});

module.exports = router;
