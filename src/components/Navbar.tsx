import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';

const navLinks = [
  { label: 'Home', href: '/#home', isHash: true },
  { label: 'About', href: '/#about', isHash: true },
  { label: 'Projects', href: '/#projects', isHash: true },
  { label: 'Contact', href: '/#contact', isHash: true },
  { label: 'Certificates', href: '/certificates', isHash: false },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      // Scroll spy logic
      const sections = navLinks
        .filter((link) => link.isHash)
        .map((link) => link.href.replace('/#', ''));
        
      let currentActive = '';
      for (const id of sections) {
        const element = document.getElementById(id);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Adjust threshold to detect when section is in view
          if (rect.top <= 100 && rect.bottom >= 100) {
            currentActive = `/#${id}`;
          }
        }
      }
      
      if (currentActive) {
        setActiveSection(currentActive);
      } else if (window.scrollY < 100) {
        setActiveSection('/#home');
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Trigger once on mount
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleHashClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('/#')) {
      e.preventDefault();
      const id = href.replace('/#', '');
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(href);
      setMenuOpen(false);
    } else {
      setMenuOpen(false);
    }
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-dark/90 backdrop-blur-md shadow-lg shadow-black/40' : 'bg-transparent'
      }`}
    >
      <div className="w-full max-w-[1920px] mx-auto px-6 md:px-[10%] flex items-center justify-between h-16">
        {/* Logo */}
        <Link to="/" className="text-gold font-bold text-xl tracking-wide select-none">
          &lt;Aniruddha /&gt;
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            // Determine if active based on scroll spy (hash) or pathname (certificates page)
            const isActive = link.isHash
              ? activeSection === link.href
              : location.pathname === link.href;

            return (
              <li key={link.label}>
                <a
                  href={link.href}
                  onClick={(e) => handleHashClick(e, link.href)}
                  className={`nav-link ${isActive ? 'active text-gold' : 'text-white'}`}
                >
                  {link.label}
                </a>
              </li>
            );
          })}
        </ul>

        {/* Mobile burger */}
        <button
          className="md:hidden text-white text-2xl focus:outline-none"
          onClick={() => setMenuOpen((p) => !p)}
          aria-label="Toggle menu"
        >
          <FontAwesomeIcon icon={menuOpen ? faXmark : faBars} />
        </button>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed top-0 right-0 h-screen w-56 bg-[#0f172a] border-l border-dark3 z-50 shadow-2xl flex flex-col pt-16 px-8 gap-6 md:hidden"
          >
            <button
              className="absolute top-5 left-6 text-white text-2xl hover:text-gold transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              <FontAwesomeIcon icon={faXmark} />
            </button>
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleHashClick(e, link.href)}
                className="text-white font-semibold text-lg hover:text-gold transition-colors"
              >
                {link.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
