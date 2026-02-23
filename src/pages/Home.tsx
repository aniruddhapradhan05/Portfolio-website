import Navbar from '../components/Navbar';
import Hero from '../components/sections/Hero';
import About from '../components/sections/About';
import Projects from '../components/sections/Projects';
import Contact from '../components/sections/Contact';
import { motion, AnimatePresence } from 'framer-motion';

export default function Home() {
  return (
    <AnimatePresence>
      <motion.div
        key="home"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Navbar />
        <Hero />
        <About />
        <Projects />
        <Contact />
      </motion.div>
    </AnimatePresence>
  );
}
