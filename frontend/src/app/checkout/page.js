'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import api from '@/lib/api';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { HiArrowRight, HiArrowLeft, HiCreditCard, HiCash } from 'react-icons/hi';

export default function CheckoutPage() {
  const { cart, cartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('stripe');
  const [address, setAddress] = useState({
    street: '', city: '', state: '', zipCode: '', country: 'IND'
  });

  const shipping = cartTotal > 100 ? 0 : 9.99;
  const tax = Math.round(cartTotal * 0.08 * 100) / 100;
  const total = Math.round((cartTotal + shipping + tax) * 100) / 100;

  if (!user) {
    return (
      <div style={{ paddingTop: 'var(--navbar-height)' }}>
        <div className="page-container" style={{ paddingTop: '80px', paddingBottom: '80px', textAlign: 'center' }}>
          <div style={{ fontSize: '64px', marginBottom: '16px' }}>🔐</div>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '28px', fontWeight: 700, marginBottom: '12px' }}>Please Login to Checkout</h1>
          <p style={{ fontSize: '14px', color: 'var(--muted)', marginBottom: '24px' }}>You need to be logged in to complete your purchase.</p>
          <Link href="/auth/login" className="btn-primary" style={{ padding: '14px 36px' }}>Login</Link>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div style={{ paddingTop: 'var(--navbar-height)' }}>
        <div className="page-container" style={{ paddingTop: '80px', paddingBottom: '80px', textAlign: 'center' }}>
          <div style={{ fontSize: '64px', marginBottom: '16px' }}>🛒</div>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '28px', fontWeight: 700, marginBottom: '12px' }}>Your Cart is Empty</h1>
          <p style={{ fontSize: '14px', color: 'var(--muted)', marginBottom: '24px' }}>Add some sneakers before checking out.</p>
          <Link href="/products" className="btn-primary" style={{ padding: '14px 36px' }}>Shop Now</Link>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!address.street || !address.city || !address.state || !address.zipCode) {
      toast.error('Please fill in all address fields');
      return;
    }

    setLoading(true);
    try {
      const items = cart.map(item => ({
        product: item.product?._id || item.product,
        size: item.size,
        quantity: item.quantity,
      }));

      // Create order
      const orderRes = await api.post('/orders', { items, shippingAddress: address });
      const order = orderRes.data.data;

      if (paymentMethod === 'stripe') {
        // Create Stripe checkout session
        try {
          const payRes = await api.post('/payment/create-checkout-session', { orderId: order._id });
          if (payRes.data.data.url) {
            clearCart();
            window.location.href = payRes.data.data.url;
            return;
          }
        } catch (stripeErr) {
          console.error('Stripe session failed:', stripeErr);
          const errMsg = stripeErr.response?.data?.message || 'Payment processing failed';
          toast.error(errMsg);
          setLoading(false);
          return;
        }
      }

      // Cash on Delivery flow
      clearCart();
      toast.success('Order placed successfully!');
      router.push('/checkout/success');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Checkout failed. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div style={{ paddingTop: 'var(--navbar-height)' }}>
      <div className="page-container" style={{ paddingTop: '32px', paddingBottom: '64px' }}>
        {/* Decorative glow */}
        <div style={{ position: 'fixed', top: '10%', left: '-5%', width: '400px', height: '400px', borderRadius: '50%', background: 'var(--glow-violet)', filter: 'blur(160px)', opacity: 0.04, pointerEvents: 'none' }} />

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
          <Link href="/cart" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: 'var(--muted)', marginBottom: '24px', transition: 'color 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--highlight)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--muted)'}>
            <HiArrowLeft size={14} /> Back to Cart
          </Link>
          <div className="section-divider" />
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '32px', fontWeight: 700, marginBottom: '32px' }}>Checkout</h1>
        </motion.div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Shipping Form */}
            <div style={{ gridColumn: 'span 1' }} className="lg:col-span-2">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                style={{ padding: '28px', borderRadius: '20px', background: 'var(--surface)', border: '1px solid var(--border-color)' }}>
                <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '18px', marginBottom: '24px' }}>Shipping Address</h2>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div>
                    <label style={{ fontSize: '13px', fontWeight: 500, display: 'block', marginBottom: '6px' }}>Street Address</label>
                    <input value={address.street} onChange={e => setAddress(a => ({ ...a, street: e.target.value }))}
                      placeholder="123 Main Street" className="input" required />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={{ fontSize: '13px', fontWeight: 500, display: 'block', marginBottom: '6px' }}>City</label>
                      <input value={address.city} onChange={e => setAddress(a => ({ ...a, city: e.target.value }))}
                        placeholder="Mumbai" className="input" required />
                    </div>
                    <div>
                      <label style={{ fontSize: '13px', fontWeight: 500, display: 'block', marginBottom: '6px' }}>State</label>
                      <input value={address.state} onChange={e => setAddress(a => ({ ...a, state: e.target.value }))}
                        placeholder="New Delhi" className="input" required />
                    </div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={{ fontSize: '13px', fontWeight: 500, display: 'block', marginBottom: '6px' }}>ZIP Code</label>
                      <input value={address.zipCode} onChange={e => setAddress(a => ({ ...a, zipCode: e.target.value }))}
                        placeholder="10001" className="input" required />
                    </div>
                    <div>
                      <label style={{ fontSize: '13px', fontWeight: 500, display: 'block', marginBottom: '6px' }}>Country</label>
                      <select value={address.country} onChange={e => setAddress(a => ({ ...a, country: e.target.value }))}
                        className="input">
                        <option value="IND">India</option>
                        <option value="CA">Canada</option>
                        <option value="UK">United Kingdom</option>
                      </select>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Payment Method Selection */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                style={{ padding: '28px', borderRadius: '20px', marginTop: '20px', background: 'var(--surface)', border: '1px solid var(--border-color)' }}>
                <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '18px', marginBottom: '20px' }}>Payment Method</h2>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {/* Stripe Option */}
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => setPaymentMethod('stripe')}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '16px',
                      padding: '18px 20px', borderRadius: '14px', cursor: 'pointer',
                      background: paymentMethod === 'stripe'
                        ? 'linear-gradient(135deg, rgba(139, 92, 246, 0.08), rgba(99, 102, 241, 0.08))'
                        : 'transparent',
                      border: `1.5px solid ${paymentMethod === 'stripe' ? 'var(--highlight)' : 'var(--border-color)'}`,
                      color: 'var(--foreground)',
                      transition: 'all 0.25s ease',
                      textAlign: 'left',
                      boxShadow: paymentMethod === 'stripe' ? '0 0 20px rgba(139, 92, 246, 0.1)' : 'none',
                    }}
                  >
                    <div style={{
                      width: '20px', height: '20px', borderRadius: '50%',
                      border: `2px solid ${paymentMethod === 'stripe' ? 'var(--highlight)' : 'var(--border-color)'}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0, transition: 'all 0.25s ease',
                    }}>
                      <AnimatePresence>
                        {paymentMethod === 'stripe' && (
                          <motion.div
                            initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                            style={{
                              width: '10px', height: '10px', borderRadius: '50%',
                              background: 'var(--highlight)',
                            }}
                          />
                        )}
                      </AnimatePresence>
                    </div>
                    <div style={{
                      width: '44px', height: '44px', borderRadius: '12px',
                      background: 'linear-gradient(135deg, #635BFF, #7C3AED)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0,
                    }}>
                      <HiCreditCard size={22} color="#fff" />
                    </div>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontWeight: 600, fontSize: '14px', marginBottom: '2px' }}>Pay with Card</p>
                      <p style={{ fontSize: '12px', color: 'var(--muted)' }}>Secure payment via Stripe — Visa, Mastercard, etc.</p>
                    </div>
                  </motion.button>

                  {/* COD Option */}
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => setPaymentMethod('cod')}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '16px',
                      padding: '18px 20px', borderRadius: '14px', cursor: 'pointer',
                      background: paymentMethod === 'cod'
                        ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.08), rgba(52, 211, 153, 0.08))'
                        : 'transparent',
                      border: `1.5px solid ${paymentMethod === 'cod' ? '#10b981' : 'var(--border-color)'}`,
                      color: 'var(--foreground)',
                      transition: 'all 0.25s ease',
                      textAlign: 'left',
                      boxShadow: paymentMethod === 'cod' ? '0 0 20px rgba(16, 185, 129, 0.1)' : 'none',
                    }}
                  >
                    <div style={{
                      width: '20px', height: '20px', borderRadius: '50%',
                      border: `2px solid ${paymentMethod === 'cod' ? '#10b981' : 'var(--border-color)'}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0, transition: 'all 0.25s ease',
                    }}>
                      <AnimatePresence>
                        {paymentMethod === 'cod' && (
                          <motion.div
                            initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                            style={{
                              width: '10px', height: '10px', borderRadius: '50%',
                              background: '#10b981',
                            }}
                          />
                        )}
                      </AnimatePresence>
                    </div>
                    <div style={{
                      width: '44px', height: '44px', borderRadius: '12px',
                      background: 'linear-gradient(135deg, #10b981, #34d399)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0,
                    }}>
                      <HiCash size={22} color="#fff" />
                    </div>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontWeight: 600, fontSize: '14px', marginBottom: '2px' }}>Cash on Delivery</p>
                      <p style={{ fontSize: '12px', color: 'var(--muted)' }}>Pay when your order arrives at your doorstep</p>
                    </div>
                  </motion.button>
                </div>

                {/* Stripe test card info */}
                <AnimatePresence>
                  {paymentMethod === 'stripe' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                      style={{ overflow: 'hidden' }}
                    >
                      <div style={{
                        marginTop: '16px', padding: '14px 18px', borderRadius: '12px',
                        fontSize: '13px', background: 'var(--accent-muted)', color: 'var(--accent)',
                        lineHeight: 1.6,
                      }}>
                        💳 You&apos;ll be redirected to Stripe for secure payment processing.
                        <br />
                        <span style={{ fontSize: '12px', opacity: 0.8 }}>Test card: 4242 4242 4242 4242 | Any future date | Any CVC</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>

            {/* Order Summary */}
            <div>
              <div style={{
                position: 'sticky', top: '100px', padding: '28px', borderRadius: '20px',
                background: 'var(--surface)', border: '1px solid var(--border-color)',
              }}>
                <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '18px', marginBottom: '20px' }}>Order Summary</h2>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
                  {cart.map(item => (
                    <div key={item._id} style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '13px' }}>
                      {/* Thumbnail */}
                      <div style={{
                        width: '44px', height: '44px', borderRadius: '10px', flexShrink: 0,
                        overflow: 'hidden', background: '#0d0d0f',
                        border: '1px solid var(--border-color)',
                      }}>
                        {item.product?.images?.[0] ? (
                          <img src={item.product.images[0]} alt={item.product?.name}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        ) : (
                          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>👟</div>
                        )}
                      </div>
                      <span style={{ color: 'var(--muted)', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {item.product?.name} × {item.quantity}
                      </span>
                      <span style={{ fontWeight: 500, flexShrink: 0 }}>${((item.product?.price || 0) * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, var(--border-color), transparent)', marginBottom: '16px' }} />

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--muted)' }}>Subtotal</span>
                    <span>${cartTotal.toFixed(2)}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--muted)' }}>Shipping</span>
                    <span>{shipping === 0 ? <span style={{ color: 'var(--color-success)', fontWeight: 600 }}>FREE</span> : `$${shipping}`}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--muted)' }}>Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div style={{ height: '1px', background: 'var(--border-color)' }} />
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: '18px' }}>
                    <span>Total</span>
                    <span className="gradient-text" style={{ fontFamily: 'var(--font-heading)' }}>${total.toFixed(2)}</span>
                  </div>
                </div>

                <button type="submit" className="btn-primary" disabled={loading}
                  style={{ width: '100%', marginTop: '24px', fontSize: '15px', padding: '16px' }}>
                  {loading ? 'Processing...' : paymentMethod === 'stripe' ? `Pay $${total.toFixed(2)}` : `Place Order — $${total.toFixed(2)}`} <HiArrowRight />
                </button>

                {/* Security badge */}
                <div style={{
                  marginTop: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  gap: '6px', fontSize: '11px', color: 'var(--muted)',
                }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                  Secure checkout — SSL encrypted
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

// Day 14: Payment method selector UI
// Day 14: Animated radio buttons
// Day 14: Stripe redirect implementation
// Day 14: COD order flow
// Day 14: Test card info banner
// Day 14: SSL badge and thumbnails