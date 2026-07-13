import { useState, useEffect } from 'react';
import { scrollToSection, scrollToTop } from '../utils/scrollUtils';
import { useTheme } from '../contexts/ThemeContext';
import { navbarData } from '../data/navbarData';

const Navbar = ({ onOpenPalette }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const { isDarkMode, toggleTheme } = useTheme();

  // Track which section the reader is in; its nav link carries a gold mark.
  useEffect(() => {
    const ids = navbarData.navLinks.map((link) => link.sectionId);
    let raf = 0;
    const compute = () => {
      raf = 0;
      const marker = window.scrollY + window.innerHeight * 0.35;
      let current = '';
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= marker) current = id;
      }
      setActiveSection((prev) => (prev === current ? prev : current));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(compute);
    };
    compute();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  useEffect(() => {
    if (!isMenuOpen) return undefined;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setIsMenuOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isMenuOpen]);

  // Close mobile menu when viewport widens past 768px so the backdrop/scroll-lock
  // cannot persist at desktop widths where the hamburger button is hidden.
  useEffect(() => {
    const mql = window.matchMedia('(min-width: 769px)');
    const handleWidthChange = (e) => {
      if (e.matches) setIsMenuOpen(false);
    };
    mql.addEventListener('change', handleWidthChange);
    return () => mql.removeEventListener('change', handleWidthChange);
  }, []);

  const handleScrollToSection = (sectionId) => {
    setIsMenuOpen(false);
    // Let the mobile menu's close animation start before scrolling.
    setTimeout(() => scrollToSection(sectionId), isMenuOpen ? 300 : 0);
  };

  const handleLogoClick = () => {
    setIsMenuOpen(false);
    scrollToTop();
  };

  return (
    <header className="navbar-shell">
      <nav className="navbar" aria-label="Site">
        <div className="nav-container">
          <button
            type="button"
            className="nav-logo"
            onClick={handleLogoClick}
            aria-label={`${navbarData.logo} — home`}
          >
            {navbarData.logo}
          </button>

          <div
            id="primary-navigation"
            className={`nav-menu ${isMenuOpen ? 'active' : ''}`}
          >
            {navbarData.navLinks.map((link) => (
              <button
                key={link.sectionId}
                type="button"
                onClick={() => handleScrollToSection(link.sectionId)}
                className={`nav-link${
                  activeSection === link.sectionId ? ' is-active' : ''
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="nav-controls">
            {onOpenPalette && (
              <button
                type="button"
                className="nav-cmdk"
                onClick={onOpenPalette}
                aria-label="Open command palette"
              >
                ⌘K
              </button>
            )}
            <button
              type="button"
              className="theme-toggle"
              onClick={toggleTheme}
              aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              <span className={`toggle-icon ${isDarkMode ? 'moon' : 'sun'}`}>
                {isDarkMode ? '☾' : '☀︎'}
              </span>
              <span
                className={`toggle-slider ${isDarkMode ? 'active' : ''}`}
                aria-hidden
              />
            </button>

            <button
              type="button"
              className={`nav-toggle ${isMenuOpen ? 'nav-toggle--open' : ''}`}
              onClick={() => setIsMenuOpen((o) => !o)}
              aria-expanded={isMenuOpen}
              aria-controls="primary-navigation"
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            >
              <span className="nav-toggle-bar" />
              <span className="nav-toggle-bar" />
              <span className="nav-toggle-bar" />
            </button>
          </div>
        </div>
      </nav>
      <button
        type="button"
        className={`nav-backdrop ${isMenuOpen ? 'nav-backdrop--visible' : ''}`}
        aria-hidden={!isMenuOpen}
        aria-label="Close menu"
        tabIndex={isMenuOpen ? 0 : -1}
        onClick={() => setIsMenuOpen(false)}
      />
    </header>
  );
};

export default Navbar;
