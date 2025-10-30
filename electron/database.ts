import Database from "better-sqlite3";
import path from "path";
import fs from "fs";

// Folder for the database
const dbFolder = path.join(__dirname, "db");

// Create the folder if it doesn't exist
if (!fs.existsSync(dbFolder)) {
  fs.mkdirSync(dbFolder);
}

// Path to the SQLite file
const dbPath = path.join(dbFolder, "data.db");

// Create empty file if it doesn't exist
if (!fs.existsSync(dbPath)) {
  fs.writeFileSync(dbPath, "");
}

// Open database
const db = new Database(dbPath);

// Create the table if it doesn't exist
db.prepare(`
    CREATE TABLE IF NOT EXISTS snippets (
                                            id INTEGER PRIMARY KEY AUTOINCREMENT,
                                            name TEXT NOT NULL,
                                            code TEXT NOT NULL,
                                            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
`).run();

export default db;
