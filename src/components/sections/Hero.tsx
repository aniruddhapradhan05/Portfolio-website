import { TypeAnimation } from 'react-type-animation';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section
      id="home"
      className="relative w-full min-h-[75vh] md:min-h-screen md:h-screen md:max-h-[1080px] bg-[#0f172a] md:bg-transparent md:bg-[url('/banner.png')] bg-cover bg-center flex items-center py-20 md:py-0"
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-dark/60 md:bg-dark/60" />

      <div className="relative z-10 px-6 md:px-[10%] mt-16 max-w-[1920px] mx-auto w-full">
        {/* Greeting */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-muted text-xl md:text-2xl font-light"
        >
          Hi, I am
        </motion.p>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="text-5xl md:text-7xl font-bold mt-3 leading-tight"
        >
          <span className="text-gold">Aniruddha Pradhan</span>
        </motion.h1>

        {/* Typed role */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-4 text-2xl md:text-4xl font-medium text-white"
        >
          <TypeAnimation
            sequence={[
              'Full Stack Developer',
              2000,
              'MERN Stack Developer',
              2000,
              'React / TypeScript Dev',
              2000,
            ]}
            wrapper="span"
            speed={50}
            repeat={Infinity}
          />
        </motion.div>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.1 }}
          className="mt-10 flex flex-wrap gap-4"
        >
          <a
            href="/#contact"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="btn"
          >
            Hire Me
          </a>
          <a
            href="/CV.pdf"
            download
            className="btn btn-solid"
          >
            Download CV
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.8 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
      >
        <span className="text-muted text-sm tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-0.5 h-8 bg-gold rounded"
        />
      </motion.div>
    </section>
  );
}
