import { useEffect, useState } from 'react';

const pad = (n, width = 2) => String(n).padStart(width, '0');

/**
 * Formatted desk time — "09:30:00.000241" — ticking at ~30fps.
 * Milliseconds are real; the trailing microsecond digits are flavor drawn
 * from the high-resolution timer.
 */
export const useDeskClock = (intervalMs = 33) => {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), intervalMs);
    return () => clearInterval(id);
  }, [intervalMs]);

  const micros = pad(Math.floor(performance.now() * 1000) % 1000, 3);
  return `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}.${pad(now.getMilliseconds(), 3)}${micros}`;
};
