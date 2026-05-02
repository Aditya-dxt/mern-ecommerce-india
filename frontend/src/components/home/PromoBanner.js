'use client';
import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import { HiArrowRight, HiClipboardCopy, HiCheck } from 'react-icons/hi';

export default function PromoBanner() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [copied, setCopied] = useState(false);

  const copyCode = (e) => {
    e.preventDefault();
    navigator.clipboard?.writeText('VAULT10');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section ref={ref} style={{ padding: '80px 0' }}>
      <div className="page-container">
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div style={{
            position: 'relative',
            borderRadius: '28px',
            padding: '80px 40px',
            textAlign: 'center',
            overflow: 'hidden',
            background: 'var(--surface)',
            border: '1px solid var(--border-color)',
          }}>
            {/* Animated gradient background */}
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(135deg, var(--surface) 0%, var(--surface-hover) 50%, var(--surface) 100%)',
              backgroundSize: '200% 200%',
              animation: 'gradient-shift 6s ease infinite',
            }} />

            {/* Multi-color glow orbs */}
            <motion.div
              animate={{ x: [0, 30, -20, 0], y: [0, -20, 10, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
              style={{ position: 'absolute', top: '-80px', left: '20%', width: '300px', height: '300px', borderRadius: '50%', background: 'var(--glow-cyan)', filter: 'blur(100px)', opacity: 0.12 }}
            />
            <motion.div
              animate={{ x: [0, -25, 15, 0], y: [0, 15, -25, 0] }}
              transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
              style={{ position: 'absolute', bottom: '-60px', right: '20%', width: '350px', height: '350px', borderRadius: '50%', background: 'var(--glow-magenta)', filter: 'blur(100px)', opacity: 0.1 }}
            />

            {/* Dot pattern */}
            <div style={{
              position: 'absolute', inset: 0, opacity: 0.03,
              backgroundImage: 'radial-gradient(circle, var(--foreground) 1px, transparent 1px)',
              backgroundSize: '32px 32px',
            }} />

            <motion.div style={{ position: 'relative', zIndex: 1 }}>
              {/* Floating badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0, rotate: -10 }}
                animate={isInView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
                transition={{ delay: 0.2, type: 'spring', stiffness: 300, damping: 20 }}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '6px',
                  padding: '8px 20px', borderRadius: '50px', marginBottom: '28px',
                  background: 'linear-gradient(135deg, var(--gradient-start), var(--gradient-mid))',
                  color: '#fff', fontSize: '12px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase',
                  boxShadow: '0 4px 20px rgba(201,149,60,0.3)',
                }}>
                ✦ Limited Offer
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3, duration: 0.7 }}
                style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(28px, 4vw, 52px)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.03em', marginBottom: '20px' }}>
                Free shipping on<br />orders over{' '}
                <span className="gradient-text">$100</span>
              </motion.h2>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4 }}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '36px' }}>
                <p style={{ fontSize: '14px', color: 'var(--muted)', lineHeight: 1.6 }}>
                  Use code
                </p>
                <motion.button
                  onClick={copyCode}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '8px',
                    fontFamily: 'monospace', fontWeight: 700, fontSize: '15px',
                    color: 'var(--foreground)',
                    padding: '8px 16px',
                    background: 'var(--accent-muted)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}>
                  VAULT10
                  {copied ? <HiCheck size={14} style={{ color: 'var(--color-success)' }} /> : <HiClipboardCopy size={14} style={{ color: 'var(--muted)' }} />}
                </motion.button>
                <p style={{ fontSize: '14px', color: 'var(--muted)', lineHeight: 1.6 }}>
                  for 10% off
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5 }}>
                <Link href="/products" className="btn-primary" style={{ fontSize: '15px', padding: '16px 40px' }}>
                  Shop Now <HiArrowRight size={15} />
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
