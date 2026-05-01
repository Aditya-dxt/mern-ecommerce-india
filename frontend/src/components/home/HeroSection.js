'use client';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { HiArrowRight } from 'react-icons/hi';
import { useRef, useEffect, useState } from 'react';

const textReveal = {
  hidden: { y: '110%', rotateX: -80 },
  visible: (i) => ({
    y: '0%', rotateX: 0,
    transition: { duration: 0.9, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] },
  }),
};

const taglines = [
  'Your Next Grail Awaits',
  'Step Into Greatness',
  'Limited. Authentic. Premium.',
  'Elevate Your Game',
];

function AnimatedCounter({ target, suffix = '', delay = 0 }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const timer = setTimeout(() => {
      const duration = 2000;
      const steps = 60;
      const increment = target / steps;
      let current = 0;
      const interval = setInterval(() => {
        current += increment;
        if (current >= target) {
          setCount(target);
          clearInterval(interval);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timer);
  }, [target, delay]);
  return <>{count}{suffix}</>;
}

export default function HeroSection() {
  const ref = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 40, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 40, damping: 20 });
  const [taglineIndex, setTaglineIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleMouse = (e) => {
      const { innerWidth, innerHeight } = window;
      mouseX.set((e.clientX - innerWidth / 2) / 25);
      mouseY.set((e.clientY - innerHeight / 2) / 25);
    };
    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, [mouseX, mouseY]);

  // Rotate taglines
  useEffect(() => {
    const interval = setInterval(() => {
      setTaglineIndex(prev => (prev + 1) % taglines.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div ref={ref} className="noise-bg" style={{ background: 'var(--background)', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>

      {/* Animated gradient mesh background */}
      <div className="gradient-mesh">
        <motion.div
          animate={{ x: [0, 60, -40, 30, 0], y: [0, -40, 30, -20, 0], scale: [1, 1.1, 0.9, 1.05, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
          style={{ position: 'absolute', top: '-10%', right: '5%', width: '500px', height: '500px', borderRadius: '50%', background: 'var(--glow-cyan)', filter: 'blur(120px)', opacity: 0.15 }}
        />
        <motion.div
          animate={{ x: [0, -50, 40, -30, 0], y: [0, 30, -40, 20, 0], scale: [1, 0.95, 1.1, 1, 1] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
          style={{ position: 'absolute', bottom: '5%', left: '0%', width: '450px', height: '450px', borderRadius: '50%', background: 'var(--glow-violet)', filter: 'blur(120px)', opacity: 0.12 }}
        />
        <motion.div
          animate={{ x: [0, 40, -30, 0], y: [0, -30, 40, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          style={{ position: 'absolute', top: '40%', left: '40%', width: '350px', height: '350px', borderRadius: '50%', background: 'var(--glow-magenta)', filter: 'blur(120px)', opacity: 0.08 }}
        />
      </div>

      {/* Floating particles */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 1 }}>
        {mounted && [...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -800],
              x: [0, Math.random() > 0.5 ? 50 : -50],
              opacity: [0, 0.6, 0],
            }}
            transition={{
              duration: 8 + Math.random() * 6,
              repeat: Infinity,
              delay: Math.random() * 8,
              ease: 'linear',
            }}
            style={{
              position: 'absolute',
              bottom: '-10px',
              left: `${Math.random() * 100}%`,
              width: `${2 + Math.random() * 3}px`,
              height: `${2 + Math.random() * 3}px`,
              borderRadius: '50%',
              background: `var(--glow-${['cyan', 'violet', 'magenta'][Math.floor(Math.random() * 3)]})`,
            }}
          />
        ))}
      </div>

      <div className="page-container" style={{ position: 'relative', zIndex: 2 }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-6 items-center">
          {/* Left — Text */}
          <div className="order-2 lg:order-1">
            <motion.div
              initial="hidden" animate="visible"
              style={{ overflow: 'hidden', marginBottom: '20px' }}
            >
              <motion.p variants={textReveal} custom={0}
                style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--muted)' }}>
                ✦ New Collection 2025
              </motion.p>
            </motion.div>

            <div style={{ perspective: '600px', marginBottom: '28px' }}>
              <div style={{ overflow: 'hidden' }}>
                <motion.div initial="hidden" animate="visible" variants={textReveal} custom={1}>
                  <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(44px, 6vw, 80px)', fontWeight: 800, lineHeight: 1.02, letterSpacing: '-0.04em' }}>
                    Your Next
                  </h1>
                </motion.div>
              </div>
              <div style={{ overflow: 'hidden', height: 'clamp(48px, 6.5vw, 86px)' }}>
                <AnimatePresence mode="wait">
                  <motion.h1
                    key={taglineIndex}
                    initial={{ y: '100%', opacity: 0 }}
                    animate={{ y: '0%', opacity: 1 }}
                    exit={{ y: '-100%', opacity: 0 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="gradient-text"
                    style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(44px, 6vw, 80px)', fontWeight: 800, lineHeight: 1.02, letterSpacing: '-0.04em' }}>
                    {taglines[taglineIndex].split(' ').slice(-2).join(' ')}
                  </motion.h1>
                </AnimatePresence>
              </div>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              style={{ color: 'var(--muted)', fontSize: '16px', lineHeight: 1.7, maxWidth: '420px', marginBottom: '40px' }}>
              Curated collections of authentic premium sneakers. From iconic retros to the latest limited drops — step into a new era of style.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', marginBottom: '56px' }}>
              <Link href="/products" className="btn-primary" style={{ fontSize: '15px', padding: '16px 36px' }}>
                Shop Collection <HiArrowRight size={16} />
              </Link>
              <Link href="/products?category=Limited+Edition" className="btn-secondary" style={{ fontSize: '15px', padding: '16px 36px' }}>
                Limited Drops
              </Link>
            </motion.div>

            {/* Animated counters */}
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.7 }}
              style={{ display: 'flex', gap: '48px' }}>
              {[
                { target: 200, suffix: '+', label: 'Styles' },
                { target: 50, suffix: 'K+', label: 'Happy Customers' },
                { target: 100, suffix: '%', label: 'Authentic' },
              ].map((s, i) => (
                <motion.div key={s.label}
                  initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 + i * 0.12 }}>
                  <p className="gradient-text" style={{ fontFamily: 'var(--font-heading)', fontSize: '24px', fontWeight: 800 }}>
                    <AnimatedCounter target={s.target} suffix={s.suffix} delay={1200 + i * 200} />
                  </p>
                  <p style={{ color: 'var(--muted)', fontSize: '11px', marginTop: '4px', letterSpacing: '0.05em', textTransform: 'uppercase', fontWeight: 500 }}>{s.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right — Interactive Card Stack */}
          <div className="order-1 lg:order-2" style={{ display: 'flex', justifyContent: 'center' }}>
            <motion.div style={{ x: springX, y: springY, position: 'relative', width: '100%', maxWidth: '460px', height: '500px' }}>

              {/* Card 1 — Large dark — Nike Air Max Pulse */}
              <Link href="/products?brand=Nike">
                <motion.div
                  initial={{ opacity: 0, x: 40, y: 20 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ y: -8, boxShadow: '0 20px 60px rgba(139,92,246,0.15)' }}
                  style={{ position: 'absolute', top: '24px', left: 0, width: '58%', height: '72%', borderRadius: '22px', overflow: 'hidden', zIndex: 10, cursor: 'pointer' }}>
                  <div style={{ width: '100%', height: '100%', background: '#0d0d0f', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', border: '1px solid var(--border-color)', borderRadius: '22px', position: 'relative' }}>
                    <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                      style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
                      <img src="/images/sneakers/nike-air-max-pulse.png" alt="Nike Air Max Pulse" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '16px' }} />
                    </motion.div>
                    <div style={{ textAlign: 'center', padding: '16px 24px 24px', position: 'relative', zIndex: 2, width: '100%', background: 'linear-gradient(to top, #0d0d0f 60%, transparent)' }}>
                      <p style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--muted)' }}>Nike</p>
                      <p style={{ fontSize: '15px', fontWeight: 600, marginTop: '4px', color: '#fff' }}>Air Max Pulse</p>
                      <p className="gradient-text" style={{ fontSize: '14px', fontWeight: 700, marginTop: '4px' }}>$149.99</p>
                    </div>
                  </div>
                </motion.div>
              </Link>

              {/* Card 2 — Jordan Retro High OG */}
              <Link href="/products?brand=Jordan">
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ y: -6, boxShadow: '0 20px 60px rgba(139,92,246,0.15)' }}
                  style={{ position: 'absolute', top: 0, right: 0, width: '46%', height: '50%', borderRadius: '22px', overflow: 'hidden', zIndex: 20, cursor: 'pointer' }}>
                  <div style={{ width: '100%', height: '100%', background: '#0d0d0f', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', borderRadius: '22px', position: 'relative' }}>
                    <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                      style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '10px' }}>
                      <img src="/images/sneakers/jordan-1-chicago.png" alt="Jordan Retro High OG" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '14px' }} />
                    </motion.div>
                    <div style={{ textAlign: 'center', padding: '12px 16px 18px', position: 'relative', zIndex: 2, width: '100%', background: 'linear-gradient(to top, #0d0d0f 60%, transparent)' }}>
                      <p style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)' }}>Jordan</p>
                      <p style={{ fontSize: '13px', fontWeight: 600, marginTop: '3px', color: '#fff' }}>Retro High OG</p>
                    </div>
                  </div>
                </motion.div>
              </Link>

              {/* Card 3 — Adidas Ultraboost */}
              <Link href="/products?brand=Adidas">
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ y: -6, boxShadow: '0 20px 60px rgba(139,108,196,0.2)' }}
                  style={{ position: 'absolute', bottom: 0, right: '6%', width: '44%', height: '52%', borderRadius: '22px', overflow: 'hidden', zIndex: 30, cursor: 'pointer' }}>
                  <div style={{ width: '100%', height: '100%', background: '#0d0d0f', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', borderRadius: '22px', position: 'relative' }}>
                    <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                      style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '10px' }}>
                      <img src="/images/sneakers/adidas-ultraboost.png" alt="Adidas Ultraboost" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '14px' }} />
                    </motion.div>
                    <div style={{ textAlign: 'center', padding: '12px 16px 18px', position: 'relative', zIndex: 2, width: '100%', background: 'linear-gradient(to top, #0d0d0f 60%, transparent)' }}>
                      <p style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.8)' }}>Adidas</p>
                      <p style={{ fontSize: '13px', fontWeight: 600, marginTop: '3px', color: '#fff' }}>Ultraboost</p>
                    </div>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Brand ticker marquee */}
      <div style={{ position: 'absolute', bottom: '70px', left: 0, right: 0, overflow: 'hidden', zIndex: 1, opacity: 0.08 }}>
        <div className="marquee-track">
          {[...Array(2)].map((_, setIdx) => (
            <div key={setIdx} style={{ display: 'flex', gap: '60px', paddingRight: '60px' }}>
              {['NIKE', 'ADIDAS', 'JORDAN', 'NEW BALANCE', 'PUMA', 'CONVERSE', 'REEBOK', 'VANS'].map(brand => (
                <span key={brand + setIdx} style={{ fontFamily: 'var(--font-heading)', fontSize: '24px', fontWeight: 800, letterSpacing: '0.1em', whiteSpace: 'nowrap', color: 'var(--foreground)' }}>
                  {brand}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        style={{ position: 'absolute', bottom: '28px', left: '50%', transform: 'translateX(-50%)', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
        <p style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--muted)', fontWeight: 500 }}>Scroll</p>
        <motion.div style={{ width: '1px', height: '24px', background: 'linear-gradient(to bottom, var(--muted), transparent)' }} />
      </motion.div>
    </div>
  );
}
