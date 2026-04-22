import { C, T } from '../tokens';
import { Btn, Card, Badge, SectionTitle, StepTracker } from '../components';

export function PageDashboard({ navigate, registrationStep }) {
  const steps = ['Buat Akun', 'Isi Formulir', 'Upload Berkas', 'Pembayaran', 'Verifikasi', 'Seleksi', 'Pengumuman'];
  const hour = new Date().getHours();
  const greeting = hour < 11 ? 'Selamat Pagi' : hour < 15 ? 'Selamat Siang' : 'Selamat Sore';

  const quickActions = [
    { icon: '📝', label: 'Isi Formulir Data Diri', sub: 'Data pribadi, asal sekolah, pilihan prodi', page: 'form', stepIdx: 1, color: C.primaryLight },
    { icon: '📎', label: 'Upload Dokumen', sub: 'Ijazah, pasfoto, KK, SKL', page: 'upload', stepIdx: 2, color: '#EEF3FF' },
    { icon: '💳', label: 'Pembayaran', sub: 'Biaya pendaftaran Rp 250.000', page: 'payment', stepIdx: 3, color: C.warningLight },
    { icon: '📊', label: 'Status & Pengumuman', sub: 'Pantau progress pendaftaran', page: 'status', stepIdx: -1, color: C.successLight },
  ];

  const notifications = [
    { type: 'success', icon: '✅', title: 'Akun Dibuat', msg: 'Akun kamu berhasil dibuat dan diverifikasi.', time: '22 Apr 2026, 09.15' },
    { type: 'info', icon: '📋', title: 'Lengkapi Formulir', msg: 'Isi formulir data diri untuk melanjutkan ke tahap berikutnya.', time: '22 Apr 2026, 09.30' },
    { type: 'warning', icon: '⚠️', title: 'Batas Waktu', msg: 'Pendaftaran ditutup 31 Mei 2026. Segera lengkapi dokumenmu.', time: '22 Apr 2026, 10.00' },
  ];

  const getNextPage = () => {
    if (registrationStep === 1) return 'form';
    if (registrationStep === 2) return 'upload';
    if (registrationStep === 3) return 'payment';
    return 'status';
  };

  return (
    <div style={{ padding: '36px 40px', maxWidth: 1100, margin: '0 auto' }}>
      {/* Welcome header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 32 }}>
        <div>
          <div style={{ fontFamily: T.sans, fontSize: 13, color: C.muted, marginBottom: 4 }}>{greeting} 👋</div>
          <h1 style={{ fontFamily: T.serif, fontSize: 32, fontWeight: 700, color: C.text, margin: 0 }}>Halo, Stefanny!</h1>
          <p style={{ fontFamily: T.sans, fontSize: 14, color: C.muted, marginTop: 6 }}>
            No. Pendaftaran: <strong style={{ color: C.text }}>2026-05821</strong> · Terakhir login: 22 Apr 2026
          </p>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <Btn variant="outline" size="md" onClick={() => navigate('info')}>Info Pendaftaran</Btn>
          <Btn size="md" onClick={() => navigate(getNextPage())}>
            Lanjutkan → {steps[registrationStep]}
          </Btn>
        </div>
      </div>

      {/* Step tracker */}
      <Card style={{ padding: '28px 32px', marginBottom: 28 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <SectionTitle size="sm">Progress Pendaftaran</SectionTitle>
          <Badge label={`Langkah ${registrationStep + 1} dari 7`} variant="primary" dot />
        </div>
        <StepTracker steps={steps} current={registrationStep} />
        {registrationStep < 7 && (
          <div style={{ marginTop: 20, background: C.primaryLight, borderRadius: 10, padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: C.primary }} />
            <span style={{ fontFamily: T.sans, fontSize: 13, color: C.primary }}>
              <strong>Langkah berikutnya:</strong> {steps[registrationStep]} — klik kartu di bawah untuk melanjutkan
            </span>
          </div>
        )}
      </Card>

      {/* Main grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 24 }}>
        {/* Quick actions — 2×2 */}
        <div>
          <div style={{ fontFamily: T.sans, fontSize: 12, fontWeight: 600, color: C.muted, letterSpacing: 0.8, marginBottom: 14 }}>AKSI CEPAT</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {quickActions.map((action, i) => {
              const done = action.stepIdx !== -1 && registrationStep > action.stepIdx;
              const active = action.stepIdx === registrationStep;
              return (
                <Card key={i} onClick={() => navigate(action.page)} style={{ padding: 24, background: action.color, border: active ? `2px solid ${C.primary}` : `1px solid ${C.border}`, cursor: 'pointer' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
                    <span style={{ fontSize: 28 }}>{action.icon}</span>
                    {done && (
                      <div style={{ width: 22, height: 22, borderRadius: '50%', background: C.success, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4l2.5 3L9 1" stroke="#fff" strokeWidth="1.8" strokeLinecap="round"/></svg>
                      </div>
                    )}
                    {active && <Badge label="Sekarang" variant="primary" dot />}
                  </div>
                  <div style={{ fontFamily: T.sans, fontSize: 15, fontWeight: 700, color: C.text, marginBottom: 4 }}>{action.label}</div>
                  <div style={{ fontFamily: T.sans, fontSize: 12, color: C.textSub, marginBottom: 16 }}>{action.sub}</div>
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
          <div style={{ fontFamily: T.sans, fontSize: 12, fontWeight: 600, color: C.muted, letterSpacing: 0.8, marginBottom: 14 }}>NOTIFIKASI TERBARU</div>
          <Card style={{ padding: 0 }}>
            {notifications.map((n, i) => {
              const bgMap = { success: C.successLight, info: '#EEF3FF', warning: C.warningLight };
              return (
                <div key={i} style={{ padding: '16px 20px', borderBottom: i < notifications.length - 1 ? `1px solid ${C.border}` : 'none' }}>
                  <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                    <div style={{ width: 32, height: 32, borderRadius: 9, background: bgMap[n.type], display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, flexShrink: 0 }}>{n.icon}</div>
                    <div>
                      <div style={{ fontFamily: T.sans, fontSize: 13, fontWeight: 600, color: C.text }}>{n.title}</div>
                      <div style={{ fontFamily: T.sans, fontSize: 12, color: C.textSub, lineHeight: 1.5, marginTop: 2 }}>{n.msg}</div>
                      <div style={{ fontFamily: T.sans, fontSize: 11, color: C.muted, marginTop: 4 }}>{n.time}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </Card>

          <div style={{ marginTop: 16, background: C.warningLight, borderRadius: 14, padding: '18px 20px', border: `1px solid ${C.warning}30` }}>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" fill={C.warning} opacity="0.15"/><path d="M12 7v5" stroke={C.warning} strokeWidth="2" strokeLinecap="round"/><circle cx="12" cy="15.5" r="1.2" fill={C.warning}/></svg>
              <div>
                <div style={{ fontFamily: T.sans, fontSize: 14, fontWeight: 700, color: '#8B5E00' }}>Batas Pendaftaran</div>
                <div style={{ fontFamily: T.sans, fontSize: 13, color: '#B87A0A' }}>31 Mei 2026 — segera lengkapi dokumenmu</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
