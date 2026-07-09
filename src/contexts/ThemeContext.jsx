import React, { createContext, useContext, useState, useEffect, useRef } from 'react';

const THEME_COLOR_LIGHT = '#f7f2ec';
const THEME_COLOR_DARK = '#1e1719';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Check localStorage first
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme === 'dark';
    }

    // If no saved preference, check system preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  const isFirstPaint = useRef(true);

  useEffect(() => {
    // Save theme preference to localStorage
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');

    const applyTheme = () => {
      document.documentElement.classList.toggle('dark', isDarkMode);
      document.documentElement.classList.toggle('light', !isDarkMode);
      // Both media-gated metas get the active color so browser chrome
      // follows a manual toggle regardless of the OS scheme.
      document.querySelectorAll('meta[name="theme-color"]').forEach((meta) => {
        meta.setAttribute('content', isDarkMode ? THEME_COLOR_DARK : THEME_COLOR_LIGHT);
      });
    };

    // Later flips cross-fade the whole page via a View Transition —
    // dusk settling rather than a light switch. First paint is instant.
    if (!isFirstPaint.current && document.startViewTransition) {
      document.startViewTransition(applyTheme);
    } else {
      applyTheme();
    }
    isFirstPaint.current = false;
  }, [isDarkMode]);

  useEffect(() => {
    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => {
      // Only auto-switch if user hasn't manually set a preference
      const savedTheme = localStorage.getItem('theme');
      if (!savedTheme) {
        setIsDarkMode(e.matches);
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const value = {
    isDarkMode,
    toggleTheme,
    theme: isDarkMode ? 'dark' : 'light',
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};
