// pages-1-2.jsx — Landing + Info Pendaftaran

const { C, T, Btn, Card, Badge, Divider, SectionTitle, PageHeader, PageScroll } = window;

// ── PAGE 1: LANDING ──────────────────────────────────────────
function PageLanding({ navigate }) {
  const benefits = [
    { icon: '📋', title: 'Informasi Lengkap', desc: 'Semua syarat & jadwal dalam satu halaman' },
    { icon: '💻', title: 'Proses Online', desc: 'Daftar dari mana saja tanpa datang ke kampus' },
    { icon: '🔔', title: 'Pantau Real-Time', desc: 'Update status pendaftaran langsung di app' },
  ];

  return (
    <div style={{ background: C.bg, minHeight: '100%', overflowY: 'auto', WebkitOverflowScrolling: 'touch', paddingBottom: 40 }}>
      {/* Hero */}
      <div style={{
        background: `linear-gradient(160deg, #C1563A 0%, ${C.primary} 55%, #E8956A 100%)`,
        padding: '80px 24px 40px', position: 'relative', overflow: 'hidden',
      }}>
        {/* Decorative circles */}
        <div style={{ position: 'absolute', top: -40, right: -40, width: 180, height: 180, borderRadius: '50%', background: 'rgba(255,255,255,0.07)' }} />
        <div style={{ position: 'absolute', bottom: -20, left: -30, width: 120, height: 120, borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />
        <div style={{ position: 'relative', zIndex: 2 }}>
          {/* Logo badge */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.18)', borderRadius: 99, padding: '5px 14px', marginBottom: 20 }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#FFD580' }} />
            <span style={{ fontFamily: T.sans, fontSize: 11, color: '#fff', fontWeight: 600, letterSpacing: 0.5 }}>UNIVERSITAS NUSANTARA</span>
          </div>
          <h1 style={{ fontFamily: T.serif, fontSize: 28, fontWeight: 700, color: '#fff', lineHeight: 1.3, margin: '0 0 10px' }}>
            Mulai Perjalanan<br/>Akademikmu
          </h1>
          <p style={{ fontFamily: T.sans, fontSize: 14, color: 'rgba(255,255,255,0.85)', lineHeight: 1.6, margin: '0 0 28px', maxWidth: 280 }}>
            Sistem pendaftaran mahasiswa baru yang mudah, cepat, dan bisa kamu lakukan dari smartphone.
          </p>
          <div style={{ display: 'flex', gap: 10 }}>
            <Btn onClick={() => navigate('auth')} size="md" style={{ background: '#fff', color: C.primary, boxShadow: '0 4px 16px rgba(0,0,0,0.15)', borderRadius: 12, flex: 1 }}>
              Mulai Daftar
            </Btn>
            <Btn onClick={() => navigate('auth')} variant="outline" size="md" style={{ borderColor: 'rgba(255,255,255,0.6)', color: '#fff', borderRadius: 12, flex: 1 }}>
              Masuk Akun
            </Btn>
          </div>
        </div>
      </div>

      {/* Stats strip */}
      <div style={{ background: C.card, padding: '16px 0', borderBottom: `1px solid ${C.border}` }}>
        <div style={{ display: 'flex' }}>
          {[['2.400+', 'Kursi Tersedia'], ['42', 'Program Studi'], ['98%', 'Diterima Online']].map(([num, label], i) => (
            <div key={i} style={{ flex: 1, textAlign: 'center', borderRight: i < 2 ? `1px solid ${C.border}` : 'none', padding: '4px 0' }}>
              <div style={{ fontFamily: T.serif, fontSize: 20, fontWeight: 700, color: C.primary }}>{num}</div>
              <div style={{ fontFamily: T.sans, fontSize: 11, color: C.muted, marginTop: 2 }}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Benefits */}
      <div style={{ padding: '24px 16px 16px' }}>
        <SectionTitle sub="Kenapa daftar di sini?">Keunggulan Sistem</SectionTitle>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 14 }}>
          {benefits.map((b, i) => (
            <div key={i} style={{
              background: C.card, borderRadius: 14, padding: '14px 16px',
              display: 'flex', alignItems: 'center', gap: 14,
              boxShadow: '0 2px 10px rgba(44,44,44,0.06)', border: `1px solid ${C.border}`,
            }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: C.primaryLight, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>
                {b.icon}
              </div>
              <div>
                <div style={{ fontFamily: T.sans, fontSize: 14, fontWeight: 700, color: C.text }}>{b.title}</div>
                <div style={{ fontFamily: T.sans, fontSize: 12, color: C.muted, marginTop: 2 }}>{b.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Info link */}
      <div style={{ padding: '8px 16px' }}>
        <div onClick={() => navigate('info')} style={{
          background: `linear-gradient(135deg, ${C.successLight}, #F0F7E8)`,
          borderRadius: 14, padding: '16px', cursor: 'pointer',
          border: `1px solid ${C.success}30`, display: 'flex', alignItems: 'center', gap: 12,
        }}>
          <div style={{ width: 40, height: 40, borderRadius: 10, background: C.success, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="7.5" stroke="#fff" strokeWidth="1.8"/><path d="M9 8.5v4" stroke="#fff" strokeWidth="1.8" strokeLinecap="round"/><circle cx="9" cy="6" r="1" fill="#fff"/></svg>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: T.sans, fontSize: 14, fontWeight: 700, color: C.text }}>Lihat Info Pendaftaran</div>
            <div style={{ fontFamily: T.sans, fontSize: 12, color: C.textSub, marginTop: 1 }}>Syarat, jadwal & langkah-langkah pendaftaran</div>
          </div>
          <svg width="8" height="14" viewBox="0 0 8 14" fill="none"><path d="M1 1l6 6-6 6" stroke={C.success} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </div>
      </div>

      {/* Timeline teaser */}
      <div style={{ padding: '16px 16px 0' }}>
        <div style={{ fontFamily: T.sans, fontSize: 13, fontWeight: 600, color: C.textSub, letterSpacing: 0.4, marginBottom: 10 }}>JADWAL PENTING</div>
        {[
          { date: '1–31 Mei 2025', event: 'Pendaftaran Dibuka', status: 'active' },
          { date: '5–10 Jun 2025', event: 'Verifikasi Berkas', status: 'upcoming' },
          { date: '15 Jun 2025', event: 'Pengumuman Hasil', status: 'upcoming' },
        ].map((item, i) => (
          <div key={i} style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 20 }}>
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: item.status === 'active' ? C.primary : C.border, flexShrink: 0, marginTop: 3 }} />
              {i < 2 && <div style={{ width: 2, height: 24, background: C.border, marginTop: 3 }} />}
            </div>
            <div style={{ flex: 1, paddingBottom: 4 }}>
              <div style={{ fontFamily: T.sans, fontSize: 13, fontWeight: 600, color: item.status === 'active' ? C.primary : C.text }}>{item.event}</div>
              <div style={{ fontFamily: T.sans, fontSize: 11, color: C.muted }}>{item.date}</div>
            </div>
            {item.status === 'active' && <Badge label="Sekarang" variant="primary" dot />}
          </div>
        ))}
      </div>
    </div>
  );
}

// ── PAGE 2: INFO PENDAFTARAN ──────────────────────────────────
function PageInfo({ navigate }) {
  const [openFaq, setOpenFaq] = React.useState(null);

  const requirements = [
    'Ijazah SMA/SMK/MA atau Surat Keterangan Lulus',
    'Kartu Keluarga (KK)',
    'Akta Kelahiran',
    'Pas foto terbaru ukuran 3×4 (latar merah)',
    'KTP/NIK (jika sudah ada)',
    'Nilai rapor semester 4, 5, dan 6',
  ];

  const timelineItems = [
    { date: '1 Mei', label: 'Pendaftaran Dibuka', color: C.primary },
    { date: '31 Mei', label: 'Batas Pendaftaran', color: C.warning },
    { date: '1–5 Jun', label: 'Verifikasi Berkas', color: C.primary },
    { date: '10 Jun', label: 'Pembayaran', color: C.primary },
    { date: '15 Jun', label: 'Pengumuman', color: C.success },
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
    { q: 'Apakah pendaftaran bisa dilakukan lewat HP?', a: 'Ya! Sistem ini dirancang khusus untuk smartphone. Kamu bisa mendaftar sepenuhnya lewat HP tanpa harus ke kampus.' },
    { q: 'Format file apa yang diterima untuk upload?', a: 'File berupa JPG, PNG, atau PDF dengan ukuran maksimal 5 MB per dokumen. Pastikan foto jelas dan tidak buram.' },
    { q: 'Bagaimana cara tahu status pendaftaran saya?', a: 'Setelah login, kamu bisa pantau status di halaman "Status & Pengumuman". Kamu juga akan dapat notifikasi jika ada update.' },
    { q: 'Apakah bisa mengganti pilihan program studi?', a: 'Pilihan prodi bisa diubah selama masa pendaftaran belum ditutup (sebelum 31 Mei 2025).' },
    { q: 'Berapa biaya pendaftaran?', a: 'Biaya pendaftaran sebesar Rp 250.000 (dua ratus lima puluh ribu rupiah), dibayarkan melalui Transfer Bank, Virtual Account, atau QRIS.' },
  ];

  return (
    <div style={{ background: C.bg, height: '100%', display: 'flex', flexDirection: 'column' }}>
      <PageHeader title="Info Pendaftaran" subtitle="Semua info dalam satu halaman" onBack={() => navigate('landing')} />
      <div style={{ flex: 1, overflowY: 'auto', WebkitOverflowScrolling: 'touch', paddingBottom: 32 }}>

        {/* Requirements */}
        <div style={{ padding: '20px 16px 0' }}>
          <SectionTitle sub="Siapkan dokumen-dokumen berikut">Syarat Pendaftaran</SectionTitle>
          <div style={{ marginTop: 12, background: C.card, borderRadius: 14, overflow: 'hidden', boxShadow: '0 2px 10px rgba(44,44,44,0.06)', border: `1px solid ${C.border}` }}>
            {requirements.map((req, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'flex-start', gap: 12, padding: '12px 16px',
                borderBottom: i < requirements.length - 1 ? `1px solid ${C.border}` : 'none',
              }}>
                <div style={{ width: 20, height: 20, borderRadius: '50%', background: C.successLight, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
                  <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4l2.5 2.5L9 1" stroke={C.success} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <span style={{ fontFamily: T.sans, fontSize: 13, color: C.text, lineHeight: 1.5 }}>{req}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div style={{ padding: '20px 16px 0' }}>
          <SectionTitle sub="Tahun Akademik 2025/2026">Jadwal Penting</SectionTitle>
          <div style={{ marginTop: 14, position: 'relative', paddingLeft: 28 }}>
            <div style={{ position: 'absolute', left: 9, top: 10, bottom: 10, width: 2, background: C.border }} />
            {timelineItems.map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 14, marginBottom: 16, position: 'relative' }}>
                <div style={{ width: 20, height: 20, borderRadius: '50%', background: item.color, flexShrink: 0, position: 'absolute', left: -28, top: 2, boxShadow: `0 2px 6px ${item.color}50` }} />
                <div>
                  <div style={{ fontFamily: T.sans, fontSize: 13, fontWeight: 700, color: C.text }}>{item.label}</div>
                  <div style={{ fontFamily: T.sans, fontSize: 12, color: C.muted }}>{item.date} 2025</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 7 Steps */}
        <div style={{ padding: '20px 16px 0' }}>
          <SectionTitle sub="Ikuti langkah ini dengan urut">Alur Pendaftaran (7 Langkah)</SectionTitle>
          <div style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 10 }}>
            {steps7.map((step, i) => (
              <div key={i} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                <div style={{
                  width: 36, height: 36, borderRadius: '50%', background: C.primaryLight,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                }}>
                  <span style={{ fontFamily: T.serif, fontSize: 15, fontWeight: 700, color: C.primary }}>{step.num}</span>
                </div>
                <div style={{ flex: 1, paddingTop: 4 }}>
                  <div style={{ fontFamily: T.sans, fontSize: 14, fontWeight: 700, color: C.text }}>{step.title}</div>
                  <div style={{ fontFamily: T.sans, fontSize: 12, color: C.muted, marginTop: 2 }}>{step.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div style={{ padding: '20px 16px 0' }}>
          <SectionTitle sub="Pertanyaan yang sering ditanya">FAQ</SectionTitle>
          <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 8 }}>
            {faqs.map((faq, i) => (
              <div key={i} style={{
                background: C.card, borderRadius: 12, overflow: 'hidden',
                boxShadow: '0 2px 8px rgba(44,44,44,0.05)', border: `1px solid ${C.border}`,
              }}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{
                  width: '100%', display: 'flex', alignItems: 'center', gap: 12,
                  padding: '14px 14px', background: 'none', border: 'none', cursor: 'pointer',
                  textAlign: 'left', WebkitTapHighlightColor: 'transparent',
                }}>
                  <span style={{ fontFamily: T.sans, fontSize: 13, fontWeight: 600, color: C.text, flex: 1, lineHeight: 1.4 }}>{faq.q}</span>
                  <svg width="12" height="8" viewBox="0 0 12 8" fill="none" style={{ transform: openFaq === i ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0 }}>
                    <path d="M1 1l5 5 5-5" stroke={C.muted} strokeWidth="1.8" strokeLinecap="round"/>
                  </svg>
                </button>
                {openFaq === i && (
                  <div style={{ padding: '0 14px 14px', fontFamily: T.sans, fontSize: 13, color: C.textSub, lineHeight: 1.6, borderTop: `1px solid ${C.border}`, paddingTop: 12 }}>
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div style={{ padding: '24px 16px 0' }}>
          <Btn fullWidth size="lg" onClick={() => navigate('auth')}>
            Mulai Pendaftaran →
          </Btn>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { PageLanding, PageInfo });
