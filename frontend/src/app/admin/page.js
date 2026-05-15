'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import api from '@/lib/api';
import toast from 'react-hot-toast';
import { HiOutlineViewGrid, HiOutlineCube, HiOutlineClipboardList, HiOutlineUsers, HiOutlinePlus, HiOutlinePencil, HiOutlineTrash, HiX } from 'react-icons/hi';

export default function AdminPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [tab, setTab] = useState('dashboard');
  const [stats, setStats] = useState(null);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showProductForm, setShowProductForm] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [productForm, setProductForm] = useState({
    name: '', brand: 'Nike', price: '', description: '', category: 'Casual',
    sizes: '7,8,9,10,11,12', featured: false
  });

  useEffect(() => {
    if (!user || user.role !== 'admin') { router.push('/'); return; }
    fetchData();
  }, [user, router]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [statsRes, prodRes, ordRes, usrRes] = await Promise.all([
        api.get('/orders/stats/summary'),
        api.get('/products/admin/all'),
        api.get('/orders'),
        api.get('/auth/users'),
      ]);
      setStats(statsRes.data.data);
      setProducts(prodRes.data.data);
      setOrders(ordRes.data.data);
      setUsers(usrRes.data.data);
    } catch { /* ignore */ }
    setLoading(false);
  };

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    try {
      const sizes = productForm.sizes.split(',').map(s => ({ size: s.trim(), stock: 10 }));
      const data = { ...productForm, price: Number(productForm.price), sizes };

      if (editProduct) {
        await api.put(`/products/${editProduct._id}`, data);
        toast.success('Product updated!');
      } else {
        await api.post('/products', { ...data, images: [] });
        toast.success('Product created!');
      }
      setShowProductForm(false);
      setEditProduct(null);
      setProductForm({ name: '', brand: 'Nike', price: '', description: '', category: 'Casual', sizes: '7,8,9,10,11,12', featured: false });
      fetchData();
    } catch (err) { toast.error(err.response?.data?.message || 'Failed'); }
  };

  const deleteProduct = async (id) => {
    if (!confirm('Delete this product?')) return;
    try {
      await api.delete(`/products/${id}`);
      toast.success('Product deleted');
      fetchData();
    } catch { toast.error('Delete failed'); }
  };

  const updateOrderStatus = async (id, deliveryStatus) => {
    try {
      await api.put(`/orders/${id}/status`, { deliveryStatus });
      toast.success('Status updated');
      fetchData();
    } catch { toast.error('Update failed'); }
  };

  if (!user || user.role !== 'admin') return null;

  const tabs = [
    { key: 'dashboard', label: 'Overview', icon: <HiOutlineViewGrid size={18} /> },
    { key: 'products', label: 'Products', icon: <HiOutlineCube size={18} /> },
    { key: 'orders', label: 'Orders', icon: <HiOutlineClipboardList size={18} /> },
    { key: 'users', label: 'Users', icon: <HiOutlineUsers size={18} /> },
  ];

  const statusColors = {
    processing: 'badge-warning', shipped: 'badge-accent', delivered: 'badge-success',
    cancelled: 'badge-error', pending: 'badge-warning', paid: 'badge-success',
  };

  return (
    <div style={{ paddingTop: 'var(--navbar-height)' }}>
      <div className="page-container" style={{ paddingTop: '32px', paddingBottom: '64px' }}>
        {/* Decorative glow */}
        <div style={{ position: 'fixed', top: '10%', left: '-5%', width: '400px', height: '400px', borderRadius: '50%', background: 'var(--glow-violet)', filter: 'blur(160px)', opacity: 0.04, pointerEvents: 'none' }} />

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
          <div className="section-divider" />
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '32px', fontWeight: 700, marginBottom: '32px' }}>Admin Panel</h1>
        </motion.div>

        <div style={{ display: 'flex', gap: '32px', flexDirection: 'column' }} className="lg:flex-row">
          {/* Sidebar */}
          <aside style={{ flexShrink: 0 }} className="lg:w-52">
            <div style={{ display: 'flex', gap: '4px', overflowX: 'auto' }} className="lg:flex-col">
              {tabs.map(t => (
                <button key={t.key} onClick={() => setTab(t.key)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '8px',
                    padding: '10px 16px', borderRadius: '12px', fontSize: '14px', fontWeight: 500,
                    whiteSpace: 'nowrap',
                    background: tab === t.key ? 'var(--accent-muted)' : 'transparent',
                    color: tab === t.key ? 'var(--accent)' : 'var(--muted)',
                    border: 'none', cursor: 'pointer', transition: 'all 0.2s',
                  }}>
                  {t.icon} {t.label}
                </button>
              ))}
            </div>
          </aside>

          {/* Content */}
          <div style={{ flex: 1, minWidth: 0 }}>
            {/* Dashboard */}
            {tab === 'dashboard' && stats && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', marginBottom: '32px' }} className="lg:grid-cols-4">
                  {[
                    { label: 'Total Revenue', value: `$${stats.totalRevenue?.toFixed(2) || '0'}`, emoji: '💰' },
                    { label: 'Total Orders', value: stats.totalOrders || 0, emoji: '📦' },
                    { label: 'Total Users', value: stats.totalUsers || 0, emoji: '👥' },
                    { label: 'Total Products', value: stats.totalProducts || 0, emoji: '👟' },
                  ].map(stat => (
                    <div key={stat.label} style={{ padding: '20px', borderRadius: '16px', background: 'var(--surface)', border: '1px solid var(--border-color)' }}>
                      <div style={{ fontSize: '24px', marginBottom: '8px' }}>{stat.emoji}</div>
                      <p style={{ fontFamily: 'var(--font-heading)', fontSize: '24px', fontWeight: 700 }}>{stat.value}</p>
                      <p style={{ fontSize: '12px', color: 'var(--muted)', marginTop: '4px' }}>{stat.label}</p>
                    </div>
                  ))}
                </div>

                <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '18px', marginBottom: '16px' }}>Recent Orders</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {stats.recentOrders?.map(order => (
                    <div key={order._id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', borderRadius: '16px', background: 'var(--surface)', border: '1px solid var(--border-color)' }}>
                      <div>
                        <p style={{ fontSize: '14px', fontWeight: 500 }}>{order.user?.name || 'Unknown'}</p>
                        <p style={{ fontSize: '12px', color: 'var(--muted)' }}>#{order._id?.slice(-8)}</p>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700 }}>${order.totalPrice?.toFixed(2)}</p>
                        <span className={`badge ${statusColors[order.deliveryStatus] || ''}`} style={{ fontSize: '11px' }}>
                          {order.deliveryStatus}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Products */}
            {tab === 'products' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
                  <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '20px' }}>Products ({products.length})</h2>
                  <button onClick={() => { setShowProductForm(true); setEditProduct(null); }}
                    className="btn-primary" style={{ fontSize: '13px', padding: '10px 20px' }}>
                    <HiOutlinePlus size={16} /> Add Product
                  </button>
                </div>

                {/* Product Form Modal */}
                <AnimatePresence>
                  {showProductForm && (
                    <div style={{ position: 'fixed', inset: 0, zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px', background: 'rgba(0,0,0,0.6)' }}
                      onClick={e => { if (e.target === e.currentTarget) setShowProductForm(false); }}>
                      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
                        style={{ width: '100%', maxWidth: '520px', padding: '28px', borderRadius: '20px', maxHeight: '80vh', overflow: 'auto', background: 'var(--surface)', border: '1px solid var(--border-color)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                          <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '18px' }}>
                            {editProduct ? 'Edit Product' : 'New Product'}
                          </h3>
                          <button onClick={() => setShowProductForm(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--muted)', padding: '4px' }}>
                            <HiX size={20} />
                          </button>
                        </div>
                        <form onSubmit={handleProductSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                          <input value={productForm.name} onChange={e => setProductForm(f => ({ ...f, name: e.target.value }))}
                            placeholder="Product name" className="input" required />
                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                            <select value={productForm.brand} onChange={e => setProductForm(f => ({ ...f, brand: e.target.value }))}
                              className="input">
                              {['Nike', 'Adidas', 'Jordan', 'New Balance', 'Puma', 'Converse', 'Vans', 'Reebok', 'Other'].map(b => (
                                <option key={b} value={b}>{b}</option>
                              ))}
                            </select>
                            <select value={productForm.category} onChange={e => setProductForm(f => ({ ...f, category: e.target.value }))}
                              className="input">
                              {['Running', 'Casual', 'Sports', 'Limited Edition'].map(c => (
                                <option key={c} value={c}>{c}</option>
                              ))}
                            </select>
                          </div>
                          <input type="number" value={productForm.price}
                            onChange={e => setProductForm(f => ({ ...f, price: e.target.value }))}
                            placeholder="Price" className="input" required step="0.01" />
                          <textarea value={productForm.description}
                            onChange={e => setProductForm(f => ({ ...f, description: e.target.value }))}
                            placeholder="Description" className="input" rows={3} required style={{ resize: 'vertical' }} />
                          <input value={productForm.sizes}
                            onChange={e => setProductForm(f => ({ ...f, sizes: e.target.value }))}
                            placeholder="Sizes (comma-separated)" className="input" />
                          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', cursor: 'pointer' }}>
                            <input type="checkbox" checked={productForm.featured}
                              onChange={e => setProductForm(f => ({ ...f, featured: e.target.checked }))}
                              style={{ accentColor: 'var(--accent)' }} />
                            Featured product
                          </label>
                          <div style={{ display: 'flex', gap: '12px', paddingTop: '8px' }}>
                            <button type="submit" className="btn-primary" style={{ flex: 1 }}>
                              {editProduct ? 'Update' : 'Create'}
                            </button>
                            <button type="button" onClick={() => setShowProductForm(false)}
                              className="btn-secondary" style={{ flex: 1 }}>Cancel</button>
                          </div>
                        </form>
                      </motion.div>
                    </div>
                  )}
                </AnimatePresence>

                {/* Products Table */}
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', fontSize: '14px', borderCollapse: 'collapse' }}>
                    <thead>
                      <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                        <th style={{ textAlign: 'left', padding: '12px 8px', fontWeight: 500, color: 'var(--muted)' }}>Product</th>
                        <th style={{ textAlign: 'left', padding: '12px 8px', fontWeight: 500, color: 'var(--muted)' }}>Brand</th>
                        <th style={{ textAlign: 'left', padding: '12px 8px', fontWeight: 500, color: 'var(--muted)' }}>Price</th>
                        <th style={{ textAlign: 'left', padding: '12px 8px', fontWeight: 500, color: 'var(--muted)' }}>Stock</th>
                        <th style={{ textAlign: 'right', padding: '12px 8px', fontWeight: 500, color: 'var(--muted)' }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map(p => (
                        <tr key={p._id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                          <td style={{ padding: '12px 8px' }}>
                            <p style={{ fontWeight: 500 }}>{p.name}</p>
                            <p style={{ fontSize: '12px', color: 'var(--muted)' }}>{p.category}</p>
                          </td>
                          <td style={{ padding: '12px 8px' }}>{p.brand}</td>
                          <td style={{ padding: '12px 8px', fontFamily: 'var(--font-heading)', fontWeight: 700 }}>${p.price}</td>
                          <td style={{ padding: '12px 8px' }}>{p.totalStock}</td>
                          <td style={{ padding: '12px 8px', textAlign: 'right' }}>
                            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '4px' }}>
                              <button onClick={() => {
                                setEditProduct(p);
                                setProductForm({
                                  name: p.name, brand: p.brand, price: p.price, description: p.description,
                                  category: p.category, sizes: p.sizes?.map(s => s.size).join(',') || '',
                                  featured: p.featured
                                });
                                setShowProductForm(true);
                              }} style={{ padding: '8px', borderRadius: '8px', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--foreground)', transition: 'background 0.2s' }}
                                onMouseEnter={e => e.currentTarget.style.background = 'var(--surface-hover)'}
                                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                                <HiOutlinePencil size={16} />
                              </button>
                              <button onClick={() => deleteProduct(p._id)}
                                style={{ padding: '8px', borderRadius: '8px', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-error)', transition: 'background 0.2s' }}
                                onMouseEnter={e => e.currentTarget.style.background = 'var(--surface-hover)'}
                                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                                <HiOutlineTrash size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}

            {/* Orders */}
            {tab === 'orders' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '20px', marginBottom: '24px' }}>All Orders ({orders.length})</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {orders.map(order => (
                    <div key={order._id} style={{ padding: '20px', borderRadius: '16px', background: 'var(--surface)', border: '1px solid var(--border-color)' }}>
                      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '12px', marginBottom: '12px' }}>
                        <div>
                          <p style={{ fontWeight: 500, fontSize: '14px' }}>{order.user?.name || 'Unknown'} — {order.user?.email}</p>
                          <p style={{ fontSize: '12px', color: 'var(--muted)' }}>
                            #{order._id?.slice(-8)} · {new Date(order.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '18px' }}>${order.totalPrice?.toFixed(2)}</p>
                      </div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '12px' }}>
                        <span className={`badge ${statusColors[order.paymentStatus] || ''}`}>{order.paymentStatus}</span>
                        <select value={order.deliveryStatus}
                          onChange={e => updateOrderStatus(order._id, e.target.value)}
                          className="input" style={{ width: 'auto', padding: '6px 12px', fontSize: '12px' }}>
                          <option value="processing">Processing</option>
                          <option value="shipped">Shipped</option>
                          <option value="in_transit">In Transit</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </div>
                    </div>
                  ))}
                  {orders.length === 0 && (
                    <p style={{ textAlign: 'center', padding: '40px 0', color: 'var(--muted)' }}>No orders yet</p>
                  )}
                </div>
              </motion.div>
            )}

            {/* Users */}
            {tab === 'users' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '20px', marginBottom: '24px' }}>Users ({users.length})</h2>
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', fontSize: '14px', borderCollapse: 'collapse' }}>
                    <thead>
                      <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                        <th style={{ textAlign: 'left', padding: '12px 8px', fontWeight: 500, color: 'var(--muted)' }}>User</th>
                        <th style={{ textAlign: 'left', padding: '12px 8px', fontWeight: 500, color: 'var(--muted)' }}>Email</th>
                        <th style={{ textAlign: 'left', padding: '12px 8px', fontWeight: 500, color: 'var(--muted)' }}>Role</th>
                        <th style={{ textAlign: 'left', padding: '12px 8px', fontWeight: 500, color: 'var(--muted)' }}>Joined</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map(u => (
                        <tr key={u._id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                          <td style={{ padding: '12px 8px', fontWeight: 500 }}>{u.name}</td>
                          <td style={{ padding: '12px 8px', color: 'var(--muted)' }}>{u.email}</td>
                          <td style={{ padding: '12px 8px' }}>
                            <span className={`badge ${u.role === 'admin' ? 'badge-accent' : 'badge-success'}`}>
                              {u.role}
                            </span>
                          </td>
                          <td style={{ padding: '12px 8px', color: 'var(--muted)' }}>
                            {new Date(u.createdAt).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Day 12: Dashboard stats cards
// Day 12: Order management table