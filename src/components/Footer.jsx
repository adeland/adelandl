import { navbarData } from '../data/navbarData';
import { contactData } from '../data/contactData';
import { footerData } from '../data/footerData';
import { scrollToSection } from '../utils/scrollUtils';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <svg
            className="footer-mark"
            viewBox="0 0 32 32"
            role="img"
            aria-label={`${navbarData.logo} mark`}
          >
            <polygon
              points="13,9.2 13.6,5.4 15,7.2 16,4.4 17,7.2 18.4,5.4 19,9.2"
              fill="var(--gold)"
            />
            <ellipse cx="16" cy="17" rx="7.2" ry="8" fill="var(--accent-color)" />
            <circle cx="13.4" cy="16.6" r="1.05" fill="var(--gold-soft)" />
            <circle cx="16" cy="18.7" r="1.05" fill="var(--gold-soft)" />
            <circle cx="18.6" cy="16.6" r="1.05" fill="var(--gold-soft)" />
          </svg>
          <p className="footer-name">{navbarData.logo}</p>
          <p className="footer-signoff">{footerData.signoff}</p>
        </div>

        <nav className="footer-col" aria-label="Footer">
          <p className="footer-head mono-label">Table</p>
          {navbarData.navLinks.map((link) => (
            <button
              key={link.sectionId}
              type="button"
              className="footer-link"
              onClick={() => scrollToSection(link.sectionId)}
            >
              {link.label}
            </button>
          ))}
        </nav>

        <div className="footer-col">
          <p className="footer-head mono-label">Reach</p>
          <a className="footer-link" href={`mailto:${contactData.email}`}>
            Email
          </a>
          {contactData.links.map((link) => (
            <a
              key={link.label}
              className="footer-link"
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>

      <div className="container footer-base">
        <span className="mono-label">© {year}</span>
        <span className="footer-pips" aria-hidden="true">
          <i className="ink">♠</i>
          <i className="red">♥</i>
          <i className="red">♦</i>
          <i className="ink">♣</i>
        </span>
      </div>
    </footer>
  );
};

export default Footer;
