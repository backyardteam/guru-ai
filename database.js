const sqlite3 = require("sqlite3").verbose();
const { open } = require("sqlite");

let db;

async function initDatabase() {
  db = await open({
    filename: "./teacher_assistant.db",
    driver: sqlite3.Database,
  });

  await db.exec(`
        CREATE TABLE IF NOT EXISTS siswa (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nis TEXT UNIQUE,
            nama TEXT NOT NULL,
            kelas TEXT,
            jenis_kelamin TEXT,
            catatan_guru TEXT
        )
    `);

  console.log("Database initialized");
}

function getDb() {
  if (!db) {
    throw new Error("Database belum diinisialisasi");
  }
  return db;
}

module.exports = { initDatabase, getDb };
