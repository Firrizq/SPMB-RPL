import { C, T } from '../tokens';

export function StepTracker({ steps, current }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', width: '100%' }}>
      {steps.map((step, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <div key={i} style={{ display: 'contents' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, minWidth: 70 }}>
              <div style={{
                width: 36, height: 36, borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: done ? C.success : active ? C.primary : C.border,
                boxShadow: active ? `0 0 0 4px ${C.primaryLight}` : done ? `0 0 0 3px ${C.successLight}` : 'none',
                transition: 'all 0.3s', flexShrink: 0,
              }}>
                {done ? (
                  <svg width="14" height="11" viewBox="0 0 14 11" fill="none">
                    <path d="M1.5 5.5l3.5 4L12.5 1.5" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ) : (
                  <span style={{ fontFamily: T.sans, fontSize: 13, fontWeight: 700, color: active ? '#fff' : C.muted }}>
                    {i + 1}
                  </span>
                )}
              </div>
              <span style={{
                fontFamily: T.sans, fontSize: 11,
                fontWeight: active ? 700 : done ? 500 : 400,
                color: active ? C.primary : done ? C.success : C.muted,
                textAlign: 'center', lineHeight: 1.3, width: 68,
              }}>
                {step}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div style={{
                flex: 1, height: 2,
                background: done ? C.success : C.border,
                marginTop: 17, transition: 'background 0.3s', minWidth: 8,
              }} />
            )}
          </div>
        );
      })}
    </div>
  );
}
