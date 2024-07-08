const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

app.use(express.static('public'));

// PostgreSQL setup
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

pool.query(`
    CREATE TABLE IF NOT EXISTS contacts (
        id SERIAL PRIMARY KEY,
        firstName VARCHAR(50) NOT NULL,
        lastName VARCHAR(50) NOT NULL,
        email VARCHAR(100) NOT NULL,
        phone VARCHAR(20) NOT NULL,
        dateTime TIMESTAMP NOT NULL
    )
`, (err, res) => {
    if (err) {
        console.error('Error creating table:', err);
    } else {
        console.log('Table is successfully created');
    }
});

// Routes
app.post('/contacts', async (req, res) => {
    const { firstName, lastName, email, phone, dateTime } = req.body;
    console.log('Received contact data:', req.body);
    try {
        const result = await pool.query(
            'INSERT INTO contacts (firstName, lastName, email, phone, dateTime) VALUES ($1, $2, $3, $4, $5) RETURNING id',
            [firstName, lastName, email, phone, dateTime]
        );
        console.log('Insert Result:', result.rows[0]);
        res.status(201).send({ id: result.rows[0].id });
    } catch (err) {
        console.error('Error inserting data:', err);
        res.status(500).send(err.message);
    }
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});

