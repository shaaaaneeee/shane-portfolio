import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const links = [
  { label: 'Work', href: '#projects' },
  { label: 'About', href: '#about' },
  { label: 'Journey', href: '#journey' },
  { label: 'Contact', href: '#contact' },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'py-4 bg-[#0a0a0a]/90 backdrop-blur-sm border-b border-[var(--border)]' : 'py-6'
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-8 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="font-display text-xl tracking-widest text-[var(--text)] hover:text-[var(--accent)] transition-colors">
            SL
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((l, i) => (
              <a
                key={i}
                href={l.href}
                className="font-mono text-xs tracking-widest text-[var(--muted)] uppercase hover:text-[var(--accent)] transition-colors"
              >
                <span className="text-[var(--accent)] mr-1">0{i + 1}.</span>{l.label}
              </a>
            ))}
          </div>

          {/* CTA */}
          <a
            href="mailto:shaneslee18@icloud.com"
            className="hidden md:flex btn-outline text-xs py-2 px-5"
          >
            Get in touch
          </a>

          {/* Hamburger */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden flex flex-col gap-[5px] p-2"
            aria-label="menu"
          >
            <motion.span
              animate={{ rotate: open ? 45 : 0, y: open ? 7 : 0 }}
              className="block w-5 h-[1px] bg-[var(--text)]"
            />
            <motion.span
              animate={{ opacity: open ? 0 : 1 }}
              className="block w-5 h-[1px] bg-[var(--text)]"
            />
            <motion.span
              animate={{ rotate: open ? -45 : 0, y: open ? -7 : 0 }}
              className="block w-5 h-[1px] bg-[var(--text)]"
            />
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed inset-0 z-40 bg-[var(--bg)] flex flex-col justify-center items-center gap-10"
          >
            {links.map((l, i) => (
              <motion.a
                key={i}
                href={l.href}
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                className="font-display text-5xl tracking-widest text-[var(--text)] hover:text-[var(--accent)] transition-colors"
              >
                {l.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
