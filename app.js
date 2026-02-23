const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

// Dummy data for demonstration
let assets = [];
let licenses = [];
let renewals = [];

// Routes for assets
app.get('/assets', (req, res) => {
    res.json(assets);
});

app.post('/assets', (req, res) => {
    const asset = req.body;
    assets.push(asset);
    res.status(201).json(asset);
});

// Routes for licenses
app.get('/licenses', (req, res) => {
    res.json(licenses);
});

app.post('/licenses', (req, res) => {
    const license = req.body;
    licenses.push(license);
    res.status(201).json(license);
});

// Routes for renewals
app.get('/renewals', (req, res) => {
    res.json(renewals);
});

app.post('/renewals', (req, res) => {
    const renewal = req.body;
    renewals.push(renewal);
    res.status(201).json(renewal);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
