import { useState } from 'react';
import { useDeskClock } from '../hooks/useDeskClock';
import LiveTag from './ui/LiveTag';

/* The book shows a bare year; `mono` may carry extras like "2025 →". */
const yearOf = (mono) => String(mono ?? '').match(/\d{4}/)?.[0] ?? String(mono ?? '');

/* Resting depth per level — newer experiences sit deeper in the book. */
const depthPct = (i, count) => Math.round(88 - (i * 48) / Math.max(count - 1, 1));

/* Narrow-screen view of the experiences: an order-book ladder. Each role is
   a resting level; tapping one sweeps its depth bar gold and unfolds the
   detail beneath. The desktop dial takes over at wider widths. */
const ExperienceBook = ({ experiences }) => {
  const [active, setActive] = useState(0);
  const time = useDeskClock();

  return (
    <div className="exp-book">
      <div className="exp-book-head mono-label">
        <span>book · experiences</span>
        <span className="exp-book-t">t {time}</span>
      </div>
      {experiences.map((exp, i) => {
        const on = i === active;
        return (
          <div
            key={`${exp.mono}-${exp.company}`}
            className={`exp-level${on ? ' on' : ''}`}
          >
            <button
              type="button"
              className="exp-level-row"
              onClick={() => setActive(i)}
              aria-expanded={on}
            >
              <span className="exp-level-yr">{yearOf(exp.mono)}</span>
              <span className="exp-level-org">{exp.where || exp.company}</span>
              <span className="exp-level-bar" aria-hidden="true">
                <span
                  className="exp-level-fill"
                  style={{ width: `${on ? 92 : depthPct(i, experiences.length)}%` }}
                />
              </span>
            </button>
            <div className="exp-level-detail">
              <div>
                <p className="exp-level-role">
                  {exp.title} <em>· {exp.roleEm}</em>
                </p>
                <p className="exp-level-period mono-label">
                  {exp.period} <LiveTag period={exp.period} />
                </p>
                <p className="exp-level-desc">{exp.description}</p>
                {exp.technologies?.length > 0 && (
                  <div className="exp-detail-tags">
                    {exp.technologies.map((t) => (
                      <span key={t}>{t}</span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ExperienceBook;
