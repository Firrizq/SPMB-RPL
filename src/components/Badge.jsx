import { C, T } from '../tokens';

export function Badge({ label, variant = 'muted', dot }) {
  const variants = {
    muted: { bg: C.border, color: C.textSub },
    primary: { bg: C.primaryLight, color: C.primary },
    success: { bg: C.successLight, color: C.success },
    warning: { bg: '#FDF3E3', color: '#B87A0A' },
    error: { bg: C.errorLight, color: C.error },
  };
  const v = variants[variant] || variants.muted;

  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 5,
      padding: '4px 10px',
      borderRadius: 99,
      fontFamily: T.sans,
      fontSize: 12,
      fontWeight: 600,
      background: v.bg,
      color: v.color,
    }}>
      {dot && <span style={{ width: 6, height: 6, borderRadius: '50%', background: v.color }} />}
      {label}
    </span>
  );
}
