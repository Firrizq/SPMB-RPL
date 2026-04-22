import { useState } from 'react';
import { C, T } from '../tokens';

export function Input({ label, type = 'text', value, onChange, placeholder, hint, error, rightEl, rows }) {
  const [focused, setFocused] = useState(false);

  const base = {
    width: '100%',
    boxSizing: 'border-box',
    padding: rightEl ? '11px 40px 11px 14px' : '11px 14px',
    fontFamily: T.sans,
    fontSize: 14,
    color: C.text,
    background: focused ? '#fff' : C.bg,
    border: `1.5px solid ${error ? C.error : focused ? C.primary : C.border}`,
    borderRadius: 10,
    outline: 'none',
    transition: 'all 0.15s',
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
      {label && (
        <label style={{ fontFamily: T.sans, fontSize: 12, fontWeight: 600, color: C.textSub, letterSpacing: 0.5 }}>
          {label}
        </label>
      )}
      <div style={{ position: 'relative' }}>
        {rows ? (
          <textarea
            value={value}
            onChange={e => onChange(e.target.value)}
            placeholder={placeholder}
            rows={rows}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            style={{ ...base, resize: 'vertical', lineHeight: 1.6 }}
          />
        ) : (
          <input
            type={type}
            value={value}
            onChange={e => onChange(e.target.value)}
            placeholder={placeholder}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            style={base}
          />
        )}
        {rightEl && (
          <div style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)' }}>
            {rightEl}
          </div>
        )}
      </div>
      {(hint || error) && (
        <span style={{ fontFamily: T.sans, fontSize: 12, color: error ? C.error : C.muted }}>
          {error || hint}
        </span>
      )}
    </div>
  );
}
