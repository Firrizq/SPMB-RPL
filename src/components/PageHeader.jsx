import { C, T } from '../tokens';

export function PageHeader({ title, subtitle, actions, breadcrumb }) {
  return (
    <div style={{ marginBottom: 28 }}>
      {breadcrumb && (
        <div style={{ fontFamily: T.sans, fontSize: 12, color: C.muted, marginBottom: 8 }}>{breadcrumb}</div>
      )}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16 }}>
        <div>
          <h1 style={{ fontFamily: T.serif, fontSize: 28, fontWeight: 700, color: C.text, margin: 0, lineHeight: 1.2 }}>
            {title}
          </h1>
          {subtitle && (
            <p style={{ fontFamily: T.sans, fontSize: 14, color: C.muted, margin: '6px 0 0' }}>{subtitle}</p>
          )}
        </div>
        {actions && (
          <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexShrink: 0 }}>{actions}</div>
        )}
      </div>
    </div>
  );
}
