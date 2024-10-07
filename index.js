const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();
const express = require('express');
const app = express();

// PostgreSQL-tietokannan yhteys
const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    protocol: 'postgres',
    logging: false, // Aseta true, jos haluat nähdä SQL-kyselyt konsolissa
});

// Määrittele malli
const Blog = sequelize.define(
    'Blog',
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: Sequelize.UUIDV4,
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
            type: DataTypes.SMALLINT,
            allowNull: true,
        },
    },
    {
        tableName: 'blogs',
        timestamps: false,
    }
);

// Testaa yhteys ja synkronoi mallit
sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
        return sequelize.sync();
    })
    .catch((err) => {
        console.error('Unable to connect to the database:', err);
    });

app.get('/api/notes', async (req, res) => {
    try {
        const blogs = await Blog.findAll();
        res.status(200).json(blogs);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} url: http://localhost:${PORT}`);
});
// const { createClient } = require('@supabase/supabase-js');
// require('dotenv').config();
// const supabaseUrl = 'https://hiqnjktmuwtpzgbgnljh.supabase.co';
// const supabaseKey = process.env.SUPABASE_KEY;
// const express = require('express');
// const app = express();
// const supabase = createClient(supabaseUrl, supabaseKey);

// app.get('/api/notes', async (req, res) => {
//     const { data, error } = await supabase.from('blogs').select('*');
//     if (error) {
//         res.status(400).json({ error: error.message });
//     } else {
//         res.status(200).json(data);
//     }
// });
// const PORT = process.env.PORT || 3001;
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT} url: http://localhost:${PORT}`);
// });
