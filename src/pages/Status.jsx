import { C, T } from '../tokens';
import { Btn, Card, Badge, SectionTitle, StepTracker, PageHeader } from '../components';

export function PageStatus({ navigate, registrationStep }) {
  const steps = [
    { label: 'Buat Akun', date: '22 Apr 2026', desc: 'Akun berhasil dibuat dan diverifikasi email' },
    { label: 'Isi Formulir', date: '22 Apr 2026', desc: 'Data diri dan pilihan prodi tersimpan' },
    { label: 'Upload Berkas', date: '-', desc: 'Ijazah, pasfoto, KK, Surat Keterangan Lulus' },
    { label: 'Pembayaran', date: '-', desc: 'Biaya pendaftaran Rp 250.000' },
    { label: 'Verifikasi Berkas', date: '-', desc: 'Tim admin memeriksa kelengkapan dokumen' },
    { label: 'Proses Seleksi', date: '-', desc: 'Seleksi akademik dan administrasi' },
    { label: 'Pengumuman', date: '15 Jun 2026', desc: 'Hasil seleksi resmi diumumkan' },
  ];

  const getStatus = (i) => i < registrationStep ? 'done' : i === registrationStep ? 'current' : 'pending';

  const notifications = [
    { title: 'Akun Dibuat', msg: 'Selamat datang, Stefanny! Akun kamu berhasil diverifikasi.', time: '22 Apr 2026, 09.15', type: 'success' },
    { title: 'Formulir Tersimpan', msg: 'Data diri dan pilihan program studi berhasil disimpan.', time: '22 Apr 2026, 09.42', type: 'success' },
    { title: 'Ingatkan Upload', msg: 'Segera upload dokumen pendukung untuk melanjutkan.', time: '22 Apr 2026, 10.00', type: 'info' },
  ];

  return (
    <div style={{ padding: '36px 40px', maxWidth: 1100, margin: '0 auto' }}>
      <PageHeader title="Status & Pengumuman" subtitle="Pantau perkembangan pendaftaranmu secara real-time" breadcrumb="Dashboard / Status & Pengumuman" />

      {/* Horizontal step tracker */}
      <Card style={{ padding: '28px 32px', marginBottom: 28 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <SectionTitle size="sm">Alur Pendaftaran</SectionTitle>
          <Badge label={`Langkah ${registrationStep + 1}/7 — ${steps[registrationStep]?.label}`} variant={registrationStep >= 6 ? 'success' : 'primary'} dot />
        </div>
        <StepTracker steps={steps.map(s => s.label)} current={registrationStep} />
      </Card>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 24 }}>
        {/* Timeline detail */}
        <div>
          <div style={{ fontFamily: T.sans, fontSize: 12, fontWeight: 600, color: C.muted, letterSpacing: 0.8, marginBottom: 14 }}>DETAIL SETIAP LANGKAH</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {steps.map((step, i) => {
              const status = getStatus(i);
              const dotColor = status === 'done' ? C.success : status === 'current' ? C.primary : C.border;
              const bgColor = status === 'done' ? C.successLight : status === 'current' ? C.primaryLight : C.card;
              return (
                <div key={i} style={{ background: bgColor, borderRadius: 12, padding: '16px 20px', border: `1px solid ${status === 'current' ? C.primary + '40' : status === 'done' ? C.success + '30' : C.border}`, display: 'flex', gap: 16, alignItems: 'center' }}>
                  <div style={{ width: 36, height: 36, borderRadius: '50%', background: dotColor, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: status !== 'pending' ? `0 3px 10px ${dotColor}50` : 'none' }}>
                    {status === 'done' ? (
                      <svg width="14" height="11" viewBox="0 0 14 11" fill="none"><path d="M1.5 5.5l4 4L12.5 1" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    ) : status === 'current' ? (
                      <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#fff' }} />
                    ) : (
                      <span style={{ fontFamily: T.sans, fontSize: 12, fontWeight: 700, color: C.muted }}>{i + 1}</span>
                    )}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: T.sans, fontSize: 14, fontWeight: 700, color: C.text }}>{step.label}</div>
                    <div style={{ fontFamily: T.sans, fontSize: 13, color: C.muted, marginTop: 2 }}>{step.desc}</div>
                  </div>
                  <div style={{ textAlign: 'right', flexShrink: 0 }}>
                    {status === 'done' && <Badge label="Selesai" variant="success" dot />}
                    {status === 'current' && <Badge label="Sedang berlangsung" variant="primary" dot />}
                    {status === 'pending' && <span style={{ fontFamily: T.sans, fontSize: 12, color: C.muted }}>Menunggu</span>}
                    {step.date !== '-' && <div style={{ fontFamily: T.sans, fontSize: 11, color: C.muted, marginTop: 4 }}>📅 {step.date}</div>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Result card */}
          <div style={{ background: registrationStep >= 6 ? `linear-gradient(135deg, ${C.success}, #5A8A5E)` : `linear-gradient(135deg, ${C.primary}, #B85A35)`, borderRadius: 16, padding: '24px', textAlign: 'center' }}>
            {registrationStep >= 6 ? (
              <>
                <div style={{ fontSize: 40, marginBottom: 10 }}>🎉</div>
                <div style={{ fontFamily: T.serif, fontSize: 22, fontWeight: 700, color: '#fff', marginBottom: 6 }}>Selamat Diterima!</div>
                <div style={{ fontFamily: T.sans, fontSize: 13, color: 'rgba(255,255,255,0.85)' }}>Program Studi Teknik Informatika</div>
              </>
            ) : (
              <>
                <div style={{ width: 52, height: 52, borderRadius: '50%', background: 'rgba(255,255,255,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="#fff" strokeWidth="2"/><path d="M12 8v5l3 2" stroke="#fff" strokeWidth="2" strokeLinecap="round"/></svg>
                </div>
                <div style={{ fontFamily: T.serif, fontSize: 18, fontWeight: 700, color: '#fff', marginBottom: 6 }}>Dalam Proses</div>
                <div style={{ fontFamily: T.sans, fontSize: 13, color: 'rgba(255,255,255,0.8)' }}>Pengumuman: 15 Juni 2026</div>
              </>
            )}
          </div>

          {/* Notification history */}
          <Card style={{ padding: 0 }}>
            <div style={{ padding: '14px 20px', borderBottom: `1px solid ${C.border}` }}>
              <div style={{ fontFamily: T.sans, fontSize: 13, fontWeight: 700, color: C.text }}>Riwayat Notifikasi</div>
            </div>
            {notifications.map((n, i) => (
              <div key={i} style={{ padding: '14px 20px', borderBottom: i < notifications.length - 1 ? `1px solid ${C.border}` : 'none', display: 'flex', gap: 12 }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: n.type === 'success' ? C.success : C.primary, marginTop: 5, flexShrink: 0 }} />
                <div>
                  <div style={{ fontFamily: T.sans, fontSize: 13, fontWeight: 600, color: C.text }}>{n.title}</div>
                  <div style={{ fontFamily: T.sans, fontSize: 12, color: C.textSub, marginTop: 2, lineHeight: 1.5 }}>{n.msg}</div>
                  <div style={{ fontFamily: T.sans, fontSize: 11, color: C.muted, marginTop: 4 }}>{n.time}</div>
                </div>
              </div>
            ))}
          </Card>

          {registrationStep < 2 && <Btn fullWidth size="md" onClick={() => navigate('upload')}>Upload Dokumen →</Btn>}
          {registrationStep === 2 && <Btn fullWidth size="md" onClick={() => navigate('payment')}>Lanjut ke Pembayaran →</Btn>}
        </div>
      </div>
    </div>
  );
}
