import { C, T } from '../tokens';
import { Btn } from './Btn';

export function TopNav({ navigate, page }) {
  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      background: 'rgba(250,247,242,0.95)', backdropFilter: 'blur(12px)',
      borderBottom: `1px solid ${C.border}`, height: 64,
      display: 'flex', alignItems: 'center', padding: '0 48px', gap: 40,
    }}>
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

      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <Btn variant="outline" size="sm" onClick={() => navigate('auth')}>Masuk</Btn>
        <Btn size="sm" onClick={() => navigate('auth')}>Mulai Daftar →</Btn>
      </div>
    </nav>
  );
}
