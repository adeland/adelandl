import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { scrollToSection } from '../utils/scrollUtils';
import { useTheme } from '../contexts/ThemeContext';
import { navbarData } from '../data/navbarData';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isDarkMode, toggleTheme } = useTheme();

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
          <span>{navbarData.logo}</span>
        </div>
        
        <div className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          {navbarData.navLinks.map((link, index) => (
            <button 
              key={index}
              onClick={() => handleScrollToSection(link.sectionId)} 
              className="nav-link"
            >
              {link.label}
            </button>
          ))}
        </div>

        <div className="nav-controls">
          <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle dark mode">
            <span className={`toggle-icon ${isDarkMode ? 'moon' : 'sun'}`}>
              {isDarkMode ? '🌙' : '☀️'}
            </span>
            <div className={`toggle-slider ${isDarkMode ? 'active' : ''}`}></div>
          </button>
          
          <div className="nav-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
