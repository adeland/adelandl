import React from 'react';
import { experiences } from '../data/experiences';

const Experience = () => (
  <section id="experience" className="section">
    <div className="container">
      <div className="section-head">
        <div className="mono-label num">§ 02</div>
        <h2>
          Experience <em>— selected</em>
        </h2>
      </div>
      <ul className="exp-list">
        {experiences.map((exp) => (
          <li key={`${exp.mono}-${exp.title}`} className="exp-row">
            <div className="mono-label">{exp.mono}</div>
            <div className="role">
              {exp.title} <em>· {exp.roleEm}</em>
            </div>
            <div className="where">{exp.where}</div>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

export default Experience;
