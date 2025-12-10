import React from 'react';
import { scrollToSection } from '../utils/scrollUtils';
import { heroData } from '../data/heroData';
import Button from './ui/Button';

const Hero = () => {
  const handleScrollToSection = (sectionId) => {
    scrollToSection(sectionId);
  };

  return (
    <section className="hero">
      <div className="hero-content">
        <h1 className="hero-title">
          {heroData.greeting} <span className="highlight">{heroData.name}</span>
        </h1>
        <p className="hero-subtitle">
          {heroData.subtitle}
        </p>
        <p className="hero-description">
          {heroData.description}
        </p>
        <div className="hero-buttons">
          {heroData.buttons.map((button, index) => (
            <Button 
              key={index}
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
