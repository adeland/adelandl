import { useEffect, useState } from 'react';
import { experiences } from '../data/experiences';
import ExperienceRing from './ExperienceRing';
import ExperienceBook from './ExperienceBook';

const RING_QUERY = '(min-width: 860px)';

// The dial needs width to breathe; below 860px the order-book ladder takes over.
const useWideEnough = () => {
  const [wide, setWide] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(RING_QUERY).matches
  );
  useEffect(() => {
    const mql = window.matchMedia(RING_QUERY);
    const onChange = (e) => setWide(e.matches);
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, []);
  return wide;
};

const Experience = () => {
  const wide = useWideEnough();

  return (
    <section id="experience" className="section">
      <div className="container">
        <div className="section-head reveal">
          <div className="mono-label num">§ 02</div>
          <h2>
            Experience <em>- Curated</em>
          </h2>
        </div>
        {wide ? (
          <ExperienceRing experiences={experiences} />
        ) : (
          <ExperienceBook experiences={experiences} />
        )}
      </div>
    </section>
  );
};

export default Experience;
