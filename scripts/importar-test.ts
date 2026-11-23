import Database from "better-sqlite3";
import path from "node:path";

const verbose = process.argv.includes("--verbose");
const db = new Database(path.join(process.cwd(), "data", "counter.db"));

const insertar = db.prepare(`
  INSERT OR REPLACE INTO premios
  (id, fecha, premio, premioDesbloqueado)
  VALUES (?, ?, ?, 0)
`);

const ahora = Date.now();

const importar = db.transaction(() => {
  for (let i = 1; i <= 25; i++) {
    const fecha = new Date(ahora + i * 10_000).toISOString();

    insertar.run(i, fecha, `Premio de prueba ${i}`);

    if (verbose) console.log(`Premio ${i}: ${fecha}`);
  }
});

importar();

console.log("25 premios de prueba generados correctamente.");

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
