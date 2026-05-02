'use client';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import { HiArrowRight } from 'react-icons/hi';

const categories = [
  { name: 'Running', image: '/images/categories/running.png', count: '48 styles', accent: 'var(--glow-cyan)', gradient: 'linear-gradient(135deg, #06b6d4, #0891b2)', gridArea: '1 / 1 / 3 / 2' },
  { name: 'Casual', image: '/images/categories/casual.png', count: '62 styles', accent: 'var(--glow-violet)', gradient: 'linear-gradient(135deg, #8b5cf6, #7c3aed)', gridArea: '1 / 2 / 2 / 3' },
  { name: 'Sports', image: '/images/categories/sports.png', count: '35 styles', accent: 'var(--glow-violet)', gradient: 'linear-gradient(135deg, #3b82f6, #2563eb)', gridArea: '2 / 2 / 3 / 3' },
  { name: 'Limited Edition', image: '/images/categories/limited.png', count: '12 styles', accent: 'var(--glow-magenta)', gradient: 'linear-gradient(135deg, #ec4899, #db2777)', gridArea: '1 / 3 / 3 / 4' },
];

export default function Categories() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <div ref={ref} className="noise-bg" style={{ background: 'var(--background)', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative', overflow: 'hidden', padding: 'var(--space-xl) 0' }}>
      {/* Decorative orbs */}
      <motion.div
        animate={{ x: [0, 20, -15, 0], y: [0, -15, 20, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        className="glow" style={{ background: 'var(--glow-violet)', bottom: '10%', right: '-5%', width: '400px', height: '400px', opacity: 0.1 }}
      />

      <div className="page-container" style={{ position: 'relative', zIndex: 2 }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="section-divider" style={{ animation: isInView ? 'line-reveal 0.6s ease forwards' : 'none', transformOrigin: 'left' }} />
          <div style={{ marginBottom: '48px' }}>
            <p style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '8px' }}>
              ✦ Browse
            </p>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 800 }}>Categories</h2>
          </div>
        </motion.div>

        {/* Bento Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gridTemplateRows: 'repeat(2, 160px)',
          gap: '16px',
        }} className="bento-grid">
          {categories.map((cat, i) => (
            <motion.div key={cat.name}
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ delay: 0.15 + i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              style={{ gridArea: cat.gridArea }}>
              <Link href={`/products?category=${encodeURIComponent(cat.name)}`} style={{ display: 'block', height: '100%' }}>
                <motion.div
                  whileHover={{ y: -6, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    height: '100%',
                    borderRadius: '20px',
                    position: 'relative',
                    overflow: 'hidden',
                    border: '1px solid var(--border-color)',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    transition: 'box-shadow 0.3s ease',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.boxShadow = `0 16px 48px ${cat.accent}20`; }}
                  onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; }}
                >
                  {/* Category Background Image */}
                  <img
                    src={cat.image}
                    alt={cat.name}
                    style={{
                      position: 'absolute',
                      inset: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      zIndex: 0,
                    }}
                  />

                  {/* Dark gradient overlay for text readability */}
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 40%, rgba(0,0,0,0.15) 100%)',
                    zIndex: 1,
                  }} />

                  {/* Accent glow overlay */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 0.15 }}
                    transition={{ duration: 0.4 }}
                    style={{
                      position: 'absolute', inset: 0,
                      background: cat.gradient,
                      zIndex: 1,
                    }}
                  />

                  <div style={{ position: 'relative', zIndex: 2, padding: '20px 24px' }}>
                    <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '18px', marginBottom: '6px', color: '#fff' }}>{cat.name}</p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)', fontWeight: 500 }}>{cat.count}</p>
                      <HiArrowRight size={14} style={{ color: 'rgba(255,255,255,0.6)', transition: 'transform 0.2s ease' }} />
                    </div>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Responsive override for mobile */}
        <style jsx>{`
          @media (max-width: 768px) {
            .bento-grid {
              grid-template-columns: repeat(2, 1fr) !important;
              grid-template-rows: auto !important;
            }
            .bento-grid > * {
              grid-area: auto !important;
            }
          }
        `}</style>
      </div>
    </div>
  );
}
