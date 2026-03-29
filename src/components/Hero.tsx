import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';
import profile from '../data/profile';
import Avatar from './Avatar';
import Typewriter from './Typewriter';

const Hero: React.FC = () => {
  const intro =
    'Lead Frontend Engineer with 7+ years delivering scalable, secure, and high-performance web applications for Banking, E-Commerce and financial systems.';
  const words = [
    profile.title,
    'React + TypeScript',
    'Design Systems',
    'Accessibility',
    'DevOps',
    'Performance Optimization',
  ];
  //   const phrase = 'Lead Frontend Engineer with 7+ years delivering scalable, secure, and high-performance web applications for Banking, E-Commerce and financial systems.'
  const [resumeUrl, setResumeUrl] = useState('/Basu_Sharma_Resume.pdf');
  const [downloadName, setDownloadName] = useState('Basu_Sharma_Resume.pdf');
  const { scrollY } = useScroll();
  const contentY = useTransform(scrollY, [0, 600], [0, -40]);

  useEffect(() => {
    let cancelled = false;
    const check = async () => {
      try {
        const r = await fetch('/Basu_Sharma_Resume.pdf', { method: 'HEAD' });
        if (!cancelled && r.ok) {
          setResumeUrl('/Basu_Sharma_Resume.pdf');
          setDownloadName('Basu_Sharma_Resume.pdf');
          return;
        }
      } catch {}
      try {
        const r2 = await fetch('/Basu_Sharma_Resume.txt', { method: 'HEAD' });
        if (!cancelled && r2.ok) {
          setResumeUrl('/Basu_Sharma_Resume.txt');
          setDownloadName('Basu_Sharma_Resume.txt');
          return;
        }
      } catch {}
      if (!cancelled) {
        setResumeUrl('/Basu_Sharma_Resume.txt');
        setDownloadName('Basu_Sharma_Resume.txt');
      }
    };
    check();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section id="hero" className="hero">
      <motion.div
        style={{ y: contentY }}
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        {/* Intro background removed: hero video and animated blobs disabled */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 18,
            justifyContent: 'center',
            flexDirection: 'column',
          }}
        >
          <Avatar size={120} />
          <motion.h1
            initial={{ y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            Hi, I'm {profile.name}
          </motion.h1>
          {/* <div className="hero-badge"><span className="typewriter-wrap"><Typewriter words={words} /></span></div> */}
        </div>
        <div style={{ marginTop: 12 }}>
          <div className="hero-subtitle">{intro}</div>
        </div>
        <div style={{ marginTop: 14 }}>
          <div className="hero-badge">
            <span className="typewriter-wrap">
              <Typewriter words={words} />
            </span>
          </div>
        </div>
      </motion.div>

      <div
        style={{
          marginTop: 18,
          display: 'flex',
          gap: 12,
          justifyContent: 'center',
        }}
      >
        <motion.a
          href="#projects"
          className="cta cta-ghost"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
        >
          View Projects
        </motion.a>
        <motion.a
          href={resumeUrl}
          download={downloadName}
          className="cta cta-primary"
          aria-label="Download resume"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
        >
          Download Resume
          <svg
            viewBox="0 0 24 24"
            width="16"
            height="16"
            aria-hidden
            focusable="false"
          >
            <path
              fillRule="evenodd"
              d="M12 16a1 1 0 01-1-1V6a1 1 0 112 0v9a1 1 0 01-1 1zm-5-3a1 1 0 011.707-.707L11 15.586V4a1 1 0 112 0v11.586l2.293-3.293A1 1 0 0118 13v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-1z"
              fill="currentColor"
            />
          </svg>
        </motion.a>
      </div>
    </section>
  );
};

export default Hero;
