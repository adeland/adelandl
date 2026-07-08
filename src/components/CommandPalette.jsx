import React, { useEffect, useMemo, useRef, useState } from 'react';
import { navbarData } from '../data/navbarData';
import { contactData } from '../data/contactData';
import { scrollToSection } from '../utils/scrollUtils';
import { useTheme } from '../contexts/ThemeContext';

/* ⌘K command palette — jump anywhere, copy the email, flip the theme.
   Opened from App (⌘K / ctrl+K) or the navbar chip. */
const CommandPalette = ({ open, onClose }) => {
  const { isDarkMode, toggleTheme } = useTheme();
  const [query, setQuery] = useState('');
  const [sel, setSel] = useState(0);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef(null);

  const commands = useMemo(() => {
    const list = navbarData.navLinks.map((link) => ({
      id: `go-${link.sectionId}`,
      label: `Go to ${link.label}`,
      hint: '↵',
      run: () => {
        scrollToSection(link.sectionId);
        onClose();
      },
    }));
    list.push({
      id: 'copy-email',
      label: copied ? '✓ Copied' : 'Copy email',
      hint: 'C',
      run: () => {
        navigator.clipboard?.writeText(contactData.email);
        setCopied(true);
        setTimeout(() => {
          setCopied(false);
          onClose();
        }, 900);
      },
    });
    list.push({
      id: 'theme',
      label: `Switch to ${isDarkMode ? 'light' : 'dark'} mode`,
      hint: 'T',
      run: () => {
        toggleTheme();
        onClose();
      },
    });
    if (contactData.resumeUrl) {
      list.push({
        id: 'resume',
        label: 'Download résumé',
        hint: 'R',
        run: () => {
          window.open(contactData.resumeUrl, '_blank', 'noopener');
          onClose();
        },
      });
    }
    return list;
  }, [copied, isDarkMode, onClose, toggleTheme]);

  const filtered = useMemo(
    () =>
      commands.filter((c) =>
        c.label.toLowerCase().includes(query.trim().toLowerCase())
      ),
    [commands, query]
  );

  // Fresh state + focused input each time the palette opens; lock page scroll.
  useEffect(() => {
    if (!open) return undefined;
    setQuery('');
    setSel(0);
    inputRef.current?.focus();
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => setSel(0), [query]);

  if (!open) return null;

  const onKeyDown = (e) => {
    if (e.key === 'Escape') onClose();
    else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSel((s) => (s + 1) % Math.max(filtered.length, 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSel((s) => (s - 1 + Math.max(filtered.length, 1)) % Math.max(filtered.length, 1));
    } else if (e.key === 'Enter') {
      filtered[sel]?.run();
    }
  };

  return (
    <div className="palette-overlay" onClick={onClose}>
      <div
        className="palette"
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={onKeyDown}
      >
        <div className="palette-input-row">
          <span className="palette-glyph" aria-hidden="true">
            ⌘K
          </span>
          <input
            ref={inputRef}
            className="palette-input"
            type="text"
            value={query}
            placeholder="Type a command…"
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search commands"
          />
        </div>
        <div role="listbox" aria-label="Commands">
          {filtered.map((cmd, i) => (
            <div
              key={cmd.id}
              role="option"
              aria-selected={i === sel}
              className={`palette-row${i === sel ? ' sel' : ''}`}
              onMouseEnter={() => setSel(i)}
              onClick={() => cmd.run()}
            >
              <span>{cmd.label}</span>
              <span className="palette-kbd">{cmd.hint}</span>
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="palette-row muted">No table for that action</div>
          )}
        </div>
        <div className="palette-foot mono-label">
          <span>↑↓ navigate</span>
          <span>↵ select</span>
          <span>esc fold</span>
        </div>
      </div>
    </div>
  );
};

export default CommandPalette;
