'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import toast from 'react-hot-toast';
import { HiOutlineEye, HiOutlineEyeOff } from 'react-icons/hi';

export default function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password.length < 6) { toast.error('Password must be at least 6 characters'); return; }
    setLoading(true);
    try {
      await register(name, email, password);
      toast.success('Account created!');
      router.push('/');
    } catch (err) { toast.error(err.response?.data?.message || 'Registration failed'); }
    setLoading(false);
  };

  // Password strength
  const getStrength = () => {
    if (!password) return { level: 0, label: '', color: 'var(--border-color)' };
    let score = 0;
    if (password.length >= 6) score++;
    if (password.length >= 10) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^a-zA-Z0-9]/.test(password)) score++;
    if (score <= 2) return { level: score, label: 'Weak', color: 'var(--color-error)' };
    if (score <= 3) return { level: score, label: 'Medium', color: 'var(--color-warning)' };
    return { level: score, label: 'Strong', color: 'var(--color-success)' };
  };
  const strength = getStrength();

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: 'calc(var(--navbar-height) + 24px)', paddingBottom: '40px', paddingLeft: '20px', paddingRight: '20px', position: 'relative', overflow: 'hidden' }}>

      {/* Animated gradient mesh background */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
        <motion.div
          animate={{ x: [0, -50, 40, 0], y: [0, 30, -40, 0], scale: [1, 1.1, 0.9, 1] }}
          transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
          style={{ position: 'absolute', top: '-20%', left: '-10%', width: '600px', height: '600px', borderRadius: '50%', background: 'var(--glow-violet)', filter: 'blur(160px)', opacity: 0.1 }}
        />
        <motion.div
          animate={{ x: [0, 50, -40, 0], y: [0, -30, 40, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
          style={{ position: 'absolute', bottom: '-10%', right: '-10%', width: '500px', height: '500px', borderRadius: '50%', background: 'var(--glow-cyan)', filter: 'blur(140px)', opacity: 0.08 }}
        />
        <motion.div
          animate={{ x: [0, -25, 15, 0], y: [0, 20, -30, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          style={{ position: 'absolute', top: '40%', right: '30%', width: '350px', height: '350px', borderRadius: '50%', background: 'var(--glow-magenta)', filter: 'blur(120px)', opacity: 0.06 }}
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
          background: 'linear-gradient(135deg, var(--glow-violet), var(--glow-magenta), var(--glow-cyan))',
          backgroundSize: '200% 200%',
          animation: 'gradient-shift 4s ease infinite',
        }}>
          <div style={{
            padding: '28px 28px', borderRadius: '19px',
            background: 'var(--surface)',
            backdropFilter: 'blur(20px)',
          }}>
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <Link href="/" className="gradient-text" style={{ fontFamily: 'var(--font-heading)', fontSize: '16px', fontWeight: 700, letterSpacing: '-0.02em', display: 'block', marginBottom: '14px' }}>
                SneakerVault
              </Link>
              <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '22px', fontWeight: 700, marginBottom: '6px' }}>Create Account</h1>
              <p style={{ fontSize: '12px', color: 'var(--muted)' }}>Join the SneakerVault community</p>
            </div>

            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '12px' }}>
                <label style={{ fontSize: '12px', fontWeight: 500, display: 'block', marginBottom: '5px' }}>Full Name</label>
                <input type="text" value={name} onChange={e => setName(e.target.value)}
                  placeholder="John Doe" className="input" style={{ padding: '10px 14px', fontSize: '13px' }} required />
              </div>
              <div style={{ marginBottom: '12px' }}>
                <label style={{ fontSize: '12px', fontWeight: 500, display: 'block', marginBottom: '5px' }}>Email</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                  placeholder="you@example.com" className="input" style={{ padding: '10px 14px', fontSize: '13px' }} required />
              </div>
              <div style={{ marginBottom: '6px' }}>
                <label style={{ fontSize: '12px', fontWeight: 500, display: 'block', marginBottom: '5px' }}>Password</label>
                <div style={{ position: 'relative' }}>
                  <input type={showPw ? 'text' : 'password'} value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Min 6 characters" className="input" style={{ paddingRight: '40px', padding: '10px 14px', fontSize: '13px' }} required minLength={6} />
                  <button type="button" onClick={() => setShowPw(!showPw)}
                    style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--muted)', cursor: 'pointer' }}>
                    {showPw ? <HiOutlineEyeOff size={15} /> : <HiOutlineEye size={15} />}
                  </button>
                </div>
              </div>

              {/* Password strength indicator */}
              {password && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  style={{ marginBottom: '14px' }}>
                  <div style={{ display: 'flex', gap: '4px', marginBottom: '4px' }}>
                    {[1, 2, 3, 4, 5].map(i => (
                      <motion.div key={i}
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: i <= strength.level ? 1 : 0.3 }}
                        transition={{ duration: 0.3, delay: i * 0.05 }}
                        style={{
                          flex: 1, height: '3px', borderRadius: '2px',
                          background: i <= strength.level ? strength.color : 'var(--border-color)',
                          transformOrigin: 'left',
                        }} />
                    ))}
                  </div>
                  <p style={{ fontSize: '10px', color: strength.color, fontWeight: 500 }}>{strength.label}</p>
                </motion.div>
              )}

              {!password && <div style={{ marginBottom: '14px' }} />}

              <motion.button
                type="submit" className="btn-primary" style={{ width: '100%', fontSize: '14px', padding: '12px' }}
                disabled={loading}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}>
                {loading ? (
                  <motion.span animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}>⟳</motion.span>
                ) : 'Create Account'}
              </motion.button>
            </form>

            <p style={{ textAlign: 'center', fontSize: '12px', color: 'var(--muted)', marginTop: '16px' }}>
              Already have an account?{' '}
              <Link href="/auth/login" className="gradient-text" style={{ fontWeight: 600 }}>Sign In</Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
