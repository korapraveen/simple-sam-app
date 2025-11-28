require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
app.use(cors());
app.use(express.json());

// The backend reads its DB credentials from environment variables
// provided by docker-compose.yml.
const pool = new Pool({
  host: 'postgres', // The service name from docker-compose.yml
  port: 5432,
  user: 'postgres',
  password: 'mysecretpassword',
  database: 'sam_db',
});

app.get('/api/software', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM software ORDER BY created_at DESC');
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/software', async (req, res) => {
  const { name, licenses, cost } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO software (name, licenses, cost) VALUES ($1, $2, $3) RETURNING *',
      [name, licenses, cost]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Backend server is running on port ${PORT}`);
});