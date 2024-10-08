require('dotenv').config();
const { sequelize } = require('./util/db');
const Blog = require('./models/blog');

// Funktio blogien tulostamiseen
const printBlogs = async () => {
    try {
        await sequelize.authenticate();
        const blogs = await Blog.findAll();
        blogs.forEach((blog) => {
            console.log(`${blog.author}: '${blog.title}', ${blog.likes} likes`);
        });
        await sequelize.close();
    } catch (error) {
        console.error('Error fetching blogs:', error);
    }
};

// Kutsu funktiota
printBlogs();
