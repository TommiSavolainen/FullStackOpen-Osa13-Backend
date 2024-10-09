const errorHandler = (error, req, res, next) => {
    console.error(error.message);

    if (error.name === 'SequelizeValidationError') {
        const messages = error.errors.map((err) => err.message);
        return res.status(400).json({ error: messages });
    }

    res.status(500).json({ error: 'Something went wrong' });
};

module.exports = errorHandler;
