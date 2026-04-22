import { useState } from 'react';
import { C, T } from '../tokens';

export function Btn({ children, onClick, variant = 'primary', size = 'md', disabled, style = {}, icon, fullWidth }) {
  const [pressed, setPressed] = useState(false);

  const sizes = {
    sm: { padding: '7px 16px', fontSize: 13, borderRadius: 8 },
    md: { padding: '11px 22px', fontSize: 14, borderRadius: 10 },
    lg: { padding: '14px 32px', fontSize: 16, borderRadius: 12 },
    xl: { padding: '16px 40px', fontSize: 17, borderRadius: 14 },
  };

  const variants = {
    primary: { background: disabled ? C.muted : C.primary, color: '#fff', border: 'none', boxShadow: disabled ? 'none' : '0 3px 14px rgba(212,114,74,0.3)' },
    outline: { background: 'transparent', color: C.primary, border: `1.5px solid ${C.primary}`, boxShadow: 'none' },
    ghost: { background: 'transparent', color: C.textSub, border: 'none', boxShadow: 'none' },
    success: { background: C.success, color: '#fff', border: 'none', boxShadow: '0 3px 10px rgba(122,158,126,0.28)' },
    soft: { background: C.primaryLight, color: C.primary, border: 'none', boxShadow: 'none' },
    muted: { background: C.border, color: C.textSub, border: 'none', boxShadow: 'none' },
    dark: { background: C.sidebar, color: '#fff', border: 'none', boxShadow: '0 3px 14px rgba(0,0,0,0.25)' },
  };

  return (
    <button
      onClick={!disabled ? onClick : undefined}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        fontFamily: T.sans,
        fontWeight: 600,
        cursor: disabled ? 'not-allowed' : 'pointer',
        letterSpacing: 0.1,
        transition: 'all 0.15s',
        outline: 'none',
        width: fullWidth ? '100%' : undefined,
        transform: pressed && !disabled ? 'scale(0.97)' : 'scale(1)',
        ...(sizes[size] || sizes.md),
        ...(variants[variant] || variants.primary),
        ...style,
      }}
    >
      {icon && <span style={{ display: 'flex' }}>{icon}</span>}
      {children}
    </button>
  );
}
