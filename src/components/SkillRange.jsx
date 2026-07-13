import { useEffect, useMemo, useRef, useState } from 'react';
import { skillRange } from '../data/skills';

const RANKS = 'AKQJT98765432'.split('');

/* The opening-range shape: which cells raise, which call. Pairs run down the
   diagonal; suited combos sit above it, offsuit below — same layout as a real
   GTO chart, so it reads instantly at a poker table. */
const actionAt = (r, c) => {
  if (r === c) return 'raise';
  if (r < c) {
    if (r < 3 && c < 6) return 'raise';
    if (r < 5 && c < 9) return 'call';
    if (r === 0) return 'call';
  } else {
    if (c < 2 && r < 4) return 'raise';
    if (c < 3 && r < 7) return 'call';
  }
  return 'fold';
};

/* "AKs" / "T9o" / "A♠A♦" — the combo name for a cell. */
const comboAt = (r, c) => {
  if (r === c) return `${RANKS[r]}♠${RANKS[c]}♦`;
  const hi = RANKS[Math.min(r, c)];
  const lo = RANKS[Math.max(r, c)];
  return `${hi}${lo}${r < c ? 's' : 'o'}`;
};

/* Skills as a 13×13 GTO range chart. Hover a cell to read the combo and the
   skill it carries; the diagonal pulses gently through your core stack. */
const SkillRange = () => {
  const [label, setLabel] = useState(null);
  const [pulse, setPulse] = useState(0);
  const [onStage, setOnStage] = useState(false);
  const boardRef = useRef(null);

  /* skillRange is module-static, so the board is computed exactly once. */
  const cells = useMemo(() => {
    const raise = skillRange.raise ?? [];
    const call = skillRange.call ?? [];
    return RANKS.flatMap((_, r) =>
      RANKS.map((__, c) => {
        const action = actionAt(r, c);
        const pool = action === 'raise' ? raise : action === 'call' ? call : null;
        return {
          r,
          c,
          action,
          combo: comboAt(r, c),
          skill: pool?.length ? pool[(r + c) % pool.length] : 'FOLD',
        };
      })
    );
  }, []);

  // The idle pulse only riffles while the board is actually on screen —
  // no point re-rendering 169 cells every 900ms for a chart below the fold.
  useEffect(() => {
    const io = new IntersectionObserver(
      ([entry]) => setOnStage(entry.isIntersecting),
      { rootMargin: '60px' }
    );
    io.observe(boardRef.current);
    return () => io.disconnect();
  }, []);

  // Idle pulse walking the diagonal — the ambient "dealer riffling" motion.
  useEffect(() => {
    if (!onStage) return undefined;
    const id = setInterval(() => setPulse((p) => (p + 1) % RANKS.length), 900);
    return () => clearInterval(id);
  }, [onStage]);

  const shown =
    label ?? cells[pulse * RANKS.length + pulse];

  /* Tooltip anchor: clamp the column so it never overhangs the board edge;
     flip below the cell on the top two rows. */
  const tipCol = label ? Math.min(Math.max(label.c, 1.8), 11.2) : 0;
  const tipBelow = label ? label.r < 2 : false;

  return (
    <div className="skill-range">
      <div ref={boardRef} className="range-board" onMouseLeave={() => setLabel(null)}>
        <div className="range-grid">
          {cells.map((cell) => (
            <div
              key={`${cell.r}-${cell.c}`}
              className={`range-cell ${cell.action}${
                label && label.r === cell.r && label.c === cell.c ? ' hot' : ''
              }${!label && cell.r === pulse && cell.c === pulse ? ' pulse' : ''}`}
              onMouseEnter={() => setLabel(cell)}
            />
          ))}
        </div>
        {label && (
          <div
            className={`range-tip${tipBelow ? ' below' : ''}`}
            style={{
              left: `${((tipCol + 0.5) / RANKS.length) * 100}%`,
              top: `${((label.r + (tipBelow ? 1 : 0)) / RANKS.length) * 100}%`,
            }}
            aria-hidden="true"
          >
            {label.combo} · {label.skill}
          </div>
        )}
      </div>
      <p className="range-label mono-label" aria-live="polite">
        {shown.combo} · {shown.skill}
      </p>
      <div className="range-legend mono-label">
        <span>
          <i className="range-key raise" /> raise · expert
        </span>
        <span>
          <i className="range-key call" /> call · proficient
        </span>
        <span>
          <i className="range-key fold" /> fold
        </span>
      </div>
    </div>
  );
};

export default SkillRange;
