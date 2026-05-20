'use client';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { HiArrowUp, HiArrowRight } from 'react-icons/hi';
import { FaInstagram, FaLinkedinIn, FaXTwitter } from 'react-icons/fa6';

export default function Footer() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cols = [
    { title: 'Shop', items: [
      ['Running', '/products?category=Running'],
      ['Casual', '/products?category=Casual'],
      ['Sports', '/products?category=Sports'],
      ['Limited', '/products?category=Limited+Edition'],
    ]},
    { title: 'Company', items: [
      ['About Us', '/about'],
      ['All Products', '/products'],
      ['New Arrivals', '/products?sort=newest'],
      ['Contact', '/contact'],
    ]},
    { title: 'Help', items: [
      ['Shipping Info', '/shipping'],
      ['Returns', '/returns'],
      ['Size Guide', '/size-guide'],
      ['Contact Us', '/contact'],
    ]},
  ];

  const socials = [
    { icon: <FaInstagram size={16} />, href: 'https://instagram.com', label: 'Instagram' },
    { icon: <FaLinkedinIn size={16} />, href: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: <FaXTwitter size={16} />, href: 'https://x.com', label: 'X' },
  ];

  return (
    <footer ref={ref} className="site-footer" style={{ position: 'relative' }}>
      {/* Gradient divider */}
      <div style={{
        height: '2px',
        background: 'linear-gradient(90deg, transparent, var(--gradient-start), var(--gradient-mid), var(--gradient-end), transparent)',
      }} />

      <div className="page-container" style={{ paddingTop: '64px', paddingBottom: '40px' }}>
        <div className="grid grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr] gap-8 lg:gap-10">
          <motion.div
            className="col-span-2 lg:col-span-1"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}>
            <p className="gradient-text" style={{ fontFamily: 'var(--font-heading)', fontSize: '20px', fontWeight: 700, marginBottom: '14px' }}>SneakerVault</p>
            <p style={{ fontSize: '14px', lineHeight: 1.7, color: 'var(--muted)', maxWidth: '280px', marginBottom: '20px' }}>
              Your destination for authentic premium sneakers. Curated, verified, delivered.
            </p>

            {/* Social Links */}
            <div style={{ display: 'flex', gap: '10px', marginBottom: '24px' }}>
              {socials.map((s) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    width: '38px', height: '38px', borderRadius: '12px',
                    background: 'var(--surface-hover)', border: '1px solid var(--border-color)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'var(--muted)', cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.background = 'var(--highlight)'; e.currentTarget.style.borderColor = 'var(--highlight)'; }}
                  onMouseLeave={e => { e.currentTarget.style.color = 'var(--muted)'; e.currentTarget.style.background = 'var(--surface-hover)'; e.currentTarget.style.borderColor = 'var(--border-color)'; }}
                >
                  {s.icon}
                </motion.a>
              ))}
            </div>

            {/* Newsletter */}
            <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: '8px', maxWidth: '300px' }}>
              <div style={{ flex: 1 }}>
                <input
                  type="email" value={email} onChange={e => setEmail(e.target.value)}
                  placeholder="Email for drops"
                  style={{
                    width: '100%', padding: '10px 14px', fontSize: '13px',
                    background: 'var(--surface)', color: 'var(--foreground)',
                    border: '1px solid var(--border-color)', borderRadius: '10px',
                    outline: 'none', transition: 'all 0.3s',
                  }}
                  onFocus={e => { e.target.style.borderColor = 'var(--highlight)'; e.target.style.boxShadow = '0 0 0 3px var(--highlight-soft)'; }}
                  onBlur={e => { e.target.style.borderColor = 'var(--border-color)'; e.target.style.boxShadow = 'none'; }}
                />
              </div>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  padding: '10px 14px', borderRadius: '10px', border: 'none', cursor: 'pointer',
                  background: subscribed ? 'var(--color-success)' : 'var(--highlight)',
                  color: '#fff', fontSize: '14px', transition: 'background 0.3s',
                }}>
                {subscribed ? '✓' : <HiArrowRight size={16} />}
              </motion.button>
            </form>
          </motion.div>

          {cols.map((col, colIdx) => (
            <motion.div key={col.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + colIdx * 0.08 }}>
              <p style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '18px' }}>
                {col.title}
              </p>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {col.items.map(([label, href], itemIdx) => (
                  <motion.li key={label}
                    initial={{ opacity: 0, x: -10 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.2 + colIdx * 0.08 + itemIdx * 0.05 }}
                    style={{ marginBottom: '10px' }}>
                    <Link href={href} style={{ fontSize: '14px', color: 'var(--foreground)', transition: 'all 0.2s' }}
                      onMouseEnter={e => { e.currentTarget.style.color = 'var(--highlight)'; e.currentTarget.style.paddingLeft = '6px'; }}
                      onMouseLeave={e => { e.currentTarget.style.color = 'var(--foreground)'; e.currentTarget.style.paddingLeft = '0'; }}>
                      {label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <div style={{
          marginTop: '56px', paddingTop: '24px',
          borderTop: '1px solid var(--border-color)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          flexWrap: 'wrap', gap: '12px',
        }}>
          <p style={{ fontSize: '12px', color: 'var(--muted)' }}>© {new Date().getFullYear()} SneakerVault. All rights reserved.</p>
          <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
            <Link href="/about" style={{ fontSize: '12px', color: 'var(--muted)', transition: 'color 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--foreground)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--muted)'}>Privacy</Link>
            <Link href="/about" style={{ fontSize: '12px', color: 'var(--muted)', transition: 'color 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--foreground)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--muted)'}>Terms</Link>
          </div>
        </div>
      </div>

      {/* Back to top */}
      <motion.button
        onClick={scrollToTop}
        whileHover={{ scale: 1.1, y: -2 }}
        whileTap={{ scale: 0.9 }}
        style={{
          position: 'fixed', bottom: '28px', right: '28px', zIndex: 40,
          width: '44px', height: '44px', borderRadius: '14px',
          background: 'var(--surface)', border: '1px solid var(--border-color)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', color: 'var(--foreground)',
          boxShadow: '0 4px 20px var(--card-shadow)',
          backdropFilter: 'blur(10px)',
        }}>
        <HiArrowUp size={16} />
      </motion.button>
    </footer>
  );
}

// Day 16: Enhanced footer