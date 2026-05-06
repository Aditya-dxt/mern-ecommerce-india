'use client';
import { motion } from 'framer-motion';

const sizes = [
  { us: '6', uk: '5.5', eu: '38.5', cm: '24' },
  { us: '7', uk: '6', eu: '40', cm: '25' },
  { us: '8', uk: '7', eu: '41', cm: '26' },
  { us: '9', uk: '8', eu: '42.5', cm: '27' },
  { us: '10', uk: '9', eu: '44', cm: '28' },
  { us: '11', uk: '10', eu: '45', cm: '29' },
  { us: '12', uk: '11', eu: '46', cm: '30' },
  { us: '13', uk: '12', eu: '47.5', cm: '31' },
];

export default function SizeGuidePage() {
  return (
    <div style={{ paddingTop: 'calc(var(--navbar-height) + 48px)', paddingBottom: '80px', minHeight: '100vh' }}>
      <div className="page-container">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 56px' }}>
          <div className="section-divider" style={{ margin: '0 auto 16px' }} />
          <p style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '12px' }}>✦ Perfect Fit</p>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, marginBottom: '16px' }}>Size <span className="gradient-text">Guide</span></h1>
          <p style={{ fontSize: '15px', color: 'var(--muted)', lineHeight: 1.7 }}>Find your perfect size with our sizing chart.</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          style={{ borderRadius: '20px', overflow: 'hidden', border: '1px solid var(--border-color)', maxWidth: '700px', margin: '0 auto 56px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
            <thead>
              <tr style={{ background: 'linear-gradient(135deg, var(--gradient-start), var(--gradient-mid))' }}>
                {['US', 'UK', 'EU', 'CM'].map(h => (
                  <th key={h} style={{ padding: '14px 20px', fontWeight: 600, color: '#fff', textAlign: 'center' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sizes.map((row, i) => (
                <tr key={i} style={{ background: i % 2 === 0 ? 'var(--surface)' : 'var(--surface-hover)' }}>
                  <td style={{ padding: '12px 20px', textAlign: 'center', fontWeight: 600 }}>{row.us}</td>
                  <td style={{ padding: '12px 20px', textAlign: 'center', color: 'var(--muted)' }}>{row.uk}</td>
                  <td style={{ padding: '12px 20px', textAlign: 'center', color: 'var(--muted)' }}>{row.eu}</td>
                  <td style={{ padding: '12px 20px', textAlign: 'center', color: 'var(--muted)' }}>{row.cm}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '22px', fontWeight: 700, marginBottom: '24px', textAlign: 'center' }}>Measuring Tips</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
            {['Measure feet in the evening when they\'re largest', 'Stand with full weight on the foot', 'Wear your usual socks while measuring', 'Between sizes? Go up for comfort'].map((tip, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + i * 0.08 }}
                style={{ padding: '20px', borderRadius: '16px', background: 'var(--surface)', border: '1px solid var(--border-color)', fontSize: '14px', color: 'var(--muted)', lineHeight: 1.7 }}>
                <span style={{ color: 'var(--highlight)', fontWeight: 700, marginRight: '8px' }}>0{i + 1}</span>{tip}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
