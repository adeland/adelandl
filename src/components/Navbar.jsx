import React, { useState } from 'react';
import { scrollToSection } from '../utils/scrollUtils';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleScrollToSection = (sectionId) => {
    scrollToSection(sectionId);
    setIsMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-logo">
          <span>Shangmin Chen</span>
        </div>
        
        <div className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          <button onClick={() => handleScrollToSection('about')} className="nav-link">
            about
          </button>
          <button onClick={() => handleScrollToSection('experience')} className="nav-link">
            experience
          </button>
          <button onClick={() => handleScrollToSection('projects')} className="nav-link">
            projects
          </button>
          <button onClick={() => handleScrollToSection('blog')} className="nav-link">
            thoughts
          </button>
          <button onClick={() => handleScrollToSection('contact')} className="nav-link">
            contact
          </button>
        </div>

        <div className="nav-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
