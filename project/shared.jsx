// shared.jsx — Design tokens + shared UI primitives

const C = {
  bg: '#FAF7F2',
  primary: '#D4724A',
  primaryLight: '#F5E6DE',
  primaryDark: '#B85A35',
  success: '#7A9E7E',
  successLight: '#E8F0E9',
  text: '#2C2C2C',
  textSub: '#6B6560',
  card: '#FFFFFF',
  muted: '#B0A99A',
  border: '#E8E2D9',
  warning: '#E8A838',
  warningLight: '#FDF3E3',
  error: '#C44B4B',
  errorLight: '#FDEAEA',
};

const T = {
  serif: '"Playfair Display", Georgia, serif',
  sans: '"DM Sans", "Helvetica Neue", Arial, sans-serif',
};

// ── Button ──────────────────────────────────────────────────
function Btn({ children, onClick, variant = 'primary', fullWidth, size = 'md', disabled, style = {}, icon }) {
  const [pressed, setPressed] = React.useState(false);
  const sizes = {
    sm: { padding: '8px 14px', fontSize: 13, borderRadius: 10 },
    md: { padding: '13px 22px', fontSize: 15, borderRadius: 12 },
    lg: { padding: '15px 28px', fontSize: 16, borderRadius: 14 },
  };
  const variants = {
    primary: { background: disabled ? C.muted : C.primary, color: '#fff', border: 'none', boxShadow: disabled ? 'none' : '0 3px 12px rgba(212,114,74,0.32)' },
    outline: { background: 'transparent', color: C.primary, border: `1.5px solid ${C.primary}`, boxShadow: 'none' },
    ghost: { background: 'transparent', color: C.textSub, border: 'none', boxShadow: 'none' },
    success: { background: C.success, color: '#fff', border: 'none', boxShadow: '0 3px 10px rgba(122,158,126,0.28)' },
    soft: { background: C.primaryLight, color: C.primary, border: 'none', boxShadow: 'none' },
    muted: { background: C.border, color: C.textSub, border: 'none', boxShadow: 'none' },
  };
  const s = sizes[size] || sizes.md;
  const v = variants[variant] || variants.primary;
  return (
    <button onClick={!disabled ? onClick : undefined}
      onMouseDown={() => setPressed(true)} onMouseUp={() => setPressed(false)}
      onTouchStart={() => setPressed(true)} onTouchEnd={() => setPressed(false)}
      style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 7,
        fontFamily: T.sans, fontWeight: 600, cursor: disabled ? 'not-allowed' : 'pointer',
        letterSpacing: 0.1, transition: 'all 0.15s', outline: 'none', WebkitTapHighlightColor: 'transparent',
        width: fullWidth ? '100%' : undefined, boxSizing: 'border-box',
        transform: pressed && !disabled ? 'scale(0.97)' : 'scale(1)',
        ...s, ...v, ...style,
      }}
    >{icon && <span style={{ display: 'flex' }}>{icon}</span>}{children}</button>
  );
}

// ── Card ────────────────────────────────────────────────────
function Card({ children, style = {}, onClick, padded = true, noBorder }) {
  const [hover, setHover] = React.useState(false);
  return (
    <div onClick={onClick}
      onMouseEnter={() => onClick && setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: C.card, borderRadius: 16,
        boxShadow: hover ? '0 4px 20px rgba(44,44,44,0.11)' : '0 2px 10px rgba(44,44,44,0.07)',
        border: noBorder ? 'none' : `1px solid rgba(232,226,217,0.6)`,
        transition: 'box-shadow 0.2s, transform 0.15s',
        transform: hover && onClick ? 'translateY(-1px)' : 'none',
        cursor: onClick ? 'pointer' : 'default',
        padding: padded ? '16px' : 0, ...style,
      }}>{children}</div>
  );
}

// ── Input ────────────────────────────────────────────────────
function Input({ label, type = 'text', value, onChange, placeholder, hint, error, rightEl, rows }) {
  const [focused, setFocused] = React.useState(false);
  const sharedStyle = {
    width: '100%', boxSizing: 'border-box',
    padding: rightEl ? '12px 40px 12px 14px' : '12px 14px',
    fontFamily: T.sans, fontSize: 15, color: C.text,
    background: focused ? '#fff' : C.bg,
    border: `1.5px solid ${error ? C.error : focused ? C.primary : C.border}`,
    borderRadius: 12, outline: 'none',
    transition: 'border-color 0.15s, background 0.15s',
  };
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
      {label && <label style={{ fontFamily: T.sans, fontSize: 12, fontWeight: 600, color: C.textSub, letterSpacing: 0.4 }}>{label}</label>}
      <div style={{ position: 'relative' }}>
        {rows ? (
          <textarea value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
            rows={rows} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
            style={{ ...sharedStyle, resize: 'none', lineHeight: 1.5 }} />
        ) : (
          <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
            onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} style={sharedStyle} />
        )}
        {rightEl && <div style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)' }}>{rightEl}</div>}
      </div>
      {(hint || error) && <span style={{ fontFamily: T.sans, fontSize: 11, color: error ? C.error : C.muted }}>{error || hint}</span>}
    </div>
  );
}

// ── FormSelect ──────────────────────────────────────────────
function FormSelect({ label, value, onChange, options, hint }) {
  const [focused, setFocused] = React.useState(false);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
      {label && <label style={{ fontFamily: T.sans, fontSize: 12, fontWeight: 600, color: C.textSub, letterSpacing: 0.4 }}>{label}</label>}
      <select value={value} onChange={e => onChange(e.target.value)} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
        style={{
          width: '100%', padding: '12px 36px 12px 14px',
          fontFamily: T.sans, fontSize: 15, color: value ? C.text : C.muted,
          background: C.bg, border: `1.5px solid ${focused ? C.primary : C.border}`,
          borderRadius: 12, outline: 'none', appearance: 'none',
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23B0A99A' stroke-width='1.8' stroke-linecap='round'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'no-repeat', backgroundPosition: 'right 14px center',
        }}>
        <option value="">Pilih...</option>
        {options.map(o => <option key={o.value || o} value={o.value || o}>{o.label || o}</option>)}
      </select>
      {hint && <span style={{ fontFamily: T.sans, fontSize: 11, color: C.muted }}>{hint}</span>}
    </div>
  );
}

// ── Badge ────────────────────────────────────────────────────
function Badge({ label, variant = 'muted', dot }) {
  const vm = {
    muted: { bg: C.border, color: C.textSub },
    primary: { bg: C.primaryLight, color: C.primary },
    success: { bg: C.successLight, color: C.success },
    warning: { bg: '#FDF3E3', color: '#B87A0A' },
    error: { bg: C.errorLight, color: C.error },
  };
  const v = vm[variant] || vm.muted;
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 5,
      padding: '3px 9px', borderRadius: 99,
      fontFamily: T.sans, fontSize: 11, fontWeight: 600, letterSpacing: 0.3,
      background: v.bg, color: v.color,
    }}>
      {dot && <span style={{ width: 6, height: 6, borderRadius: '50%', background: v.color, display: 'inline-block' }} />}
      {label}
    </span>
  );
}

// ── PageHeader ───────────────────────────────────────────────
function PageHeader({ title, onBack, rightEl, subtitle }) {
  return (
    <div style={{
      padding: '12px 16px 12px', paddingTop: 62,
      background: C.bg, position: 'sticky', top: 0, zIndex: 20,
      borderBottom: `1px solid ${C.border}`,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        {onBack && (
          <button onClick={onBack} style={{
            width: 34, height: 34, borderRadius: 10, background: C.card,
            border: `1px solid ${C.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', flexShrink: 0,
          }}>
            <svg width="8" height="14" viewBox="0 0 8 14" fill="none">
              <path d="M7 1L1 7l6 6" stroke={C.text} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        )}
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: T.sans, fontSize: 17, fontWeight: 700, color: C.text }}>{title}</div>
          {subtitle && <div style={{ fontFamily: T.sans, fontSize: 12, color: C.muted, marginTop: 1 }}>{subtitle}</div>}
        </div>
        {rightEl}
      </div>
    </div>
  );
}

// ── BottomNav ────────────────────────────────────────────────
function BottomNav({ current, navigate }) {
  const tabs = [
    { id: 'dashboard', label: 'Beranda', icon: (a) => (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M3 9.5L11 3l8 6.5V19a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z"
          stroke="currentColor" strokeWidth="1.8" fill={a ? 'currentColor' : 'none'} strokeLinejoin="round"/>
        <path d="M8 20v-6h6v6" stroke={a ? '#FAF7F2' : 'currentColor'} strokeWidth="1.8" strokeLinejoin="round"/>
      </svg>
    )},
    { id: 'form', label: 'Formulir', icon: (a) => (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <rect x="3" y="2" width="13" height="18" rx="2.5" stroke="currentColor" strokeWidth="1.8" fill={a ? 'currentColor' : 'none'}/>
        <path d="M7 8h6M7 12h4" stroke={a ? '#FAF7F2' : 'currentColor'} strokeWidth="1.7" strokeLinecap="round"/>
      </svg>
    )},
    { id: 'status', label: 'Status', icon: (a) => (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <circle cx="11" cy="11" r="8.5" stroke="currentColor" strokeWidth="1.8" fill={a ? 'currentColor' : 'none'}/>
        <path d="M11 7v4.5l3 1.5" stroke={a ? '#FAF7F2' : 'currentColor'} strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    )},
    { id: 'info', label: 'Info', icon: (a) => (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <circle cx="11" cy="11" r="8.5" stroke="currentColor" strokeWidth="1.8" fill={a ? 'currentColor' : 'none'}/>
        <path d="M11 10.5v5" stroke={a ? '#FAF7F2' : 'currentColor'} strokeWidth="1.8" strokeLinecap="round"/>
        <circle cx="11" cy="7.5" r="1.2" fill={a ? '#FAF7F2' : 'currentColor'}/>
      </svg>
    )},
  ];
  const isActive = (id) => current === id || (id === 'form' && ['form','upload','payment'].includes(current));
  return (
    <div style={{
      position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 30,
      background: 'rgba(250,247,242,0.96)', backdropFilter: 'blur(20px)',
      borderTop: `1px solid ${C.border}`,
      display: 'flex', padding: '8px 0 26px',
    }}>
      {tabs.map(tab => {
        const a = isActive(tab.id);
        return (
          <button key={tab.id} onClick={() => navigate(tab.id)} style={{
            flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
            background: 'none', border: 'none', cursor: 'pointer', padding: '4px 0',
            color: a ? C.primary : C.muted, transition: 'color 0.15s',
            WebkitTapHighlightColor: 'transparent',
          }}>
            {tab.icon(a)}
            <span style={{ fontFamily: T.sans, fontSize: 10, fontWeight: a ? 600 : 400 }}>{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}

// ── Divider ──────────────────────────────────────────────────
function Divider({ label, style = {} }) {
  if (label) return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, ...style }}>
      <div style={{ flex: 1, height: 1, background: C.border }} />
      <span style={{ fontFamily: T.sans, fontSize: 12, color: C.muted, whiteSpace: 'nowrap' }}>{label}</span>
      <div style={{ flex: 1, height: 1, background: C.border }} />
    </div>
  );
  return <div style={{ height: 1, background: C.border, ...style }} />;
}

// ── SectionTitle ─────────────────────────────────────────────
function SectionTitle({ children, sub, style = {} }) {
  return (
    <div style={{ ...style }}>
      <div style={{ fontFamily: T.serif, fontSize: 19, fontWeight: 700, color: C.text }}>{children}</div>
      {sub && <div style={{ fontFamily: T.sans, fontSize: 13, color: C.muted, marginTop: 3 }}>{sub}</div>}
    </div>
  );
}

// ── Scroll page wrapper ───────────────────────────────────────
function PageScroll({ children, style = {}, pb = 100 }) {
  return (
    <div style={{
      overflowY: 'auto', height: '100%', background: C.bg,
      WebkitOverflowScrolling: 'touch', paddingBottom: pb, ...style,
    }}>{children}</div>
  );
}

// ── Step tracker (horizontal) ─────────────────────────────────
function StepTracker({ steps, current }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', padding: '0 4px' }}>
      {steps.map((step, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <React.Fragment key={i}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
              <div style={{
                width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: done ? C.success : active ? C.primary : C.border,
                transition: 'background 0.3s',
              }}>
                {done ? (
                  <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
                    <path d="M1 5l3.5 3.5L11 1" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ) : (
                  <span style={{ fontFamily: T.sans, fontSize: 11, fontWeight: 700, color: active ? '#fff' : C.muted }}>{i + 1}</span>
                )}
              </div>
              <span style={{ fontFamily: T.sans, fontSize: 9, fontWeight: active ? 600 : 400, color: active ? C.primary : done ? C.success : C.muted, textAlign: 'center', width: 42, lineHeight: 1.2 }}>{step}</span>
            </div>
            {i < steps.length - 1 && (
              <div style={{ flex: 1, height: 2, background: done ? C.success : C.border, marginBottom: 18, transition: 'background 0.3s', minWidth: 6 }} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

Object.assign(window, {
  C, T, Btn, Card, Input, FormSelect, Badge, PageHeader, BottomNav,
  Divider, SectionTitle, PageScroll, StepTracker,
});
