import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowUpRight, Github } from 'lucide-react';

const projects = [
  {
    number: '01',
    title: 'Internship Tracker',
    subtitle: 'Full-stack productivity app',
    description:
      'A full-stack dashboard for tracking job applications — with filtering by status, statistics charts, and JWT authentication. Built end-to-end from backend APIs to a polished React UI.',
    tags: ['React', 'FastAPI', 'Supabase', 'PostgreSQL', 'Vercel'],
    github: 'https://github.com/shaaaaneeee/internship-tracker',
    live: 'https://internship-tracker-shane.vercel.app/',
    accent: '#ff6b35',
    year: '2024',
    status: 'Live',
  },
  {
    number: '02',
    title: 'Tuition Center Redesign',
    subtitle: 'Frontend & UX project',
    description:
      'Complete website overhaul for a math tuition center. Focused on conversion, clear information hierarchy, and a modern visual identity that parents and students would actually trust.',
    tags: ['React', 'Tailwind CSS', 'Framer Motion'],
    github: 'https://github.com/shaaaaneeee',
    live: null,
    accent: '#3b82f6',
    year: '2024',
    status: 'In Progress',
  },
  {
    number: '03',
    title: 'Smart Library System',
    subtitle: 'Hardware + software integration',
    description:
      'Raspberry Pi-powered library management system with RFID scanning for automated check-in/out. Containerised with Docker. Built during SP Computer Engineering coursework.',
    tags: ['Python', 'Raspberry Pi', 'Docker', 'RFID', 'HTML/CSS'],
    github: 'https://github.com/shaaaaneeee',
    live: null,
    accent: '#22c55e',
    year: '2024',
    status: 'Completed',
  },
];

function ProjectCard({ project, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="project-card group border border-[var(--border)] bg-[var(--surface)] hover:border-[var(--accent)] transition-all duration-500"
    >
      {/* Project image area */}
      <div
        className="relative h-52 md:h-64 overflow-hidden flex items-center justify-center"
        style={{ background: `linear-gradient(135deg, ${project.accent}08, ${project.accent}18)` }}
      >
        {/* Abstract visual pattern */}
        <svg width="100%" height="100%" className="absolute inset-0 opacity-20">
          <defs>
            <pattern id={`grid-${index}`} width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke={project.accent} strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#grid-${index})`} />
        </svg>

        {/* Big number overlay */}
        <span
          className="absolute right-6 bottom-4 font-display text-8xl leading-none select-none"
          style={{ color: `${project.accent}15` }}
        >
          {project.number}
        </span>

        {/* Status + year */}
        <div className="absolute top-4 left-4 flex items-center gap-2">
          <span className="font-mono text-[10px] tracking-widest text-[var(--muted)]">{project.year}</span>
          <span className="mx-1 text-[var(--border)]">·</span>
          <span
            className="font-mono text-[10px] tracking-widest uppercase"
            style={{ color: project.accent }}
          >
            {project.status}
          </span>
        </div>

        {/* Hover overlay with links */}
        <div className="absolute inset-0 bg-[var(--bg)]/80 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-4">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline text-xs py-2 px-4"
          >
            <Github size={12} />
            Code
          </a>
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-xs py-2 px-4"
            >
              Live
              <ArrowUpRight size={12} />
            </a>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div>
            <p className="font-mono text-[10px] text-[var(--muted)] tracking-widest uppercase mb-1">
              {project.subtitle}
            </p>
            <h3 className="font-display text-2xl md:text-3xl tracking-wide text-[var(--text)] group-hover:text-[var(--accent)] transition-colors duration-300">
              {project.title}
            </h3>
          </div>
          <motion.div
            whileHover={{ rotate: 45 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <ArrowUpRight size={18} className="text-[var(--muted)] group-hover:text-[var(--accent)] transition-colors mt-1" />
          </motion.div>
        </div>

        <p className="text-sm text-[var(--muted)] leading-relaxed mb-5">{project.description}</p>

        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span key={tag} className="tag">{tag}</span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <section id="projects" className="py-32 px-8">
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div ref={ref} className="flex items-end justify-between mb-16">
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5 }}
              className="section-label mb-4"
            >
              02. Selected Work
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-display text-5xl md:text-7xl tracking-tight text-[var(--text)]"
            >
              PROJECTS
            </motion.h2>
          </div>
          <motion.a
            href="https://github.com/shaaaaneeee"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
            className="hidden md:flex btn-outline text-xs"
          >
            All on GitHub
            <ArrowUpRight size={12} />
          </motion.a>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((p, i) => (
            <ProjectCard key={i} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
