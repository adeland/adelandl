import React from 'react';
import { contactData } from '../data/contactData';
import { heroData } from '../data/heroData';
import { navbarData } from '../data/navbarData';
import Tilt from './ui/Tilt';

/* A dealt business card — monogram pip, name, and where to find you.
   Decorative companion to the contact details (which carry the real links). */
const TableCard = () => (
  <div className="table-card" aria-hidden="true">
    <Tilt fill max={9}>
      <span className="table-card-corner">
        {heroData.initials?.[0] ?? 'A'}
        <i>♠</i>
      </span>
      <span className="table-card-name">{navbarData.logo}</span>
      <span className="table-card-line">{contactData.email}</span>
      <span className="table-card-line">{contactData.location}</span>
      <span className="table-card-corner mirror">
        {heroData.initials?.[1] ?? 'K'}
        <i>♦</i>
      </span>
    </Tilt>
  </div>
);

export default TableCard;
