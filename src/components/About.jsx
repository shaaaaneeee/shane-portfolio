import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const skills = [
  { category: 'Frontend', items: ['React', 'JavaScript', 'HTML/CSS', 'Tailwind CSS', 'Framer Motion'] },
  { category: 'Backend', items: ['Python', 'FastAPI', 'PostgreSQL', 'Supabase', 'REST APIs'] },
  { category: 'DevOps', items: ['Docker', 'AWS', 'Vercel', 'Render', 'Git'] },
  { category: 'Other', items: ['C++', 'Raspberry Pi', 'Arduino', 'Power BI', 'Pandas'] },
];

const stats = [
  { value: '3+', label: 'Projects shipped' },
  { value: 'Top 10', label: 'GovTech AI CTF' },
  { value: 'AWS', label: 'Cloud Certified' },
  { value: 'G7', label: 'ABRSM Piano' },
];

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="about" className="py-32 px-8 border-t border-[var(--border)]">
      <div className="max-w-[1400px] mx-auto">
        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* Left: Text */}
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              className="section-label mb-6"
            >
              03. About
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-display text-5xl md:text-6xl leading-none tracking-tight text-[var(--text)] mb-10"
            >
              BUILT ON<br />
              <span style={{ color: 'var(--accent)' }}>CURIOSITY</span>
            </motion.h2>

            {['Computer Engineering student at Singapore Polytechnic, graduating March 2027. I learn by building — projects that actually ship and problems that actually matter.',
              'My work lives at the intersection of clean frontend engineering and thoughtful backend design. I\'m drawn to products where the UI is as considered as the system underneath.',
              'Outside of code: competitive robotics, piano (ABRSM Grade 7), the gym, and obsessing over startups and trading.'
            ].map((text, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 15 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
                className="text-[var(--muted)] text-sm leading-relaxed mb-5"
              >
                {text}
              </motion.p>
            ))}

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.6 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 pt-12 border-t border-[var(--border)]"
            >
              {stats.map((s, i) => (
                <div key={i} className="text-center">
                  <p className="font-display text-2xl md:text-3xl text-[var(--accent)] tracking-wide">{s.value}</p>
                  <p className="font-mono text-[10px] text-[var(--muted)] mt-1 uppercase tracking-widest">{s.label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: Skills grid */}
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.3 }}
              className="font-mono text-xs text-[var(--muted)] tracking-widest uppercase mb-8"
            >
              Tech I work with
            </motion.p>

            <div className="space-y-8">
              {skills.map((group, gi) => (
                <motion.div
                  key={gi}
                  initial={{ opacity: 0, x: 20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + gi * 0.1 }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="font-mono text-[10px] text-[var(--accent)] tracking-widest uppercase">
                      {group.category}
                    </span>
                    <div className="flex-1 h-px bg-[var(--border)]" />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <motion.span
                        key={item}
                        whileHover={{ scale: 1.05, borderColor: 'var(--accent)', color: 'var(--accent)' }}
                        className="tag"
                      >
                        {item}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Certifications */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.7 }}
              className="mt-12 p-6 border border-[var(--border)] bg-[var(--surface)]"
            >
              <p className="font-mono text-[10px] text-[var(--accent)] tracking-widest uppercase mb-4">Certifications</p>
              {['AWS Cloud Foundations', 'Docker Essentials', 'Kubernetes Basics'].map((cert, i) => (
                <div key={i} className="flex items-center gap-3 py-2 border-b border-[var(--border)] last:border-0">
                  <span className="w-1 h-1 rounded-full bg-[var(--accent)]" />
                  <span className="text-sm text-[var(--muted)]">{cert}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
