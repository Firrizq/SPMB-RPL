import { useState } from 'react';
import { C, T } from '../tokens';

export function FormSelect({ label, value, onChange, options, hint }) {
  const [focused, setFocused] = useState(false);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
      {label && (
        <label style={{ fontFamily: T.sans, fontSize: 12, fontWeight: 600, color: C.textSub, letterSpacing: 0.5 }}>
          {label}
        </label>
      )}
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          width: '100%',
          padding: '11px 36px 11px 14px',
          fontFamily: T.sans,
          fontSize: 14,
          color: value ? C.text : C.muted,
          background: C.bg,
          border: `1.5px solid ${focused ? C.primary : C.border}`,
          borderRadius: 10,
          outline: 'none',
          appearance: 'none',
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23B0A99A' stroke-width='1.8' stroke-linecap='round'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'right 14px center',
        }}
      >
        <option value="">Pilih...</option>
        {options.map(o => (
          <option key={o.value || o} value={o.value || o}>
            {o.label || o}
          </option>
        ))}
      </select>
      {hint && <span style={{ fontFamily: T.sans, fontSize: 12, color: C.muted }}>{hint}</span>}
    </div>
  );
}
