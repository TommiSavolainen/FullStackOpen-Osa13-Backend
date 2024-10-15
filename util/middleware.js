const jwt = require('jsonwebtoken');
const { SECRET } = require('./config');
const User = require('../models/user');
const Session = require('../models/session');

const tokenExtractor = (request, response, next) => {
    const authorization = request.get('authorization');
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        request.token = authorization.substring(7);
    } else {
        request.token = null;
    }
    next();
};

const userExtractor = async (request, response, next) => {
    if (request.token) {
        try {
            const decodedToken = jwt.verify(request.token, SECRET);
            if (decodedToken.id) {
                request.user = await User.findByPk(decodedToken.id);
            }
            if (!request.user) {
                return response.status(401).json({ error: 'token invalid' });
            }

            if (request.user.disabled) {
                return response.status(403).json({ error: 'account disabled' });
            }

            const session = await Session.findOne({ where: { token: request.token } });

            if (!session) {
                return response.status(401).json({ error: 'session invalid' });
            }
        } catch (error) {
            return response.status(401).json({ error: 'token invalid' });
        }
    } else {
        return response.status(401).json({ error: 'token missing' });
    }
    next();
};

module.exports = { tokenExtractor, userExtractor };
