import { C, T } from '../tokens';
import { Btn, Card, Badge, SectionTitle, StepTracker } from '../components';
import { useBreakpoint } from '../hooks/useBreakpoint';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
const fmtDate = (iso) => {
  if (!iso) return '-';
  const d = new Date(iso);
  return `${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()}, ${String(d.getHours()).padStart(2,'0')}.${String(d.getMinutes()).padStart(2,'0')}`;
};

export function PageDashboard({ navigate, registrationStep, userData, onReset }) {
  const { isMobile, isTablet } = useBreakpoint();
  const isSmall = isMobile || isTablet;

  const steps = ['Buat Akun', 'Isi Formulir', 'Upload Berkas', 'Pembayaran', 'Verifikasi', 'Seleksi', 'Pengumuman'];
  const hour = new Date().getHours();
  const greeting = hour < 11 ? 'Selamat Pagi' : hour < 15 ? 'Selamat Siang' : 'Selamat Sore';
  const name = userData?.name || 'Pengguna';
  const firstName = name.split(' ')[0];
  const regNo = userData?.registrationNo || '-';
  const loginTime = fmtDate(userData?.loginTime);

  const quickActions = [
    { icon: '📝', label: 'Isi Formulir Data Diri', sub: 'Data pribadi, asal sekolah, pilihan prodi', page: 'form', stepIdx: 1, color: C.primaryLight },
    { icon: '📎', label: 'Upload Dokumen', sub: 'Ijazah, pasfoto, KK, SKL', page: 'upload', stepIdx: 2, color: '#EEF3FF' },
    { icon: '💳', label: 'Pembayaran', sub: 'Biaya pendaftaran Rp 250.000', page: 'payment', stepIdx: 3, color: C.warningLight },
    { icon: '📊', label: 'Status & Pengumuman', sub: 'Pantau progress pendaftaran', page: 'status', stepIdx: -1, color: C.successLight },
  ];

  const notifications = [
    { type: 'success', icon: '✅', title: 'Akun Dibuat', msg: `Selamat datang, ${firstName}! Akun kamu berhasil dibuat.`, time: fmtDate(userData?.loginTime) },
    ...(registrationStep >= 2 ? [{ type: 'success', icon: '📋', title: 'Formulir Tersimpan', msg: 'Data diri dan pilihan program studi berhasil disimpan.', time: '-' }] : []),
    ...(registrationStep >= 3 ? [{ type: 'success', icon: '📎', title: 'Dokumen Terupload', msg: 'Semua dokumen berhasil diupload dan menunggu verifikasi.', time: '-' }] : []),
    ...(registrationStep >= 4 ? [{ type: 'success', icon: '💳', title: 'Pembayaran Diterima', msg: 'Pembayaran pendaftaran Rp 250.000 berhasil dikonfirmasi.', time: '-' }] : []),
    ...(registrationStep < 4 ? [{ type: 'warning', icon: '⚠️', title: 'Batas Waktu', msg: 'Pendaftaran ditutup 31 Mei 2026. Segera lengkapi dokumenmu.', time: '-' }] : []),
  ].slice(0, 3);

  const getNextPage = () => {
    if (registrationStep === 1) return 'form';
    if (registrationStep === 2) return 'upload';
    if (registrationStep === 3) return 'payment';
    return 'status';
  };

  const pad = isMobile ? '20px 16px' : isTablet ? '28px 24px' : '36px 40px';

  return (
    <div style={{ padding: pad, maxWidth: 1100, margin: '0 auto' }}>
      {/* Welcome header */}
      <div style={{ display: 'flex', flexDirection: isSmall ? 'column' : 'row', justifyContent: 'space-between', alignItems: isSmall ? 'flex-start' : 'flex-start', gap: 16, marginBottom: 28 }}>
        <div>
          <div style={{ fontFamily: T.sans, fontSize: 13, color: C.muted, marginBottom: 4 }}>{greeting} 👋</div>
          <h1 style={{ fontFamily: T.serif, fontSize: isMobile ? 26 : 32, fontWeight: 700, color: C.text, margin: 0 }}>Halo, {firstName}!</h1>
          <p style={{ fontFamily: T.sans, fontSize: 13, color: C.muted, marginTop: 6 }}>
            No. Pendaftaran: <strong style={{ color: C.text }}>{regNo}</strong>
            {!isMobile && ` · Terakhir login: ${loginTime}`}
          </p>
          {isMobile && <p style={{ fontFamily: T.sans, fontSize: 12, color: C.muted, marginTop: 2 }}>Login: {loginTime}</p>}
        </div>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          {!isMobile && <Btn variant="outline" size="md" onClick={() => navigate('info')}>Info Pendaftaran</Btn>}
          <Btn size="md" onClick={() => navigate(getNextPage())}>
            Lanjutkan → {isMobile ? '' : steps[registrationStep]}
          </Btn>
        </div>
      </div>

      {/* Step tracker */}
      <Card style={{ padding: isMobile ? '20px 16px' : '28px 32px', marginBottom: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <SectionTitle size="sm">Progress Pendaftaran</SectionTitle>
          <Badge label={`${registrationStep + 1}/7`} variant="primary" dot />
        </div>
        <StepTracker steps={steps} current={registrationStep} />
        {registrationStep < 7 && (
          <div style={{ marginTop: 16, background: C.primaryLight, borderRadius: 10, padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 7, height: 7, borderRadius: '50%', background: C.primary, flexShrink: 0 }} />
            <span style={{ fontFamily: T.sans, fontSize: 13, color: C.primary }}>
              <strong>Berikutnya:</strong> {steps[registrationStep]}
            </span>
          </div>
        )}
      </Card>

      {/* Main grid */}
      <div style={{ display: 'grid', gridTemplateColumns: isSmall ? '1fr' : '2fr 1fr', gap: 20 }}>
        {/* Quick actions */}
        <div>
          <div style={{ fontFamily: T.sans, fontSize: 12, fontWeight: 600, color: C.muted, letterSpacing: 0.8, marginBottom: 12 }}>AKSI CEPAT</div>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 14 }}>
            {quickActions.map((action, i) => {
              const done = action.stepIdx !== -1 && registrationStep > action.stepIdx;
              const active = action.stepIdx === registrationStep;
              return (
                <Card key={i} onClick={() => navigate(action.page)} style={{ padding: isMobile ? 18 : 22, background: action.color, border: active ? `2px solid ${C.primary}` : `1px solid ${C.border}`, cursor: 'pointer' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                    <span style={{ fontSize: 24 }}>{action.icon}</span>
                    {done && (
                      <div style={{ width: 20, height: 20, borderRadius: '50%', background: C.success, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4l2.5 3L9 1" stroke="#fff" strokeWidth="1.8" strokeLinecap="round"/></svg>
                      </div>
                    )}
                    {active && <Badge label="Sekarang" variant="primary" dot />}
                  </div>
                  <div style={{ fontFamily: T.sans, fontSize: 14, fontWeight: 700, color: C.text, marginBottom: 3 }}>{action.label}</div>
                  <div style={{ fontFamily: T.sans, fontSize: 12, color: C.textSub, marginBottom: 14 }}>{action.sub}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ fontFamily: T.sans, fontSize: 12, fontWeight: 600, color: C.primary }}>{done ? 'Sudah selesai' : active ? 'Lanjutkan' : 'Buka'}</span>
                    <svg width="6" height="10" viewBox="0 0 6 10" fill="none"><path d="M1 1l4 4-4 4" stroke={C.primary} strokeWidth="1.8" strokeLinecap="round"/></svg>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Notifications */}
        <div>
          <div style={{ fontFamily: T.sans, fontSize: 12, fontWeight: 600, color: C.muted, letterSpacing: 0.8, marginBottom: 12 }}>NOTIFIKASI TERBARU</div>
          <Card style={{ padding: 0 }}>
            {notifications.map((n, i) => {
              const bgMap = { success: C.successLight, info: '#EEF3FF', warning: C.warningLight };
              return (
                <div key={i} style={{ padding: '14px 18px', borderBottom: i < notifications.length - 1 ? `1px solid ${C.border}` : 'none' }}>
                  <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                    <div style={{ width: 30, height: 30, borderRadius: 8, background: bgMap[n.type], display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, flexShrink: 0 }}>{n.icon}</div>
                    <div>
                      <div style={{ fontFamily: T.sans, fontSize: 13, fontWeight: 600, color: C.text }}>{n.title}</div>
                      <div style={{ fontFamily: T.sans, fontSize: 12, color: C.textSub, lineHeight: 1.5, marginTop: 2 }}>{n.msg}</div>
                      {n.time && n.time !== '-' && <div style={{ fontFamily: T.sans, fontSize: 11, color: C.muted, marginTop: 3 }}>{n.time}</div>}
                    </div>
                  </div>
                </div>
              );
            })}
          </Card>

          <div style={{ marginTop: 14, background: C.warningLight, borderRadius: 12, padding: '16px 18px', border: `1px solid ${C.warning}30` }}>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><circle cx="11" cy="11" r="9" fill={C.warning} opacity="0.15"/><path d="M11 7v4" stroke={C.warning} strokeWidth="2" strokeLinecap="round"/><circle cx="11" cy="14.5" r="1.2" fill={C.warning}/></svg>
              <div>
                <div style={{ fontFamily: T.sans, fontSize: 13, fontWeight: 700, color: '#8B5E00' }}>Batas Pendaftaran</div>
                <div style={{ fontFamily: T.sans, fontSize: 12, color: '#B87A0A' }}>31 Mei 2026 — segera lengkapi</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Demo reset */}
      <div style={{ marginTop: 40, paddingTop: 24, borderTop: `1px dashed ${C.border}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
        <div>
          <div style={{ fontFamily: T.sans, fontSize: 12, fontWeight: 600, color: C.muted, letterSpacing: 0.5, marginBottom: 3 }}>MODE DEMO</div>
          <div style={{ fontFamily: T.sans, fontSize: 13, color: C.muted }}>Reset semua progress untuk mencoba alur pendaftaran dari awal.</div>
        </div>
        <button
          onClick={onReset}
          style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '9px 16px', borderRadius: 10, border: `1.5px solid ${C.border}`, background: 'transparent', cursor: 'pointer', fontFamily: T.sans, fontSize: 13, fontWeight: 600, color: C.muted, transition: 'all 0.15s', flexShrink: 0 }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = C.error; e.currentTarget.style.color = C.error; e.currentTarget.style.background = C.errorLight; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.muted; e.currentTarget.style.background = 'transparent'; }}
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M2 8a6 6 0 1 0 1.5-3.9" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/>
            <path d="M2 4v4h4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Reset Demo
        </button>
      </div>
    </div>
  );
}
