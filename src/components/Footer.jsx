import React from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="contact-info" id="contact">
        <h2>Contact</h2>
        <p>Feel free to reach out to me at <a href="mailto:shangminch@gmail.com">shangminch@gmail.com</a>.</p>
      </div>
      <div className="footer-content">
        <p>© 2025 Shangmin Chen. All rights reserved.</p>
        <div className="footer-links">
          <a href="https://github.com/Shangmin-Chen" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <FaGithub className="social-icon" /> 
          </a>
          <a href="https://linkedin.com/in/shangmin-chen" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <FaLinkedin className="social-icon" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;