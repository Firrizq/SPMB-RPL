import { C, T } from '../tokens';

export function SectionTitle({ children, sub, size = 'md', style = {} }) {
  const fontSizes = { sm: 18, md: 22, lg: 28 };

  return (
    <div style={style}>
      <div style={{ fontFamily: T.serif, fontSize: fontSizes[size] || 22, fontWeight: 700, color: C.text, lineHeight: 1.2 }}>
        {children}
      </div>
      {sub && (
        <div style={{ fontFamily: T.sans, fontSize: 14, color: C.muted, marginTop: 4 }}>{sub}</div>
      )}
    </div>
  );
}
