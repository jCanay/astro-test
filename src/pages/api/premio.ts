import type { APIRoute } from "astro";
import db from "../../lib/database";

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const { id } = await request.json();

    if (!Number.isInteger(Number(id))) {
      return new Response(JSON.stringify({ error: "ID no válido" }), { status: 400 });
    }

    const resultado = db
      .prepare(
        `
      UPDATE premios
      SET premioDesbloqueado = 1
      WHERE id = ?
    `,
      )
      .run(Number(id));

    if (resultado.changes === 0) {
      return new Response(JSON.stringify({ error: "Premio no encontrado" }), { status: 404 });
    }

    return new Response(
      JSON.stringify({
        success: true,
        id: Number(id),
        premioDesbloqueado: true,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  } catch (error) {
    console.error("ERROR AL DESBLOQUEAR PREMIO:", error);

    return new Response(JSON.stringify({ error: "Error al desbloquear el premio" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
};
