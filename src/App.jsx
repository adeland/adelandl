import './styles/index.css';
import { useEffect, useState } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import Cosmos from './components/Cosmos';
import CursorDot from './components/CursorDot';
import Navbar from './components/Navbar';
import ScrollProgress from './components/ScrollProgress';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import FieldNotes from './components/FieldNotes';
import Contact from './components/Contact';
import TickerTape from './components/TickerTape';
import Footer from './components/Footer';
import CommandPalette from './components/CommandPalette';
import { useScrollReveal } from './hooks/useScrollReveal';

function App() {
  useScrollReveal();
  const [paletteOpen, setPaletteOpen] = useState(false);

  // ⌘K / ctrl+K toggles the command palette from anywhere.
  useEffect(() => {
    const onKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setPaletteOpen((o) => !o);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <ThemeProvider>
      <Cosmos />
      <CursorDot />
      <div className="App">
        <Navbar onOpenPalette={() => setPaletteOpen(true)} />
        <ScrollProgress />
        <main>
          <Hero />
          <About />
          <Experience />
          <Projects />
          <FieldNotes />
          <Contact />
        </main>
        <TickerTape />
        <Footer />
        <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} />
      </div>
    </ThemeProvider>
  );
}

export default App;
