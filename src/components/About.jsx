import React from 'react';
import { scrollToSection } from '../utils/scrollUtils';
import { aboutData } from '../data/aboutData';
import { skills } from '../data/skills';
import Tag from './ui/Tag';
import Button from './ui/Button';

const About = () => {
  const handleScrollToSection = (sectionId) => {
    scrollToSection(sectionId);
  };

  return (
    <section id="about" className="section">
      <div className="container">
        <div className="section-head">
          <div className="mono-label num">§ 01</div>
          <h2>
            About <em>—</em>
          </h2>
        </div>
        <div className="about-grid">
          <div className="mono-label">Note</div>
          <div className="body">
            {aboutData.paragraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
            <p>
              {aboutData.codeforcesSentence.split('Codeforces')[0]}
              <a
                href="https://codeforces.com/profile/simonlovestocode"
                target="_blank"
                rel="noopener noreferrer"
              >
                Codeforces
              </a>
              {aboutData.codeforcesSentence.split('Codeforces').slice(1).join('Codeforces')}
            </p>
            <p>{aboutData.closing}</p>
            <div className="about-cta">
              <Button
                variant="secondary"
                onClick={() => handleScrollToSection(aboutData.submissionsAction)}
              >
                {aboutData.submissionsCta}
              </Button>
            </div>
            <div className="skills">
              <h3>{aboutData.skillsTitle}</h3>
              <div className="skills-grid">
                {skills.map((skill, index) => (
                  <Tag key={index} variant="skill">
                    {skill}
                  </Tag>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
