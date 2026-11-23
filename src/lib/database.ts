import Database from "better-sqlite3";
import path from "node:path";

const rutaDB = path.join(process.cwd(), "data", "counter.db");

const db = new Database(rutaDB);

db.exec(`
  CREATE TABLE IF NOT EXISTS premios (
    id INTEGER PRIMARY KEY,
    fecha TEXT NOT NULL,
    premio TEXT NOT NULL,
    premioDesbloqueado INTEGER NOT NULL DEFAULT 0
  )
`);

export default db;
