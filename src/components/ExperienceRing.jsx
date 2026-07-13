import { useMemo, useRef, useState } from 'react';
import { useSpring } from '../hooks/useSpring';
import LiveTag from './ui/LiveTag';

/* Dial geometry — one coordinate system, every radius measured from CENTER.
   The ring is an SPSC-style buffer: each experience owns a contiguous run of
   CELLS_PER_SLOT small cells at R_CELLS. Activating a slot enqueues its cells
   in a gold cascade while the gilded pointer springs over. The pointer lives
   in the open annulus between the medallion face and the cells. */
const CENTER = 170;
const VIEWBOX = `0 0 ${CENTER * 2} ${CENTER * 2}`;
const R_GUIDE_OUTER = 161;
const R_LABELS = 156;
const R_CELLS = 140;
const R_GUIDE_INNER = 106;
const R_MEDALLION = 92;
const CELLS_PER_SLOT = 10;
const CELL_FILL = 0.64; // drawn fraction of each cell's angular pitch
const CASCADE_MS = 24; // per-cell stagger when a slot enqueues

const toRad = (deg) => (deg * Math.PI) / 180;

const pointAt = (radius, deg) => [
  CENTER + radius * Math.cos(toRad(deg)),
  CENTER + radius * Math.sin(toRad(deg)),
];

/* Clockwise arc between two angles at a given radius. */
const arcPath = (radius, from, to) => {
  const [x0, y0] = pointAt(radius, from);
  const [x1, y1] = pointAt(radius, to);
  const large = to - from > 180 ? 1 : 0;
  return `M${x0.toFixed(2)} ${y0.toFixed(2)} A${radius} ${radius} 0 ${large} 1 ${x1.toFixed(2)} ${y1.toFixed(2)}`;
};

/* Shortest signed rotation (degrees in [-180, 180)) from one angle to another. */
const shortestDelta = (from, to) => ((((to - from) % 360) + 540) % 360) - 180;

/* Slot numerals — I, II, III… reads as a regal dial face. */
const toRoman = (n) => {
  const table = [
    [10, 'X'],
    [9, 'IX'],
    [5, 'V'],
    [4, 'IV'],
    [1, 'I'],
  ];
  let value = n;
  let out = '';
  for (const [amount, glyph] of table) {
    while (value >= amount) {
      out += glyph;
      value -= amount;
    }
  }
  return out;
};

/* "[Start] -- [End]" → ["[Start]", "[End]"]; a plain string stays whole. */
const splitPeriod = (period) =>
  String(period ?? '')
    .split(/\s*(?:--|–|—)\s*/)
    .filter(Boolean)
    .slice(0, 2);

const GuideRings = () => (
  <g>
    <circle cx={CENTER} cy={CENTER} r={R_GUIDE_OUTER} className="exp-guide" />
    <circle cx={CENTER} cy={CENTER} r={R_GUIDE_INNER} className="exp-guide faint" />
    <circle cx={CENTER} cy={CENTER} r={R_CELLS} className="exp-track" />
  </g>
);

/* Chronometer minute-track inside the annulus — 60 fine ticks, fives longer. */
const MinuteTrack = () => (
  <g>
    {Array.from({ length: 60 }, (_, i) => {
      const angle = -90 + i * 6;
      const five = i % 5 === 0;
      const [x0, y0] = pointAt(126, angle);
      const [x1, y1] = pointAt(five ? 131 : 129, angle);
      return (
        <line
          key={i}
          className={`exp-minute${five ? ' five' : ''}`}
          x1={x0.toFixed(2)}
          y1={y0.toFixed(2)}
          x2={x1.toFixed(2)}
          y2={y1.toFixed(2)}
        />
      );
    })}
  </g>
);

/* Diamond pips marking the slot boundaries. */
const SlotPips = ({ slots }) => (
  <g>
    {slots.map(({ pip }, i) => (
      <rect
        key={i}
        className="exp-tick-pip"
        x={(pip[0] - 2.2).toFixed(2)}
        y={(pip[1] - 2.2).toFixed(2)}
        width="4.4"
        height="4.4"
        transform={`rotate(45 ${pip[0].toFixed(2)} ${pip[1].toFixed(2)})`}
      />
    ))}
  </g>
);

/* Buffer cells. Activating cells stagger in via transition-delay (the
   cascade); deactivating cells release together with no delay. */
const BufferCells = ({ slots, active }) => (
  <g>
    {slots.map(({ cells }, s) =>
      cells.map((d, j) => {
        const on = s === active;
        return (
          <path
            key={`${s}-${j}`}
            d={d}
            className={`exp-cell${on ? ' on' : ''}`}
            style={{ transitionDelay: on ? `${j * CASCADE_MS}ms` : '0ms' }}
          />
        );
      })
    )}
  </g>
);

const SlotNumerals = ({ slots, active }) => (
  <g>
    {slots.map(({ numeral, labelX, labelY }, i) => (
      <text
        key={i}
        className={`exp-slot-label${i === active ? ' is-active' : ''}`}
        x={labelX.toFixed(2)}
        y={labelY.toFixed(2)}
        textAnchor="middle"
      >
        {numeral}
      </text>
    ))}
  </g>
);

/* Stem + diamond, drawn pointing at 12 o'clock; rotation is applied to the
   group via the SVG rotate(deg cx cy) attribute by the spring each frame. */
const Pointer = ({ pointerRef }) => (
  <g ref={pointerRef} className="exp-pointer">
    <line x1={CENTER} y1={CENTER - 98} x2={CENTER} y2={CENTER - 118} />
    <path d={`M${CENTER} ${CENTER - 128} l5 8 l-5 8 l-5 -8 z`} />
  </g>
);

/* Medallion face — dates of the active experience stacked around a gold
   divider, with the company inscribed coin-style along the inner top arc
   and a single pip resting at the base. */
const Medallion = ({ period, inscription }) => {
  const dates = splitPeriod(period);
  return (
    <g>
      <circle cx={CENTER} cy={CENTER} r={R_MEDALLION} className="exp-medallion" />
      <defs>
        <path id="exp-med-orbit-path" d={arcPath(72, 180, 360)} />
      </defs>
      {inscription && (
        <g key={`orbit-${inscription}`} className="exp-med-swap">
          <text className="exp-med-orbit" textAnchor="middle">
            <textPath href="#exp-med-orbit-path" startOffset="50%">
              {inscription.toUpperCase()}
            </textPath>
          </text>
        </g>
      )}
      <text
        className="exp-med-pip"
        x={CENTER}
        y={CENTER + 68}
        textAnchor="middle"
        aria-hidden="true"
      >
        ♦
      </text>
      <g key={period} className="exp-med-swap">
        {dates.length === 2 ? (
          <>
            <text className="exp-med-date" x={CENTER} y={CENTER - 12} textAnchor="middle">
              {dates[0]}
            </text>
            <line
              className="exp-med-divider"
              x1={CENTER - 12}
              y1={CENTER}
              x2={CENTER + 12}
              y2={CENTER}
            />
            <text className="exp-med-date" x={CENTER} y={CENTER + 22} textAnchor="middle">
              {dates[1]}
            </text>
          </>
        ) : (
          <text className="exp-med-date" x={CENTER} y={CENTER + 6} textAnchor="middle">
            {dates[0] ?? ''}
          </text>
        )}
      </g>
    </g>
  );
};

/* Invisible wide arcs above everything else — keyboard and tap targets.
   Mouse hover is handled by cursor tracking on the svg itself. */
const HitAreas = ({ slots, onSelect }) => (
  <g>
    {slots.map(({ hitPath, exp }, i) => (
      <path
        key={i}
        d={hitPath}
        className="exp-hit"
        tabIndex={0}
        role="button"
        aria-label={`${exp.where || exp.company} — ${exp.title}`}
        onFocus={() => onSelect(i)}
        onClick={() => onSelect(i)}
      />
    ))}
  </g>
);

/* Cursor angles steadier than this radius from the hub drive the pointer;
   closer in, tiny hand movements would whip the angle around. */
const R_TRACK_MIN = 40;

/* Desktop dial view of the experiences — an SPSC-style ring of buffer slots,
   one per role. The gilded pointer follows the cursor's angle anywhere over
   the dial (spring-smoothed); the slot under that angle enqueues its cells
   in a gold cascade while the medallion shows its dates and the detail panel
   rises in beside the dial. Leaving the dial settles the pointer back onto
   the active slot. */
const ExperienceRing = ({ experiences }) => {
  const step = 360 / experiences.length;
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);
  const headingRef = useRef(0);
  const svgRef = useRef(null);
  const pointerRef = useRef(null);
  const tailRef = useRef(null);

  const slots = useMemo(() => {
    const cellStep = step / CELLS_PER_SLOT;
    const cellSpan = cellStep * CELL_FILL;
    return experiences.map((exp, i) => {
      const angle = -90 + i * step;
      const runStart = angle - step / 2;
      const [labelX, labelY] = pointAt(R_LABELS, angle);
      return {
        exp,
        numeral: toRoman(i + 1),
        cells: Array.from({ length: CELLS_PER_SLOT }, (_, j) => {
          const cellCenter = runStart + (j + 0.5) * cellStep;
          return arcPath(R_CELLS, cellCenter - cellSpan / 2, cellCenter + cellSpan / 2);
        }),
        hitPath: arcPath(R_CELLS, angle - step / 2 + 2, angle + step / 2 - 2),
        labelX,
        labelY: labelY + 3.5,
        pip: pointAt(R_CELLS, runStart),
      };
    });
  }, [experiences, step]);

  const retarget = useSpring(0, (deg) => {
    pointerRef.current?.setAttribute(
      'transform',
      `rotate(${deg.toFixed(2)} ${CENTER} ${CENTER})`
    );
  });

  /* The consumer tail — a bead on the inner guide chasing the head on a
     softer spring, always a beat behind. */
  const retargetTail = useSpring(
    0,
    (deg) => {
      tailRef.current?.setAttribute(
        'transform',
        `rotate(${deg.toFixed(2)} ${CENTER} ${CENTER})`
      );
    },
    { stiffness: 24 }
  );

  /* Accumulate the shortest turn toward the given dial angle so the pointer
     never unwinds the long way round, then let the springs carry it there. */
  const pointTo = (deg) => {
    headingRef.current += shortestDelta(headingRef.current, deg);
    retarget(headingRef.current);
    retargetTail(headingRef.current);
  };

  /* Activate a slot (cascade, medallion, panel) without steering the pointer. */
  const activate = (i) => {
    if (i === activeRef.current) return;
    activeRef.current = i;
    setActive(i);
  };

  /* Keyboard focus / tap: activate and settle the pointer on the slot. */
  const select = (i) => {
    activate(i);
    pointTo(i * step);
  };

  /* The pointer chases the cursor's angle anywhere over the dial face; the
     slot whose sector holds that angle becomes active. */
  const handleMouseMove = (e) => {
    const rect = svgRef.current?.getBoundingClientRect();
    if (!rect || rect.width === 0) return;
    const scale = (CENTER * 2) / rect.width;
    const x = (e.clientX - rect.left) * scale - CENTER;
    const y = (e.clientY - rect.top) * scale - CENTER;
    if (Math.hypot(x, y) < R_TRACK_MIN) return;

    const cursorDeg = (Math.atan2(y, x) * 180) / Math.PI; // -90 = 12 o'clock
    const norm = (((cursorDeg + 90) % 360) + 360) % 360;
    activate(Math.round(norm / step) % experiences.length);
    pointTo(cursorDeg + 90);
  };

  const handleMouseLeave = () => {
    pointTo(activeRef.current * step);
  };

  const current = experiences[active];

  return (
    <div className="exp-dial-grid">
      <svg
        ref={svgRef}
        className="exp-dial"
        viewBox={VIEWBOX}
        role="group"
        aria-label="Experience dial"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <GuideRings />
        <MinuteTrack />
        <SlotPips slots={slots} />
        <BufferCells slots={slots} active={active} />
        <SlotNumerals slots={slots} active={active} />
        <g ref={tailRef} className="exp-tail">
          <circle cx={CENTER} cy={CENTER - R_GUIDE_INNER} r="3" />
        </g>
        <Pointer pointerRef={pointerRef} />
        <Medallion
          period={current.period}
          inscription={current.where || current.company}
        />
        <HitAreas slots={slots} onSelect={select} />
      </svg>

      <div className="exp-dial-detail" key={active}>
        <h3 className="exp-detail-org">
          {current.where || current.company} <LiveTag period={current.period} />
        </h3>
        <p className="exp-detail-role">
          {current.title} <em>· {current.roleEm}</em>
        </p>
        <p className="exp-detail-desc">{current.description}</p>
        {current.technologies?.length > 0 && (
          <div className="exp-detail-tags">
            {current.technologies.map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ExperienceRing;
