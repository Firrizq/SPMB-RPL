import { C, T } from '../tokens';
import { Btn, Card, Badge, SectionTitle, StepTracker, PageHeader } from '../components';
import { useBreakpoint } from '../hooks/useBreakpoint';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
const fmtDate = (iso) => {
  if (!iso) return null;
  const d = new Date(iso);
  return `${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()}, ${String(d.getHours()).padStart(2,'0')}.${String(d.getMinutes()).padStart(2,'0')}`;
};

const PRODI_LABELS = {
  'teknik-informatika': 'Teknik Informatika', 'sistem-informasi': 'Sistem Informasi',
  'ilmu-komunikasi': 'Ilmu Komunikasi', 'manajemen': 'Manajemen',
  'akuntansi': 'Akuntansi', 'psikologi': 'Psikologi',
  'hukum': 'Ilmu Hukum', 'kedokteran': 'Pendidikan Dokter',
};

export function PageStatus({ navigate, registrationStep, userData, stepDates, formData }) {
  const { isMobile, isTablet } = useBreakpoint();
  const isSmall = isMobile || isTablet;

  const firstName = userData?.name?.split(' ')[0] || 'Kamu';
  const prodiLabel = PRODI_LABELS[formData?.prodi1] || (formData?.prodi1 || 'Belum dipilih');

  const steps = [
    { label: 'Buat Akun', desc: 'Akun berhasil dibuat dan diverifikasi email' },
    { label: 'Isi Formulir', desc: 'Data diri dan pilihan prodi tersimpan' },
    { label: 'Upload Berkas', desc: 'Ijazah, pasfoto, KK, Surat Keterangan Lulus' },
    { label: 'Pembayaran', desc: 'Biaya pendaftaran Rp 250.000' },
    { label: 'Verifikasi Berkas', desc: 'Tim admin memeriksa kelengkapan dokumen' },
    { label: 'Proses Seleksi', desc: 'Seleksi akademik dan administrasi' },
    { label: 'Pengumuman', desc: 'Hasil seleksi resmi diumumkan' },
  ];

  const getStepDate = (i) => {
    if (i <= 3 && stepDates[i]) return fmtDate(stepDates[i]);
    if (i === 6) return '15 Jun 2026';
    return null;
  };

  const getStatus = (i) => i < registrationStep ? 'done' : i === registrationStep ? 'current' : 'pending';

  const notifications = [
    ...(stepDates[0] ? [{ title: 'Akun Dibuat', msg: `Selamat datang, ${firstName}! Akun kamu berhasil diverifikasi.`, time: fmtDate(stepDates[0]), type: 'success' }] : []),
    ...(stepDates[1] ? [{ title: 'Formulir Tersimpan', msg: 'Data diri dan pilihan program studi berhasil disimpan.', time: fmtDate(stepDates[1]), type: 'success' }] : []),
    ...(stepDates[2] ? [{ title: 'Dokumen Terupload', msg: 'Semua dokumen berhasil diupload dan menunggu verifikasi admin.', time: fmtDate(stepDates[2]), type: 'success' }] : []),
    ...(stepDates[3] ? [{ title: 'Pembayaran Diterima', msg: 'Pembayaran Rp 250.000 dikonfirmasi. Pendaftaran sedang diproses.', time: fmtDate(stepDates[3]), type: 'success' }] : []),
    ...(!stepDates[2] ? [{ title: 'Dokumen Dibutuhkan', msg: 'Segera upload dokumen pendukung untuk melanjutkan proses.', time: null, type: 'info' }] : []),
  ].slice(0, 4);

  const pad = isMobile ? '20px 16px' : isTablet ? '24px 20px' : '36px 40px';

  // Right side panel
  const rightPanel = (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <div style={{ background: registrationStep >= 6 ? `linear-gradient(135deg, ${C.success}, #5A8A5E)` : `linear-gradient(135deg, ${C.primary}, #B85A35)`, borderRadius: 14, padding: '22px', textAlign: 'center' }}>
        {registrationStep >= 6 ? (
          <>
            <div style={{ fontSize: 36, marginBottom: 8 }}>🎉</div>
            <div style={{ fontFamily: T.serif, fontSize: 20, fontWeight: 700, color: '#fff', marginBottom: 5 }}>Selamat Diterima!</div>
            <div style={{ fontFamily: T.sans, fontSize: 13, color: 'rgba(255,255,255,0.85)' }}>{prodiLabel}</div>
          </>
        ) : (
          <>
            <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'rgba(255,255,255,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="#fff" strokeWidth="2"/><path d="M12 8v5l3 2" stroke="#fff" strokeWidth="2" strokeLinecap="round"/></svg>
            </div>
            <div style={{ fontFamily: T.serif, fontSize: 17, fontWeight: 700, color: '#fff', marginBottom: 4 }}>Dalam Proses</div>
            <div style={{ fontFamily: T.sans, fontSize: 12, color: 'rgba(255,255,255,0.8)' }}>Pengumuman: 15 Juni 2026</div>
          </>
        )}
      </div>

      <Card style={{ padding: 0 }}>
        <div style={{ padding: '12px 18px', borderBottom: `1px solid ${C.border}` }}>
          <div style={{ fontFamily: T.sans, fontSize: 13, fontWeight: 700, color: C.text }}>Riwayat Notifikasi</div>
        </div>
        {notifications.length === 0 ? (
          <div style={{ padding: '18px', fontFamily: T.sans, fontSize: 13, color: C.muted, textAlign: 'center' }}>Belum ada notifikasi</div>
        ) : notifications.map((n, i) => (
          <div key={i} style={{ padding: '12px 18px', borderBottom: i < notifications.length - 1 ? `1px solid ${C.border}` : 'none', display: 'flex', gap: 10 }}>
            <div style={{ width: 7, height: 7, borderRadius: '50%', background: n.type === 'success' ? C.success : C.primary, marginTop: 5, flexShrink: 0 }} />
            <div>
              <div style={{ fontFamily: T.sans, fontSize: 13, fontWeight: 600, color: C.text }}>{n.title}</div>
              <div style={{ fontFamily: T.sans, fontSize: 12, color: C.textSub, marginTop: 1, lineHeight: 1.5 }}>{n.msg}</div>
              {n.time && <div style={{ fontFamily: T.sans, fontSize: 11, color: C.muted, marginTop: 3 }}>{n.time}</div>}
            </div>
          </div>
        ))}
      </Card>

      {registrationStep < 2 && <Btn fullWidth size="md" onClick={() => navigate('upload')}>Upload Dokumen →</Btn>}
      {registrationStep === 2 && <Btn fullWidth size="md" onClick={() => navigate('payment')}>Lanjut ke Pembayaran →</Btn>}
    </div>
  );

  return (
    <div style={{ padding: pad, maxWidth: 1100, margin: '0 auto' }}>
      <PageHeader title="Status & Pengumuman" subtitle={isMobile ? '' : 'Pantau perkembangan pendaftaranmu secara real-time'} breadcrumb="Dashboard / Status & Pengumuman" />

      <Card style={{ padding: isMobile ? '18px 16px' : '24px 28px', marginBottom: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <SectionTitle size="sm">Alur Pendaftaran</SectionTitle>
          <Badge label={`${registrationStep + 1}/7`} variant={registrationStep >= 6 ? 'success' : 'primary'} dot />
        </div>
        <StepTracker steps={steps.map(s => s.label)} current={registrationStep} />
      </Card>

      {/* On mobile: right panel first (status card + notifications) */}
      {isSmall && <div style={{ marginBottom: 20 }}>{rightPanel}</div>}

      <div style={{ display: 'grid', gridTemplateColumns: isSmall ? '1fr' : '1fr 340px', gap: 20 }}>
        {/* Timeline detail */}
        <div>
          <div style={{ fontFamily: T.sans, fontSize: 12, fontWeight: 600, color: C.muted, letterSpacing: 0.8, marginBottom: 12 }}>DETAIL SETIAP LANGKAH</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {steps.map((step, i) => {
              const status = getStatus(i);
              const dotColor = status === 'done' ? C.success : status === 'current' ? C.primary : C.border;
              const bgColor = status === 'done' ? C.successLight : status === 'current' ? C.primaryLight : C.card;
              const stepDate = getStepDate(i);
              return (
                <div key={i} style={{ background: bgColor, borderRadius: 10, padding: isMobile ? '12px 14px' : '14px 18px', border: `1px solid ${status === 'current' ? C.primary + '40' : status === 'done' ? C.success + '30' : C.border}`, display: 'flex', gap: 12, alignItems: 'center' }}>
                  <div style={{ width: 32, height: 32, borderRadius: '50%', background: dotColor, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    {status === 'done' ? (
                      <svg width="13" height="10" viewBox="0 0 14 11" fill="none"><path d="M1.5 5.5l4 4L12.5 1" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    ) : status === 'current' ? (
                      <div style={{ width: 9, height: 9, borderRadius: '50%', background: '#fff' }} />
                    ) : (
                      <span style={{ fontFamily: T.sans, fontSize: 11, fontWeight: 700, color: C.muted }}>{i + 1}</span>
                    )}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontFamily: T.sans, fontSize: 13, fontWeight: 700, color: C.text }}>{step.label}</div>
                    {!isMobile && <div style={{ fontFamily: T.sans, fontSize: 12, color: C.muted, marginTop: 1 }}>{step.desc}</div>}
                  </div>
                  <div style={{ textAlign: 'right', flexShrink: 0 }}>
                    {status === 'done' && <Badge label="Selesai" variant="success" dot />}
                    {status === 'current' && <Badge label={isMobile ? 'Aktif' : 'Sedang berlangsung'} variant="primary" dot />}
                    {status === 'pending' && <span style={{ fontFamily: T.sans, fontSize: 11, color: C.muted }}>Menunggu</span>}
                    {stepDate && <div style={{ fontFamily: T.sans, fontSize: 10, color: C.muted, marginTop: 3 }}>📅 {stepDate}</div>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right panel — desktop only */}
        {!isSmall && rightPanel}
      </div>
    </div>
  );
}
