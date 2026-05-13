'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { HiMinus, HiPlus, HiOutlineTrash, HiArrowRight } from 'react-icons/hi';

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, cartTotal } = useCart();
  const shipping = cartTotal > 100 ? 0 : 9.99;
  const tax = Math.round(cartTotal * 0.08 * 100) / 100;
  const total = Math.round((cartTotal + shipping + tax) * 100) / 100;
  const freeShippingProgress = Math.min((cartTotal / 100) * 100, 100);

  if (cart.length === 0) {
    return (
      <div style={{ paddingTop: 'var(--navbar-height)' }}>
        <div className="page-container" style={{ paddingTop: '80px', paddingBottom: '80px', textAlign: 'center' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <motion.p
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2.5, repeat: Infinity }}
              style={{ fontSize: '64px', marginBottom: '24px' }}>🛒</motion.p>
            <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '32px', fontWeight: 700, marginBottom: '12px' }}>Your Cart is Empty</h1>
            <p style={{ fontSize: '14px', color: 'var(--muted)', marginBottom: '36px' }}>Looks like you haven&apos;t added anything yet.</p>
            <Link href="/products" className="btn-primary" style={{ fontSize: '15px', padding: '16px 40px' }}>Start Shopping</Link>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ paddingTop: 'var(--navbar-height)' }}>
      <div className="page-container" style={{ paddingTop: '32px', paddingBottom: '64px' }}>
        {/* Decorative glow */}
        <div style={{ position: 'fixed', top: '20%', right: '-5%', width: '400px', height: '400px', borderRadius: '50%', background: 'var(--glow-violet)', filter: 'blur(160px)', opacity: 0.04, pointerEvents: 'none' }} />

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
          <div className="section-divider" />
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '32px', fontWeight: 700, marginBottom: '32px' }}>
            Shopping Cart <span style={{ color: 'var(--muted)', fontWeight: 400, fontSize: '20px' }}>({cart.length})</span>
          </h1>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8">
          {/* Items */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {cart.map((item, i) => (
              <motion.div key={item._id}
                initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ scale: 1.01 }}
                style={{
                  display: 'flex', gap: '18px', padding: '20px', borderRadius: '18px',
                  background: 'var(--surface)', border: '1px solid var(--border-color)',
                  transition: 'box-shadow 0.3s',
                }}
                onMouseEnter={e => e.currentTarget.style.boxShadow = '0 8px 32px var(--card-shadow)'}
                onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}>
                <Link href={`/products/${item.product?._id || item.product}`} style={{
                  width: '100px', height: '100px', borderRadius: '14px', flexShrink: 0,
                  background: '#0d0d0f',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  position: 'relative', overflow: 'hidden',
                  border: '1px solid var(--border-color)',
                }}>
                  {item.product?.images?.[0] ? (
                    <img
                      src={item.product.images[0]}
                      alt={item.product?.name || 'Product'}
                      style={{
                        width: '100%', height: '100%', objectFit: 'cover',
                        borderRadius: '13px',
                        transition: 'transform 0.3s ease',
                      }}
                      onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.08)'}
                      onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                    />
                  ) : (
                    <>
                      <div style={{
                        position: 'absolute', width: '50%', height: '50%', borderRadius: '50%',
                        background: 'linear-gradient(135deg, var(--glow-cyan), var(--glow-violet))',
                        filter: 'blur(20px)', opacity: 0.15,
                      }} />
                      <span style={{ fontSize: '40px', position: 'relative', zIndex: 1 }}>👟</span>
                    </>
                  )}
                </Link>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: '8px' }}>
                    <div>
                      <p style={{ fontSize: '10px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--muted)' }}>{item.product?.brand}</p>
                      <Link href={`/products/${item.product?._id || item.product}`} style={{ fontSize: '15px', fontWeight: 600, marginTop: '3px', display: 'block' }}
                        onMouseEnter={e => e.currentTarget.style.color = 'var(--highlight)'}
                        onMouseLeave={e => e.currentTarget.style.color = 'var(--foreground)'}>{item.product?.name}</Link>
                      <p style={{ fontSize: '12px', color: 'var(--muted)', marginTop: '4px' }}>Size: {item.size}</p>
                    </div>
                    <p className="gradient-text" style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '16px', flexShrink: 0 }}>
                      ${((item.product?.price || 0) * item.quantity).toFixed(2)}
                    </p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '14px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--border-color)', borderRadius: '10px', overflow: 'hidden' }}>
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() => updateQuantity(item._id, item.quantity - 1)} disabled={item.quantity <= 1}
                        style={{ width: '34px', height: '34px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--foreground)', opacity: item.quantity <= 1 ? 0.3 : 1 }}>
                        <HiMinus size={13} />
                      </motion.button>
                      <span style={{ width: '36px', textAlign: 'center', fontSize: '13px', fontWeight: 600 }}>{item.quantity}</span>
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() => updateQuantity(item._id, item.quantity + 1)}
                        style={{ width: '34px', height: '34px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--foreground)' }}>
                        <HiPlus size={13} />
                      </motion.button>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05, color: 'var(--color-error)' }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => removeFromCart(item._id)}
                      style={{ fontSize: '13px', color: 'var(--muted)', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', transition: 'color 0.2s' }}>
                      <HiOutlineTrash size={14} /> Remove
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Summary */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              style={{
                position: 'sticky', top: '100px', padding: '28px', borderRadius: '20px',
                background: 'var(--surface)', border: '1px solid var(--border-color)',
              }}>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '20px', marginBottom: '24px' }}>Order Summary</h2>

              {/* Free shipping progress */}
              {cartTotal < 100 && (
                <div style={{ marginBottom: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <p style={{ fontSize: '12px', color: 'var(--muted)' }}>Free shipping progress</p>
                    <p style={{ fontSize: '12px', fontWeight: 600 }}>${(100 - cartTotal).toFixed(2)} away</p>
                  </div>
                  <div className="progress-bar">
                    <motion.div
                      className="progress-bar-fill"
                      initial={{ width: '0%' }}
                      animate={{ width: `${freeShippingProgress}%` }}
                      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    />
                  </div>
                </div>
              )}
              {cartTotal >= 100 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  style={{
                    marginBottom: '20px', padding: '10px 14px', borderRadius: '10px',
                    background: 'rgba(52,211,153,0.08)', border: '1px solid rgba(52,211,153,0.15)',
                    fontSize: '13px', color: 'var(--color-success)', fontWeight: 500,
                    textAlign: 'center',
                  }}>
                  🎉 You qualify for free shipping!
                </motion.div>
              )}

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '14px' }}>
                <SummaryRow label="Subtotal" value={`$${cartTotal.toFixed(2)}`} />
                <SummaryRow label="Shipping" value={shipping === 0 ? <span style={{ color: 'var(--color-success)', fontWeight: 600 }}>FREE</span> : `$${shipping}`} />
                <SummaryRow label="Tax" value={`$${tax.toFixed(2)}`} />
                <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, var(--border-color), transparent)' }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: '18px' }}>
                  <span>Total</span>
                  <span className="gradient-text" style={{ fontFamily: 'var(--font-heading)' }}>${total.toFixed(2)}</span>
                </div>
              </div>
              <Link href="/checkout" className="btn-primary" style={{ width: '100%', marginTop: '24px', fontSize: '15px', padding: '16px' }}>
                Checkout <HiArrowRight />
              </Link>
              <Link href="/products" style={{ display: 'block', textAlign: 'center', fontSize: '13px', color: 'var(--muted)', marginTop: '14px', transition: 'color 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--highlight)'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--muted)'}>
                Continue Shopping
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SummaryRow({ label, value }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <span style={{ color: 'var(--muted)' }}>{label}</span>
      <span>{value}</span>
    </div>
  );
}

// Day 10: Added free shipping progress bar
// Day 10: Added quantity validation against stock