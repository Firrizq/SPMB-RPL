import { C, T } from '../tokens';

export function Divider({ label, style = {} }) {
  if (label) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, ...style }}>
        <div style={{ flex: 1, height: 1, background: C.border }} />
        <span style={{ fontFamily: T.sans, fontSize: 12, color: C.muted, whiteSpace: 'nowrap' }}>{label}</span>
        <div style={{ flex: 1, height: 1, background: C.border }} />
      </div>
    );
  }
  return <div style={{ height: 1, background: C.border, ...style }} />;
}
