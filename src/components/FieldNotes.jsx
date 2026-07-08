import React from 'react';
import { notesData } from '../data/notesData';

/* Field notes — marginalia in three columns. Short thoughts, no blog. */
const FieldNotes = () => {
  const items = notesData.items ?? [];
  if (items.length === 0) return null;

  return (
    <section id="notes" className="section">
      <div className="container">
        <div className="section-head reveal">
          <div className="mono-label num">§ 04</div>
          <h2>
            Notes <em>- Marginalia</em>
          </h2>
        </div>
        <div className="notes-grid">
          {items.map((note, i) => (
            <article
              key={note.title + note.tag}
              className="note reveal"
              style={{ '--delay': `${i * 70}ms` }}
            >
              <p className="note-tag mono-label">{note.tag}</p>
              <h3 className="note-title">{note.title}</h3>
              <p className="note-body">{note.body}</p>
              {note.href && (
                <a
                  className="hand-link"
                  href={note.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Read →
                </a>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FieldNotes;
