export interface RemainingTime {
  day: number;
  hour: number;
  minute: number;
  second: number;
  ended: boolean;
}

export default class Counter extends EventTarget {
  static readonly defaultTime: RemainingTime = {
    day: 0,
    hour: 0,
    minute: 0,
    second: 0,
    ended: false,
  };
  targetDate: Date;
  private intervalId: ReturnType<typeof setInterval> | null = null;

  constructor(targetDate: string | Date) {
    super();
    const parsedDate = targetDate instanceof Date ? targetDate : new Date(targetDate);

    if (isNaN(parsedDate.getTime())) {
      throw new Error("La fecha proporcionada no es válida.");
    }

    this.targetDate = parsedDate;
  }

  static format = (value: number) => String(value).padStart(2, "0");

  private calculateTime(): RemainingTime {
    const now = Date.now();
    const target = this.targetDate.getTime();
    const difference = target - now;

    if (difference <= 0) {
      return {
        day: 0,
        hour: 0,
        minute: 0,
        second: 0,
        ended: true,
      };
    }

    return {
      day: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hour: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minute: Math.floor((difference / (1000 * 60)) % 60),
      second: Math.floor((difference / 1000) % 60),
      ended: false,
    };
  }

  public getRemainingTime(): RemainingTime {
    return this.calculateTime();
  }

  public start(): void {
    if (this.intervalId) return; // Evita iniciar dos intervalos a la vez

    this.intervalId = setInterval(() => {
      const remaining = this.calculateTime();

      // Disparamos el evento personalizado con los datos en 'detail'
      this.dispatchEvent(new CustomEvent<RemainingTime>("update", { detail: remaining }));

      if (remaining.ended) {
        this.stop();
      }
    }, 1000);
  }

  // Detiene y limpia el intervalo
  public stop(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }
}
