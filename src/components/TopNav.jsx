import { useState } from 'react';
import { C, T } from '../tokens';
import { Btn } from './Btn';
import { useBreakpoint } from '../hooks/useBreakpoint';

export function TopNav({ navigate, page }) {
  const { isMobile } = useBreakpoint();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        background: 'rgba(245,240,234,0.95)', backdropFilter: 'blur(12px)',
        borderBottom: `1px solid ${C.border}`, height: 64,
        display: 'flex', alignItems: 'center',
        padding: isMobile ? '0 16px' : '0 48px',
        gap: isMobile ? 12 : 40,
      }}>
        {/* Logo */}
        <div onClick={() => navigate('landing')} style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', flexShrink: 0 }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: C.primary, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 1L1 6v9h5v-5h4v5h5V6L8 1z" fill="#fff"/>
            </svg>
          </div>
          <div>
            <div style={{ fontFamily: T.serif, fontSize: 15, fontWeight: 700, color: C.text, lineHeight: 1 }}>SPMB</div>
            <div style={{ fontFamily: T.sans, fontSize: 10, color: C.muted, letterSpacing: 0.3 }}>Universitas Nusantara</div>
          </div>
        </div>

        {/* Desktop nav links */}
        {!isMobile && (
          <div style={{ flex: 1, display: 'flex', gap: 32, alignItems: 'center' }}>
            {[['landing', 'Beranda'], ['info', 'Info Pendaftaran']].map(([id, label]) => (
              <button key={id} onClick={() => navigate(id)} style={{
                background: 'none', border: 'none', fontFamily: T.sans, fontSize: 14,
                fontWeight: page === id ? 600 : 400,
                color: page === id ? C.primary : C.textSub,
                cursor: 'pointer', padding: '4px 0',
                borderBottom: page === id ? `2px solid ${C.primary}` : '2px solid transparent',
              }}>
                {label}
              </button>
            ))}
          </div>
        )}

        {/* Desktop CTA */}
        {!isMobile && (
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <Btn variant="outline" size="sm" onClick={() => navigate('auth')}>Masuk</Btn>
            <Btn size="sm" onClick={() => navigate('auth')}>Mulai Daftar →</Btn>
          </div>
        )}

        {/* Mobile: spacer + hamburger */}
        {isMobile && (
          <>
            <div style={{ flex: 1 }} />
            <button
              onClick={() => setMenuOpen(v => !v)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: C.text, display: 'flex', alignItems: 'center', padding: 4 }}
            >
              {menuOpen ? (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
              ) : (
                <svg width="20" height="16" viewBox="0 0 20 16" fill="none"><path d="M1 1h18M1 8h18M1 15h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
              )}
            </button>
          </>
        )}
      </nav>

      {/* Mobile dropdown menu */}
      {isMobile && menuOpen && (
        <div style={{
          position: 'fixed', top: 64, left: 0, right: 0, zIndex: 99,
          background: C.card, borderBottom: `1px solid ${C.border}`,
          boxShadow: '0 8px 24px rgba(44,44,44,0.12)',
          padding: '8px 0 16px',
        }}>
          {[['landing', 'Beranda'], ['info', 'Info Pendaftaran']].map(([id, label]) => (
            <button key={id} onClick={() => { navigate(id); setMenuOpen(false); }} style={{
              width: '100%', display: 'block', textAlign: 'left',
              padding: '12px 20px', background: 'none', border: 'none',
              fontFamily: T.sans, fontSize: 15,
              fontWeight: page === id ? 600 : 400,
              color: page === id ? C.primary : C.text,
              cursor: 'pointer',
            }}>
              {label}
            </button>
          ))}
          <div style={{ display: 'flex', gap: 10, padding: '12px 20px 0' }}>
            <Btn variant="outline" size="sm" onClick={() => { navigate('auth'); setMenuOpen(false); }} style={{ flex: 1 }}>Masuk</Btn>
            <Btn size="sm" onClick={() => { navigate('auth'); setMenuOpen(false); }} style={{ flex: 1 }}>Mulai Daftar →</Btn>
          </div>
        </div>
      )}
    </>
  );
}
