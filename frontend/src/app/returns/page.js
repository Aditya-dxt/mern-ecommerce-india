'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { HiArrowRight } from 'react-icons/hi';
import { FaUndo, FaCheckCircle, FaTimesCircle, FaExchangeAlt } from 'react-icons/fa';

const steps = [
  { step: '01', title: 'Initiate Return', desc: 'Log in to your dashboard, find the order, and click "Request Return" within 30 days of delivery.' },
  { step: '02', title: 'Ship It Back', desc: 'We\'ll email you a prepaid shipping label. Pack the sneakers in their original box and drop off at any carrier location.' },
  { step: '03', title: 'Inspection', desc: 'Our team inspects the returned item to verify it\'s unworn and in original condition.' },
  { step: '04', title: 'Refund', desc: 'Once approved, your refund is processed within 3-5 business days to your original payment method.' },
];

const policies = [
  { icon: <FaCheckCircle size={16} />, text: 'Unworn sneakers in original packaging', ok: true },
  { icon: <FaCheckCircle size={16} />, text: 'Returns within 30 days of delivery', ok: true },
  { icon: <FaCheckCircle size={16} />, text: 'Free returns on domestic orders', ok: true },
  { icon: <FaTimesCircle size={16} />, text: 'Worn or damaged sneakers', ok: false },
  { icon: <FaTimesCircle size={16} />, text: 'Items without original box or tags', ok: false },
  { icon: <FaTimesCircle size={16} />, text: 'Returns after 30-day window', ok: false },
];

export default function ReturnsPage() {
  return (
    <div style={{ paddingTop: 'calc(var(--navbar-height) + 48px)', paddingBottom: '80px', minHeight: '100vh' }}>
      <div className="page-container">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
          style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 56px' }}>
          <div className="section-divider" style={{ margin: '0 auto 16px' }} />
          <p style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '12px' }}>✦ Hassle-Free</p>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, marginBottom: '16px' }}>
            Returns & <span className="gradient-text">Exchanges</span>
          </h1>
          <p style={{ fontSize: '15px', color: 'var(--muted)', lineHeight: 1.7 }}>Not the right fit? We make returns simple and stress-free.</p>
        </motion.div>

        {/* Steps */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '56px' }}>
          {steps.map((s, i) => (
            <motion.div key={s.step} initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.08, duration: 0.6 }}
              style={{ padding: '32px 24px', borderRadius: '20px', background: 'var(--surface)', border: '1px solid var(--border-color)' }}>
              <p className="gradient-text" style={{ fontFamily: 'var(--font-heading)', fontSize: '32px', fontWeight: 800, marginBottom: '12px' }}>{s.step}</p>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '17px', fontWeight: 700, marginBottom: '8px' }}>{s.title}</h3>
              <p style={{ fontSize: '14px', color: 'var(--muted)', lineHeight: 1.7 }}>{s.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Policy */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.6 }}
          style={{ padding: '40px', borderRadius: '24px', background: 'var(--surface)', border: '1px solid var(--border-color)', maxWidth: '600px', margin: '0 auto' }}>
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '20px', fontWeight: 700, marginBottom: '20px', textAlign: 'center' }}>Return Policy</h3>
          <div style={{ display: 'grid', gap: '12px' }}>
            {policies.map((p, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '14px', color: p.ok ? 'var(--color-success)' : 'var(--color-error)' }}>
                {p.icon}
                <span style={{ color: 'var(--foreground)' }}>{p.text}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
