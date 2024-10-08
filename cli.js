require('dotenv').config();
const { Sequelize, DataTypes, Model } = require('sequelize');

// PostgreSQL-tietokannan yhteys
const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    protocol: 'postgres',
    logging: false, // Aseta true, jos haluat nähdä SQL-kyselyt konsolissa
});

class Blog extends Model {}

// Määrittele malli
Blog.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        author: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        url: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        title: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        likes: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: true,
        },
    },
    {
        sequelize,
        underscored: true,
        tableName: 'blogs',
        timestamps: false,
    }
);

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
