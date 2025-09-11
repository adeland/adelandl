import React from 'react';
import { scrollToSection } from '../utils/scrollUtils';

const Hero = () => {
  const handleScrollToSection = (sectionId) => {
    scrollToSection(sectionId);
  };

  return (
    <section className="hero">
      <div className="hero-content">
        <h1 className="hero-title">
          hello, i'm <span className="highlight">shangmin chen</span>
        </h1>
        <p className="hero-subtitle">
          data scientist & software developer
        </p>
        <p className="hero-description">
          i build modern web applications and create data-driven solutions 
          that make a real impact. let's create something meaningful together.
        </p>
        <div className="hero-buttons">
          <button 
            className="btn btn-primary" 
            onClick={() => handleScrollToSection('projects')}
          >
            view my work
          </button>
          <button 
            className="btn btn-secondary" 
            onClick={() => handleScrollToSection('contact')}
          >
            get in touch
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
