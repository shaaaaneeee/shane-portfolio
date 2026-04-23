import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const timeline = [
  {
    year: '2022',
    title: 'Best Demo Award — MakeX Robotics',
    org: 'MakeX International Robotics Competition',
    type: 'Achievement',
    color: 'var(--accent)',
    desc: 'Awarded Best Demonstration at the MakeX Robotics Competition for an outstanding technical presentation and build quality.',
  },
  {
    year: '2023',
    title: 'Enrolled — Singapore Polytechnic',
    org: 'Diploma in Computer Engineering',
    type: 'Education',
    color: '#f59e0b',
    desc: 'Started the DCPE programme. Focus areas: embedded systems, software development, cloud, and data analytics.',
  },
  {
    year: '2023-2024',
    title: 'Tutor',
    org: 'Nullspace Robotics',
    type: 'Work',
    color: '#22c55e',
    desc: 'Taught students robotics fundamentals and basic programming — problem solving, automation, and hands-on hardware.',
  },
  {
    year: '2025',
    title: 'Top 10 — GovTech AI CTF',
    org: 'Government Technology Agency of Singapore',
    type: 'Achievement',
    color: 'var(--accent)',
    desc: 'Competed in GovTech\'s AI-focused Capture-the-Flag challenge against university and polytechnic teams across Singapore.',
  },
  {
    year: '2025',
    title: 'Intern',
    org: 'Unicorn Family Wealth Consultant',
    type: 'Work',
    color: '#a855f7',
    desc: 'Supported consultants with operations; gained exposure to financial advisory, investment discussions, and wealth management.',
  },
  {
    year: '2026',
    title: 'Internship Tracker — Shipped',
    org: 'Personal Project',
    type: 'Build',
    color: '#3b82f6',
    desc: 'Designed and deployed a full-stack web app from zero: React frontend, FastAPI backend, Supabase PostgreSQL, hosted on Vercel + Render.',
  },
];

const typeColors = {
  Achievement: 'var(--accent)',
  Build: '#3b82f6',
  Work: '#22c55e',
  Education: '#f59e0b',
};

export default function Journey() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="journey" className="py-32 px-8 border-t border-[var(--border)]">
      <div className="max-w-[1400px] mx-auto">
        <div ref={ref}>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            className="section-label mb-6"
          >
            04. Journey
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-5xl md:text-7xl tracking-tight text-[var(--text)] mb-16"
          >
            HOW I GOT HERE
          </motion.h2>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.5, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="absolute left-[calc(5rem)] top-0 bottom-0 w-px bg-[var(--border)] origin-top hidden md:block"
          />

          <div className="space-y-0">
            {timeline.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + i * 0.08 }}
                className="group relative flex gap-0 md:gap-8 items-start py-8 border-b border-[var(--border)] last:border-0 hover:bg-[var(--surface)] transition-colors duration-200 px-4 -mx-4"
              >
                {/* Year */}
                <div className="hidden md:block w-20 flex-shrink-0 pt-1">
                  <span className="font-mono text-xs text-[var(--muted)] tracking-widest">{item.year}</span>
                </div>

                {/* Dot */}
                <div
                  className="hidden md:flex flex-shrink-0 w-3 h-3 rounded-full border-2 mt-1.5 -ml-1.5 relative z-10"
                  style={{ borderColor: item.color, background: 'var(--bg)' }}
                />

                {/* Content */}
                <div className="flex-1 pl-0 md:pl-6">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <h3 className="font-display text-xl md:text-2xl tracking-wide text-[var(--text)] group-hover:text-[var(--accent)] transition-colors">
                      {item.title}
                    </h3>
                    <span
                      className="font-mono text-[10px] tracking-widest uppercase px-2 py-0.5 border"
                      style={{ color: typeColors[item.type], borderColor: `${typeColors[item.type]}40` }}
                    >
                      {item.type}
                    </span>
                    <span className="md:hidden font-mono text-[10px] text-[var(--muted)]">{item.year}</span>
                  </div>
                  <p className="font-mono text-xs text-[var(--muted)] tracking-wider mb-2">{item.org}</p>
                  <p className="text-sm text-[var(--muted)] leading-relaxed max-w-xl">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
