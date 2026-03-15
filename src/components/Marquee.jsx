export default function Marquee() {
  const items = [
    'React', '·', 'FastAPI', '·', 'Python', '·', 'Supabase', '·',
    'Docker', '·', 'AWS', '·', 'Tailwind CSS', '·', 'Framer Motion', '·',
    'PostgreSQL', '·', 'Vercel', '·', 'Git', '·', 'JavaScript', '·',
  ];

  return (
    <div className="overflow-hidden border-y border-[var(--border)] py-4 my-0">
      <div className="marquee-track">
        {[...items, ...items].map((item, i) => (
          <span
            key={i}
            className={`font-mono text-xs tracking-widest mx-4 whitespace-nowrap ${
              item === '·' ? 'text-[var(--accent)]' : 'text-[var(--muted)] uppercase'
            }`}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
