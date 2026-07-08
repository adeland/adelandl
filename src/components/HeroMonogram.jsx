import React from 'react';
import Tilt from './ui/Tilt';

const SUITS = ['♠', '♦'];

/* Hole cards bearing your initials — the hero's personal mark. They deal
   in with a 3D flip on load, then the pair tilts toward the cursor. */
const HeroMonogram = ({ initials }) => {
  if (!initials?.length) return null;

  return (
    <div className="hero-monogram" aria-hidden="true">
      <Tilt max={12} className="hero-monogram-tilt">
        {initials.slice(0, 2).map((letter, i) => (
          <span key={i} className={`holecard${i === 1 ? ' red' : ''}`}>
            <b>{letter}</b>
            <i>{SUITS[i]}</i>
          </span>
        ))}
      </Tilt>
    </div>
  );
};

export default HeroMonogram;
