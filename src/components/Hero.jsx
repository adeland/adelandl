import React from 'react';
import { scrollToSection } from '../utils/scrollUtils';
import { heroData } from '../data/heroData';
import Button from './ui/Button';

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
          </div>
        )}
        <h1 className="hero-title-v2">
          {heroData.headlineLines.map((line) => (
            <React.Fragment key={line}>
              {line}
              <br />
            </React.Fragment>
          ))}
          {heroData.headlineBeforeEm}
          <em className="accent">{heroData.headlineEm}</em>
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
      </div>
    </section>
  );
};

export default Hero;
