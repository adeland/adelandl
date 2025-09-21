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
          Hello, I'm <span className="highlight">Shangmin Chen</span>
        </h1>
        <p className="hero-subtitle">
          Data Scientist & Software Developer
        </p>
        <p className="hero-description">
          I build modern web applications and create data-driven solutions 
          that make a real impact. Let's create something meaningful together.
        </p>
        <div className="hero-buttons">
          <button 
            className="btn btn-primary" 
            onClick={() => handleScrollToSection('projects')}
          >
            View My Work
          </button>
          <button 
            className="btn btn-secondary" 
            onClick={() => handleScrollToSection('contact')}
          >
            Get In Touch
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
