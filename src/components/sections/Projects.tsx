import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useInView, Variants } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faChevronRight,
  faArrowUpRightFromSquare,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

interface Project {
  title: string;
  desc: string;
  img: string;
  link: string;
  isGithub?: boolean;
  tags: string[];
  num: string;
}

const projects: Project[] = [
  {
    num: '01',
    title: 'The Goonies Website',
    desc: 'Recreated a high-fidelity, interactive clone of the Goonies movie website using GSAP — implementing scroll-based animations, scene pinning, and transitions via GSAP ScrollTrigger.',
    img: '/projects/goonies.jpeg',
    link: 'https://goonies-clone-aniruddha.netlify.app/',
    tags: ['GSAP', 'ScrollTrigger', 'HTML', 'CSS'],
  },
  {
    num: '02',
    title: 'Amazon-Inspired Frontend',
    desc: 'Developed an Amazon-like product search application using JavaScript and an external API to fetch and display real-time product data with a polished, familiar UI.',
    img: '/projects/amazon.png',
    link: 'https://amazon-clone-aniruddha.netlify.app/',
    tags: ['JavaScript', 'REST API', 'HTML', 'CSS'],
  },
  {
    num: '03',
    title: 'Hostel Management System',
    desc: 'Full-stack hostel management platform with React.js, Tailwind, Node.js, Express.js, and MongoDB — exposing RESTful APIs for student records, facilities, and room allocations.',
    img: '/projects/hms.png',
    link: 'https://hostelmanagementsystem-aniruddha.netlify.app/',
    tags: ['React', 'Node.js', 'MongoDB', 'Express', 'Tailwind'],
  },
  {
    num: '04',
    title: 'Blogging WebApp',
    desc: 'Dynamic blog platform built with React for a responsive UI, powered by AppWrite as a backend-as-a-service for authentication and efficient content management.',
    img: '/projects/blog.png',
    link: 'https://github.com/aniruddhapradhan05/Blog-React-WebApp',
    isGithub: true,
    tags: ['React', 'AppWrite', 'TypeScript'],
  },
  {
    num: '05',
    title: 'Court Master 3D Model',
    desc: 'Designed an innovative robot that automates chalk-line creation for outdoor and indoor games. Modelled precisely in Fusion 360 to ensure optimal functionality and efficiency.',
    img: '/projects/model.png',
    link: 'https://github.com/aniruddhapradhan05/Court-Master',
    isGithub: true,
    tags: ['Fusion 360', 'Robotics', '3D Design'],
  },
  {
    num: '06',
    title: 'Bus Booking System',
    desc: "A desktop bus booking application using Python's Tkinter library for the UI and SQLite database for managing buses, bookings, and customer records.",
    img: '/projects/bus.jpeg',
    link: 'https://github.com/aniruddhapradhan05/Bus_Booking_System',
    isGithub: true,
    tags: ['Python', 'Tkinter', 'SQLite'],
  },
];

const slideVariants: Variants = {
  enter: (dir: number) => ({
    x: dir > 0 ? '100%' : '-100%',
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 260, damping: 30 },
  },
  exit: (dir: number) => ({
    x: dir < 0 ? '100%' : '-100%',
    opacity: 0,
    transition: { duration: 0.3 },
  }),
};

export default function Projects() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const paginate = useCallback(
    (dir: number) => {
      setDirection(dir);
      setIndex((prev) => (prev + dir + projects.length) % projects.length);
    },
    []
  );

  const project = projects[index];

  return (
    <>
      <section id="projects" className="py-12 md:py-24 overflow-hidden" ref={ref}>
      <div className="px-6 md:px-[10%] max-w-[1920px] mx-auto w-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-end justify-between mb-8 md:mb-14 flex-wrap gap-4"
        >
          <h2 className="section-title">My Projects</h2>
          <span className="text-muted text-sm font-medium tracking-widest uppercase">
            {String(index + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
          </span>
        </motion.div>

        {/* Card slider with framing accents */}
        <div className="relative w-full mt-10 py-6 md:py-10">
          
          {/* Top-Left Corner Accent */}
          <div className="absolute top-0 left-0 w-12 h-12 md:w-20 md:h-20 border-t-2 border-l-2 border-gold opacity-50 rounded-tl-lg" />
          {/* Top-Right Corner Accent */}
          <div className="absolute top-0 right-0 w-12 h-12 md:w-20 md:h-20 border-t-2 border-r-2 border-gold opacity-50 rounded-tr-lg" />
          {/* Bottom-Left Corner Accent */}
          <div className="absolute bottom-0 left-0 w-12 h-12 md:w-20 md:h-20 border-b-2 border-l-2 border-gold opacity-50 rounded-bl-lg" />
          {/* Bottom-Right Corner Accent */}
          <div className="absolute bottom-0 right-0 w-12 h-12 md:w-20 md:h-20 border-b-2 border-r-2 border-gold opacity-50 rounded-br-lg" />

          <div className="relative flex justify-center px-4 md:px-0">
            <div className="w-full max-w-5xl relative min-h-[400px] lg:h-[55vh] lg:max-h-[480px] flex items-stretch">
              <AnimatePresence initial={false} custom={direction} mode="popLayout">
                <motion.div
                  key={index}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="w-full flex flex-col lg:flex-row gap-0 rounded-2xl overflow-hidden border border-dark3 shadow-2xl bg-dark2 relative z-10"
                >
                  {/* Image half */}
                  <div className="relative lg:w-[45%] h-56 lg:h-auto overflow-hidden">
                    <img
                      src={project.img}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                    {/* Gradient overlay on image */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-dark2/80 hidden lg:block" />
                    {/* Big project number watermark */}
                    <span className="absolute bottom-4 left-5 text-7xl font-black text-white/10 leading-none select-none">
                      {project.num}
                    </span>
                  </div>

                  {/* Content half */}
                  <div className="lg:w-[55%] flex flex-col justify-between p-6 md:p-8">
                    <div>
                      {/* Project number + title */}
                      <span className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-1 block">
                        Project {project.num}
                      </span>
                      <h3 className="text-white text-xl lg:text-2xl font-bold leading-tight mb-3">
                        {project.title}
                      </h3>
                      <p className="text-muted text-sm leading-relaxed mb-6 line-clamp-4">
                        {project.desc}
                      </p>

                      {/* Tech tags */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2.5 py-1 rounded-full text-[10px] md:text-xs font-medium border border-gold/30 text-gold/80 bg-gold/5"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Live link & Arrows */}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4 mt-auto">
                      <div className="flex items-center gap-3">
                        {/* For first 3 projects, show "Preview Here". Otherwise normal button */}
                        {index < 3 ? (
                          <>
                            <button
                              onClick={() => setPreviewUrl(project.link)}
                              className="btn btn-solid flex items-center justify-center gap-2 !px-4 !py-2.5 text-xs md:text-sm rounded-xl shrink-0"
                            >
                              Preview Here
                            </button>
                            <a
                              href={project.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="btn flex items-center justify-center gap-2 !px-4 !py-2.5 text-xs md:text-sm rounded-xl shrink-0 border border-dark3 hover:border-gold"
                              title="Preview in new tab"
                            >
                              <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                            </a>
                          </>
                        ) : (
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-solid flex items-center justify-center gap-2 !px-4 !py-2.5 text-xs md:text-sm rounded-xl shrink-0"
                          >
                            <FontAwesomeIcon icon={project.isGithub ? faGithub : faArrowUpRightFromSquare} />
                            {project.isGithub ? 'GitHub' : 'Preview'}
                          </a>
                        )}
                      </div>

                      {/* Arrows */}
                      <div className="sm:ml-auto flex gap-2 shrink-0">
                        <button
                          onClick={() => paginate(-1)}
                          aria-label="Previous"
                          className="w-9 h-9 lg:w-10 lg:h-10 rounded-full border border-dark3 text-muted hover:border-gold hover:text-gold transition-all duration-300 flex items-center justify-center"
                        >
                          <FontAwesomeIcon icon={faChevronLeft} size="xs" />
                        </button>
                        <button
                          onClick={() => paginate(1)}
                          aria-label="Next"
                          className="w-9 h-9 lg:w-10 lg:h-10 rounded-full border border-dark3 text-muted hover:border-gold hover:text-gold transition-all duration-300 flex items-center justify-center"
                        >
                          <FontAwesomeIcon icon={faChevronRight} size="xs" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Dot pagination */}
        <div className="flex justify-center gap-2 mt-8">
          {projects.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setDirection(i > index ? 1 : -1);
                setIndex(i);
              }}
              aria-label={`Go to project ${i + 1}`}
              className={`rounded-full transition-all duration-300 ${
                i === index
                  ? 'w-8 h-2 bg-gold'
                  : 'w-2 h-2 bg-dark3 hover:bg-muted'
              }`}
            />
          ))}
        </div>

        {/* GitHub link */}
        <div className="text-center mt-10">
          <a
            href="https://github.com/aniruddhapradhan05?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="btn"
          >
            See All on GitHub
          </a>
        </div>
      </div>
    </section>

        {/* Floating Window Iframe Preview Overlay */}
        <AnimatePresence>
          {previewUrl && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-dark/80 backdrop-blur-sm flex items-center justify-center p-4 lg:p-0"
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                className="w-full max-w-6xl lg:w-[70vw] h-[85vh] lg:h-[70vh] bg-dark2 rounded-2xl overflow-hidden border border-dark3 shadow-2xl flex flex-col relative"
              >
                {/* Top Bar */}
                <div className="w-full h-14 bg-dark3 flex items-center justify-between px-6 border-b border-dark/50 shrink-0">
                  <span className="text-gold font-medium tracking-wider text-sm flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    Live Preview
                  </span>
                  <div className="flex items-center gap-4">
                    <a
                      href={previewUrl || undefined}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted hover:text-white transition-colors flex flex-col items-center gap-1 group"
                      title="Open in new tab"
                    >
                      <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                    </a>
                    <button
                      onClick={() => setPreviewUrl(null)}
                      className="text-muted hover:text-red-400 transition-colors w-8 h-8 flex items-center justify-center rounded-full hover:bg-dark2"
                      title="Close preview"
                    >
                      <FontAwesomeIcon icon={faTimes} size="lg" />
                    </button>
                  </div>
                </div>

                {/* Iframe Container */}
                <div className="flex-1 w-full bg-black relative">
                  {/* Loader showing behind iframe while loading */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-8 h-8 border-4 border-gold border-t-transparent rounded-full animate-spin" />
                  </div>
                  <iframe
                    src={previewUrl || undefined}
                    title="Live Project Preview"
                    className="w-full h-full bg-white relative z-10"
                    sandbox="allow-scripts allow-same-origin allow-forms"
                  />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </>
    );
  }
