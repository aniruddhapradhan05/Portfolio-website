import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { AnimatePresence } from 'framer-motion';

type TabKey = 'skills' | 'experience' | 'education';

const tabs: { key: TabKey; label: string }[] = [
  { key: 'skills', label: 'Skills' },
  { key: 'experience', label: 'Experience' },
  { key: 'education', label: 'Education' },
];

const tabContent: Record<TabKey, { title: string; detail: string }[]> = {
  skills: [
    {
      title: 'Languages',
      detail: 'C, C++, Java, JavaScript, Python, SQL, HTML, CSS',
    },
    {
      title: 'Frameworks / Libraries',
      detail: 'React.js, Node.js, MongoDB, Express.js, jQuery, Bootstrap, Tailwind, SCSS, GSAP',
    },
    {
      title: 'Tools / Platforms',
      detail: 'Adobe Experience Manager, Git, GitHub, VSCode, Postman, Canva, Fusion 360',
    },
  ],
  experience: [
    {
      title: 'Axeno Consulting — Software Engineer L1',
      detail:
        'Contributed to an AEM-based accessibility (WCAG) compliance project for a leading banking client. Implemented full keyboard navigability and accessible icons using HTML, CSS, and JavaScript.',
    },
    {
      title: 'Axeno Consulting — Software Intern',
      detail:
        'Built GSAP animations, Amazon UI clone, and interactive web pages. Explored AEM fundamentals through self-driven mini-projects with component development and authoring workflows.',
    },
  ],
  education: [
    {
      title: '10th — Jnv Tikamgarh MP (2019)',
      detail: 'Marks: 91.6%',
    },
    {
      title: '12th — BDM School Dehradun UK (2021)',
      detail: 'Marks: 85.7%',
    },
    {
      title: 'B.Tech — Jaypee University of Engineering & Technology, Guna MP',
      detail: 'Current CGPA: 8.8',
    },
  ],
};

export default function About() {
  const [activeTab, setActiveTab] = useState<TabKey>('skills');
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.2 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section id="about" className="py-12 md:py-24 text-muted" ref={ref}>
      <div className="px-6 md:px-[10%] max-w-[1920px] mx-auto w-full">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="flex flex-col md:flex-row gap-8 md:gap-12 items-stretch"
        >
          {/* Photo */}
          <motion.div variants={itemVariants} className="flex-none w-full md:w-[35%] flex flex-col">
            <div className="relative group w-full flex-1 flex flex-col">
              <img
                src="/aniruddha-profile.png"
                alt="Aniruddha Pradhan"
                className="w-full h-full object-cover rounded-2xl shadow-2xl border-2 border-dark3 group-hover:scale-105 transition-transform duration-500"
              />
              {/* Top-left gold accent corner */}
              <div className="absolute -top-3 -left-3 w-24 h-24 border-t-4 border-l-4 border-gold rounded-tl-2xl pointer-events-none" />
              {/* Bottom-right gold accent corner */}
              <div className="absolute -bottom-3 -right-3 w-24 h-24 border-b-4 border-r-4 border-gold rounded-br-2xl pointer-events-none" />
            </div>
          </motion.div>

          {/* Content */}
          <motion.div variants={itemVariants} className="flex-1 min-w-0">
            <h2 className="section-title">About Me</h2>
            <p className="mt-6 text-base md:text-lg leading-relaxed text-muted">
              Tech enthusiast pursuing B.Tech in Computer Science. Committed to innovative solutions
              and making a positive impact. Open to collaborations and learning opportunities.
            </p>

            {/* Tab buttons */}
            <div className="flex gap-10 mt-8 mb-6">
              {tabs.map((t) => (
                <button
                  key={t.key}
                  onClick={() => setActiveTab(t.key)}
                  className={`tab-btn ${activeTab === t.key ? 'active text-gold' : 'text-muted'}`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {/* Tab content */}
            <AnimatePresence mode="wait">
              <motion.ul
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.35 }}
                className="space-y-4"
              >
                {tabContent[activeTab].map((item, i) => (
                  <li key={i} className="flex flex-col gap-1">
                    <span className="text-gold text-sm font-semibold">{item.title}</span>
                    <span className="text-muted text-sm leading-relaxed">{item.detail}</span>
                  </li>
                ))}
              </motion.ul>
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
