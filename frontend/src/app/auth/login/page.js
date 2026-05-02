'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import toast from 'react-hot-toast';
import { HiOutlineEye, HiOutlineEyeOff } from 'react-icons/hi';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      toast.success('Welcome back!');
      router.push('/');
    } catch (err) { toast.error(err.response?.data?.message || 'Login failed'); }
    setLoading(false);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: 'calc(var(--navbar-height) + 24px)', paddingBottom: '40px', paddingLeft: '20px', paddingRight: '20px', position: 'relative', overflow: 'hidden' }}>

      {/* Animated gradient mesh background */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
        <motion.div
          animate={{ x: [0, 60, -40, 0], y: [0, -40, 30, 0], scale: [1, 1.1, 0.9, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
          style={{ position: 'absolute', top: '-20%', right: '-10%', width: '600px', height: '600px', borderRadius: '50%', background: 'var(--glow-cyan)', filter: 'blur(160px)', opacity: 0.1 }}
        />
        <motion.div
          animate={{ x: [0, -50, 40, 0], y: [0, 30, -40, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
          style={{ position: 'absolute', bottom: '-10%', left: '-10%', width: '500px', height: '500px', borderRadius: '50%', background: 'var(--glow-magenta)', filter: 'blur(140px)', opacity: 0.08 }}
        />
        <motion.div
          animate={{ x: [0, 30, -20, 0], y: [0, -30, 20, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          style={{ position: 'absolute', top: '30%', left: '30%', width: '400px', height: '400px', borderRadius: '50%', background: 'var(--glow-violet)', filter: 'blur(120px)', opacity: 0.06 }}
        />

        {/* Floating particles */}
        {mounted && [...Array(12)].map((_, i) => (
          <motion.div key={i}
            animate={{ y: [0, -600], opacity: [0, 0.5, 0] }}
            transition={{ duration: 6 + Math.random() * 4, repeat: Infinity, delay: Math.random() * 6, ease: 'linear' }}
            style={{
              position: 'absolute', bottom: '-10px',
              left: `${Math.random() * 100}%`,
              width: `${2 + Math.random() * 2}px`, height: `${2 + Math.random() * 2}px`,
              borderRadius: '50%', background: `var(--glow-${['cyan', 'violet', 'magenta'][Math.floor(Math.random() * 3)]})`,
            }}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        style={{
          width: '100%', maxWidth: '380px', position: 'relative', zIndex: 1,
        }}>
        {/* Gradient border wrapper */}
        <div style={{
          padding: '1px', borderRadius: '20px',
          background: 'linear-gradient(135deg, var(--glow-cyan), var(--glow-violet), var(--glow-magenta))',
          backgroundSize: '200% 200%',
          animation: 'gradient-shift 4s ease infinite',
        }}>
          <div style={{
            padding: '32px 28px', borderRadius: '19px',
            background: 'var(--surface)',
            backdropFilter: 'blur(20px)',
          }}>
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <Link href="/" className="gradient-text" style={{ fontFamily: 'var(--font-heading)', fontSize: '16px', fontWeight: 700, letterSpacing: '-0.02em', display: 'block', marginBottom: '16px' }}>
                SneakerVault
              </Link>
              <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '22px', fontWeight: 700, marginBottom: '6px' }}>Welcome Back</h1>
              <p style={{ fontSize: '12px', color: 'var(--muted)' }}>Sign in to your account</p>
            </div>

            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '14px' }}>
                <label style={{ fontSize: '12px', fontWeight: 500, display: 'block', marginBottom: '6px' }}>Email</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                  placeholder="you@example.com" className="input" style={{ padding: '10px 14px', fontSize: '13px' }} required />
              </div>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ fontSize: '12px', fontWeight: 500, display: 'block', marginBottom: '6px' }}>Password</label>
                <div style={{ position: 'relative' }}>
                  <input type={showPw ? 'text' : 'password'} value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="••••••••" className="input" style={{ paddingRight: '40px', padding: '10px 14px', fontSize: '13px' }} required />
                  <button type="button" onClick={() => setShowPw(!showPw)}
                    style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--muted)', cursor: 'pointer' }}>
                    {showPw ? <HiOutlineEyeOff size={15} /> : <HiOutlineEye size={15} />}
                  </button>
                </div>
              </div>
              <motion.button
                type="submit" className="btn-primary" style={{ width: '100%', fontSize: '14px', padding: '12px' }}
                disabled={loading}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}>
                {loading ? (
                  <motion.span animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}>⟳</motion.span>
                ) : 'Sign In'}
              </motion.button>
            </form>

            <p style={{ textAlign: 'center', fontSize: '12px', color: 'var(--muted)', marginTop: '18px' }}>
              Don&apos;t have an account?{' '}
              <Link href="/auth/signup" className="gradient-text" style={{ fontWeight: 600 }}>Sign Up</Link>
            </p>

            <div style={{
              marginTop: '16px', padding: '10px 14px', borderRadius: '10px',
              fontSize: '11px', textAlign: 'center',
              background: 'var(--accent-muted)', color: 'var(--muted)',
              border: '1px solid var(--border-color)',
            }}>
              Demo: admin@sneakervault.com / admin123
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
