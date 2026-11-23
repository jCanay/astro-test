import type { APIRoute } from "astro";
import db from "../../lib/database";

export const prerender = false;

export const GET: APIRoute = () => {
  try {
    const premios = db
      .prepare(
        `
      SELECT id, fecha, premio, premioDesbloqueado
      FROM premios
      ORDER BY id
    `,
      )
      .all() as {
      id: number;
      fecha: string;
      premio: string;
      premioDesbloqueado: number;
    }[];

    const resultado = premios.map((premio) => ({
      ...premio,
      premioDesbloqueado: premio.premioDesbloqueado === 1,
    }));

    return new Response(JSON.stringify(resultado), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("ERROR AL CONSULTAR PREMIOS:", error);

    return new Response(JSON.stringify({ error: "No se pudieron cargar los premios" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
};
