import { useEffect, useRef, useState } from 'react';
import { statsData } from '../data/statsData';

/* Split "40k" / "3.1ms" / "5×" into prefix + number + suffix. Values with no
   digits (like the "[N]" placeholders) simply render as-is. */
const parseValue = (value) => /^(\D*?)(\d+(?:\.\d+)?)(.*)$/.exec(value);

/* One figure. Sits at its final value until `start`, then rolls up from
   zero over ~1.5s on a cubic ease-out — tabular numerals keep it steady. */
const StatValue = ({ value, start }) => {
  const [shown, setShown] = useState(value);

  useEffect(() => {
    const parts = parseValue(value);
    if (!start || !parts) return undefined;
    const target = parseFloat(parts[2]);
    const decimals = (parts[2].split('.')[1] || '').length;
    const t0 = performance.now();
    let raf = 0;
    const step = (now) => {
      const p = Math.min((now - t0) / 1500, 1);
      const eased = 1 - (1 - p) ** 3;
      setShown(`${parts[1]}${(target * eased).toFixed(decimals)}${parts[3]}`);
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [value, start]);

  return <span className="stat-value">{shown}</span>;
};

/* The big serif figures under About — years, hands, growth, latency. */
const SessionStats = () => {
  const items = statsData.items ?? [];
  const rowRef = useRef(null);
  const [counting, setCounting] = useState(false);

  useEffect(() => {
    if (!rowRef.current) return undefined;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCounting(true);
          io.disconnect();
        }
      },
      { rootMargin: '-60px 0px' }
    );
    io.observe(rowRef.current);
    return () => io.disconnect();
  }, []);

  if (items.length === 0) return null;

  return (
    <div ref={rowRef} className="stats-row">
      {items.map((stat, i) => (
        <div
          key={stat.label}
          className="stat reveal"
          style={{ '--delay': `${i * 70}ms` }}
        >
          <StatValue value={stat.value} start={counting} />
          <span className="stat-label mono-label">{stat.label}</span>
        </div>
      ))}
    </div>
  );
};

export default SessionStats;
