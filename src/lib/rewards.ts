const REWARDS_START_DATE = import.meta.env.REWARDS_START_DATE;
const REWARDS_TIME_ZONE = "Europe/Madrid";

export interface Reward {
  id: number;
  title: string;
  description: string;
  unlockDay: number;
}

export const rewards: Reward[] = [
  {
    id: 1,
    title: "Recompensa del día 1",
    description: "Has desbloqueado tu primera recompensa.",
    unlockDay: 1,
  },
  {
    id: 2,
    title: "Recompensa del día 2",
    description: "Has desbloqueado tu segunda recompensa.",
    unlockDay: 2,
  },
  {
    id: 3,
    title: "Recompensa del día 3",
    description: "Has desbloqueado tu tercera recompensa.",
    unlockDay: 3,
  },
];

export function getCurrentCampaignDay(): number {
  const startDate = REWARDS_START_DATE;
  const timeZone = REWARDS_TIME_ZONE;

  if (!/^\d{4}-\d{2}-\d{2}$/.test(startDate)) {
    throw new Error("La fecha de inicio debe tener el formato YYYY-MM-DD");
  }

  const start = new Date(`${startDate}T00:00:00Z`);

  if (Number.isNaN(start.getTime()) || start.toISOString().slice(0, 10) !== startDate) {
    throw new Error("La fecha de inicio no es válida");
  }

  const now = new Date();

  const currentDate = new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);

  const current = new Date(`${currentDate}T00:00:00Z`);

  const difference = current.getTime() - start.getTime();
  const millisecondsPerDay = 24 * 60 * 60 * 1000;

  return Math.max(0, Math.floor(difference / millisecondsPerDay) + 1);
}

export function getUnlockedRewards(): Reward[] {
  const currentCampaignDay = getCurrentCampaignDay();

  return rewards.filter((reward) => reward.unlockDay <= currentCampaignDay);
}

function getMadridMidnight(date: string): Date {
  const target = new Date(`${date}T00:00:00Z`);

  const formatter = new Intl.DateTimeFormat("en-GB", {
    timeZone: REWARDS_TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
  });

  const getOffset = (instant: Date): number => {
    const parts = formatter.formatToParts(instant);
    const values = Object.fromEntries(parts.map((part) => [part.type, part.value]));

    const madridAsUtc = Date.UTC(
      Number(values.year),
      Number(values.month) - 1,
      Number(values.day),
      Number(values.hour),
      Number(values.minute),
      Number(values.second),
    );

    return madridAsUtc - instant.getTime();
  };

  const initialOffset = getOffset(target);
  let result = target.getTime() - initialOffset;

  const correctedOffset = getOffset(new Date(result));

  if (correctedOffset !== initialOffset) {
    result = target.getTime() - correctedOffset;
  }

  return new Date(result);
}

export function getNextUnlockTime(): number | null {
  const currentCampaignDay = getCurrentCampaignDay();

  const nextReward = rewards.find((reward) => reward.unlockDay > currentCampaignDay);

  if (!nextReward) {
    return null;
  }

  const nextDate = new Date(`${REWARDS_START_DATE}T00:00:00Z`);

  nextDate.setUTCDate(nextDate.getUTCDate() + nextReward.unlockDay - 1);

  const nextDateString = nextDate.toISOString().slice(0, 10);

  return getMadridMidnight(nextDateString).getTime();
}

export interface Countdown {
  hours: number;
  minutes: number;
  seconds: number;
}

export function getCountdown(targetTime: number): Countdown {
  const remainingMilliseconds = Math.max(0, targetTime - Date.now());

  const totalSeconds = Math.floor(remainingMilliseconds / 1000);

  return {
    hours: Math.floor(totalSeconds / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  };
}

export function getNextRewardCountdown(): Countdown | null {
  const nextUnlockTime = getNextUnlockTime();

  if (nextUnlockTime === null) {
    return null;
  }

  return getCountdown(nextUnlockTime);
}
