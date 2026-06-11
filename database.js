const sqlite3 = require("sqlite3");
const { open } = require("sqlite");
const path = require("path");
const fs = require("fs");

let db;

async function initDatabase() {
  db = await open({
    filename: path.join(__dirname, "teacher_assistant.db"),
    driver: sqlite3.Database,
  });

  const schemaPath = path.join(__dirname, "models", "database.sql");
  if (fs.existsSync(schemaPath)) {
    const schema = fs.readFileSync(schemaPath, "utf8");
    await db.exec(schema);
    console.log("Database initialized");
  } else {
    console.error("File database.sql tidak ditemukan di folder models/");
  }
  return db;
}

function getDb() {
  return db;
}

module.exports = { initDatabase, getDb };
