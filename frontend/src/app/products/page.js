'use client';
import { useState, useEffect, Suspense, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import api from '@/lib/api';
import ProductCard from '@/components/products/ProductCard';
import { HiChevronDown, HiX, HiOutlineSearch, HiOutlineAdjustments } from 'react-icons/hi';

/* ====== Dropdown Filter ====== */
function FilterDropdown({ label, options, value, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div ref={ref} style={{ position: 'relative', display: 'inline-flex' }}>
      <motion.button onClick={() => setOpen(!open)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        style={{
          display: 'inline-flex', alignItems: 'center', gap: '6px',
          padding: '10px 18px', fontSize: '13px', fontWeight: 500,
          background: value ? 'var(--highlight-soft)' : 'var(--surface)',
          color: value ? 'var(--highlight)' : 'var(--foreground)',
          border: `1px solid ${value ? 'var(--highlight)' : 'var(--border-color)'}`,
          borderRadius: '12px', cursor: 'pointer', whiteSpace: 'nowrap',
          transition: 'all 0.25s ease',
          backdropFilter: 'blur(10px)',
        }}>
        {label}{value && `: ${value}`}
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <HiChevronDown size={13} />
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'absolute', top: 'calc(100% + 8px)', left: 0, zIndex: 50,
              minWidth: '200px', padding: '6px',
              background: 'var(--surface)', border: '1px solid var(--border-color)',
              borderRadius: '14px', boxShadow: '0 20px 60px var(--card-shadow)',
              backdropFilter: 'blur(20px)',
            }}>
            {value && (
              <button onClick={() => { onChange(''); setOpen(false); }}
                style={{
                  display: 'block', width: '100%', textAlign: 'left',
                  padding: '8px 12px', fontSize: '12px', borderRadius: '8px',
                  background: 'transparent', color: 'var(--color-error)',
                  border: 'none', cursor: 'pointer',
                }}>Clear selection</button>
            )}
            {options.map(opt => (
              <motion.button key={opt} onClick={() => { onChange(value === opt ? '' : opt); setOpen(false); }}
                whileHover={{ x: 4 }}
                transition={{ duration: 0.15 }}
                style={{
                  display: 'block', width: '100%', textAlign: 'left',
                  padding: '9px 14px', fontSize: '13px', borderRadius: '8px',
                  background: value === opt ? 'var(--highlight-soft)' : 'transparent',
                  color: value === opt ? 'var(--highlight)' : 'var(--foreground)',
                  fontWeight: value === opt ? 500 : 400,
                  border: 'none', cursor: 'pointer', transition: 'background 0.15s',
                }}
                onMouseEnter={e => { if (value !== opt) e.currentTarget.style.background = 'var(--surface-hover)'; }}
                onMouseLeave={e => { if (value !== opt) e.currentTarget.style.background = 'transparent'; }}>
                {opt}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ====== Modern Price Dropdown ====== */
function PriceDropdown({ min, max, onMinChange, onMaxChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const hasValue = min || max;

  const presets = [
    { label: 'Under $100', min: '', max: '100' },
    { label: '$100 – $200', min: '100', max: '200' },
    { label: '$200 – $300', min: '200', max: '300' },
    { label: '$300+', min: '300', max: '' },
  ];

  const activePreset = presets.find(p => p.min === min && p.max === max);

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div ref={ref} style={{ position: 'relative', display: 'inline-flex' }}>
      <motion.button onClick={() => setOpen(!open)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        style={{
          display: 'inline-flex', alignItems: 'center', gap: '6px',
          padding: '10px 18px', fontSize: '13px', fontWeight: 500,
          background: hasValue ? 'var(--highlight-soft)' : 'var(--surface)',
          color: hasValue ? 'var(--highlight)' : 'var(--foreground)',
          border: `1px solid ${hasValue ? 'var(--highlight)' : 'var(--border-color)'}`,
          borderRadius: '12px', cursor: 'pointer', whiteSpace: 'nowrap',
          transition: 'all 0.25s ease',
        }}>
        {activePreset ? activePreset.label : (hasValue ? `$${min || '0'} – $${max || '∞'}` : 'Price')}
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <HiChevronDown size={13} />
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'absolute', top: 'calc(100% + 8px)', left: 0, zIndex: 50,
              width: '280px', padding: '16px',
              background: 'var(--surface)', border: '1px solid var(--border-color)',
              borderRadius: '18px', boxShadow: '0 20px 60px var(--card-shadow)',
            }}>

            <p style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '10px' }}>
              Quick select
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px', marginBottom: '16px' }}>
              {presets.map(p => {
                const isActive = p.min === min && p.max === max;
                return (
                  <motion.button key={p.label}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => {
                      if (isActive) { onMinChange(''); onMaxChange(''); }
                      else { onMinChange(p.min); onMaxChange(p.max); }
                    }}
                    style={{
                      padding: '8px 10px', fontSize: '12px', fontWeight: isActive ? 600 : 400,
                      borderRadius: '10px', border: 'none', cursor: 'pointer',
                      background: isActive ? 'linear-gradient(135deg, var(--gradient-start), var(--gradient-mid))' : 'var(--surface-hover)',
                      color: isActive ? '#fff' : 'var(--foreground)',
                      transition: 'all 0.2s ease',
                    }}>
                    {p.label}
                  </motion.button>
                );
              })}
            </div>

            <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, var(--border-color), transparent)', margin: '0 0 14px' }} />

            <p style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '10px' }}>
              Custom range
            </p>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: '10px', color: 'var(--muted)', marginBottom: '4px' }}>Min ($)</p>
                <input type="number" placeholder="0" value={min}
                  onChange={e => onMinChange(e.target.value)}
                  className="input" style={{ padding: '8px 12px', fontSize: '13px' }} />
              </div>
              <span style={{ color: 'var(--muted)', marginTop: '18px' }}>—</span>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: '10px', color: 'var(--muted)', marginBottom: '4px' }}>Max ($)</p>
                <input type="number" placeholder="∞" value={max}
                  onChange={e => onMaxChange(e.target.value)}
                  className="input" style={{ padding: '8px 12px', fontSize: '13px' }} />
              </div>
            </div>

            {hasValue && (
              <button onClick={() => { onMinChange(''); onMaxChange(''); }}
                style={{
                  width: '100%', marginTop: '12px', padding: '8px',
                  fontSize: '12px', fontWeight: 500, borderRadius: '8px',
                  background: 'rgba(251,113,133,0.08)', color: 'var(--color-error)',
                  border: 'none', cursor: 'pointer', transition: 'background 0.15s',
                }}>
                Clear price filter
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ====== Sort Dropdown ====== */
function SortDropdown({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const sortLabels = { newest: 'Newest', price_asc: 'Price ↑', price_desc: 'Price ↓', rating: 'Top Rated' };

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div ref={ref} style={{ position: 'relative', display: 'inline-flex' }}>
      <motion.button onClick={() => setOpen(!open)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        style={{
          display: 'inline-flex', alignItems: 'center', gap: '6px',
          padding: '10px 18px', fontSize: '13px', fontWeight: 500,
          background: 'var(--surface)', color: 'var(--foreground)',
          border: '1px solid var(--border-color)',
          borderRadius: '12px', cursor: 'pointer', whiteSpace: 'nowrap',
        }}>
        {sortLabels[value]}
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <HiChevronDown size={13} />
        </motion.div>
      </motion.button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'absolute', top: 'calc(100% + 8px)', right: 0, zIndex: 50,
              minWidth: '180px', padding: '6px',
              background: 'var(--surface)', border: '1px solid var(--border-color)',
              borderRadius: '14px', boxShadow: '0 20px 60px var(--card-shadow)',
            }}>
            {Object.entries(sortLabels).map(([k, v]) => (
              <motion.button key={k} onClick={() => { onChange(k); setOpen(false); }}
                whileHover={{ x: 4 }}
                transition={{ duration: 0.15 }}
                style={{
                  display: 'block', width: '100%', textAlign: 'left',
                  padding: '9px 14px', fontSize: '13px', borderRadius: '8px',
                  background: value === k ? 'var(--highlight-soft)' : 'transparent',
                  color: value === k ? 'var(--highlight)' : 'var(--foreground)',
                  fontWeight: value === k ? 500 : 400,
                  border: 'none', cursor: 'pointer', transition: 'background 0.15s',
                }}
                onMouseEnter={e => { if (value !== k) e.currentTarget.style.background = 'var(--surface-hover)'; }}
                onMouseLeave={e => { if (value !== k) e.currentTarget.style.background = 'transparent'; }}>
                {v}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ====== Inline Search Bar ====== */
function InlineSearch({ value, onChange }) {
  return (
    <div style={{ position: 'relative', flex: 1, maxWidth: '320px' }}>
      <HiOutlineSearch size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--muted)' }} />
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder="Search sneakers..."
        className="input"
        style={{ paddingLeft: '40px', fontSize: '13px', background: 'var(--surface)', borderRadius: '12px' }}
      />
    </div>
  );
}

/* ====== Main Products Page ====== */
function ProductListingContent() {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({});
  const [filters, setFilters] = useState({
    category: searchParams.get('category') || '',
    brand: searchParams.get('brand') || '',
    minPrice: '', maxPrice: '',
    sort: 'newest',
    search: searchParams.get('search') || '',
    page: 1,
  });

  useEffect(() => {
    setFilters(f => ({
      ...f,
      category: searchParams.get('category') || '',
      brand: searchParams.get('brand') || '',
      search: searchParams.get('search') || '',
    }));
  }, [searchParams]);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (filters.category) params.set('category', filters.category);
        if (filters.brand) params.set('brand', filters.brand);
        if (filters.minPrice) params.set('minPrice', filters.minPrice);
        if (filters.maxPrice) params.set('maxPrice', filters.maxPrice);
        if (filters.search) params.set('search', filters.search);
        params.set('sort', filters.sort);
        params.set('page', filters.page);
        params.set('limit', '12');
        const res = await api.get(`/products?${params.toString()}`);
        setProducts(res.data.data);
        setPagination(res.data.pagination);
      } catch { setProducts([]); }
      setLoading(false);
    };
    fetchProducts();
  }, [filters]);

  const brands = ['Nike', 'Adidas', 'Jordan', 'New Balance', 'Puma', 'Converse'];
  const categories = ['Running', 'Casual', 'Sports', 'Limited Edition'];
  const clearAll = () => setFilters({ category: '', brand: '', minPrice: '', maxPrice: '', sort: 'newest', search: '', page: 1 });
  const hasActiveFilters = filters.category || filters.brand || filters.minPrice || filters.maxPrice || filters.search;

  return (
    <div className="page-container" style={{ paddingTop: '32px', paddingBottom: '80px' }}>

      {/* Decorative background */}
      <div style={{ position: 'fixed', top: 0, right: 0, width: '500px', height: '500px', borderRadius: '50%', background: 'var(--glow-violet)', filter: 'blur(160px)', opacity: 0.04, pointerEvents: 'none' }} />

      {/* Page Header */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
        style={{ marginBottom: '32px' }}>
        <div className="section-divider" />
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 800 }}>
          {filters.category ? (
            <span>{filters.category}</span>
          ) : filters.brand ? (
            <span>{filters.brand}</span>
          ) : filters.search ? (
            <span>Results for <span className="gradient-text">&ldquo;{filters.search}&rdquo;</span></span>
          ) : (
            <span>All Sneakers</span>
          )}
        </h1>
        <p style={{ fontSize: '13px', color: 'var(--muted)', marginTop: '8px' }}>
          {pagination.total || 0} products found
        </p>
      </motion.div>

      {/* Search + Filter Bar */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        style={{
          display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '10px', marginBottom: '20px',
          padding: '14px 18px', borderRadius: '16px',
          background: 'var(--surface)', border: '1px solid var(--border-color)',
          backdropFilter: 'blur(10px)',
        }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--muted)', fontSize: '13px', fontWeight: 500 }}>
          <HiOutlineAdjustments size={16} /> Filters
        </div>
        <div style={{ width: '1px', height: '24px', background: 'var(--border-color)' }} />
        <FilterDropdown label="Category" options={categories} value={filters.category}
          onChange={v => setFilters(f => ({ ...f, category: v, page: 1 }))} />
        <FilterDropdown label="Brand" options={brands} value={filters.brand}
          onChange={v => setFilters(f => ({ ...f, brand: v, page: 1 }))} />
        <PriceDropdown min={filters.minPrice} max={filters.maxPrice}
          onMinChange={v => setFilters(f => ({ ...f, minPrice: v, page: 1 }))}
          onMaxChange={v => setFilters(f => ({ ...f, maxPrice: v, page: 1 }))} />

        <div style={{ flex: 1 }} />

        <InlineSearch value={filters.search}
          onChange={v => setFilters(f => ({ ...f, search: v, page: 1 }))} />

        {hasActiveFilters && (
          <motion.button initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={clearAll}
            style={{
              display: 'flex', alignItems: 'center', gap: '4px',
              padding: '8px 14px', borderRadius: '10px',
              background: 'rgba(251,113,133,0.08)', color: 'var(--color-error)',
              fontSize: '12px', fontWeight: 500, border: 'none', cursor: 'pointer',
            }}>
            <HiX size={12} /> Clear all
          </motion.button>
        )}

        <SortDropdown value={filters.sort}
          onChange={v => setFilters(f => ({ ...f, sort: v, page: 1 }))} />
      </motion.div>

      {/* Active chips */}
      <AnimatePresence>
        {hasActiveFilters && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '28px' }}>
            {filters.category && <Chip label={filters.category} onRemove={() => setFilters(f => ({ ...f, category: '', page: 1 }))} />}
            {filters.brand && <Chip label={filters.brand} onRemove={() => setFilters(f => ({ ...f, brand: '', page: 1 }))} />}
            {filters.search && <Chip label={`"${filters.search}"`} onRemove={() => setFilters(f => ({ ...f, search: '', page: 1 }))} />}
            {(filters.minPrice || filters.maxPrice) && (
              <Chip label={`$${filters.minPrice || 0} – $${filters.maxPrice || '∞'}`}
                onRemove={() => setFilters(f => ({ ...f, minPrice: '', maxPrice: '', page: 1 }))} />
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Grid */}
      {loading ? (
        <div className="product-grid">
          {[...Array(8)].map((_, i) => (
            <div key={i}>
              <div className="skeleton" style={{ aspectRatio: '0.78', marginBottom: '12px' }} />
              <div className="skeleton" style={{ height: '10px', width: '50px', marginBottom: '8px' }} />
              <div className="skeleton" style={{ height: '14px', width: '70%' }} />
            </div>
          ))}
        </div>
      ) : products.length > 0 ? (
        <>
          <div className="product-grid">
            {products.map((product, i) => (
              <motion.div key={product._id}
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: i * 0.04, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}>
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
          {pagination.pages > 1 && (
            <div style={{ display: 'flex', justifyContent: 'center', gap: '6px', marginTop: '48px' }}>
              {[...Array(pagination.pages)].map((_, i) => (
                <motion.button key={i}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setFilters(f => ({ ...f, page: i + 1 }))}
                  style={{
                    width: '40px', height: '40px', borderRadius: '12px', fontSize: '13px', fontWeight: 600,
                    border: 'none', cursor: 'pointer',
                    background: filters.page === i + 1 ? 'linear-gradient(135deg, var(--gradient-start), var(--gradient-mid))' : 'var(--surface)',
                    color: filters.page === i + 1 ? '#fff' : 'var(--muted)',
                    transition: 'all 0.25s ease',
                    boxShadow: filters.page === i + 1 ? '0 4px 16px var(--highlight-soft)' : 'none',
                  }}>
                  {i + 1}
                </motion.button>
              ))}
            </div>
          )}
        </>
      ) : (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          style={{ textAlign: 'center', padding: '80px 0' }}>
          <motion.p
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{ fontSize: '56px', marginBottom: '20px' }}>🔍</motion.p>
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '22px', fontWeight: 700, marginBottom: '10px' }}>No sneakers found</h3>
          <p style={{ fontSize: '14px', color: 'var(--muted)', marginBottom: '28px' }}>Try adjusting your filters or search term</p>
          <button onClick={clearAll} className="btn-primary">Clear Filters</button>
        </motion.div>
      )}
    </div>
  );
}

function Chip({ label, onRemove }) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
      layout
      style={{
        display: 'inline-flex', alignItems: 'center', gap: '6px',
        padding: '6px 14px', borderRadius: '10px',
        background: 'var(--highlight-soft)', color: 'var(--highlight)',
        fontSize: '12px', fontWeight: 500,
        border: '1px solid var(--highlight-soft)',
      }}>
      {label}
      <motion.button onClick={onRemove}
        whileHover={{ scale: 1.2 }}
        style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', padding: '0', display: 'flex' }}>
        <HiX size={11} />
      </motion.button>
    </motion.span>
  );
}

export default function ProductsPage() {
  return (
    <div style={{ paddingTop: 'var(--navbar-height)' }}>
      <Suspense fallback={<div className="page-container" style={{ padding: '80px 0', textAlign: 'center' }}>Loading...</div>}>
        <ProductListingContent />
      </Suspense>
    </div>
  );
}
