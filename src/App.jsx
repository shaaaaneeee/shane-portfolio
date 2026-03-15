import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Cursor from './components/Cursor';
import Nav from './components/Nav';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import Projects from './components/Projects';
import About from './components/About';
import Journey from './components/Journey';
import Contact from './components/Contact';
import Footer from './components/Footer';

function Loader({ onDone }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((c) => {
        if (c >= 100) {
          clearInterval(interval);
          setTimeout(onDone, 200);
          return 100;
        }
        return c + Math.floor(Math.random() * 12) + 3;
      });
    }, 60);
    return () => clearInterval(interval);
  }, [onDone]);

  return (
    <motion.div
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 bg-[var(--bg)] z-[999] flex flex-col items-center justify-center gap-8"
    >
      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="font-display text-5xl tracking-widest text-[var(--text)]"
      >
        SL
      </motion.div>

      {/* Progress bar */}
      <div className="w-48 h-px bg-[var(--border)] relative overflow-hidden">
        <motion.div
          className="absolute top-0 left-0 h-full bg-[var(--accent)]"
          style={{ width: `${Math.min(count, 100)}%` }}
          transition={{ ease: 'linear' }}
        />
      </div>

      {/* Count */}
      <span className="font-mono text-xs text-[var(--muted)] tracking-widest">
        {Math.min(count, 100).toString().padStart(3, '0')}
      </span>
    </motion.div>
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      <Cursor />
      <AnimatePresence mode="wait">
        {loading && <Loader key="loader" onDone={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Nav />
          <main>
            <Hero />
            <Marquee />
            <Projects />
            <About />
            <Journey />
            <Contact />
          </main>
          <Footer />
        </motion.div>
      )}
    </>
  );
}
