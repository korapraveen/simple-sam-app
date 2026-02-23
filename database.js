const sqlite3 = require('sqlite3').verbose();

// Create a new database object
const db = new sqlite3.Database('./software_assets.db', (err) => {
    if (err) {
        console.error('Error connecting to the database', err.message);
    } else {
        console.log('Connected to the SQLite database.');
    }
});

// Create table to store software assets information
const createAssetsTable = () => {
    const sql = `CREATE TABLE IF NOT EXISTS software_assets (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        version TEXT NOT NULL,
        license_key TEXT NOT NULL,
        purchase_date TEXT NOT NULL,
        renewal_date TEXT NOT NULL
    );`;

    db.run(sql, (err) => {
        if (err) {
            console.error('Error creating software assets table', err.message);
        } else {
            console.log('Software assets table created or already exists.');
        }
    });
};

// Create table to store licenses information
const createLicensesTable = () => {
    const sql = `CREATE TABLE IF NOT EXISTS licenses (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        software_asset_id INTEGER NOT NULL,
        license_type TEXT NOT NULL,
        valid_until TEXT NOT NULL,
        FOREIGN KEY (software_asset_id) REFERENCES software_assets (id)
    );`;

    db.run(sql, (err) => {
        if (err) {
            console.error('Error creating licenses table', err.message);
        } else {
            console.log('Licenses table created or already exists.');
        }
    });
};

// Create table to track renewal information
const createRenewalTable = () => {
    const sql = `CREATE TABLE IF NOT EXISTS renewals (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        license_id INTEGER NOT NULL,
        renewal_date TEXT NOT NULL,
        FOREIGN KEY (license_id) REFERENCES licenses (id)
    );`;

    db.run(sql, (err) => {
        if (err) {
            console.error('Error creating renewals table', err.message);
        } else {
            console.log('Renewals table created or already exists.');
        }
    });
};

// Call the functions to create tables
createAssetsTable();
createLicensesTable();
createRenewalTable();

// Close the database connection
process.on('SIGINT', () => {
    db.close((err) => {
        if (err) {
            console.error('Error closing the database', err.message);
        } else {
            console.log('Database connection closed.');
        }
    });
});
