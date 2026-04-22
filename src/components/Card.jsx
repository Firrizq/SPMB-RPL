import { useState } from 'react';
import { C } from '../tokens';

export function Card({ children, style = {}, onClick, padded = true }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => onClick && setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: C.card,
        borderRadius: 16,
        boxShadow: hovered ? '0 6px 24px rgba(44,44,44,0.12)' : '0 2px 12px rgba(44,44,44,0.07)',
        border: `1px solid ${C.border}`,
        transition: 'all 0.2s',
        transform: hovered && onClick ? 'translateY(-2px)' : 'none',
        cursor: onClick ? 'pointer' : 'default',
        padding: padded ? 24 : 0,
        ...style,
      }}
    >
      {children}
    </div>
  );
}
