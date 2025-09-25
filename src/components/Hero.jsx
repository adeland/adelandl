import React from 'react';
import { scrollToSection } from '../utils/scrollUtils';
import Button from './ui/Button';

const Hero = () => {
  const handleScrollToSection = (sectionId) => {
    scrollToSection(sectionId);
  };

  return (
    <section className="hero">
      <div className="hero-content">
        <h1 className="hero-title">
          Hello, I'm <span className="highlight">Shangmin Chen</span>
        </h1>
        <p className="hero-subtitle">
          Software Engineer
        </p>
        <p className="hero-description">
          I build beautiful applications with ML and AI when I see a need or problem worth solving.
        </p>
        <div className="hero-buttons">
          <Button 
            variant="primary" 
            onClick={() => handleScrollToSection('projects')}
          >
            View My Work
          </Button>
          <Button 
            variant="secondary" 
            onClick={() => handleScrollToSection('contact')}
          >
            Get In Touch
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
