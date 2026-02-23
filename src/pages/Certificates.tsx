import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faArrowUpRightFromSquare,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

interface Certificate {
  img: string;
  title: string;
  link?: string;
}

const certificates: Certificate[] = [
  { img: "/certificates/codekaze.jpg", title: "CodingNinjas CodeKaze'24" },
  {
    img: "/certificates/postman.png",
    title: "Postman API Fundamentals Student Expert",
    link: "https://api.badgr.io/public/assertions/6fMU8NlTQN-SeqMllEX6bg?identity__email=aniruddhapradhan2020%40gmail.com",
  },
  {
    img: "/certificates/certificate2.png",
    title: "JavaScript — Infosys Springboard",
    link: "https://infyspringboard.onwingspan.com/public-assets/infosysheadstart/cert/lex_18109698366332810000_shared/1-9cc62b6b-4d29-4015-a700-6407a2dd4dcb.pdf",
  },
  {
    img: "/certificates/certificate2.jpeg",
    title:
      "Data Structures & Algorithms in Python: Fundamental Data Structures",
  },
  {
    img: "/certificates/ncat_certificate.jpeg",
    title: "All India Naukri Campus Aptitude Test",
  },
  {
    img: "/certificates/turk.png",
    title: "Campus Young Turks — India's Largest Skill Contest",
    link: "https://www.naukri.com/campus/certificates/young_turks_round_1_achievement/v0/6707fda0e3b9a668e0002972?utm_source=certificate&utm_medium=copy&utm_campaign=6707fda0e3b9a668e0002972",
  },
  {
    img: "/certificates/0ab654ed-1.png",
    title: "Learning End-to-End Testing with Jest",
  },
  {
    img: "/certificates/1aadcedc-1.png",
    title: "Learn JavaScript: Write Modern Code with JavaScript ESNext",
  },
  {
    img: "/certificates/1f97e410-1.png",
    title: "Web Motion: Animate a CSS Sprite Sheet",
  },
  {
    img: "/certificates/3d47d9c4-1.png",
    title: "CSS: Animation",
  },
  {
    img: "/certificates/9b26446c-1.png",
    title: "Testing React Applications with Jest and React Testing Library",
  },
  {
    img: "/certificates/61e383ed-1.png",
    title: "Accessibility for Web Design",
  },
  {
    img: "/certificates/821c5356-1.png",
    title: "Gaining Skills with LinkedIn Learning",
  },
  {
    img: "/certificates/9325d34f-1.png",
    title: "JavaScript: Async",
  },
  {
    img: "/certificates/24760cb5-1.png",
    title:
      "Privacy, Governance, and Compliance: Data Classification and Inventory",
  },
  {
    img: "/certificates/1725689a-1.png",
    title: "Web Accessibility for Developers",
  },
  {
    img: "/certificates/abd1d0e4-1.png",
    title: "React: Creating and Hosting a Full-Stack Site",
  },
  {
    img: "/certificates/e4861cb3-1.png",
    title: "How to Use LinkedIn Learning",
  },
  {
    img: "/certificates/f6a1343d-1.png",
    title: "Building Modern Projects with React",
  },
];

function CertCard({
  cert,
  index,
  onClickImage,
}: {
  cert: Certificate;
  index: number;
  onClickImage: (img: string) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
      className="bg-dark2 rounded-2xl overflow-hidden shadow-xl border border-dark3 hover:border-gold/50 transition-all duration-300 hover:-translate-y-1 flex flex-col group"
    >
      {/* Image Container (Clickable) */}
      <div
        className="overflow-hidden cursor-pointer relative"
        onClick={() => onClickImage(cert.img)}
      >
        <img
          src={cert.img}
          alt={cert.title}
          className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
          <span className="text-white bg-black/60 px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm">
            View Full Image
          </span>
        </div>
      </div>

      {/* Footer Content */}
      <div className="p-6 flex items-center justify-between gap-3 mt-auto">
        <p className="text-white font-medium text-sm leading-relaxed">
          {cert.title}
        </p>
        <div className="flex gap-2 shrink-0">
          {cert.link && (
            <a
              href={cert.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-none w-9 h-9 rounded-full bg-gold flex items-center justify-center text-dark hover:scale-110 transition-transform"
              title="Open external link"
            >
              <FontAwesomeIcon icon={faArrowUpRightFromSquare} size="xs" />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function Certificates() {
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  return (
    <>
      <div className="min-h-screen bg-dark py-20">
        <div className="px-6 md:px-[10%]">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-6 mb-12"
          >
            <Link
              to="/"
              className="w-10 h-10 rounded-full border border-gold flex items-center justify-center text-gold hover:bg-gold hover:text-dark transition-all duration-300"
            >
              <FontAwesomeIcon icon={faArrowLeft} />
            </Link>
            <h1 className="section-title">My Certificates</h1>
          </motion.div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {certificates.map((c, i) => (
              <CertCard
                key={i}
                cert={c}
                index={i}
                onClickImage={setPreviewImage}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Full Image Modal Overlay */}
      <AnimatePresence>
        {previewImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setPreviewImage(null)}
            className="fixed inset-0 z-[100] bg-dark/90 backdrop-blur-md flex items-center justify-center p-4 lg:p-8 cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) =>
                e.stopPropagation()
              } /* Prevent click from closing when clicking image */
              className="relative w-full max-w-5xl max-h-[90vh] flex flex-col items-center justify-center"
            >
              {/* Close Button */}
              <button
                onClick={() => setPreviewImage(null)}
                className="absolute -top-12 right-0 text-white/70 hover:text-white bg-dark3 hover:bg-dark3/80 w-10 h-10 rounded-full flex items-center justify-center transition-all shadow-lg z-10"
                aria-label="Close modal"
              >
                <FontAwesomeIcon icon={faTimes} size="lg" />
              </button>

              {/* Image itself */}
              <img
                src={previewImage}
                alt="Certificate full view"
                className="w-auto h-auto max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl border border-dark3/50"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
