'use client';
import { useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import { useRef } from 'react';
import api from '@/lib/api';
import ProductCard from '@/components/products/ProductCard';
import { HiArrowRight } from 'react-icons/hi';

export default function FeaturedProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get('/products?featured=true&limit=4');
        setProducts(res.data.data);
      } catch { setProducts(sampleProducts); }
      setLoading(false);
    };
    fetchData();
  }, []);

  const displayProducts = products.length > 0 ? products : sampleProducts;

  return (
    <div ref={sectionRef} className="noise-bg" style={{ background: 'var(--background)', position: 'relative', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', overflow: 'hidden' }}>

      {/* Decorative orbs */}
      <motion.div
        animate={{ x: [0, 30, -20, 0], y: [0, -20, 10, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        className="glow" style={{ background: 'var(--glow-cyan)', top: '15%', left: '-3%', width: '350px', height: '350px', opacity: 0.1 }}
      />
      <motion.div
        animate={{ x: [0, -25, 15, 0], y: [0, 15, -25, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        className="glow" style={{ background: 'var(--glow-magenta)', bottom: '10%', right: '-3%', width: '300px', height: '300px', opacity: 0.08 }}
      />

      {/* Background marquee text */}
      <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, transform: 'translateY(-50%)', overflow: 'hidden', opacity: 0.03, pointerEvents: 'none', zIndex: 0 }}>
        <div className="marquee-track" style={{ animationDuration: '20s' }}>
          {[...Array(2)].map((_, i) => (
            <span key={i} style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(80px, 12vw, 160px)', fontWeight: 900, letterSpacing: '0.05em', whiteSpace: 'nowrap', paddingRight: '80px' }}>
              TRENDING NOW ✦ TRENDING NOW ✦ TRENDING NOW ✦{' '}
            </span>
          ))}
        </div>
      </div>

      <div className="page-container" style={{ position: 'relative', zIndex: 2 }}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="section-divider" style={{ animation: isInView ? 'line-reveal 0.6s ease forwards' : 'none', transformOrigin: 'left' }} />
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '48px' }}>
            <div>
              <p style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '8px' }}>
                ✦ Curated for you
              </p>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 800 }}>Featured</h2>
            </div>
            <Link href="/products" style={{ fontSize: '13px', color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: '6px', transition: 'all 0.3s' }}
              onMouseEnter={e => { e.currentTarget.style.color = 'var(--highlight)'; e.currentTarget.style.gap = '10px'; }}
              onMouseLeave={e => { e.currentTarget.style.color = 'var(--muted)'; e.currentTarget.style.gap = '6px'; }}>
              View all <HiArrowRight size={13} />
            </Link>
          </div>
        </motion.div>

        {loading ? (
          <div className="product-grid">
            {[...Array(4)].map((_, i) => (
              <div key={i}>
                <div className="skeleton" style={{ aspectRatio: '0.78', marginBottom: '12px' }} />
                <div className="skeleton" style={{ height: '10px', width: '50px', marginBottom: '8px' }} />
                <div className="skeleton" style={{ height: '14px', width: '70%' }} />
              </div>
            ))}
          </div>
        ) : (
          <div className="product-grid">
            {displayProducts.map((product, i) => (
              <motion.div key={product._id}
                initial={{ opacity: 0, y: 80, rotateX: -15 }}
                animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

const sampleProducts = [
  { _id: '1', name: 'Air Max Pulse', brand: 'Nike', price: 149.99, category: 'Running', averageRating: 4.8, images: ['/images/sneakers/nike-air-max-pulse.png'] },
  { _id: '2', name: 'Ultraboost Light', brand: 'Adidas', price: 189.99, category: 'Running', averageRating: 4.7, images: ['/images/sneakers/adidas-ultraboost.png'] },
  { _id: '3', name: 'Retro High OG', brand: 'Jordan', price: 179.99, category: 'Limited Edition', averageRating: 4.9, images: ['/images/sneakers/jordan-1-chicago.png'] },
  { _id: '4', name: 'Dunk Low Retro', brand: 'Nike', price: 109.99, category: 'Casual', averageRating: 4.6, images: ['/images/sneakers/nike-dunk-low.png'] },
];
