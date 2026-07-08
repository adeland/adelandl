import React from 'react';
import { contactData } from '../data/contactData';
import Button from './ui/Button';
import TableCard from './TableCard';

const Contact = () => {
  const { title, description, email, emailSubject, links } = contactData;
  const mailtoHref = `mailto:${email}${
    emailSubject ? `?subject=${encodeURIComponent(emailSubject)}` : ''
  }`;

  return (
    <section id="contact" className="section">
      <div className="container">
        <h2 className="section-title farewell">
          Let&apos;s <em>Chat</em>
        </h2>
        <div className="contact-content contact-grid">
          <div>
            <div className="contact-info">
              <h3>{title}</h3>
              <p>{description}</p>
              <div className="contact-details">
                <div className="contact-item">
                  <strong>Email</strong>
                  <a href={mailtoHref}>{email}</a>
                </div>
                {links.map((link) => (
                  <div key={link.label} className="contact-item">
                    <strong>{link.label}</strong>
                    <a href={link.href} target="_blank" rel="noopener noreferrer">
                      {link.value}
                    </a>
                  </div>
                ))}
              </div>
            </div>

            <div className="contact-cta">
              <Button as="a" href={mailtoHref} variant="primary">
                Email me
              </Button>
            </div>
          </div>

          <TableCard />
        </div>
      </div>
    </section>
  );
};

export default Contact;
