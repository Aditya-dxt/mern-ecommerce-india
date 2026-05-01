'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { useTheme } from '@/context/ThemeContext';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { HiOutlineShoppingBag, HiOutlineUser, HiOutlineSearch, HiOutlineSun, HiOutlineMoon, HiOutlineMenu, HiOutlineX, HiOutlineCollection } from 'react-icons/hi';
import SearchBar from '../ui/SearchBar';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { cartCount } = useCart();
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenu, setUserMenu] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartBounce, setCartBounce] = useState(false);
  const menuRef = useRef(null);
  const prevCartCount = useRef(cartCount);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setUserMenu(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Bounce cart icon when count changes
  useEffect(() => {
    if (cartCount !== prevCartCount.current && cartCount > 0) {
      setCartBounce(true);
      setTimeout(() => setCartBounce(false), 500);
    }
    prevCartCount.current = cartCount;
  }, [cartCount]);

  const links = [
    { href: '/products', label: 'Products', icon: <HiOutlineCollection size={15} /> },
    { href: '/products?category=Running', label: 'Running' },
    { href: '/products?category=Limited+Edition', label: 'Limited' },
  ];

  return (
    <>
      <header
        className={scrolled ? 'glass' : ''}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
          transition: 'all 0.4s cubic-bezier(0.4,0,0.2,1)',
          padding: scrolled ? '12px 0' : '18px 0',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          background: scrolled ? 'var(--glass-bg)' : 'rgba(0,0,0,0)',
        }}>

        {/* Animated gradient bottom border on scroll */}
        {scrolled && (
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.5 }}
            style={{
              position: 'absolute', bottom: 0, left: 0, right: 0, height: '2px',
              background: 'linear-gradient(90deg, var(--gradient-start), var(--gradient-mid), var(--gradient-end))',
              transformOrigin: 'center',
            }}
          />
        )}

        <div className="page-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Logo */}
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <motion.span
              animate={{ opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                fontFamily: 'var(--font-heading)', fontSize: '20px', fontWeight: 700,
                letterSpacing: '-0.03em',
                background: 'linear-gradient(135deg, var(--foreground), var(--gradient-mid))',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
              SneakerVault
            </motion.span>
          </Link>

          {/* Desktop Nav */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: '28px' }} className="hidden md:flex">
            {links.map(link => (
              <Link key={link.href + link.label} href={link.href} className="nav-link"
                style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                {link.icon && link.icon}
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
            <motion.button
              onClick={() => setSearchOpen(!searchOpen)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              style={{ padding: '10px', borderRadius: '50%', background: 'none', border: 'none', color: 'var(--foreground)', cursor: 'pointer' }}>
              <HiOutlineSearch size={18} />
            </motion.button>

            <motion.button
              onClick={toggleTheme}
              whileHover={{ scale: 1.1, rotate: 15 }}
              whileTap={{ scale: 0.95 }}
              style={{ padding: '10px', borderRadius: '50%', background: 'none', border: 'none', color: 'var(--foreground)', cursor: 'pointer' }}>
              {theme === 'dark' ? <HiOutlineSun size={18} /> : <HiOutlineMoon size={18} />}
            </motion.button>

            <Link href="/cart" style={{ padding: '10px', borderRadius: '50%', position: 'relative', display: 'flex', alignItems: 'center' }}>
              <motion.div
                animate={cartBounce ? { scale: [1, 1.3, 0.9, 1.1, 1], rotate: [0, -10, 10, -5, 0] } : {}}
                transition={{ duration: 0.5 }}>
                <HiOutlineShoppingBag size={18} />
              </motion.div>
              {cartCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 15 }}
                  style={{
                    position: 'absolute', top: '2px', right: '2px',
                    width: '18px', height: '18px', borderRadius: '50%',
                    fontSize: '10px', fontWeight: 700,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: 'linear-gradient(135deg, var(--gradient-start), var(--gradient-end))',
                    color: '#fff',
                    boxShadow: '0 2px 8px rgba(201,149,60,0.3)',
                  }}>
                  {cartCount > 9 ? '9+' : cartCount}
                </motion.span>
              )}
            </Link>

            <div ref={menuRef} style={{ position: 'relative' }}>
              {user ? (
                <motion.button
                  onClick={() => setUserMenu(!userMenu)}
                  whileHover={{ scale: 1.05 }}
                  style={{ padding: '10px', borderRadius: '50%', background: 'none', border: 'none', color: 'var(--foreground)', cursor: 'pointer' }}>
                  <div style={{
                    width: '28px', height: '28px', borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '12px', fontWeight: 700,
                    background: 'linear-gradient(135deg, var(--gradient-start), var(--gradient-end))',
                    color: '#fff',
                    boxShadow: '0 2px 12px rgba(201,149,60,0.3)',
                  }}>
                    {user.name?.charAt(0).toUpperCase()}
                  </div>
                </motion.button>
              ) : (
                <Link href="/auth/login" style={{ padding: '10px', display: 'flex', alignItems: 'center' }}>
                  <HiOutlineUser size={18} />
                </Link>
              )}

              <AnimatePresence>
                {userMenu && user && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                      position: 'absolute', right: 0, top: '100%', marginTop: '10px',
                      width: '220px', borderRadius: '16px', overflow: 'hidden',
                      background: 'var(--surface)', border: '1px solid var(--border-color)',
                      boxShadow: '0 20px 60px var(--card-shadow)',
                      backdropFilter: 'blur(20px)',
                    }}>
                    <div style={{ padding: '16px 18px', borderBottom: '1px solid var(--border-color)', background: 'var(--accent-muted)' }}>
                      <p style={{ fontSize: '14px', fontWeight: 600 }}>{user.name}</p>
                      <p style={{ fontSize: '12px', color: 'var(--muted)', marginTop: '2px' }}>{user.email}</p>
                    </div>
                    <div style={{ padding: '6px' }}>
                      {[
                        { href: '/dashboard', label: 'Dashboard' },
                        ...(user.role === 'admin' ? [{ href: '/admin', label: 'Admin Panel' }] : []),
                      ].map(item => (
                        <Link key={item.href} href={item.href} onClick={() => setUserMenu(false)}
                          style={{ display: 'block', padding: '10px 14px', fontSize: '14px', borderRadius: '10px', transition: 'all 0.2s' }}
                          onMouseEnter={e => { e.currentTarget.style.background = 'var(--surface-hover)'; e.currentTarget.style.transform = 'translateX(4px)'; }}
                          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.transform = 'translateX(0)'; }}>
                          {item.label}
                        </Link>
                      ))}
                      <button onClick={() => { logout(); setUserMenu(false); }}
                        style={{ width: '100%', textAlign: 'left', padding: '10px 14px', fontSize: '14px', borderRadius: '10px', background: 'none', border: 'none', color: 'var(--color-error)', cursor: 'pointer', transition: 'all 0.2s' }}
                        onMouseEnter={e => { e.currentTarget.style.background = 'rgba(251,113,133,0.08)'; e.currentTarget.style.transform = 'translateX(4px)'; }}
                        onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.transform = 'translateX(0)'; }}>
                        Logout
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <motion.button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden"
              whileTap={{ scale: 0.9 }}
              style={{ padding: '10px', borderRadius: '50%', background: 'none', border: 'none', color: 'var(--foreground)', cursor: 'pointer' }}>
              {mobileOpen ? <HiOutlineX size={18} /> : <HiOutlineMenu size={18} />}
            </motion.button>
          </div>
        </div>

        <AnimatePresence>
          {searchOpen && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }} style={{ overflow: 'hidden' }}>
              <div className="page-container" style={{ paddingBottom: '16px', paddingTop: '8px' }}>
                <SearchBar onClose={() => setSearchOpen(false)} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Mobile fullscreen nav */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="md:hidden"
            style={{
              position: 'fixed', inset: 0, zIndex: 40,
              background: 'var(--background)',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '24px',
            }}>
            {/* Decorative background orbs */}
            <div style={{ position: 'absolute', top: '20%', left: '10%', width: '200px', height: '200px', borderRadius: '50%', background: 'var(--glow-cyan)', filter: 'blur(100px)', opacity: 0.1 }} />
            <div style={{ position: 'absolute', bottom: '20%', right: '10%', width: '200px', height: '200px', borderRadius: '50%', background: 'var(--glow-magenta)', filter: 'blur(100px)', opacity: 0.1 }} />

            {links.map((link, i) => (
              <motion.div key={link.href + link.label}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}>
                <Link href={link.href} onClick={() => setMobileOpen(false)}
                  style={{ fontFamily: 'var(--font-heading)', fontSize: '36px', fontWeight: 700 }}>
                  {link.label}
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ delay: 0.4 }}
              style={{ width: '60px', height: '2px', background: 'linear-gradient(90deg, var(--gradient-start), var(--gradient-end))' }} />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}>
              {!user ? (
                <Link href="/auth/login" onClick={() => setMobileOpen(false)} className="btn-primary">Sign In</Link>
              ) : (
                <button onClick={() => { logout(); setMobileOpen(false); }}
                  style={{ fontSize: '14px', color: 'var(--muted)', background: 'none', border: 'none', cursor: 'pointer' }}>
                  Logout
                </button>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
