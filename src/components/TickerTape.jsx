import React, { useEffect, useState } from 'react';
import { tickerData } from '../data/tickerData';

/* Real, measured performance readouts appended to the tape shortly after
   load: contentful paint, JS transferred over the wire, and a 1s frame-rate
   sample. Only figures that were actually measured are shown. */
const usePerfStats = () => {
  const [stats, setStats] = useState([]);

  useEffect(() => {
    let cancelled = false;
    const found = [];

    try {
      const paints = performance.getEntriesByType('paint');
      const paint =
        paints.find((p) => p.name === 'first-contentful-paint') ??
        paints[paints.length - 1];
      if (paint) found.push(`PAINT ${Math.round(paint.startTime)}MS`);

      const wire = performance
        .getEntriesByType('resource')
        .filter((r) => r.initiatorType === 'script')
        .reduce((sum, r) => sum + (r.transferSize || 0), 0);
      if (wire > 0) found.push(`JS ${Math.round(wire / 1024)}KB WIRE`);
    } catch {
      /* older browsers — skip the readouts */
    }

    // Sample the frame rate for one second; bail without it if rAF is idle.
    let frames = 0;
    let raf = 0;
    const t0 = performance.now();
    const tick = (now) => {
      frames += 1;
      if (now - t0 >= 1000) {
        if (!cancelled) setStats([...found, `${Math.min(frames, 240)}FPS`]);
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    const bail = setTimeout(() => {
      if (!cancelled) setStats((prev) => (prev.length ? prev : found));
    }, 2500);

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      clearTimeout(bail);
    };
  }, []);

  return stats;
};

/* Ambient ticker strip above the footer. The reel holds the item list twice
   and slides by exactly half its width, so the loop is seamless. Pauses on
   hover. Decorative — hidden from screen readers. */
const TickerTape = () => {
  const perfStats = usePerfStats();
  const items = [...(tickerData.items ?? []), ...perfStats];
  if (items.length === 0) return null;

  const reel = [...items, ...items];

  return (
    <div className="ticker" role="presentation">
      <div className="ticker-reel" aria-hidden="true">
        {reel.map((item, i) => (
          <span key={i} className="ticker-item">
            {item}
            <span className="ticker-sep">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
};

export default TickerTape;
