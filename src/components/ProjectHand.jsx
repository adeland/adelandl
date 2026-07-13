import { useMemo, useState } from 'react';
import Tilt from './ui/Tilt';

/* Ranks and suits are dealt in order unless a project pins its own via
   `card: { rank, suit }`. Spades/clubs ink, diamonds/hearts garnet. */
const RANKS = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7'];
const SUITS = ['♠', '♦', '♣', '♥'];
const RED_SUITS = ['♦', '♥'];

const FAN_SPREAD = 12; // degrees between neighboring cards

/* Projects dealt as a hand of cards. The hand fans open when scrolled into
   view; hovering, focusing, or tapping a card brings it forward and shows
   its reading beside the felt. */
const ProjectHand = ({ projects }) => {
  const [active, setActive] = useState(0);

  const cards = useMemo(
    () =>
      projects.map((project, i) => ({
        project,
        rank: project.card?.rank ?? RANKS[i % RANKS.length],
        suit: project.card?.suit ?? SUITS[i % SUITS.length],
        fan: (i - (projects.length - 1) / 2) * FAN_SPREAD,
      })),
    [projects]
  );

  const current = cards[active];

  return (
    <div className="hand-grid">
      <div className="hand-felt reveal" role="group" aria-label="Project cards">
        {cards.map(({ project, rank, suit, fan }, i) => (
          <button
            key={project.title}
            type="button"
            className={`hand-card${i === active ? ' on' : ''}${
              RED_SUITS.includes(suit) ? ' red' : ''
            }`}
            style={{ '--fan': `${fan}deg`, '--deal-delay': `${i * 150}ms`, zIndex: i === active ? 9 : i + 1 }}
            onMouseEnter={() => setActive(i)}
            onFocus={() => setActive(i)}
            onClick={() => setActive(i)}
            aria-pressed={i === active}
            aria-label={`${project.title}, ${project.meta?.year ?? ''}`}
          >
            <Tilt fill max={8}>
              <span className="hand-rank" aria-hidden="true">
                {rank}
                <i>{suit}</i>
              </span>
              <span className="hand-title">{project.title}</span>
              <span className="hand-meta" aria-hidden="true">
                {project.meta?.year}
              </span>
              <span className="hand-rank mirror" aria-hidden="true">
                {rank}
                <i>{suit}</i>
              </span>
            </Tilt>
          </button>
        ))}
      </div>

      <div className="hand-detail" key={active}>
        <h3 className="hand-detail-title">
          {current.project.title}{' '}
          {current.project.tagline && <em>— {current.project.tagline}</em>}
        </h3>
        <p className="hand-detail-desc">{current.project.description}</p>
        <dl className="hand-detail-meta">
          <dt>Year</dt>
          <dd>{current.project.meta?.year}</dd>
          <dt>Role</dt>
          <dd>{current.project.meta?.role}</dd>
          <dt>Status</dt>
          <dd>{current.project.meta?.status}</dd>
        </dl>
        <div className="hand-links">
          {current.project.github && (
            <a
              className="hand-link"
              href={current.project.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub →
            </a>
          )}
          {current.project.demo && (
            <a
              className="hand-link"
              href={current.project.demo}
              target="_blank"
              rel="noopener noreferrer"
            >
              Live →
            </a>
          )}
        </div>
        {current.project.tags?.length > 0 && (
          <div className="exp-detail-tags">
            {current.project.tags.map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectHand;
