'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { HiArrowRight } from 'react-icons/hi';
import { FaTruck, FaGlobeAmericas, FaBoxOpen, FaClock } from 'react-icons/fa';

const shippingInfo = [
  { icon: <FaTruck size={22} />, title: 'Standard Shipping', desc: 'Free on orders over $100. Delivery in 5-7 business days across the continental US.', tag: 'Free 100+' },
  { icon: <FaGlobeAmericas size={22} />, title: 'International Shipping', desc: 'We ship worldwide. International orders typically arrive within 10-14 business days.', tag: 'Worldwide' },
  { icon: <FaBoxOpen size={22} />, title: 'Premium Packaging', desc: 'Every order is double-boxed with custom tissue paper and tamper-proof authentication seal.', tag: 'Protected' },
  { icon: <FaClock size={22} />, title: 'Express Shipping', desc: 'Need it fast? Select express shipping at checkout for 2-3 business day delivery.', tag: '$14.99' },
];

export default function ShippingPage() {
  return (
    <div style={{ paddingTop: 'calc(var(--navbar-height) + 48px)', paddingBottom: '80px', minHeight: '100vh' }}>
      <div className="page-container">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
          style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 56px' }}>
          <div className="section-divider" style={{ margin: '0 auto 16px' }} />
          <p style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '12px' }}>✦ Delivery</p>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, marginBottom: '16px' }}>
            Shipping <span className="gradient-text">Info</span>
          </h1>
          <p style={{ fontSize: '15px', color: 'var(--muted)', lineHeight: 1.7 }}>
            We ensure your sneakers arrive safely and swiftly, no matter where you are.
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '56px' }}>
          {shippingInfo.map((item, i) => (
            <motion.div key={item.title} initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.1, duration: 0.6 }}
              style={{ padding: '32px 28px', borderRadius: '20px', background: 'var(--surface)', border: '1px solid var(--border-color)', transition: 'transform 0.3s' }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'linear-gradient(135deg, var(--gradient-start), var(--gradient-mid))', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                  {item.icon}
                </div>
                <span className="badge badge-accent">{item.tag}</span>
              </div>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '17px', fontWeight: 700, marginBottom: '8px' }}>{item.title}</h3>
              <p style={{ fontSize: '14px', color: 'var(--muted)', lineHeight: 1.7 }}>{item.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
          style={{ textAlign: 'center', padding: '40px', borderRadius: '20px', background: 'var(--surface)', border: '1px solid var(--border-color)' }}>
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '20px', fontWeight: 700, marginBottom: '12px' }}>Ready to shop?</h3>
          <p style={{ fontSize: '14px', color: 'var(--muted)', marginBottom: '24px' }}>Free shipping on all orders over $100.</p>
          <Link href="/products" className="btn-primary">Browse Collection <HiArrowRight size={15} /></Link>
        </motion.div>
      </div>
    </div>
  );
}
