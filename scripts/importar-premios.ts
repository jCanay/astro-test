import Database from "better-sqlite3";
import fs from "node:fs";
import path from "node:path";

const verbose = process.argv.includes("--verbose");
const db = new Database(path.join(process.cwd(), "data", "counter.db"));

const rutaJSON = path.join(process.cwd(), "src", "data", "counter.json");

const datos = JSON.parse(fs.readFileSync(rutaJSON, "utf-8"));

const insertar = db.prepare(`
  INSERT OR REPLACE INTO premios
  (id, fecha, premio, premioDesbloqueado)
  VALUES (?, ?, ?, ?)
`);

const importar = db.transaction(() => {
  for (const premio of datos.fechasObjetivo) {
    insertar.run(premio.id, premio.fecha, premio.premio, premio.premioDesbloqueado ? 1 : 0);
  }
});

importar();

console.log("Premios importados correctamente.");

if (verbose) {
  const premios = db
    .prepare(
      `
  SELECT id, premioDesbloqueado
  FROM premios
  ORDER BY id
`,
    )
    .all();

  console.log(premios);
}

db.close();
