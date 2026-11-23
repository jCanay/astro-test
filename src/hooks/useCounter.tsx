import { useEffect, useMemo, useState } from "react";
import Counter, { type RemainingTime } from "../lib/counter";

interface Props {
  targetDate: string | Date;
}

export const useCounter = ({ targetDate }: Props) => {
  const counter = useMemo(() => new Counter(targetDate), [targetDate]);

  const [time, setTime] = useState<RemainingTime>(() => counter.getRemainingTime());

  useEffect(() => {
    // 1. Definimos el manejador del evento
    const handleUpdate = (event: Event) => {
      const customEvent = event as CustomEvent<RemainingTime>;
      setTime(customEvent.detail);
    };

    // 2. Nos suscribimos y arrancamos el contador
    counter.addEventListener("update", handleUpdate);
    new Promise((r) => setTimeout(r, 1000)).then(() => {});
    counter.start();

    // 3. Limpieza al desmontar el componente
    return () => {
      counter.removeEventListener("update", handleUpdate);
      counter.stop();
    };
  }, [counter]);

  return { time };
};
