import type { RemainingTime } from "../lib/counter";
import Counter from "../lib/counter";

interface Props {
  time?: RemainingTime;
}

export default function MainCounter({ time = Counter.defaultTime }: Props) {
  return (
    <time>
      {time.day !== 0 && `${Counter.format(time.day)}:`}
      {Counter.format(time.hour)}:{Counter.format(time.minute)}:{Counter.format(time.second)}
    </time>
  );
}
