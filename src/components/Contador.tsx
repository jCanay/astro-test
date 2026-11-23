import { useEffect, useState } from "react";

interface Props {
  id: number;
  premio: string;
  fechaObjetivo: string;
  desbloqueado: boolean;
}

export default function Contador({ id, premio, fechaObjetivo, desbloqueado }: Props) {
  const [premioDesbloqueado, setPremioDesbloqueado] = useState(desbloqueado);

  useEffect(() => {
    console.log("Página/componente cargado");
  }, []);

  // Api
  const desbloquearPremio = async () => {
    try {
      const respuesta = await fetch("/api/premio", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      if (!respuesta.ok) {
        const error = await respuesta.json();
        throw new Error(error.error || "No se pudo desbloquear el premio");
      }

      const resultado = await respuesta.json();

      if (resultado.success) {
        setPremioDesbloqueado(true);
      }
    } catch (error) {
      console.error("Error al desbloquear:", error);
    }
  };

  const calcularTiempo = () => {
    const ahora = new Date().getTime();
    const objetivo = new Date(fechaObjetivo).getTime();

    const diferencia = objetivo - ahora;

    if (diferencia <= 0) {
      return {
        dias: 0,
        horas: 0,
        minutos: 0,
        segundos: 0,
        finalizado: true,
      };
    }

    return {
      dias: Math.floor(diferencia / (1000 * 60 * 60 * 24)),
      horas: Math.floor((diferencia / (1000 * 60 * 60)) % 24),
      minutos: Math.floor((diferencia / (1000 * 60)) % 60),
      segundos: Math.floor((diferencia / 1000) % 60),
      finalizado: false,
    };
  };

  const [tiempo, setTiempo] = useState(calcularTiempo);

  useEffect(() => {
    const intervalo = setInterval(() => {
      setTiempo(calcularTiempo());
    }, 1000);

    return () => clearInterval(intervalo);
  }, [fechaObjetivo]);

  const f = (valor) => String(valor).padStart(2, "0");

  if (premioDesbloqueado || tiempo.finalizado) {
    return (
      <div className="counter ended">
        {premioDesbloqueado ? (
          <div className="premio-desbloqueado">¡Premio desbloqueado!: {premio}</div>
        ) : (
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              console.log("CLICK DETECTADO");
              desbloquearPremio();
            }}
          >
            Desbloquear premio
          </button>
        )}
      </div>
    );
  }

  return (
    <span className="counter">
      {f(tiempo.dias)}:{f(tiempo.horas)}:{f(tiempo.minutos)}:{f(tiempo.segundos)}
    </span>
  );
}
