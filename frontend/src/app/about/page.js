'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { HiArrowRight, HiShieldCheck, HiGlobe, HiHeart, HiLightningBolt } from 'react-icons/hi';

const values = [
  { icon: <HiShieldCheck size={24} />, title: 'Authenticity Guaranteed', desc: 'Every sneaker is verified through our multi-point authentication process before it reaches you.' },
  { icon: <HiGlobe size={24} />, title: 'Global Sourcing', desc: 'We source directly from authorized retailers and trusted suppliers worldwide.' },
  { icon: <HiHeart size={24} />, title: 'Community First', desc: 'Built by sneakerheads, for sneakerheads. Our community drives everything we do.' },
  { icon: <HiLightningBolt size={24} />, title: 'Fast Delivery', desc: 'Premium packaging and expedited shipping to get your kicks to you quickly and safely.' },
];

export default function AboutPage() {
  return (
    <div style={{ paddingTop: 'calc(var(--navbar-height) + 48px)', paddingBottom: '80px', minHeight: '100vh' }}>
      <div className="page-container">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 64px' }}
        >
          <div className="section-divider" style={{ margin: '0 auto 16px' }} />
          <p style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '12px' }}>✦ Our Story</p>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 800, marginBottom: '20px', lineHeight: 1.1 }}>
            About <span className="gradient-text">SneakerVault</span>
          </h1>
          <p style={{ fontSize: '16px', lineHeight: 1.8, color: 'var(--muted)' }}>
            Founded in 2024, SneakerVault is a premium sneaker marketplace dedicated to bringing you the most coveted kicks from around the world. We believe that every pair of sneakers tells a story — and we&apos;re here to help you find yours.
          </p>
        </motion.div>

        {/* Values Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px', marginBottom: '80px' }}>
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.1, duration: 0.6 }}
              style={{
                padding: '32px 28px', borderRadius: '20px',
                background: 'var(--surface)', border: '1px solid var(--border-color)',
                transition: 'transform 0.3s, box-shadow 0.3s',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 40px var(--highlight-soft)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
            >
              <div style={{
                width: '48px', height: '48px', borderRadius: '14px',
                background: 'linear-gradient(135deg, var(--gradient-start), var(--gradient-mid))',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#fff', marginBottom: '20px',
              }}>
                {v.icon}
              </div>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '18px', fontWeight: 700, marginBottom: '8px' }}>{v.title}</h3>
              <p style={{ fontSize: '14px', color: 'var(--muted)', lineHeight: 1.7 }}>{v.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Mission */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          style={{
            padding: '48px 40px', borderRadius: '24px',
            background: 'var(--surface)', border: '1px solid var(--border-color)',
            textAlign: 'center', maxWidth: '800px', margin: '0 auto 48px',
          }}
        >
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '24px', fontWeight: 700, marginBottom: '16px' }}>Our Mission</h2>
          <p style={{ fontSize: '15px', color: 'var(--muted)', lineHeight: 1.8, maxWidth: '600px', margin: '0 auto 28px' }}>
            To make premium, authenticated sneakers accessible to everyone. We bridge the gap between exclusivity and accessibility — curating limited editions, retros, and the latest drops all in one trusted marketplace.
          </p>
          <Link href="/products" className="btn-primary" style={{ padding: '14px 32px' }}>
            Explore Collection <HiArrowRight size={15} />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
