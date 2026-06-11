const sqlite3 = require('sqlite3');
const { open } = require('sqlite');
const path = require('path');
const fs = require('fs');

let db;

async function initDatabase() {
    db = await open({
        filename: path.join(__dirname, 'teacher_assistant.db'),
        driver: sqlite3.Database
    });

    const schema = fs.readFileSync(path.join(__dirname, 'models', 'database.sql'), 'utf8');
    await db.exec(schema);
    
    console.log('Database initialized');
    return db;
}

function getDb() {
    return db;
}

module.exports = { initDatabase, getDb };