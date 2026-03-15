import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowUpRight, Github, Linkedin, Mail } from 'lucide-react';

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio contact from ${form.name}`);
    const body = encodeURIComponent(`From: ${form.name} <${form.email}>\n\n${form.message}`);
    window.open(`mailto:shaneslee18@icloud.com?subject=${subject}&body=${body}`, '_blank');
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <section id="contact" className="py-32 px-8 border-t border-[var(--border)]">
      <div className="max-w-[1400px] mx-auto">
        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* Left */}
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              className="section-label mb-6"
            >
              05. Contact
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-display text-5xl md:text-7xl tracking-tight leading-none text-[var(--text)] mb-8"
            >
              LET'S<br />
              <span style={{ color: 'var(--accent)' }}>TALK</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.3 }}
              className="text-[var(--muted)] text-sm leading-relaxed max-w-sm mb-12"
            >
              Looking for a software engineering internship. Open to frontend, full-stack, or product engineering roles. Based in Singapore, available from early 2025.
            </motion.p>

            {/* Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.4 }}
              className="space-y-4"
            >
              {[
                { icon: Mail, label: 'shaneslee18@icloud.com', href: 'mailto:shaneslee18@icloud.com' },
                { icon: Github, label: 'github.com/shaaaaneeee', href: 'https://github.com/shaaaaneeee' },
                { icon: Linkedin, label: 'linkedin.com/in/shane-sebastian-lee', href: 'https://www.linkedin.com/in/shane-sebastian-lee-5396662b3' },
              ].map(({ icon: Icon, label, href }, i) => (
                <motion.a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ x: 6 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  className="flex items-center gap-3 group"
                >
                  <span className="w-8 h-8 border border-[var(--border)] flex items-center justify-center group-hover:border-[var(--accent)] transition-colors">
                    <Icon size={14} className="text-[var(--muted)] group-hover:text-[var(--accent)] transition-colors" />
                  </span>
                  <span className="font-mono text-xs text-[var(--muted)] tracking-wider group-hover:text-[var(--accent)] transition-colors">
                    {label}
                  </span>
                  <ArrowUpRight size={12} className="text-[var(--border)] group-hover:text-[var(--accent)] transition-colors ml-auto" />
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <form onSubmit={handleSubmit} className="space-y-10">
              <div>
                <label className="font-mono text-[10px] text-[var(--accent)] tracking-widest uppercase block mb-2">
                  Name
                </label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Your name"
                  className="form-input"
                />
              </div>
              <div>
                <label className="font-mono text-[10px] text-[var(--accent)] tracking-widest uppercase block mb-2">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="your@email.com"
                  className="form-input"
                />
              </div>
              <div>
                <label className="font-mono text-[10px] text-[var(--accent)] tracking-widest uppercase block mb-2">
                  Message
                </label>
                <textarea
                  required
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="What's on your mind?"
                  className="form-input resize-none"
                />
              </div>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="btn-primary w-full justify-center"
              >
                {sent ? '✓ Opening email client...' : 'Send Message'}
                {!sent && <ArrowUpRight size={14} />}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
