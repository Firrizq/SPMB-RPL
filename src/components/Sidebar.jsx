import { C, T } from '../tokens';

export function Sidebar({ navigate, page, registrationStep, onLogout }) {
  const navItems = [
    {
      id: 'dashboard', label: 'Beranda',
      icon: <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M2 7.5L9 2l7 5.5V16a1 1 0 01-1 1H3a1 1 0 01-1-1V7.5z" stroke="currentColor" strokeWidth="1.7" fill="none" strokeLinejoin="round"/><path d="M6 17v-5h6v5" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round"/></svg>,
    },
    {
      id: 'info', label: 'Info Pendaftaran',
      icon: <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="7.5" stroke="currentColor" strokeWidth="1.7"/><path d="M9 8.5v4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/><circle cx="9" cy="6" r="1.1" fill="currentColor"/></svg>,
    },
    {
      id: 'form', label: 'Formulir Data Diri',
      icon: <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><rect x="2" y="1.5" width="11" height="15" rx="2" stroke="currentColor" strokeWidth="1.7"/><path d="M5.5 6h6M5.5 9.5h4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>,
    },
    {
      id: 'upload', label: 'Upload Dokumen',
      icon: <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M9 13V6m0 0L6 9m3-3l3 3" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/><path d="M16 12.5A4 4 0 0013 6h-.5A5.5 5.5 0 002.5 12" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/></svg>,
    },
    {
      id: 'payment', label: 'Pembayaran',
      icon: <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><rect x="1.5" y="3.5" width="15" height="11" rx="2.5" stroke="currentColor" strokeWidth="1.7"/><path d="M1.5 7.5h15" stroke="currentColor" strokeWidth="1.7"/><path d="M5 11.5h2M11 11.5h2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/></svg>,
    },
    {
      id: 'status', label: 'Status & Pengumuman',
      icon: <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="7.5" stroke="currentColor" strokeWidth="1.7"/><path d="M9 5.5V9.5l2.5 2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/></svg>,
    },
  ];

  const stepDone = (i) => i < registrationStep;
  const stepActive = (i) => i === registrationStep;

  return (
    <div style={{
      width: 256, flexShrink: 0, height: '100vh', position: 'fixed', left: 0, top: 0,
      background: C.sidebar, display: 'flex', flexDirection: 'column', zIndex: 50, overflow: 'hidden',
    }}>
      {/* Logo */}
      <div style={{ padding: '24px 20px 20px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: C.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M9 1L1 7v10h5v-6h6v6h5V7L9 1z" fill="#fff"/></svg>
          </div>
          <div>
            <div style={{ fontFamily: T.serif, fontSize: 15, fontWeight: 700, color: '#fff', lineHeight: 1 }}>SPMB 2026</div>
            <div style={{ fontFamily: T.sans, fontSize: 10, color: 'rgba(255,255,255,0.45)', marginTop: 2 }}>Universitas Nusantara</div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '12px 12px 0' }}>
        <div style={{ fontFamily: T.sans, fontSize: 10, fontWeight: 600, color: 'rgba(255,255,255,0.3)', letterSpacing: 1, padding: '8px 8px', marginBottom: 4 }}>
          MENU UTAMA
        </div>
        {navItems.slice(0, 2).map(item => {
          const active = page === item.id;
          return (
            <button key={item.id} onClick={() => navigate(item.id)} style={{
              width: '100%', display: 'flex', alignItems: 'center', gap: 12, padding: '10px 12px',
              borderRadius: 10, background: active ? C.primary : 'transparent',
              border: 'none', cursor: 'pointer', marginBottom: 2, transition: 'background 0.15s',
              color: active ? '#fff' : 'rgba(255,255,255,0.55)',
            }}>
              <span style={{ display: 'flex', flexShrink: 0 }}>{item.icon}</span>
              <span style={{ fontFamily: T.sans, fontSize: 14, fontWeight: active ? 600 : 400 }}>{item.label}</span>
              {active && <div style={{ marginLeft: 'auto', width: 6, height: 6, borderRadius: '50%', background: 'rgba(255,255,255,0.6)' }} />}
            </button>
          );
        })}

        <div style={{ fontFamily: T.sans, fontSize: 10, fontWeight: 600, color: 'rgba(255,255,255,0.3)', letterSpacing: 1, padding: '16px 8px 4px', marginBottom: 2 }}>
          ALUR PENDAFTARAN
        </div>
        {navItems.slice(2).map((item, i) => {
          const stepI = i + 1;
          const active = page === item.id;
          const done = stepDone(stepI);
          const current = stepActive(stepI);
          return (
            <button key={item.id} onClick={() => navigate(item.id)} style={{
              width: '100%', display: 'flex', alignItems: 'center', gap: 12, padding: '10px 12px',
              borderRadius: 10, background: active ? C.primary : 'transparent',
              border: 'none', cursor: 'pointer', marginBottom: 2, transition: 'background 0.15s',
              color: active ? '#fff' : done ? 'rgba(255,255,255,0.75)' : 'rgba(255,255,255,0.4)',
            }}>
              <span style={{ display: 'flex', flexShrink: 0 }}>{item.icon}</span>
              <span style={{ fontFamily: T.sans, fontSize: 14, fontWeight: active ? 600 : 400, flex: 1, textAlign: 'left' }}>{item.label}</span>
              {done && !active && (
                <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
                  <path d="M1 5l3.5 3.5L11 1" stroke={C.success} strokeWidth="2" strokeLinecap="round"/>
                </svg>
              )}
              {current && !active && <div style={{ width: 6, height: 6, borderRadius: '50%', background: C.warning, flexShrink: 0 }} />}
            </button>
          );
        })}
      </div>

      {/* Progress bar */}
      <div style={{ padding: '12px 20px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
          <span style={{ fontFamily: T.sans, fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>Progress</span>
          <span style={{ fontFamily: T.sans, fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.6)' }}>{registrationStep}/7</span>
        </div>
        <div style={{ height: 4, background: 'rgba(255,255,255,0.1)', borderRadius: 4, overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${(registrationStep / 7) * 100}%`, background: C.primary, borderRadius: 4, transition: 'width 0.4s' }} />
        </div>
      </div>

      {/* User card */}
      <div style={{ padding: '12px 16px 20px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 36, height: 36, borderRadius: '50%', background: C.primaryLight, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: T.serif, fontSize: 15, fontWeight: 700, color: C.primary, flexShrink: 0 }}>
            S
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontFamily: T.sans, fontSize: 13, fontWeight: 600, color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              Stefanny Aulia
            </div>
            <div style={{ fontFamily: T.sans, fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>2026-05821</div>
          </div>
          <button onClick={onLogout} title="Keluar" style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.35)', display: 'flex', padding: 4, borderRadius: 6, transition: 'color 0.15s' }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M6 2H3a1 1 0 00-1 1v10a1 1 0 001 1h3M11 5l3 3-3 3M14 8H6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
