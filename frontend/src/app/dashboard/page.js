'use client';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import api from '@/lib/api';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { HiOutlineClipboardList, HiOutlineUser, HiOutlineHeart } from 'react-icons/hi';
import ProductCard from '@/components/products/ProductCard';

function DashboardContent() {
  const { user, logout, loadUser } = useAuth();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [tab, setTab] = useState(searchParams.get('tab') || 'orders');
  const [orders, setOrders] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [profile, setProfile] = useState({ name: '', email: '', phone: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) { router.push('/auth/login'); return; }
    setProfile({ name: user.name || '', email: user.email || '', phone: user.phone || '' });
    const fetchData = async () => {
      setLoading(true);
      try {
        const [ordRes, wishRes] = await Promise.all([
          api.get('/orders/my'),
          api.get('/wishlist'),
        ]);
        setOrders(ordRes.data.data);
        setWishlist(wishRes.data.data);
      } catch { /* ignore */ }
      setLoading(false);
    };
    fetchData();
  }, [user, router]);

  const updateProfile = async (e) => {
    e.preventDefault();
    try {
      await api.put('/auth/profile', profile);
      await loadUser();
      toast.success('Profile updated!');
    } catch (err) { toast.error(err.response?.data?.message || 'Update failed'); }
  };

  if (!user) return null;

  const tabs = [
    { key: 'orders', label: 'Orders', icon: <HiOutlineClipboardList size={18} /> },
    { key: 'profile', label: 'Profile', icon: <HiOutlineUser size={18} /> },
    { key: 'wishlist', label: 'Wishlist', icon: <HiOutlineHeart size={18} /> },
  ];

  const statusColors = {
    processing: 'badge-warning', shipped: 'badge-accent', in_transit: 'badge-accent',
    delivered: 'badge-success', cancelled: 'badge-error',
    pending: 'badge-warning', paid: 'badge-success', failed: 'badge-error',
  };

  return (
    <div style={{ paddingTop: 'var(--navbar-height)' }}>
      <div className="page-container" style={{ paddingTop: '32px', paddingBottom: '64px' }}>
        {/* Decorative glow */}
        <div style={{ position: 'fixed', top: '10%', right: '-5%', width: '400px', height: '400px', borderRadius: '50%', background: 'var(--glow-violet)', filter: 'blur(160px)', opacity: 0.04, pointerEvents: 'none' }} />

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
          <div className="section-divider" />
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '32px', fontWeight: 700, marginBottom: '32px' }}>My Dashboard</h1>
        </motion.div>

        <div style={{ display: 'flex', gap: '32px', flexDirection: 'column' }} className="lg:flex-row">
          {/* Sidebar */}
          <aside style={{ flexShrink: 0 }} className="lg:w-56">
            <div style={{ display: 'flex', gap: '8px' }} className="lg:flex-col">
              {tabs.map(t => (
                <button key={t.key} onClick={() => setTab(t.key)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '8px',
                    padding: '10px 16px', borderRadius: '12px', fontSize: '14px', fontWeight: 500,
                    width: '100%', textAlign: 'left',
                    background: tab === t.key ? 'var(--accent-muted)' : 'transparent',
                    color: tab === t.key ? 'var(--accent)' : 'var(--muted)',
                    border: 'none', cursor: 'pointer', transition: 'all 0.2s',
                  }}>
                  {t.icon} {t.label}
                </button>
              ))}
            </div>
            <button onClick={logout}
              style={{
                marginTop: '16px', padding: '10px 16px', fontSize: '14px', width: '100%',
                textAlign: 'left', borderRadius: '12px', color: 'var(--color-error)',
                background: 'none', border: 'none', cursor: 'pointer', transition: 'background 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'var(--surface)'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
              Logout
            </button>
          </aside>

          {/* Content */}
          <div style={{ flex: 1, minWidth: 0 }}>
            {tab === 'orders' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '20px', marginBottom: '24px' }}>Order History</h2>
                {loading ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {[1, 2].map(i => <div key={i} className="skeleton" style={{ height: '112px', borderRadius: '16px' }} />)}
                  </div>
                ) : orders.length > 0 ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {orders.map(order => (
                      <div key={order._id} style={{ padding: '20px', borderRadius: '16px', background: 'var(--surface)', border: '1px solid var(--border-color)' }}>
                        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '16px', marginBottom: '12px' }}>
                          <div>
                            <p style={{ fontSize: '12px', color: 'var(--muted)' }}>Order #{order._id?.slice(-8)}</p>
                            <p style={{ fontSize: '12px', color: 'var(--muted)', marginTop: '2px' }}>
                              {new Date(order.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                          <div style={{ display: 'flex', gap: '8px' }}>
                            <span className={`badge ${statusColors[order.paymentStatus] || 'badge-accent'}`}>
                              {order.paymentStatus}
                            </span>
                            <span className={`badge ${statusColors[order.deliveryStatus] || 'badge-accent'}`}>
                              {order.deliveryStatus}
                            </span>
                          </div>
                        </div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                          {order.items?.map((item, i) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px' }}>
                              <span style={{ fontSize: '20px' }}>👟</span>
                              <span>{item.name} (Size {item.size}) × {item.quantity}</span>
                            </div>
                          ))}
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px', paddingTop: '12px', borderTop: '1px solid var(--border-color)' }}>
                          <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700 }}>${order.totalPrice?.toFixed(2)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div style={{ textAlign: 'center', padding: '64px 0' }}>
                    <div style={{ fontSize: '48px', marginBottom: '12px' }}>📦</div>
                    <p style={{ color: 'var(--muted)', marginBottom: '16px' }}>No orders yet</p>
                    <Link href="/products" className="btn-primary">Start Shopping</Link>
                  </div>
                )}
              </motion.div>
            )}

            {tab === 'profile' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '20px', marginBottom: '24px' }}>Profile Settings</h2>
                <form onSubmit={updateProfile} style={{ maxWidth: '480px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div>
                    <label style={{ fontSize: '13px', fontWeight: 500, display: 'block', marginBottom: '6px' }}>Name</label>
                    <input value={profile.name} onChange={e => setProfile(p => ({ ...p, name: e.target.value }))}
                      className="input" />
                  </div>
                  <div>
                    <label style={{ fontSize: '13px', fontWeight: 500, display: 'block', marginBottom: '6px' }}>Email</label>
                    <input type="email" value={profile.email}
                      onChange={e => setProfile(p => ({ ...p, email: e.target.value }))} className="input" />
                  </div>
                  <div>
                    <label style={{ fontSize: '13px', fontWeight: 500, display: 'block', marginBottom: '6px' }}>Phone</label>
                    <input value={profile.phone} onChange={e => setProfile(p => ({ ...p, phone: e.target.value }))}
                      placeholder="+1 (555) 000-0000" className="input" />
                  </div>
                  <button type="submit" className="btn-primary" style={{ alignSelf: 'flex-start' }}>Save Changes</button>
                </form>
              </motion.div>
            )}

            {tab === 'wishlist' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '20px', marginBottom: '24px' }}>My Wishlist</h2>
                {wishlist.length > 0 ? (
                  <div className="product-grid">
                    {wishlist.map(p => <ProductCard key={p._id} product={p} />)}
                  </div>
                ) : (
                  <div style={{ textAlign: 'center', padding: '64px 0' }}>
                    <div style={{ fontSize: '48px', marginBottom: '12px' }}>💝</div>
                    <p style={{ color: 'var(--muted)', marginBottom: '16px' }}>Your wishlist is empty</p>
                    <Link href="/products" className="btn-primary">Discover Sneakers</Link>
                  </div>
                )}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<div style={{ paddingTop: 'var(--navbar-height)' }}><div className="page-container" style={{ padding: '80px 0', textAlign: 'center' }}>Loading...</div></div>}>
      <DashboardContent />
    </Suspense>
  );
}
