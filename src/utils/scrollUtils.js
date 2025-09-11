/**
 * Utility functions for smooth scrolling with Lenis
 */

/**
 * Scroll to a specific section using Lenis smooth scroll
 * @param {string} sectionId - The ID of the section to scroll to
 * @param {object} options - Additional scroll options
 */
export const scrollToSection = (sectionId, options = {}) => {
  const defaultOptions = {
    offset: -70, // Account for fixed navbar height
    duration: 1.5,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
  };

  const scrollOptions = { ...defaultOptions, ...options };

  if (window.lenis) {
    window.lenis.scrollTo(`#${sectionId}`, scrollOptions);
  } else {
    // Fallback to native smooth scroll
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
};

/**
 * Scroll to top of the page
 * @param {object} options - Additional scroll options
 */
export const scrollToTop = (options = {}) => {
  const defaultOptions = {
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
  };

  const scrollOptions = { ...defaultOptions, ...options };

  if (window.lenis) {
    window.lenis.scrollTo(0, scrollOptions);
  } else {
    // Fallback to native smooth scroll
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
};

/**
 * Check if Lenis is available
 * @returns {boolean} - True if Lenis is available
 */
export const isLenisAvailable = () => {
  return typeof window !== 'undefined' && window.lenis;
};
