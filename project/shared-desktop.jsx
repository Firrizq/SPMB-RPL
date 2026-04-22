// shared-desktop.jsx — Desktop design tokens + layout components

const C = {
  bg: '#FAF7F2', primary: '#D4724A', primaryLight: '#F5E6DE', primaryDark: '#B85A35',
  success: '#7A9E7E', successLight: '#E8F0E9', text: '#2C2C2C', textSub: '#6B6560',
  card: '#FFFFFF', muted: '#B0A99A', border: '#E8E2D9',
  warning: '#E8A838', warningLight: '#FDF3E3', error: '#C44B4B', errorLight: '#FDEAEA',
  sidebar: '#2C2420',
};
const T = { serif: '"Playfair Display", Georgia, serif', sans: '"DM Sans", "Helvetica Neue", Arial, sans-serif' };

// ── Button ───────────────────────────────────────────────────
function Btn({ children, onClick, variant = 'primary', size = 'md', disabled, style = {}, icon, fullWidth }) {
  const [p, setP] = React.useState(false);
  const sz = { sm: { padding: '7px 16px', fontSize: 13, borderRadius: 8 }, md: { padding: '11px 22px', fontSize: 14, borderRadius: 10 }, lg: { padding: '14px 32px', fontSize: 16, borderRadius: 12 }, xl: { padding: '16px 40px', fontSize: 17, borderRadius: 14 } };
  const vr = {
    primary: { background: disabled ? C.muted : C.primary, color: '#fff', border: 'none', boxShadow: disabled ? 'none' : '0 3px 14px rgba(212,114,74,0.3)' },
    outline: { background: 'transparent', color: C.primary, border: `1.5px solid ${C.primary}`, boxShadow: 'none' },
    ghost: { background: 'transparent', color: C.textSub, border: 'none', boxShadow: 'none' },
    success: { background: C.success, color: '#fff', border: 'none', boxShadow: '0 3px 10px rgba(122,158,126,0.28)' },
    soft: { background: C.primaryLight, color: C.primary, border: 'none', boxShadow: 'none' },
    muted: { background: C.border, color: C.textSub, border: 'none', boxShadow: 'none' },
    dark: { background: C.sidebar, color: '#fff', border: 'none', boxShadow: '0 3px 14px rgba(0,0,0,0.25)' },
  };
  return (
    <button onClick={!disabled ? onClick : undefined} onMouseDown={() => setP(true)} onMouseUp={() => setP(false)}
      style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8, fontFamily: T.sans, fontWeight: 600, cursor: disabled ? 'not-allowed' : 'pointer', letterSpacing: 0.1, transition: 'all 0.15s', outline: 'none', width: fullWidth ? '100%' : undefined, transform: p && !disabled ? 'scale(0.97)' : 'scale(1)', ...(sz[size] || sz.md), ...(vr[variant] || vr.primary), ...style }}>
      {icon && <span style={{ display: 'flex' }}>{icon}</span>}{children}
    </button>
  );
}

// ── Card ─────────────────────────────────────────────────────
function Card({ children, style = {}, onClick, padded = true }) {
  const [h, setH] = React.useState(false);
  return (
    <div onClick={onClick} onMouseEnter={() => onClick && setH(true)} onMouseLeave={() => setH(false)}
      style={{ background: C.card, borderRadius: 16, boxShadow: h ? '0 6px 24px rgba(44,44,44,0.12)' : '0 2px 12px rgba(44,44,44,0.07)', border: `1px solid ${C.border}`, transition: 'all 0.2s', transform: h && onClick ? 'translateY(-2px)' : 'none', cursor: onClick ? 'pointer' : 'default', padding: padded ? 24 : 0, ...style }}>
      {children}
    </div>
  );
}

// ── Input ─────────────────────────────────────────────────────
function Input({ label, type = 'text', value, onChange, placeholder, hint, error, rightEl, rows }) {
  const [f, setF] = React.useState(false);
  const base = { width: '100%', boxSizing: 'border-box', padding: rightEl ? '11px 40px 11px 14px' : '11px 14px', fontFamily: T.sans, fontSize: 14, color: C.text, background: f ? '#fff' : C.bg, border: `1.5px solid ${error ? C.error : f ? C.primary : C.border}`, borderRadius: 10, outline: 'none', transition: 'all 0.15s' };
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
      {label && <label style={{ fontFamily: T.sans, fontSize: 12, fontWeight: 600, color: C.textSub, letterSpacing: 0.5 }}>{label}</label>}
      <div style={{ position: 'relative' }}>
        {rows ? <textarea value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} rows={rows} onFocus={() => setF(true)} onBlur={() => setF(false)} style={{ ...base, resize: 'vertical', lineHeight: 1.6 }} />
          : <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} onFocus={() => setF(true)} onBlur={() => setF(false)} style={base} />}
        {rightEl && <div style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)' }}>{rightEl}</div>}
      </div>
      {(hint || error) && <span style={{ fontFamily: T.sans, fontSize: 12, color: error ? C.error : C.muted }}>{error || hint}</span>}
    </div>
  );
}

// ── FormSelect ───────────────────────────────────────────────
function FormSelect({ label, value, onChange, options, hint }) {
  const [f, setF] = React.useState(false);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
      {label && <label style={{ fontFamily: T.sans, fontSize: 12, fontWeight: 600, color: C.textSub, letterSpacing: 0.5 }}>{label}</label>}
      <select value={value} onChange={e => onChange(e.target.value)} onFocus={() => setF(true)} onBlur={() => setF(false)}
        style={{ width: '100%', padding: '11px 36px 11px 14px', fontFamily: T.sans, fontSize: 14, color: value ? C.text : C.muted, background: C.bg, border: `1.5px solid ${f ? C.primary : C.border}`, borderRadius: 10, outline: 'none', appearance: 'none', backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23B0A99A' stroke-width='1.8' stroke-linecap='round'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 14px center' }}>
        <option value="">Pilih...</option>
        {options.map(o => <option key={o.value || o} value={o.value || o}>{o.label || o}</option>)}
      </select>
      {hint && <span style={{ fontFamily: T.sans, fontSize: 12, color: C.muted }}>{hint}</span>}
    </div>
  );
}

// ── Badge ─────────────────────────────────────────────────────
function Badge({ label, variant = 'muted', dot }) {
  const vm = { muted: { bg: C.border, color: C.textSub }, primary: { bg: C.primaryLight, color: C.primary }, success: { bg: C.successLight, color: C.success }, warning: { bg: '#FDF3E3', color: '#B87A0A' }, error: { bg: C.errorLight, color: C.error } };
  const v = vm[variant] || vm.muted;
  return <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '4px 10px', borderRadius: 99, fontFamily: T.sans, fontSize: 12, fontWeight: 600, background: v.bg, color: v.color }}>{dot && <span style={{ width: 6, height: 6, borderRadius: '50%', background: v.color }} />}{label}</span>;
}

// ── Divider ───────────────────────────────────────────────────
function Divider({ label, style = {} }) {
  return label
    ? <div style={{ display: 'flex', alignItems: 'center', gap: 12, ...style }}><div style={{ flex: 1, height: 1, background: C.border }} /><span style={{ fontFamily: T.sans, fontSize: 12, color: C.muted, whiteSpace: 'nowrap' }}>{label}</span><div style={{ flex: 1, height: 1, background: C.border }} /></div>
    : <div style={{ height: 1, background: C.border, ...style }} />;
}

// ── SectionTitle ──────────────────────────────────────────────
function SectionTitle({ children, sub, size = 'md', style = {} }) {
  const fs = { sm: 18, md: 22, lg: 28 };
  return (
    <div style={style}>
      <div style={{ fontFamily: T.serif, fontSize: fs[size] || 22, fontWeight: 700, color: C.text, lineHeight: 1.2 }}>{children}</div>
      {sub && <div style={{ fontFamily: T.sans, fontSize: 14, color: C.muted, marginTop: 4 }}>{sub}</div>}
    </div>
  );
}

// ── Horizontal Step Tracker ───────────────────────────────────
function StepTracker({ steps, current }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', width: '100%' }}>
      {steps.map((step, i) => {
        const done = i < current; const active = i === current;
        return (
          <React.Fragment key={i}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, minWidth: 70 }}>
              <div style={{ width: 36, height: 36, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: done ? C.success : active ? C.primary : C.border, boxShadow: active ? `0 0 0 4px ${C.primaryLight}` : done ? `0 0 0 3px ${C.successLight}` : 'none', transition: 'all 0.3s', flexShrink: 0 }}>
                {done ? <svg width="14" height="11" viewBox="0 0 14 11" fill="none"><path d="M1.5 5.5l3.5 4L12.5 1.5" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  : <span style={{ fontFamily: T.sans, fontSize: 13, fontWeight: 700, color: active ? '#fff' : C.muted }}>{i + 1}</span>}
              </div>
              <span style={{ fontFamily: T.sans, fontSize: 11, fontWeight: active ? 700 : done ? 500 : 400, color: active ? C.primary : done ? C.success : C.muted, textAlign: 'center', lineHeight: 1.3, width: 68 }}>{step}</span>
            </div>
            {i < steps.length - 1 && <div style={{ flex: 1, height: 2, background: done ? C.success : C.border, marginTop: 17, transition: 'background 0.3s', minWidth: 8 }} />}
          </React.Fragment>
        );
      })}
    </div>
  );
}

// ── Top Navbar (pre-login) ───────────────────────────────────
function TopNav({ navigate, page }) {
  return (
    <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, background: 'rgba(250,247,242,0.95)', backdropFilter: 'blur(12px)', borderBottom: `1px solid ${C.border}`, height: 64, display: 'flex', alignItems: 'center', padding: '0 48px', gap: 40 }}>
      <div onClick={() => navigate('landing')} style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', flexShrink: 0 }}>
        <div style={{ width: 32, height: 32, borderRadius: 8, background: C.primary, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 1L1 6v9h5v-5h4v5h5V6L8 1z" fill="#fff"/></svg>
        </div>
        <div>
          <div style={{ fontFamily: T.serif, fontSize: 15, fontWeight: 700, color: C.text, lineHeight: 1 }}>SPMB</div>
          <div style={{ fontFamily: T.sans, fontSize: 10, color: C.muted, letterSpacing: 0.3 }}>Universitas Nusantara</div>
        </div>
      </div>
      <div style={{ flex: 1, display: 'flex', gap: 32, alignItems: 'center' }}>
        {[['landing','Beranda'],['info','Info Pendaftaran']].map(([id,label]) => (
          <button key={id} onClick={() => navigate(id)} style={{ background: 'none', border: 'none', fontFamily: T.sans, fontSize: 14, fontWeight: page === id ? 600 : 400, color: page === id ? C.primary : C.textSub, cursor: 'pointer', padding: '4px 0', borderBottom: page === id ? `2px solid ${C.primary}` : '2px solid transparent' }}>{label}</button>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <Btn variant="outline" size="sm" onClick={() => navigate('auth')}>Masuk</Btn>
        <Btn size="sm" onClick={() => navigate('auth')}>Mulai Daftar →</Btn>
      </div>
    </nav>
  );
}

// ── Sidebar (post-login) ─────────────────────────────────────
function Sidebar({ navigate, page, registrationStep, onLogout }) {
  const steps = ['Buat Akun','Formulir','Upload','Bayar','Verifikasi','Seleksi','Pengumuman'];
  const navItems = [
    { id: 'dashboard', label: 'Beranda', icon: <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M2 7.5L9 2l7 5.5V16a1 1 0 01-1 1H3a1 1 0 01-1-1V7.5z" stroke="currentColor" strokeWidth="1.7" fill="none" strokeLinejoin="round"/><path d="M6 17v-5h6v5" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round"/></svg> },
    { id: 'info', label: 'Info Pendaftaran', icon: <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="7.5" stroke="currentColor" strokeWidth="1.7"/><path d="M9 8.5v4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/><circle cx="9" cy="6" r="1.1" fill="currentColor"/></svg> },
    { id: 'form', label: 'Formulir Data Diri', icon: <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><rect x="2" y="1.5" width="11" height="15" rx="2" stroke="currentColor" strokeWidth="1.7"/><path d="M5.5 6h6M5.5 9.5h4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg> },
    { id: 'upload', label: 'Upload Dokumen', icon: <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M9 13V6m0 0L6 9m3-3l3 3" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/><path d="M16 12.5A4 4 0 0013 6h-.5A5.5 5.5 0 002.5 12" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/></svg> },
    { id: 'payment', label: 'Pembayaran', icon: <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><rect x="1.5" y="3.5" width="15" height="11" rx="2.5" stroke="currentColor" strokeWidth="1.7"/><path d="M1.5 7.5h15" stroke="currentColor" strokeWidth="1.7"/><path d="M5 11.5h2M11 11.5h2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/></svg> },
    { id: 'status', label: 'Status & Pengumuman', icon: <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="7.5" stroke="currentColor" strokeWidth="1.7"/><path d="M9 5.5V9.5l2.5 2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/></svg> },
  ];
  const stepDone = (i) => i < registrationStep;
  const stepActive = (i) => i === registrationStep;

  return (
    <div style={{ width: 256, flexShrink: 0, height: '100vh', position: 'fixed', left: 0, top: 0, background: C.sidebar, display: 'flex', flexDirection: 'column', zIndex: 50, overflow: 'hidden' }}>
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
        <div style={{ fontFamily: T.sans, fontSize: 10, fontWeight: 600, color: 'rgba(255,255,255,0.3)', letterSpacing: 1, padding: '8px 8px', marginBottom: 4 }}>MENU UTAMA</div>
        {navItems.slice(0, 2).map(item => {
          const active = page === item.id;
          return (
            <button key={item.id} onClick={() => navigate(item.id)} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 12, padding: '10px 12px', borderRadius: 10, background: active ? C.primary : 'transparent', border: 'none', cursor: 'pointer', marginBottom: 2, transition: 'background 0.15s', color: active ? '#fff' : 'rgba(255,255,255,0.55)' }}>
              <span style={{ display: 'flex', flexShrink: 0 }}>{item.icon}</span>
              <span style={{ fontFamily: T.sans, fontSize: 14, fontWeight: active ? 600 : 400 }}>{item.label}</span>
              {active && <div style={{ marginLeft: 'auto', width: 6, height: 6, borderRadius: '50%', background: 'rgba(255,255,255,0.6)' }} />}
            </button>
          );
        })}

        <div style={{ fontFamily: T.sans, fontSize: 10, fontWeight: 600, color: 'rgba(255,255,255,0.3)', letterSpacing: 1, padding: '16px 8px 4px', marginBottom: 2 }}>ALUR PENDAFTARAN</div>
        {navItems.slice(2).map((item, i) => {
          const stepI = i + 1;
          const active = page === item.id;
          const done = stepDone(stepI);
          const current = stepActive(stepI);
          return (
            <button key={item.id} onClick={() => navigate(item.id)} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 12, padding: '10px 12px', borderRadius: 10, background: active ? C.primary : 'transparent', border: 'none', cursor: 'pointer', marginBottom: 2, transition: 'background 0.15s', color: active ? '#fff' : done ? 'rgba(255,255,255,0.75)' : 'rgba(255,255,255,0.4)' }}>
              <span style={{ display: 'flex', flexShrink: 0 }}>{item.icon}</span>
              <span style={{ fontFamily: T.sans, fontSize: 14, fontWeight: active ? 600 : 400, flex: 1, textAlign: 'left' }}>{item.label}</span>
              {done && !active && <svg width="12" height="10" viewBox="0 0 12 10" fill="none"><path d="M1 5l3.5 3.5L11 1" stroke={C.success} strokeWidth="2" strokeLinecap="round"/></svg>}
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
          <div style={{ width: 36, height: 36, borderRadius: '50%', background: C.primaryLight, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: T.serif, fontSize: 15, fontWeight: 700, color: C.primary, flexShrink: 0 }}>S</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontFamily: T.sans, fontSize: 13, fontWeight: 600, color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Stefanny Aulia</div>
            <div style={{ fontFamily: T.sans, fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>2026-05821</div>
          </div>
          <button onClick={onLogout} title="Keluar" style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.35)', display: 'flex', padding: 4, borderRadius: 6, transition: 'color 0.15s' }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 2H3a1 1 0 00-1 1v10a1 1 0 001 1h3M11 5l3 3-3 3M14 8H6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Page wrapper (post-login) ─────────────────────────────────
function PageHeader({ title, subtitle, actions, breadcrumb }) {
  return (
    <div style={{ marginBottom: 28 }}>
      {breadcrumb && <div style={{ fontFamily: T.sans, fontSize: 12, color: C.muted, marginBottom: 8 }}>{breadcrumb}</div>}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16 }}>
        <div>
          <h1 style={{ fontFamily: T.serif, fontSize: 28, fontWeight: 700, color: C.text, margin: 0, lineHeight: 1.2 }}>{title}</h1>
          {subtitle && <p style={{ fontFamily: T.sans, fontSize: 14, color: C.muted, margin: '6px 0 0' }}>{subtitle}</p>}
        </div>
        {actions && <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexShrink: 0 }}>{actions}</div>}
      </div>
    </div>
  );
}

Object.assign(window, { C, T, Btn, Card, Input, FormSelect, Badge, Divider, SectionTitle, StepTracker, TopNav, Sidebar, PageHeader });
