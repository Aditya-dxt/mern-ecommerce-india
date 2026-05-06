'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { HiMail, HiLocationMarker, HiPhone } from 'react-icons/hi';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success('Message sent! We\'ll get back to you shortly.');
    setForm({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div style={{ paddingTop: 'calc(var(--navbar-height) + 48px)', paddingBottom: '80px', minHeight: '100vh' }}>
      <div className="page-container">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 56px' }}>
          <div className="section-divider" style={{ margin: '0 auto 16px' }} />
          <p style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '12px' }}>✦ Get in Touch</p>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, marginBottom: '16px' }}>
            Contact <span className="gradient-text">Us</span>
          </h1>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '32px', maxWidth: '900px', margin: '0 auto' }} className="contact-grid">
          {/* Info Cards */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {[
              { icon: <HiMail size={20} />, label: 'Email', value: 'support@sneakervault.com' },
              { icon: <HiPhone size={20} />, label: 'Phone', value: '+1 (555) 123-4567' },
              { icon: <HiLocationMarker size={20} />, label: 'Location', value: 'New York, NY 10001' },
            ].map((item, i) => (
              <div key={i} style={{ padding: '24px', borderRadius: '16px', background: 'var(--surface)', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'linear-gradient(135deg, var(--gradient-start), var(--gradient-mid))', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', flexShrink: 0 }}>
                  {item.icon}
                </div>
                <div>
                  <p style={{ fontSize: '12px', color: 'var(--muted)', fontWeight: 500 }}>{item.label}</p>
                  <p style={{ fontSize: '14px', fontWeight: 600 }}>{item.value}</p>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Form */}
          <motion.form onSubmit={handleSubmit} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}
            style={{ padding: '32px', borderRadius: '20px', background: 'var(--surface)', border: '1px solid var(--border-color)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
              <div>
                <label style={{ fontSize: '12px', fontWeight: 500, display: 'block', marginBottom: '5px' }}>Name</label>
                <input className="input" style={{ padding: '10px 14px', fontSize: '13px' }} value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
              </div>
              <div>
                <label style={{ fontSize: '12px', fontWeight: 500, display: 'block', marginBottom: '5px' }}>Email</label>
                <input className="input" type="email" style={{ padding: '10px 14px', fontSize: '13px' }} value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
              </div>
            </div>
            <div style={{ marginBottom: '14px' }}>
              <label style={{ fontSize: '12px', fontWeight: 500, display: 'block', marginBottom: '5px' }}>Subject</label>
              <input className="input" style={{ padding: '10px 14px', fontSize: '13px' }} value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })} required />
            </div>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ fontSize: '12px', fontWeight: 500, display: 'block', marginBottom: '5px' }}>Message</label>
              <textarea className="input" rows={4} style={{ padding: '10px 14px', fontSize: '13px', resize: 'vertical' }} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} required />
            </div>
            <button type="submit" className="btn-primary" style={{ width: '100%', padding: '12px', fontSize: '14px' }}>Send Message</button>
          </motion.form>
        </div>

        <style jsx>{`
          @media (max-width: 768px) {
            .contact-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </div>
    </div>
  );
}
