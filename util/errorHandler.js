const errorHandler = (error, req, res, next) => {
    console.error(error.message);

    if (error.name === 'SequelizeValidationError') {
        return res.status(400).json({ error: 'Validation error' });
    }

    res.status(500).json({ error: 'Something went wrong' });
};

module.exports = errorHandler;
