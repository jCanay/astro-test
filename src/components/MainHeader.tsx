import { useEffect } from "react";
import { useCounter } from "../hooks/useCounter";
import type { RemainingTime } from "../lib/counter";
import "./css/main-header.css";
import MainCounter from "./MainCounter";

const targetDate = "2026-12-01T00:00:00";

export default function MainHeader() {
  const { time } = useCounter({ targetDate });

  useEffect(() => {
    const checkTime = () => {
      if (time.ended) alert("Ya puedes abrir el primer regalo!!");
    };

    checkTime();
  }, [time]);

  const formatRelativeTime = (time: RemainingTime): string => {
    if (time.day === 0) {
      return "dentro de poco";
    }

    if (time.day === 1) {
      return "mañana";
    }

    return `en ${time.day} días`;
  };

  return (
    <header>
      <div className="wrapper">
        <section>
          <h2>
            La apertura comienza <span>{formatRelativeTime(time)}</span>
          </h2>
          <MainCounter time={time} />
        </section>
      </div>
    </header>
  );
}
