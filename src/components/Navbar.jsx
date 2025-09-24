import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { scrollToSection } from '../utils/scrollUtils';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleScrollToSection = (sectionId) => {
    // If we're on a blog page, navigate to home first, then scroll
    if (location.pathname !== '/') {
      navigate('/');
      // Wait for navigation to complete, then scroll
      setTimeout(() => {
        scrollToSection(sectionId);
      }, 100);
    } else {
      scrollToSection(sectionId);
    }
    setIsMenuOpen(false);
  };

  const handleLogoClick = () => {
    if (location.pathname !== '/') {
      navigate('/');
    } else {
      // If already on home, scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-logo" onClick={handleLogoClick} style={{ cursor: 'pointer' }}>
          <span>Shangmin Chen</span>
        </div>
        
        <div className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          <button onClick={() => handleScrollToSection('about')} className="nav-link">
            About
          </button>
          <button onClick={() => handleScrollToSection('experience')} className="nav-link">
            Experience
          </button>
          <button onClick={() => handleScrollToSection('projects')} className="nav-link">
            Projects
          </button>
          <button onClick={() => handleScrollToSection('competitive-programming')} className="nav-link">
            Competitive Programming
          </button>
          <button onClick={() => handleScrollToSection('blog')} className="nav-link">
            Thoughts
          </button>
          <button onClick={() => handleScrollToSection('contact')} className="nav-link">
            Contact Me
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
