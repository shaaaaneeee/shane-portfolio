import { motion } from 'framer-motion';
import { ArrowDownRight, Github, Linkedin } from 'lucide-react';

const words = ['DEVELOPER', 'BUILDER', 'ENGINEER'];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-end pb-16 px-8 pt-32 overflow-hidden">
      {/* Background grid lines */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #f0ece4 1px, transparent 1px),
            linear-gradient(to bottom, #f0ece4 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}
      />

      {/* Large BG number */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.03 }}
        transition={{ duration: 1.5, delay: 0.5 }}
        className="absolute right-0 top-1/2 -translate-y-1/2 font-display text-[30vw] leading-none select-none pointer-events-none text-[var(--text)] pr-8"
      >
        01
      </motion.div>

      <div className="max-w-[1400px] mx-auto w-full relative z-10">
        {/* Status */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="flex items-center gap-3 mb-12"
        >
          <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse" />
          <span className="section-label">Available for internships · Singapore</span>
        </motion.div>

        {/* Name + Title */}
        <div className="overflow-hidden mb-6">
          <motion.p
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-mono text-sm text-[var(--muted)] mb-4 tracking-wider"
          >
            Shane Lee
          </motion.p>
        </div>

        {/* Big headline */}
        <div className="overflow-hidden">
          <motion.h1
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            transition={{ duration: 1, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-[13vw] md:text-[10vw] leading-[0.9] tracking-tight text-[var(--text)] glitch"
            data-text="SOFTWARE"
          >
            SOFTWARE
          </motion.h1>
        </div>
        <div className="overflow-hidden">
          <motion.h1
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            transition={{ duration: 1, delay: 1.35, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-[13vw] md:text-[10vw] leading-[0.9] tracking-tight"
            style={{ color: 'var(--accent)' }}
          >
            ENGINEER
          </motion.h1>
        </div>
        <div className="overflow-hidden">
          <motion.h1
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            transition={{ duration: 1, delay: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-[13vw] md:text-[10vw] leading-[0.9] tracking-tight gradient-text"
          >
            — SP
          </motion.h1>
        </div>

        {/* Bottom row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.8 }}
          className="flex flex-col md:flex-row items-start md:items-end justify-between mt-12 gap-8"
        >
          {/* Description */}
          <p className="max-w-sm text-[var(--muted)] text-sm leading-relaxed">
            Computer Engineering student building real products with React, FastAPI, and a sharp eye for detail. Currently looking for software engineering internships.
          </p>

          {/* CTAs */}
          <div className="flex items-center gap-4">
            <a href="#projects" className="btn-primary">
              View Work
              <ArrowDownRight size={14} />
            </a>
            <a
              href="https://github.com/shaaaaneeee"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
            >
              <Github size={14} />
            </a>
            <a
              href="https://www.linkedin.com/in/shane-sebastian-lee-5396662b3"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
            >
              <Linkedin size={14} />
            </a>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="font-mono text-[10px] tracking-widest text-[var(--muted)] uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
          className="w-px h-8 bg-gradient-to-b from-[var(--muted)] to-transparent"
        />
      </motion.div>
    </section>
  );
}
