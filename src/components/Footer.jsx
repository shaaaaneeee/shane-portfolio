import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] py-8 px-8">
      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="font-display text-lg tracking-widest text-[var(--muted)]">
          SHANE LEE
        </span>
        <span className="font-mono text-[10px] text-[var(--muted)] tracking-widest">
          © {new Date().getFullYear()} — BUILT WITH REACT + FRAMER MOTION
        </span>
        <motion.a
          href="#"
          whileHover={{ y: -2 }}
          className="font-mono text-[10px] text-[var(--muted)] hover:text-[var(--accent)] tracking-widest uppercase transition-colors"
        >
          Back to top ↑
        </motion.a>
      </div>
    </footer>
  );
}
