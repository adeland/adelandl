import { scrollToSection } from '../utils/scrollUtils';
import { heroData } from '../data/heroData';
import Button from './ui/Button';
import HeroClock from './HeroClock';
import HeroMonogram from './HeroMonogram';

const Hero = () => {
  const handleScrollToSection = (sectionId) => {
    scrollToSection(sectionId);
  };

  return (
    <section className="hero" aria-label="Introduction">
      <div className="hero-content">
        {heroData.metaLines?.length > 0 && (
          <div className="hero-meta mono-label">
            {heroData.metaLines.map((line) => (
              <div key={line}>{line}</div>
            ))}
            <HeroClock city={heroData.clockCity} />
          </div>
        )}
        <h1 className="hero-title-v2">
          {heroData.headlineLines.map((line, i) => (
            <span key={line} className="line-mask" style={{ '--line-i': i }}>
              <span className="line-reveal">{line}</span>
            </span>
          ))}
          <span
            className="line-mask"
            style={{ '--line-i': heroData.headlineLines.length }}
          >
            <span className="line-reveal">
              {heroData.headlineBeforeEm}
              <em className="accent">{heroData.headlineEm}</em>
            </span>
          </span>
        </h1>
        <p className="hero-lede-v2">{heroData.lede}</p>
        <div className="hero-buttons">
          {heroData.buttons.map((button) => (
            <Button
              key={button.action}
              variant={button.variant}
              onClick={() => handleScrollToSection(button.action)}
            >
              {button.text}
            </Button>
          ))}
        </div>
        <HeroMonogram initials={heroData.initials} />
      </div>
      <button
        type="button"
        className="hero-cue"
        aria-label="Scroll to the first section"
        onClick={() => handleScrollToSection('about')}
      >
        ♦
      </button>
    </section>
  );
};

export default Hero;
