import { useState } from 'react';
import { C, T } from '../tokens';
import { Btn, Card, Badge, SectionTitle } from '../components';
import { useBreakpoint } from '../hooks/useBreakpoint';

export function PageInfo({ navigate, isLoggedIn }) {
  const { isMobile, isTablet } = useBreakpoint();
  const isSmall = isMobile || isTablet;
  const [openFaq, setOpenFaq] = useState(null);

  const requirements = [
    'Ijazah SMA/SMK/MA atau Surat Keterangan Lulus',
    'Kartu Keluarga (KK)',
    'Akta Kelahiran',
    'Pas foto terbaru ukuran 3×4 (latar merah)',
    'KTP/NIK (jika sudah ada)',
    'Nilai rapor semester 4, 5, dan 6',
  ];

  const timelineItems = [
    { date: '1–31 Mei 2026', label: 'Pendaftaran Dibuka', active: true },
    { date: '1–5 Jun 2026', label: 'Verifikasi Berkas', active: false },
    { date: '6–10 Jun 2026', label: 'Pembayaran', active: false },
    { date: '11–14 Jun 2026', label: 'Seleksi', active: false },
    { date: '15 Jun 2026', label: 'Pengumuman', active: false },
  ];

  const steps7 = [
    { num: 1, title: 'Buat Akun', desc: 'Daftar dengan email & password aktif' },
    { num: 2, title: 'Isi Formulir', desc: 'Data diri, asal sekolah, pilihan prodi' },
    { num: 3, title: 'Upload Berkas', desc: 'Ijazah, pasfoto, KK, SKL' },
    { num: 4, title: 'Pembayaran', desc: 'Biaya pendaftaran Rp 250.000' },
    { num: 5, title: 'Verifikasi', desc: 'Tim kami memverifikasi berkasmu' },
    { num: 6, title: 'Seleksi', desc: 'Proses seleksi akademik & administrasi' },
    { num: 7, title: 'Pengumuman', desc: 'Cek hasil di halaman Status' },
  ];

  const faqs = [
    { q: 'Apakah pendaftaran bisa dilakukan lewat HP?', a: 'Ya! Sistem ini dirancang responsif. Kamu bisa mendaftar sepenuhnya lewat HP atau laptop tanpa harus ke kampus.' },
    { q: 'Format file apa yang diterima untuk upload?', a: 'File berupa JPG, PNG, atau PDF dengan ukuran maksimal 5 MB per dokumen. Pastikan foto jelas dan tidak buram.' },
    { q: 'Bagaimana cara tahu status pendaftaran?', a: 'Setelah login, kamu bisa pantau status di halaman "Status & Pengumuman". Kamu juga akan mendapat notifikasi jika ada update.' },
    { q: 'Apakah bisa mengganti pilihan program studi?', a: 'Pilihan prodi bisa diubah selama masa pendaftaran belum ditutup (sebelum 31 Mei 2026).' },
    { q: 'Berapa biaya pendaftaran?', a: 'Biaya pendaftaran sebesar Rp 250.000, dibayarkan melalui Transfer Bank, Virtual Account, atau QRIS.' },
    { q: 'Apakah ada beasiswa atau keringanan biaya?', a: 'Tersedia jalur afirmasi untuk calon mahasiswa dari keluarga kurang mampu. Hubungi bagian kemahasiswaan untuk info lebih lanjut.' },
  ];

  const heroPad = isMobile ? '80px 20px 40px' : isTablet ? '90px 32px 48px' : '100px 48px 56px';

  return (
    <div style={{ background: C.bg, minHeight: '100vh' }}>
      {/* Page hero */}
      <div style={{ background: 'linear-gradient(135deg, #2C2420 0%, #3d1f10 100%)', padding: heroPad }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.1)', borderRadius: 99, padding: '5px 14px', marginBottom: 16 }}>
            <span style={{ fontFamily: T.sans, fontSize: 12, color: 'rgba(255,255,255,0.7)', letterSpacing: 0.5 }}>INFO PENDAFTARAN</span>
          </div>
          <h1 style={{ fontFamily: T.serif, fontSize: isMobile ? 30 : isTablet ? 36 : 44, fontWeight: 700, color: '#fff', marginBottom: 12 }}>
            Semua yang Perlu Kamu Tahu
          </h1>
          <p style={{ fontFamily: T.sans, fontSize: isMobile ? 14 : 16, color: 'rgba(255,255,255,0.65)', maxWidth: 600, lineHeight: 1.7, marginBottom: 24 }}>
            Syarat pendaftaran, jadwal penting, alur 7 langkah, dan FAQ — semuanya di sini.
          </p>
          <Btn size={isMobile ? 'md' : 'lg'} onClick={() => navigate(isLoggedIn ? 'form' : 'auth')}>
            {isLoggedIn ? 'Lanjutkan Pendaftaran →' : 'Mulai Pendaftaran →'}
          </Btn>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: isMobile ? '36px 16px' : isTablet ? '44px 28px' : '56px 48px' }}>
        {/* 3-column grid → responsive */}
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : isTablet ? '1fr 1fr' : '1fr 1fr 1fr', gap: 20, marginBottom: 48 }}>
          {/* Requirements */}
          <Card style={{ padding: isMobile ? 20 : 28 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
              <div style={{ width: 38, height: 38, borderRadius: 11, background: C.primaryLight, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <svg width="17" height="17" viewBox="0 0 18 18" fill="none"><rect x="2" y="1" width="11" height="16" rx="2" stroke={C.primary} strokeWidth="1.7"/><path d="M5 6h7M5 9h5M5 12h3" stroke={C.primary} strokeWidth="1.5" strokeLinecap="round"/></svg>
              </div>
              <SectionTitle size="sm">Syarat Pendaftaran</SectionTitle>
            </div>
            {requirements.map((req, i) => (
              <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 11, alignItems: 'flex-start' }}>
                <div style={{ width: 18, height: 18, borderRadius: '50%', background: C.successLight, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 }}>
                  <svg width="9" height="7" viewBox="0 0 10 8" fill="none"><path d="M1 4l2.5 2.5L9 1" stroke={C.success} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <span style={{ fontFamily: T.sans, fontSize: 13, color: C.text, lineHeight: 1.5 }}>{req}</span>
              </div>
            ))}
          </Card>

          {/* Timeline */}
          <Card style={{ padding: isMobile ? 20 : 28 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
              <div style={{ width: 38, height: 38, borderRadius: 11, background: C.primaryLight, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <svg width="17" height="17" viewBox="0 0 18 18" fill="none"><rect x="2" y="3" width="14" height="13" rx="2" stroke={C.primary} strokeWidth="1.7"/><path d="M6 1.5v3M12 1.5v3M2 7.5h14" stroke={C.primary} strokeWidth="1.5" strokeLinecap="round"/></svg>
              </div>
              <SectionTitle size="sm">Jadwal Penting</SectionTitle>
            </div>
            <div style={{ position: 'relative', paddingLeft: 22 }}>
              <div style={{ position: 'absolute', left: 6, top: 8, bottom: 8, width: 2, background: C.border }} />
              {timelineItems.map((item, i) => (
                <div key={i} style={{ position: 'relative', marginBottom: 18 }}>
                  <div style={{ position: 'absolute', left: -22, top: 3, width: 13, height: 13, borderRadius: '50%', background: item.active ? C.primary : C.border, border: `2px solid ${item.active ? C.primary : C.border}`, boxShadow: item.active ? `0 0 0 3px ${C.primaryLight}` : 'none' }} />
                  <div style={{ fontFamily: T.sans, fontSize: 13, fontWeight: item.active ? 700 : 600, color: item.active ? C.primary : C.text }}>{item.label}</div>
                  <div style={{ fontFamily: T.sans, fontSize: 12, color: C.muted, marginTop: 1 }}>{item.date}</div>
                  {item.active && <Badge label="Sekarang" variant="primary" dot style={{ marginTop: 4 }} />}
                </div>
              ))}
            </div>
          </Card>

          {/* 7 Steps */}
          <Card style={{ padding: isMobile ? 20 : 28, gridColumn: isMobile ? '1' : isTablet ? '1 / -1' : 'auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
              <div style={{ width: 38, height: 38, borderRadius: 11, background: C.primaryLight, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <svg width="17" height="17" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="7.5" stroke={C.primary} strokeWidth="1.7"/><path d="M9 5v4l2.5 2" stroke={C.primary} strokeWidth="1.7" strokeLinecap="round"/></svg>
              </div>
              <SectionTitle size="sm">7 Langkah Pendaftaran</SectionTitle>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: isTablet ? '1fr 1fr' : '1fr', gap: isTablet ? '8px 20px' : 0 }}>
              {steps7.map((step, i) => (
                <div key={i} style={{ display: 'flex', gap: 12, marginBottom: isTablet ? 8 : 12, alignItems: 'flex-start' }}>
                  <div style={{ width: 26, height: 26, borderRadius: '50%', background: C.primaryLight, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <span style={{ fontFamily: T.serif, fontSize: 12, fontWeight: 700, color: C.primary }}>{step.num}</span>
                  </div>
                  <div>
                    <div style={{ fontFamily: T.sans, fontSize: 13, fontWeight: 700, color: C.text }}>{step.title}</div>
                    <div style={{ fontFamily: T.sans, fontSize: 12, color: C.muted }}>{step.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* FAQ */}
        <div>
          <SectionTitle size="md" sub="Pertanyaan yang sering ditanya" style={{ marginBottom: 20 }}>FAQ</SectionTitle>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 10 }}>
            {faqs.map((faq, i) => (
              <div key={i} style={{ background: C.card, borderRadius: 10, overflow: 'hidden', border: `1px solid ${C.border}`, boxShadow: '0 2px 6px rgba(44,44,44,0.04)' }}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 10, padding: '14px 18px', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}>
                  <span style={{ fontFamily: T.sans, fontSize: 13, fontWeight: 600, color: C.text, flex: 1, lineHeight: 1.4 }}>{faq.q}</span>
                  <svg width="11" height="7" viewBox="0 0 12 8" fill="none" style={{ transform: openFaq === i ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0 }}>
                    <path d="M1 1l5 5 5-5" stroke={C.muted} strokeWidth="1.8" strokeLinecap="round"/>
                  </svg>
                </button>
                {openFaq === i && (
                  <div style={{ padding: '12px 18px 16px', fontFamily: T.sans, fontSize: 13, color: C.textSub, lineHeight: 1.6, borderTop: `1px solid ${C.border}` }}>
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
