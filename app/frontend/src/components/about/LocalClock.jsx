import { useEffect, useState } from "react";

const format = (tz) =>
  new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", second: "2-digit", timeZone: tz }).format(new Date());

export const LocalClock = ({ timezone }) => {
  const [time, setTime] = useState(() => format(timezone));
  useEffect(() => {
    const id = setInterval(() => setTime(format(timezone)), 1000);
    return () => clearInterval(id);
  }, [timezone]);
  return (
    <span className="font-display text-5xl font-extrabold tabular-nums tracking-tight sm:text-6xl" data-testid="about-local-time">
      {time}
    </span>
  );
};
