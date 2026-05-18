'use client';
import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import api from '@/lib/api';
import { useCart } from '@/context/CartContext';

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const { clearCart } = useCart();
  const [verifying, setVerifying] = useState(true);
  const [verified, setVerified] = useState(false);
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const verifyPayment = async () => {
      if (!sessionId) {
        setVerifying(false);
        setVerified(true); // COD orders won't have session_id
        return;
      }

      try {
        const res = await api.get(`/payment/verify?sessionId=${sessionId}`);
        if (res.data.data.paymentStatus === 'paid') {
          setVerified(true);
          setOrder(res.data.data.order);
        }
      } catch (err) {
        console.error('Payment verification failed:', err);
      }
      setVerifying(false);
    };

    // Clear cart on success page load
    clearCart();
    verifyPayment();
  }, [sessionId]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div style={{ paddingTop: 'var(--navbar-height)' }}>
      <div className="page-container" style={{ paddingTop: '80px', paddingBottom: '80px', textAlign: 'center' }}>
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
          {verifying ? (
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                style={{
                  width: '48px', height: '48px', margin: '0 auto 24px',
                  border: '3px solid var(--border-color)',
                  borderTopColor: 'var(--highlight)',
                  borderRadius: '50%',
                }}
              />
              <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '24px', fontWeight: 700, marginBottom: '12px' }}>
                Verifying Payment...
              </h1>
              <p style={{ fontSize: '14px', color: 'var(--muted)' }}>
                Please wait while we confirm your payment.
              </p>
            </>
          ) : (
            <>
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{ fontSize: '72px', marginBottom: '24px' }}>
                {verified ? '🎉' : '⚠️'}
              </motion.div>

              <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '32px', fontWeight: 700, marginBottom: '12px' }}>
                {verified ? 'Order Confirmed!' : 'Order Placed'}
              </h1>

              <p style={{
                fontSize: '14px', color: 'var(--muted)', marginBottom: '12px',
                maxWidth: '420px', margin: '0 auto 12px', lineHeight: 1.7,
              }}>
                {verified
                  ? 'Thank you for your purchase! Your payment has been confirmed and your order is being processed.'
                  : 'Your order has been placed. Payment verification is in progress — it will update shortly.'}
              </p>

              {/* Payment confirmation badge */}
              {verified && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '8px',
                    padding: '10px 20px', borderRadius: '12px',
                    background: 'rgba(16, 185, 129, 0.08)',
                    border: '1px solid rgba(16, 185, 129, 0.15)',
                    color: '#10b981', fontSize: '14px', fontWeight: 600,
                    marginBottom: '32px',
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  Payment Confirmed
                </motion.div>
              )}

              {order && (
                <p style={{ fontSize: '13px', color: 'var(--muted)', marginBottom: '24px' }}>
                  Order Total: <span style={{ fontWeight: 700, color: 'var(--foreground)' }}>${order.totalPrice?.toFixed(2)}</span>
                </p>
              )}

              <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginTop: '8px' }}>
                <Link href="/dashboard?tab=orders" className="btn-primary">View Orders</Link>
                <Link href="/products" className="btn-secondary">Continue Shopping</Link>
              </div>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={<div style={{ paddingTop: 'var(--navbar-height)' }}><div className="page-container" style={{ padding: '80px 0', textAlign: 'center' }}>Loading...</div></div>}>
      <SuccessContent />
    </Suspense>
  );
}

// Day 14: Automatic payment verification