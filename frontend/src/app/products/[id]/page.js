'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import api from '@/lib/api';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { HiStar, HiOutlineHeart, HiHeart, HiMinus, HiPlus, HiOutlineShoppingBag, HiCheck } from 'react-icons/hi';
import toast from 'react-hot-toast';
import Link from 'next/link';
import ProductCard from '@/components/products/ProductCard';

// Brand-specific feature data for enriched product details
const brandFeatures = {
  Nike: {
    cushioning: 'Nike Air / React Foam',
    material: 'Flyknit / Engineered Mesh',
    sole: 'Rubber Waffle Outsole',
    weight: 'Lightweight (~280g)',
    technology: 'Nike Air cushioning technology delivers lightweight responsiveness with every step.',
    care: ['Wipe with a damp cloth', 'Air dry away from direct heat', 'Use sneaker protector spray', 'Store in a cool, dry place'],
    highlights: [
      'Responsive Nike Air cushioning for all-day comfort',
      'Breathable Flyknit upper adapts to foot shape',
      'Durable rubber outsole with multidirectional traction',
      'Padded collar and tongue for secure lockdown',
      'Reflective accents for low-light visibility',
    ],
  },
  Adidas: {
    cushioning: 'Boost / Lightstrike',
    material: 'Primeknit / Textile Mesh',
    sole: 'Continental Rubber',
    weight: 'Medium (~310g)',
    technology: 'Boost midsole stores and returns energy with every stride for endless comfort.',
    care: ['Hand wash with mild soap', 'Remove insoles before cleaning', 'Stuff with paper while drying', 'Avoid washing machines'],
    highlights: [
      'Boost midsole delivers unmatched energy return',
      'Primeknit upper provides adaptive, glove-like fit',
      'Continental rubber outsole for superior grip',
      'Ortholite sockliner for moisture management',
      'Sustainable materials — Parley ocean plastic upper',
    ],
  },
  Jordan: {
    cushioning: 'Air / Zoom Air',
    material: 'Premium Leather / Synthetic',
    sole: 'Herringbone Pattern Rubber',
    weight: 'Standard (~350g)',
    technology: 'Encapsulated Air-Sole unit provides lightweight cushioning with heritage DNA.',
    care: ['Use premium leather conditioner', 'Wipe with soft microfiber cloth', 'Keep in original box', 'Use shoe trees to maintain shape'],
    highlights: [
      'Iconic silhouette with premium leather construction',
      'Encapsulated Air-Sole unit in the heel',
      'Perforated toe box for breathability',
      'Solid rubber outsole with pivot circle',
      'OG colorway with authentic Jumpman branding',
    ],
  },
  'New Balance': {
    cushioning: 'Fresh Foam / FuelCell',
    material: 'Suede / Mesh Blend',
    sole: 'Blown Rubber Outsole',
    weight: 'Medium (~300g)',
    technology: 'Fresh Foam midsole is precision-engineered for a plush, cloud-like ride.',
    care: ['Brush suede with suede brush', 'Use suede protector spray', 'Air dry naturally', 'Alternate wearing days'],
    highlights: [
      'Fresh Foam midsole for plush cushioning',
      'Premium suede and mesh upper',
      'ENCAP midsole support for stability',
      'Ultra-soft NB comfort insole',
      'Handcrafted quality in select styles',
    ],
  },
  Puma: {
    cushioning: 'Nitro Foam',
    material: 'Engineered Knit / Synthetic',
    sole: 'Puma Grip Rubber',
    weight: 'Ultra-light (~260g)',
    technology: 'Nitro foam infused with nitrogen gas for explosive energy return.',
    care: ['Wipe with damp cloth', 'Use mild detergent if needed', 'Air dry at room temperature', 'Avoid direct sunlight'],
    highlights: [
      'Nitro foam midsole for explosive responsiveness',
      'Engineered mesh upper for ventilation',
      'ProFoam+ sockliner for step-in comfort',
      'Rubber outsole with grip pattern',
      'Bold design language with street appeal',
    ],
  },
  Converse: {
    cushioning: 'OrthoLite Insole',
    material: 'Canvas / Premium Leather',
    sole: 'Vulcanized Rubber',
    weight: 'Light (~280g)',
    technology: 'CX foam and OrthoLite insole upgrade the classic Chuck with modern comfort.',
    care: ['Spot clean canvas with baking soda paste', 'Machine washable (cold, delicate)', 'Air dry in shade', 'Use white shoe polish for Chuck 70s'],
    highlights: [
      'Timeless Chuck Taylor silhouette',
      'OrthoLite insole for modern cushioning',
      'Canvas upper with reinforced toe cap',
      'Vulcanized rubber sole for flexibility',
      'Available in iconic high-top and low-top styles',
    ],
  },
};

const defaultFeatures = {
  cushioning: 'EVA Foam Midsole',
  material: 'Premium Textile / Mesh',
  sole: 'Durable Rubber Outsole',
  weight: 'Standard (~300g)',
  technology: 'Advanced cushioning system designed for all-day comfort and support.',
  care: ['Wipe with a damp cloth', 'Air dry away from heat', 'Use protective spray', 'Store in a cool, dry place'],
  highlights: [
    'Premium quality materials and construction',
    'Ergonomic design for all-day comfort',
    'Durable outsole with excellent traction',
    'Breathable upper for temperature regulation',
    'Modern aesthetic for versatile styling',
  ],
};

// Feature card icons as SVG components
function CushionIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 16V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9m16 0H4m16 0 1.28 2.55a1 1 0 0 1-.9 1.45H3.62a1 1 0 0 1-.9-1.45L4 16" />
    </svg>
  );
}
function MaterialIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" />
    </svg>
  );
}
function SoleIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" /><line x1="4" y1="22" x2="4" y2="15" />
    </svg>
  );
}
function WeightIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" />
    </svg>
  );
}

export default function ProductDetailPage() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { user } = useAuth();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [wishlisted, setWishlisted] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [ratingBreakdown, setRatingBreakdown] = useState([]);
  const [reviewForm, setReviewForm] = useState({ rating: 5, title: '', comment: '' });
  const [tab, setTab] = useState('description');
  const [related, setRelated] = useState([]);
  const [addedToCart, setAddedToCart] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/products/${id}`);
        setProduct(res.data.data);
        if (res.data.data.sizes?.length > 0) {
          const inStock = res.data.data.sizes.find(s => s.stock > 0);
          setSelectedSize(inStock?.size || res.data.data.sizes[0].size);
        }
        // Fetch reviews
        const revRes = await api.get(`/products/${id}/reviews`);
        setReviews(revRes.data.data);
        setRatingBreakdown(revRes.data.ratingBreakdown || []);
        // Fetch related products
        const relRes = await api.get(`/products?category=${res.data.data.category}&limit=4`);
        setRelated(relRes.data.data.filter(p => p._id !== id));
      } catch { toast.error('Failed to load product'); }
      setLoading(false);
    };
    if (id) fetchProduct();
  }, [id]);

  useEffect(() => {
    if (user?.wishlist) setWishlisted(user.wishlist.some(w => (w._id || w) === id));
  }, [user, id]);

  const handleAddToCart = () => {
    if (!selectedSize) { toast.error('Please select a size'); return; }
    addToCart(product, selectedSize, quantity);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const toggleWishlist = async () => {
    if (!user) { toast.error('Please login first'); return; }
    try {
      if (wishlisted) {
        await api.delete(`/wishlist/${id}`);
        setWishlisted(false);
        toast.success('Removed from wishlist');
      } else {
        await api.post(`/wishlist/${id}`);
        setWishlisted(true);
        toast.success('Added to wishlist');
      }
    } catch { toast.error('Failed'); }
  };

  const submitReview = async (e) => {
    e.preventDefault();
    if (!user) { toast.error('Please login to review'); return; }
    try {
      const res = await api.post(`/products/${id}/reviews`, reviewForm);
      setReviews(prev => [res.data.data, ...prev]);
      setReviewForm({ rating: 5, title: '', comment: '' });
      toast.success('Review submitted!');
    } catch (err) { toast.error(err.response?.data?.message || 'Failed to submit review'); }
  };

  if (loading) {
    return (
      <div style={{ paddingTop: 'var(--navbar-height)' }}>
        <div className="page-container" style={{ paddingTop: '32px', paddingBottom: '60px' }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="skeleton" style={{ aspectRatio: '1', borderRadius: '24px' }} />
            <div>
              <div className="skeleton" style={{ height: '16px', width: '80px', marginBottom: '12px', borderRadius: '8px' }} />
              <div className="skeleton" style={{ height: '36px', width: '70%', marginBottom: '12px', borderRadius: '8px' }} />
              <div className="skeleton" style={{ height: '20px', width: '40%', marginBottom: '24px', borderRadius: '8px' }} />
              <div className="skeleton" style={{ height: '80px', width: '100%', marginBottom: '24px', borderRadius: '8px' }} />
              <div className="skeleton" style={{ height: '48px', width: '100%', borderRadius: '14px' }} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div style={{ paddingTop: 'var(--navbar-height)' }}>
        <div className="page-container" style={{ paddingTop: '80px', paddingBottom: '60px', textAlign: 'center' }}>
          <motion.p animate={{ y: [0, -8, 0] }} transition={{ duration: 2, repeat: Infinity }}
            style={{ fontSize: '64px', marginBottom: '20px' }}>😢</motion.p>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '28px', fontWeight: 700, marginBottom: '12px' }}>Product Not Found</h2>
          <Link href="/products" className="btn-primary" style={{ marginTop: '20px' }}>Browse Products</Link>
        </div>
      </div>
    );
  }

  const sizeStock = product.sizes?.find(s => s.size === selectedSize);
  const features = brandFeatures[product.brand] || defaultFeatures;

  return (
    <div style={{ paddingTop: 'var(--navbar-height)' }}>
    <div className="page-container" style={{ paddingTop: '32px', paddingBottom: '40px' }}>
      {/* Decorative background */}
      <div style={{ position: 'fixed', top: '10%', right: '-5%', width: '500px', height: '500px', borderRadius: '50%', background: 'var(--glow-violet)', filter: 'blur(160px)', opacity: 0.04, pointerEvents: 'none' }} />

      {/* Breadcrumb */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', marginBottom: '32px', color: 'var(--muted)' }}>
        <Link href="/" style={{ transition: 'color 0.2s' }}
          onMouseEnter={e => e.currentTarget.style.color = 'var(--highlight)'}
          onMouseLeave={e => e.currentTarget.style.color = 'var(--muted)'}>Home</Link>
        <span style={{ opacity: 0.3 }}>/</span>
        <Link href="/products" style={{ transition: 'color 0.2s' }}
          onMouseEnter={e => e.currentTarget.style.color = 'var(--highlight)'}
          onMouseLeave={e => e.currentTarget.style.color = 'var(--muted)'}>Shop</Link>
        <span style={{ opacity: 0.3 }}>/</span>
        <span style={{ color: 'var(--foreground)', fontWeight: 500 }}>{product.name}</span>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Image Gallery */}
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
          {/* Main Image */}
          <div style={{
            aspectRatio: '1', borderRadius: '24px', overflow: 'hidden', position: 'relative',
            background: '#0d0d0f',
            border: '1px solid var(--border-color)',
          }}>
            <AnimatePresence mode="wait">
              <motion.img
                key={selectedImageIndex}
                src={product.images?.[selectedImageIndex] || product.images?.[0] || '/placeholder.jpg'}
                alt={`${product.name} - View ${selectedImageIndex + 1}`}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                style={{
                  width: '100%', height: '100%', objectFit: 'cover',
                  position: 'absolute', top: 0, left: 0,
                }}
              />
            </AnimatePresence>
          </div>

          {/* Thumbnail Strip */}
          {product.images?.length > 1 && (
            <div style={{
              display: 'flex', gap: '12px', marginTop: '16px',
              justifyContent: 'center',
            }}>
              {product.images.map((img, i) => (
                <motion.button
                  key={i}
                  onClick={() => setSelectedImageIndex(i)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    width: '80px', height: '80px', borderRadius: '14px',
                    overflow: 'hidden', cursor: 'pointer',
                    border: selectedImageIndex === i
                      ? '2px solid var(--highlight)'
                      : '2px solid var(--border-color)',
                    background: '#0d0d0f',
                    padding: 0,
                    position: 'relative',
                    transition: 'all 0.25s ease',
                    boxShadow: selectedImageIndex === i
                      ? '0 0 16px rgba(139, 92, 246, 0.3)'
                      : 'none',
                  }}
                >
                  <img
                    src={img}
                    alt={`${product.name} - Angle ${i + 1}`}
                    style={{
                      width: '100%', height: '100%', objectFit: 'cover',
                      opacity: selectedImageIndex === i ? 1 : 0.6,
                      transition: 'opacity 0.2s ease',
                    }}
                  />
                  {/* Angle label */}
                  <span style={{
                    position: 'absolute', bottom: '4px', left: 0, right: 0,
                    textAlign: 'center', fontSize: '8px', fontWeight: 600,
                    letterSpacing: '0.05em', textTransform: 'uppercase',
                    color: selectedImageIndex === i ? 'var(--highlight)' : 'var(--muted)',
                    opacity: selectedImageIndex === i ? 1 : 0.7,
                  }}>
                    {['Side', 'Front', 'Back', 'Top'][i] || `View ${i + 1}`}
                  </span>
                </motion.button>
              ))}
            </div>
          )}
        </motion.div>

        {/* Product Info */}
        <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
            <span style={{ fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--muted)' }}>
              {product.brand}
            </span>
            <span style={{
              fontSize: '10px', fontWeight: 600, padding: '3px 10px', borderRadius: '6px',
              background: 'var(--highlight-soft)', color: 'var(--highlight)',
              letterSpacing: '0.05em', textTransform: 'uppercase',
            }}>
              {product.category}
            </span>
          </div>

          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 800, marginBottom: '16px' }}>{product.name}</h1>

          {/* Rating */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
              {[1, 2, 3, 4, 5].map(star => (
                <motion.div key={star} whileHover={{ scale: 1.3 }}>
                  <HiStar size={18} style={{ color: star <= Math.round(product.averageRating) ? '#d4a054' : 'var(--border-color)', transition: 'color 0.2s' }} />
                </motion.div>
              ))}
            </div>
            <span style={{ fontSize: '13px', color: 'var(--muted)' }}>
              {product.averageRating} ({product.numReviews} reviews)
            </span>
          </div>

          {/* Price */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
            <span className="gradient-text" style={{ fontFamily: 'var(--font-heading)', fontSize: '32px', fontWeight: 800 }}>${product.price}</span>
            {product.compareAtPrice > 0 && product.compareAtPrice > product.price && (
              <>
                <span style={{ fontSize: '18px', textDecoration: 'line-through', color: 'var(--muted)' }}>${product.compareAtPrice}</span>
                <span style={{
                  fontSize: '11px', fontWeight: 700, padding: '4px 10px', borderRadius: '8px',
                  background: 'linear-gradient(135deg, var(--gradient-start), var(--gradient-mid))', color: '#fff',
                }}>
                  {Math.round((1 - product.price / product.compareAtPrice) * 100)}% OFF
                </span>
              </>
            )}
          </div>

          {/* Short description */}
          <p style={{ fontSize: '14px', lineHeight: 1.7, color: 'var(--muted)', marginBottom: '24px' }}>{product.description}</p>

          {/* Technology Highlight */}
          <div style={{
            marginBottom: '24px', padding: '14px 18px', borderRadius: '14px',
            background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.06), rgba(99, 102, 241, 0.04))',
            border: '1px solid rgba(139, 92, 246, 0.1)',
            display: 'flex', alignItems: 'flex-start', gap: '12px',
          }}>
            <span style={{ fontSize: '20px', flexShrink: 0, marginTop: '1px' }}>⚡</span>
            <div>
              <p style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--highlight)', marginBottom: '4px' }}>
                Technology
              </p>
              <p style={{ fontSize: '13px', lineHeight: 1.6, color: 'var(--muted)' }}>
                {features.technology}
              </p>
            </div>
          </div>

          {/* Size Selection */}
          <div style={{ marginBottom: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <span style={{ fontWeight: 600, fontSize: '14px' }}>Select Size</span>
              {sizeStock && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  style={{ fontSize: '12px', fontWeight: 500, color: sizeStock.stock < 5 ? 'var(--color-error)' : 'var(--color-success)' }}>
                  {sizeStock.stock < 5 ? `Only ${sizeStock.stock} left!` : 'In Stock'}
                </motion.span>
              )}
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {product.sizes?.map(s => (
                <motion.button key={s.size}
                  whileHover={{ scale: s.stock > 0 ? 1.08 : 1 }}
                  whileTap={{ scale: s.stock > 0 ? 0.95 : 1 }}
                  onClick={() => s.stock > 0 && setSelectedSize(s.size)}
                  disabled={s.stock === 0}
                  style={{
                    width: '52px', height: '48px', borderRadius: '12px', fontSize: '14px', fontWeight: 600,
                    background: selectedSize === s.size
                      ? 'linear-gradient(135deg, var(--gradient-start), var(--gradient-mid))'
                      : 'var(--surface)',
                    color: selectedSize === s.size ? '#fff' : s.stock === 0 ? 'var(--border-color)' : 'var(--foreground)',
                    border: `1.5px solid ${selectedSize === s.size ? 'transparent' : 'var(--border-color)'}`,
                    cursor: s.stock === 0 ? 'not-allowed' : 'pointer',
                    opacity: s.stock === 0 ? 0.4 : 1,
                    transition: 'all 0.25s ease',
                    boxShadow: selectedSize === s.size ? '0 4px 16px rgba(201,149,60,0.3)' : 'none',
                  }}>
                  {s.size}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div style={{ marginBottom: '28px' }}>
            <span style={{ fontWeight: 600, fontSize: '14px', display: 'block', marginBottom: '12px' }}>Quantity</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '2px', width: 'fit-content', borderRadius: '12px', border: '1.5px solid var(--border-color)', overflow: 'hidden' }}>
              <motion.button whileTap={{ scale: 0.9 }}
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                style={{ width: '42px', height: '42px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--foreground)' }}>
                <HiMinus size={16} />
              </motion.button>
              <span style={{ width: '48px', textAlign: 'center', fontWeight: 600, fontSize: '15px' }}>{quantity}</span>
              <motion.button whileTap={{ scale: 0.9 }}
                onClick={() => setQuantity(q => q + 1)}
                style={{ width: '42px', height: '42px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--foreground)' }}>
                <HiPlus size={16} />
              </motion.button>
            </div>
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', gap: '12px' }}>
            <motion.button
              onClick={handleAddToCart}
              className="btn-primary"
              whileTap={{ scale: 0.97 }}
              style={{ flex: 1, padding: '16px', fontSize: '15px' }}>
              <AnimatePresence mode="wait">
                {addedToCart ? (
                  <motion.span key="added" initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.5 }}
                    style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <HiCheck size={20} /> Added!
                  </motion.span>
                ) : (
                  <motion.span key="add" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <HiOutlineShoppingBag size={20} /> Add to Cart
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
            <motion.button
              onClick={toggleWishlist}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.9 }}
              style={{
                width: '56px', height: '56px', borderRadius: '16px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                border: '1.5px solid var(--border-color)',
                color: wishlisted ? '#ff4444' : 'var(--foreground)',
                background: wishlisted ? 'rgba(255,68,68,0.1)' : 'transparent',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
              }}>
              {wishlisted ? <HiHeart size={22} /> : <HiOutlineHeart size={22} />}
            </motion.button>
          </div>

          {/* Shipping info */}
          <div style={{ marginTop: '28px', padding: '18px 20px', borderRadius: '16px', background: 'var(--surface)', border: '1px solid var(--border-color)' }}>
            {[
              { icon: '🚚', text: 'Free shipping on orders over $100' },
              { icon: '↩️', text: '30-day easy returns' },
              { icon: '✅', text: '100% authentic guaranteed' },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '14px', marginTop: i > 0 ? '10px' : 0 }}>
                <span>{item.icon}</span>
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ═══════════════════════════════════════════
         ENHANCED TABS SECTION
         ═══════════════════════════════════════════ */}
      <div style={{ marginTop: '64px' }}>
        <div style={{ display: 'flex', gap: '32px', borderBottom: '1px solid var(--border-color)', position: 'relative' }}>
          {['details', 'specifications', 'reviews'].map(t => (
            <button key={t} onClick={() => setTab(t)}
              style={{
                paddingBottom: '14px', fontSize: '14px', fontWeight: 600, textTransform: 'capitalize',
                background: 'none', border: 'none', cursor: 'pointer',
                color: tab === t ? 'var(--foreground)' : 'var(--muted)',
                transition: 'color 0.2s', position: 'relative',
              }}>
              {t === 'reviews' ? `Reviews (${reviews.length})` : t === 'details' ? 'Details & Features' : t}
              {tab === t && (
                <motion.div layoutId="tab-underline" style={{
                  position: 'absolute', bottom: '-1px', left: 0, right: 0, height: '2px',
                  background: 'linear-gradient(90deg, var(--gradient-start), var(--gradient-mid))',
                  borderRadius: '1px',
                }} />
              )}
            </button>
          ))}
        </div>

        <div style={{ paddingTop: '32px', paddingBottom: '32px' }}>
          <AnimatePresence mode="wait">
            {/* ═══ DETAILS & FEATURES TAB ═══ */}
            {tab === 'details' && (
              <motion.div key="details"
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>

                {/* Product Description */}
                <div style={{ maxWidth: '800px', marginBottom: '40px' }}>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '20px', fontWeight: 700, marginBottom: '16px' }}>
                    About the {product.name}
                  </h3>
                  <p style={{ fontSize: '14px', lineHeight: 1.8, color: 'var(--muted)' }}>
                    {product.description}
                  </p>
                </div>

                {/* Key Features */}
                <div style={{ marginBottom: '40px' }}>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '20px', fontWeight: 700, marginBottom: '20px' }}>
                    Key Features
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {features.highlights.map((highlight, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.08 }}
                        style={{
                          display: 'flex', alignItems: 'flex-start', gap: '14px',
                          padding: '14px 18px', borderRadius: '14px',
                          background: 'var(--surface)',
                          border: '1px solid var(--border-color)',
                          transition: 'all 0.2s ease',
                        }}
                        onMouseEnter={e => {
                          e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.2)';
                          e.currentTarget.style.boxShadow = '0 4px 20px rgba(139, 92, 246, 0.06)';
                        }}
                        onMouseLeave={e => {
                          e.currentTarget.style.borderColor = 'var(--border-color)';
                          e.currentTarget.style.boxShadow = 'none';
                        }}
                      >
                        <div style={{
                          width: '24px', height: '24px', borderRadius: '8px', flexShrink: 0,
                          background: 'linear-gradient(135deg, var(--gradient-start), var(--gradient-mid))',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          marginTop: '1px',
                        }}>
                          <HiCheck size={14} color="#fff" />
                        </div>
                        <p style={{ fontSize: '14px', lineHeight: 1.6, color: 'var(--foreground)' }}>{highlight}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Materials & Care */}
                <div style={{ marginBottom: '40px' }}>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '20px', fontWeight: 700, marginBottom: '20px' }}>
                    Care Instructions
                  </h3>
                  <div style={{
                    padding: '24px', borderRadius: '18px',
                    background: 'var(--surface)', border: '1px solid var(--border-color)',
                  }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '16px' }}>
                      {features.care.map((step, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <div style={{
                            width: '28px', height: '28px', borderRadius: '50%', flexShrink: 0,
                            background: 'var(--accent-muted)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: '12px', fontWeight: 700, color: 'var(--accent)',
                          }}>
                            {i + 1}
                          </div>
                          <p style={{ fontSize: '13px', color: 'var(--muted)' }}>{step}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Colors */}
                {product.colors?.length > 0 && (
                  <div style={{ marginBottom: '40px' }}>
                    <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '20px', fontWeight: 700, marginBottom: '16px' }}>
                      Available Colors
                    </h3>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                      {product.colors.map(color => (
                        <span key={color} style={{
                          fontSize: '13px', fontWeight: 500, padding: '8px 18px', borderRadius: '10px',
                          background: 'var(--surface)', border: '1px solid var(--border-color)',
                          color: 'var(--foreground)',
                          display: 'flex', alignItems: 'center', gap: '8px',
                        }}>
                          <div style={{
                            width: '14px', height: '14px', borderRadius: '50%',
                            background: color.toLowerCase().replace(/\s/g, ''),
                            border: '2px solid var(--border-color)',
                            boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.2)',
                          }} />
                          {color}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tags */}
                {product.tags?.length > 0 && (
                  <div>
                    <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '20px', fontWeight: 700, marginBottom: '16px' }}>
                      Tags
                    </h3>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                      {product.tags.map(tag => (
                        <span key={tag} style={{
                          fontSize: '12px', fontWeight: 500, padding: '6px 14px', borderRadius: '8px',
                          background: 'var(--accent-muted)', color: 'var(--accent)',
                          border: '1px solid rgba(139, 92, 246, 0.1)',
                        }}>#{tag}</span>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {/* ═══ SPECIFICATIONS TAB ═══ */}
            {tab === 'specifications' && (
              <motion.div key="specs"
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>

                {/* Spec Cards Grid */}
                <div style={{
                  display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
                  gap: '16px', marginBottom: '40px',
                }}>
                  {[
                    { icon: <CushionIcon />, label: 'Cushioning', value: features.cushioning },
                    { icon: <MaterialIcon />, label: 'Material', value: features.material },
                    { icon: <SoleIcon />, label: 'Outsole', value: features.sole },
                    { icon: <WeightIcon />, label: 'Weight', value: features.weight },
                  ].map((spec, i) => (
                    <motion.div key={spec.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      style={{
                        padding: '20px', borderRadius: '18px',
                        background: 'var(--surface)', border: '1px solid var(--border-color)',
                        transition: 'all 0.3s ease',
                        cursor: 'default',
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.25)';
                        e.currentTarget.style.boxShadow = '0 8px 32px rgba(139, 92, 246, 0.08)';
                        e.currentTarget.style.transform = 'translateY(-2px)';
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.borderColor = 'var(--border-color)';
                        e.currentTarget.style.boxShadow = 'none';
                        e.currentTarget.style.transform = 'translateY(0)';
                      }}
                    >
                      <div style={{
                        width: '44px', height: '44px', borderRadius: '12px',
                        background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(99, 102, 241, 0.06))',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: 'var(--highlight)', marginBottom: '14px',
                      }}>
                        {spec.icon}
                      </div>
                      <p style={{
                        fontSize: '11px', fontWeight: 600, textTransform: 'uppercase',
                        letterSpacing: '0.12em', color: 'var(--muted)', marginBottom: '6px',
                      }}>
                        {spec.label}
                      </p>
                      <p style={{ fontSize: '15px', fontWeight: 600, color: 'var(--foreground)' }}>
                        {spec.value}
                      </p>
                    </motion.div>
                  ))}
                </div>

                {/* Detailed Specs Table */}
                <div style={{
                  padding: '24px', borderRadius: '18px',
                  background: 'var(--surface)', border: '1px solid var(--border-color)',
                }}>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '18px', fontWeight: 700, marginBottom: '20px' }}>
                    Product Details
                  </h3>
                  {[
                    { label: 'Brand', value: product.brand },
                    { label: 'Model', value: product.name },
                    { label: 'Category', value: product.category },
                    { label: 'Cushioning', value: features.cushioning },
                    { label: 'Upper Material', value: features.material },
                    { label: 'Outsole', value: features.sole },
                    { label: 'Weight', value: features.weight },
                    { label: 'Available Sizes', value: product.sizes?.map(s => s.size).join(', ') || 'N/A' },
                    { label: 'Colors', value: product.colors?.join(', ') || 'N/A' },
                    { label: 'SKU', value: product._id?.slice(-8).toUpperCase() || 'N/A' },
                  ].map((row, i) => (
                    <div key={row.label} style={{
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                      padding: '12px 0',
                      borderBottom: i < 9 ? '1px solid var(--border-color)' : 'none',
                    }}>
                      <span style={{ fontSize: '13px', color: 'var(--muted)', fontWeight: 500 }}>{row.label}</span>
                      <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--foreground)', textAlign: 'right', maxWidth: '60%' }}>{row.value}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* ═══ REVIEWS TAB ═══ */}
            {tab === 'reviews' && (
              <motion.div key="reviews"
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                {/* Review Form */}
                {user && (
                  <form onSubmit={submitReview} style={{ marginBottom: '40px', padding: '24px', borderRadius: '18px', background: 'var(--surface)', border: '1px solid var(--border-color)' }}>
                    <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '18px', marginBottom: '18px' }}>Write a Review</h3>
                    <div style={{ marginBottom: '16px' }}>
                      <label style={{ fontSize: '13px', fontWeight: 500, display: 'block', marginBottom: '8px' }}>Rating</label>
                      <div style={{ display: 'flex', gap: '4px' }}>
                        {[1, 2, 3, 4, 5].map(star => (
                          <motion.button key={star} type="button"
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setReviewForm(f => ({ ...f, rating: star }))}
                            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '2px' }}>
                            <HiStar size={26} style={{ color: star <= reviewForm.rating ? '#d4a054' : 'var(--border-color)', transition: 'color 0.15s' }} />
                          </motion.button>
                        ))}
                      </div>
                    </div>
                    <input value={reviewForm.title} onChange={e => setReviewForm(f => ({ ...f, title: e.target.value }))}
                      placeholder="Review title" className="input" style={{ marginBottom: '12px' }} />
                    <textarea value={reviewForm.comment} onChange={e => setReviewForm(f => ({ ...f, comment: e.target.value }))}
                      placeholder="Write your review..." className="input" rows={3} required style={{ marginBottom: '16px', resize: 'vertical' }} />
                    <motion.button type="submit" className="btn-primary" whileTap={{ scale: 0.97 }}>Submit Review</motion.button>
                  </form>
                )}

                {/* Reviews List */}
                {reviews.length > 0 ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {reviews.map((review, i) => (
                      <motion.div key={review._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        style={{ padding: '20px', borderRadius: '16px', background: 'var(--surface)', border: '1px solid var(--border-color)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div style={{
                              width: '36px', height: '36px', borderRadius: '50%',
                              display: 'flex', alignItems: 'center', justifyContent: 'center',
                              fontSize: '13px', fontWeight: 700,
                              background: 'linear-gradient(135deg, var(--gradient-start), var(--gradient-mid))',
                              color: '#fff',
                            }}>
                              {review.user?.name?.charAt(0) || '?'}
                            </div>
                            <div>
                              <p style={{ fontSize: '14px', fontWeight: 600 }}>{review.user?.name || 'Anonymous'}</p>
                              <div style={{ display: 'flex', gap: '2px', marginTop: '2px' }}>
                                {[1, 2, 3, 4, 5].map(s => (
                                  <HiStar key={s} size={12} style={{ color: s <= review.rating ? '#d4a054' : 'var(--border-color)' }} />
                                ))}
                              </div>
                            </div>
                          </div>
                          <span style={{ fontSize: '12px', color: 'var(--muted)' }}>
                            {new Date(review.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        {review.title && <p style={{ fontWeight: 600, fontSize: '14px', marginBottom: '6px' }}>{review.title}</p>}
                        <p style={{ fontSize: '13px', lineHeight: 1.6, color: 'var(--muted)' }}>{review.comment}</p>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <p style={{ textAlign: 'center', padding: '40px 0', fontSize: '14px', color: 'var(--muted)' }}>No reviews yet. Be the first!</p>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Related Products */}
      {related.length > 0 && (
        <div style={{ marginTop: '32px', marginBottom: '48px' }}>
          <div className="section-divider" />
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '24px', fontWeight: 700, marginBottom: '32px' }}>You Might Also Like</h2>
          <div className="product-grid">
            {related.slice(0, 4).map((p, i) => (
              <motion.div key={p._id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}>
                <ProductCard product={p} />
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
    </div>
  );
}

// Day 15: Size selection with stock
// Day 15: Quantity selector
// Day 15: Wishlist toggle
// Day 15: Star ratings
// Day 15: Review form
// Day 15: Related products
// Day 15: Breadcrumb navigation
// Day 17: 3-tab system
// Day 17: Brand-specific data