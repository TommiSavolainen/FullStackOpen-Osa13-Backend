const Blog = require('../models/blog');
const User = require('../models/user');

User.hasMany(Blog, { foreignKey: 'userId' });
Blog.belongsTo(User, { foreignKey: 'userId' });

const syncDatabase = async () => {
    await User.sync({ alter: true });
    await Blog.sync({ alter: true });
};

syncDatabase();

module.exports = {
    Blog,
    User,
};
