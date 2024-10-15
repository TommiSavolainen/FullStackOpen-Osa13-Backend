const Blog = require('../models/blog');
const User = require('../models/user');
const ReadingList = require('../models/readinglist');

// Määritellään suhteet
User.hasMany(Blog, { foreignKey: 'userId' });
Blog.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(ReadingList, { foreignKey: 'userId' });
ReadingList.belongsTo(User, { foreignKey: 'userId' });

Blog.hasMany(ReadingList, { foreignKey: 'blogId' });
ReadingList.belongsTo(Blog, { foreignKey: 'blogId' });

module.exports = {
    Blog,
    User,
    ReadingList,
};
