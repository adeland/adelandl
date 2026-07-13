import { useDeskClock } from '../hooks/useDeskClock';

/* Exchange-desk clock line for the hero meta block: "[CITY] 09:30:00.000241".
   Isolated so only this line re-renders as it ticks. */
const HeroClock = ({ city }) => {
  const time = useDeskClock();

  if (!city) return null;

  return (
    <div className="hero-clock">
      {city} {time}
    </div>
  );
};

export default HeroClock;
