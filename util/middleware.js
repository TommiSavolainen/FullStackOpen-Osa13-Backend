const jwt = require('jsonwebtoken');
const { SECRET } = require('./config');
const User = require('../models/user');

const tokenExtractor = (request, response, next) => {
    const authorization = request.get('authorization');
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        request.token = authorization.substring(7);
    }
    next();
};

const userExtractor = async (request, response, next) => {
    if (request.token) {
        const decodedToken = jwt.verify(request.token, SECRET);
        if (decodedToken.id) {
            request.user = await User.findByPk(decodedToken.id);
        }
    }
    next();
};

module.exports = { tokenExtractor, userExtractor };
