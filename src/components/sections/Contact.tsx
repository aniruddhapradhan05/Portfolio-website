import { useState, useRef, FormEvent } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPaperPlane, faCircleCheck, faCircleXmark, faSpinner } from '@fortawesome/free-solid-svg-icons';
import {
  faFacebook,
  faTwitter,
  faInstagram,
  faLinkedin,
  faGithub,
} from '@fortawesome/free-brands-svg-icons';
import Footer from '../Footer';

// ─── Setup ──────────────────────────────────────────────────────────────────
// 1. Go to https://formspree.io → create free account → New Form
// 2. Copy your form endpoint ID and paste it below
const FORMSPREE_ID = 'mgolpnnl';
// ─────────────────────────────────────────────────────────────────────────────

type Status = 'idle' | 'loading' | 'success' | 'error';

const socials = [
  { icon: faLinkedin, href: 'https://www.linkedin.com/in/aniruddha-pradhan-810533235/', label: 'LinkedIn' },
  { icon: faGithub, href: 'https://github.com/aniruddhapradhan05', label: 'GitHub' },
  { icon: faFacebook, href: 'https://www.facebook.com/aniruddhakhare05/', label: 'Facebook' },
  { icon: faTwitter, href: 'https://twitter.com/Anirudd82032560', label: 'Twitter' },
  { icon: faInstagram, href: 'https://www.instagram.com/aniruddhakhare05/', label: 'Instagram' },
];

const inputClass =
  'w-full bg-dark3 border border-dark3 rounded-xl px-5 py-4 text-white placeholder-muted/60 text-sm outline-none ' +
  'focus:border-gold/60 focus:ring-1 focus:ring-gold/30 transition-all duration-300';

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const [status, setStatus] = useState<Status>('idle');
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus('success');
        setForm({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }

    // Reset to idle after 5 s
    setTimeout(() => setStatus('idle'), 5000);
  };

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section id="contact" className="min-h-[100dvh] md:min-h-[100dvh] md:max-h-[1080px] py-16 md:py-24 flex flex-col justify-center relative bg-dark2" ref={ref}>
      <div className="px-6 md:px-[10%] relative z-10 w-full max-w-[1920px] mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="flex flex-wrap gap-12 items-start"
        >
          {/* ── Left col ─────────────────────────────── */}
          <motion.div variants={itemVariants} className="flex-none w-full md:w-[32%]">
            <h2 className="section-title">Contact Me</h2>

            <p className="flex items-center gap-3 mt-8 text-muted text-sm">
              <FontAwesomeIcon icon={faEnvelope} className="text-gold text-xl" />
              <a
                href="mailto:aniruddhapradhan2020@gmail.com"
                className="hover:text-gold transition-colors duration-300 break-all"
              >
                aniruddhapradhan2020@gmail.com
              </a>
            </p>

            <div className="flex gap-5 mt-8">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="text-muted text-2xl hover:text-gold hover:-translate-y-1 transition-all duration-300"
                >
                  <FontAwesomeIcon icon={s.icon} />
                </a>
              ))}
            </div>

            <a href="/CV.pdf" download className="btn btn-solid mt-10 !px-10">
              Download CV
            </a>

            {/* Small helper note */}
            <p className="mt-6 text-xs text-muted/50 leading-relaxed">
              Responses are stored in a{' '}
              <a
                href="https://formspree.io"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold/60 hover:text-gold transition-colors"
              >
                Formspree
              </a>{' '}
              dashboard and can be exported as CSV / Excel.
            </p>
          </motion.div>

          {/* ── Right col — form ─────────────────────── */}
          <motion.div variants={itemVariants} className="flex-1 min-w-0">
            <form
              onSubmit={handleSubmit}
              className="bg-dark/60 border border-dark3 rounded-2xl p-8 shadow-2xl flex flex-col gap-5"
            >
              {/* Row: name + email */}
              <div className="flex flex-col sm:flex-row gap-5">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className={inputClass}
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className={inputClass}
                />
              </div>

              <input
                type="text"
                name="subject"
                placeholder="Subject"
                value={form.subject}
                onChange={handleChange}
                className={inputClass}
              />

              <textarea
                name="message"
                placeholder="Your message..."
                value={form.message}
                onChange={handleChange}
                required
                rows={6}
                className={`${inputClass} resize-none`}
              />

              {/* Submit button */}
              <button
                type="submit"
                disabled={status === 'loading'}
                className="btn btn-solid flex items-center justify-center gap-3 !py-4 !px-8 rounded-xl disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === 'loading' ? (
                  <>
                    <FontAwesomeIcon icon={faSpinner} spin />
                    Sending…
                  </>
                ) : (
                  <>
                    <FontAwesomeIcon icon={faPaperPlane} />
                    Send Message
                  </>
                )}
              </button>

              {/* Feedback toast */}
              <AnimatePresence mode="wait">
                {status === 'success' && (
                  <motion.p
                    key="success"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2 text-green-400 text-sm font-medium"
                  >
                    <FontAwesomeIcon icon={faCircleCheck} />
                    Message sent! I'll get back to you soon.
                  </motion.p>
                )}
                {status === 'error' && (
                  <motion.p
                    key="error"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2 text-red-400 text-sm font-medium"
                  >
                    <FontAwesomeIcon icon={faCircleXmark} />
                    Something went wrong. Please try again.
                  </motion.p>
                )}
              </AnimatePresence>
            </form>
          </motion.div>
        </motion.div>
      </div>

      {/* Footer pinned to bottom of this 100dvh section */}
      <div className="absolute bottom-0 left-0 w-full mt-auto">
        <Footer />
      </div>
    </section>
  );
}
