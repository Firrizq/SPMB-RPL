// desktop-pages-1-2.jsx — Landing + Info Pendaftaran (desktop)

const { C, T, Btn, Card, Badge, Divider, SectionTitle, TopNav } = window;

function PageLanding({ navigate }) {
  const benefits = [
    { icon: '📋', title: 'Informasi Lengkap', desc: 'Semua syarat, jadwal, dan alur pendaftaran tersedia dalam satu halaman — tidak perlu cari ke mana-mana.' },
    { icon: '💻', title: 'Proses 100% Online', desc: 'Daftar, isi formulir, upload berkas, dan bayar dari mana saja tanpa perlu datang ke kampus.' },
    { icon: '🔔', title: 'Pantau Status Real-Time', desc: 'Lihat perkembangan pendaftaranmu secara langsung dan dapatkan notifikasi setiap ada update.' },
  ];
  const stats = [['2.400+','Kursi Tersedia'],['42','Program Studi'],['7','Langkah Mudah'],['98%','Proses Online']];
  const timeline = [
    { date: '1–31 Mei 2026', event: 'Pendaftaran Dibuka', status: 'active' },
    { date: '1–5 Jun 2026', event: 'Verifikasi Berkas', status: 'upcoming' },
    { date: '10 Jun 2026', event: 'Pembayaran', status: 'upcoming' },
    { date: '15 Jun 2026', event: 'Pengumuman Hasil', status: 'upcoming' },
  ];

  return (
    <div style={{ background: C.bg, minHeight: '100vh' }}>
      {/* Hero — full viewport width */}
      <div style={{ background: `linear-gradient(135deg, #1e1108 0%, #3d1f10 35%, ${C.primary} 65%, #E8956A 100%)`, minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
        {/* Decorative circles */}
        <div style={{ position: 'absolute', top: -100, right: -100, width: 500, height: 500, borderRadius: '50%', background: 'rgba(255,255,255,0.04)' }} />
        <div style={{ position: 'absolute', bottom: -80, left: '40%', width: 300, height: 300, borderRadius: '50%', background: 'rgba(255,255,255,0.03)' }} />
        <div style={{ position: 'absolute', top: '30%', left: '-5%', width: 200, height: 200, borderRadius: '50%', background: 'rgba(255,255,255,0.02)' }} />

        {/* Navbar area (transparent on hero) */}
        <div style={{ height: 64 }} />

        {/* Hero content */}
        <div style={{ flex: 1, maxWidth: 1200, margin: '0 auto', padding: '0 48px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center', width: '100%' }}>
          {/* Left: text */}
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.12)', borderRadius: 99, padding: '6px 16px', marginBottom: 24 }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#FFD580' }} />
              <span style={{ fontFamily: T.sans, fontSize: 12, color: 'rgba(255,255,255,0.9)', fontWeight: 600, letterSpacing: 0.5 }}>PENERIMAAN MAHASISWA BARU 2026/2027</span>
            </div>
            <h1 style={{ fontFamily: T.serif, fontSize: 52, fontWeight: 800, color: '#fff', lineHeight: 1.15, margin: '0 0 20px', textShadow: '0 2px 20px rgba(0,0,0,0.2)' }}>
              Mulai Perjalanan<br/>Akademikmu di<br/><span style={{ color: '#FFD580' }}>Universitas Nusantara</span>
            </h1>
            <p style={{ fontFamily: T.sans, fontSize: 16, color: 'rgba(255,255,255,0.75)', lineHeight: 1.7, margin: '0 0 36px', maxWidth: 460 }}>
              Sistem pendaftaran yang mudah, transparan, dan bisa diselesaikan sepenuhnya secara online. Tidak perlu antre, tidak perlu bingung.
            </p>
            <div style={{ display: 'flex', gap: 16 }}>
              <Btn size="xl" onClick={() => navigate('auth')} style={{ background: '#fff', color: C.primary, boxShadow: '0 8px 32px rgba(0,0,0,0.2)' }}>
                Mulai Daftar Sekarang →
              </Btn>
              <Btn variant="outline" size="xl" onClick={() => navigate('info')} style={{ borderColor: 'rgba(255,255,255,0.5)', color: '#fff' }}>
                Lihat Info Pendaftaran
              </Btn>
            </div>
          </div>

          {/* Right: info card stack */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 20, padding: '24px' }}>
              <div style={{ fontFamily: T.sans, fontSize: 12, color: 'rgba(255,255,255,0.6)', fontWeight: 600, letterSpacing: 0.5, marginBottom: 12 }}>JADWAL PENDAFTARAN</div>
              {timeline.map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: i < timeline.length - 1 ? 12 : 0 }}>
                  <div style={{ width: 10, height: 10, borderRadius: '50%', background: item.status === 'active' ? '#FFD580' : 'rgba(255,255,255,0.3)', flexShrink: 0 }} />
                  <div style={{ flex: 1, fontFamily: T.sans, fontSize: 14, color: item.status === 'active' ? '#fff' : 'rgba(255,255,255,0.6)', fontWeight: item.status === 'active' ? 600 : 400 }}>{item.event}</div>
                  <div style={{ fontFamily: T.sans, fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>{item.date}</div>
                  {item.status === 'active' && <Badge label="Sekarang" variant="warning" />}
                </div>
              ))}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {stats.map(([num, label], i) => (
                <div key={i} style={{ background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 14, padding: '18px 20px' }}>
                  <div style={{ fontFamily: T.serif, fontSize: 28, fontWeight: 700, color: '#FFD580' }}>{num}</div>
                  <div style={{ fontFamily: T.sans, fontSize: 12, color: 'rgba(255,255,255,0.6)', marginTop: 3 }}>{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{ textAlign: 'center', paddingBottom: 32, color: 'rgba(255,255,255,0.35)', fontFamily: T.sans, fontSize: 12 }}>
          ↓ Scroll untuk info lebih lanjut
        </div>
      </div>

      {/* Benefits — 3 columns */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '72px 48px' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <SectionTitle size="lg" style={{ justifyContent: 'center' }}>Kenapa Mendaftar di Sini?</SectionTitle>
          <p style={{ fontFamily: T.sans, fontSize: 15, color: C.muted, marginTop: 10 }}>Dirancang khusus untuk kamu — calon mahasiswa yang ingin proses mudah dan jelas</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
          {benefits.map((b, i) => (
            <Card key={i} style={{ padding: 32, textAlign: 'center' }}>
              <div style={{ width: 64, height: 64, borderRadius: 18, background: C.primaryLight, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, margin: '0 auto 20px' }}>{b.icon}</div>
              <div style={{ fontFamily: T.serif, fontSize: 20, fontWeight: 700, color: C.text, marginBottom: 10 }}>{b.title}</div>
              <div style={{ fontFamily: T.sans, fontSize: 14, color: C.muted, lineHeight: 1.7 }}>{b.desc}</div>
            </Card>
          ))}
        </div>
      </div>

      {/* CTA strip */}
      <div style={{ background: `linear-gradient(135deg, ${C.primary}, #B85A35)`, padding: '56px 48px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
          <div style={{ fontFamily: T.serif, fontSize: 34, fontWeight: 700, color: '#fff', marginBottom: 14 }}>Siap untuk Memulai?</div>
          <p style={{ fontFamily: T.sans, fontSize: 15, color: 'rgba(255,255,255,0.8)', marginBottom: 30, lineHeight: 1.6 }}>Ribuan calon mahasiswa sudah mendaftar. Jangan lewatkan kesempatan ini — pendaftaran ditutup 31 Mei 2026.</p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center' }}>
            <Btn size="xl" style={{ background: '#fff', color: C.primary }} onClick={() => navigate('auth')}>Daftar Sekarang →</Btn>
            <Btn size="xl" variant="outline" style={{ borderColor: 'rgba(255,255,255,0.5)', color: '#fff' }} onClick={() => navigate('info')}>Pelajari Dulu</Btn>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── PAGE 2: INFO PENDAFTARAN ──────────────────────────────────
function PageInfo({ navigate }) {
  const [openFaq, setOpenFaq] = React.useState(null);

  const requirements = ['Ijazah SMA/SMK/MA atau Surat Keterangan Lulus','Kartu Keluarga (KK)','Akta Kelahiran','Pas foto terbaru ukuran 3×4 (latar merah)','KTP/NIK (jika sudah ada)','Nilai rapor semester 4, 5, dan 6'];
  const timelineItems = [
    { date: '1–31 Mei 2026', label: 'Pendaftaran Dibuka', active: true },
    { date: '1–5 Jun 2026', label: 'Verifikasi Berkas', active: false },
    { date: '6–10 Jun 2026', label: 'Pembayaran', active: false },
    { date: '11–14 Jun 2026', label: 'Seleksi', active: false },
    { date: '15 Jun 2026', label: 'Pengumuman', active: false },
  ];
  const steps7 = [
    { num:1, title:'Buat Akun', desc:'Daftar dengan email & password aktif' },
    { num:2, title:'Isi Formulir', desc:'Data diri, asal sekolah, pilihan prodi' },
    { num:3, title:'Upload Berkas', desc:'Ijazah, pasfoto, KK, SKL' },
    { num:4, title:'Pembayaran', desc:'Biaya pendaftaran Rp 250.000' },
    { num:5, title:'Verifikasi', desc:'Tim kami memverifikasi berkasmu' },
    { num:6, title:'Seleksi', desc:'Proses seleksi akademik & administrasi' },
    { num:7, title:'Pengumuman', desc:'Cek hasil di halaman Status' },
  ];
  const faqs = [
    { q:'Apakah pendaftaran bisa dilakukan lewat HP?', a:'Ya! Sistem ini dirancang responsif. Kamu bisa mendaftar sepenuhnya lewat HP atau laptop tanpa harus ke kampus.' },
    { q:'Format file apa yang diterima untuk upload?', a:'File berupa JPG, PNG, atau PDF dengan ukuran maksimal 5 MB per dokumen. Pastikan foto jelas dan tidak buram.' },
    { q:'Bagaimana cara tahu status pendaftaran?', a:'Setelah login, kamu bisa pantau status di halaman "Status & Pengumuman". Kamu juga akan mendapat notifikasi jika ada update.' },
    { q:'Apakah bisa mengganti pilihan program studi?', a:'Pilihan prodi bisa diubah selama masa pendaftaran belum ditutup (sebelum 31 Mei 2025).' },
    { q:'Berapa biaya pendaftaran?', a:'Biaya pendaftaran sebesar Rp 250.000, dibayarkan melalui Transfer Bank, Virtual Account, atau QRIS.' },
    { q:'Apakah ada beasiswa atau keringanan biaya?', a:'Tersedia jalur afirmasi untuk calon mahasiswa dari keluarga kurang mampu. Hubungi bagian kemahasiswaan untuk info lebih lanjut.' },
  ];

  return (
    <div style={{ background: C.bg, minHeight: '100vh' }}>
      {/* Page hero */}
      <div style={{ background: `linear-gradient(135deg, #2C2420 0%, #3d1f10 100%)`, padding: '100px 48px 56px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.1)', borderRadius: 99, padding: '5px 14px', marginBottom: 16 }}>
            <span style={{ fontFamily: T.sans, fontSize: 12, color: 'rgba(255,255,255,0.7)', letterSpacing: 0.5 }}>INFO PENDAFTARAN</span>
          </div>
          <h1 style={{ fontFamily: T.serif, fontSize: 44, fontWeight: 700, color: '#fff', marginBottom: 14 }}>Semua yang Perlu Kamu Tahu</h1>
          <p style={{ fontFamily: T.sans, fontSize: 16, color: 'rgba(255,255,255,0.65)', maxWidth: 600, lineHeight: 1.7, marginBottom: 28 }}>Syarat pendaftaran, jadwal penting, alur 7 langkah, dan FAQ — semuanya di satu halaman ini.</p>
          <Btn size="lg" onClick={() => navigate('auth')}>Mulai Pendaftaran →</Btn>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '56px 48px' }}>
        {/* 3-column: requirements + timeline + steps */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 28, marginBottom: 56 }}>
          {/* Requirements */}
          <Card style={{ padding: 28 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
              <div style={{ width: 40, height: 40, borderRadius: 12, background: C.primaryLight, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><rect x="2" y="1" width="11" height="16" rx="2" stroke={C.primary} strokeWidth="1.7"/><path d="M5 6h7M5 9h5M5 12h3" stroke={C.primary} strokeWidth="1.5" strokeLinecap="round"/></svg>
              </div>
              <SectionTitle size="sm">Syarat Pendaftaran</SectionTitle>
            </div>
            {requirements.map((req, i) => (
              <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 12, alignItems: 'flex-start' }}>
                <div style={{ width: 20, height: 20, borderRadius: '50%', background: C.successLight, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
                  <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4l2.5 2.5L9 1" stroke={C.success} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <span style={{ fontFamily: T.sans, fontSize: 13, color: C.text, lineHeight: 1.5 }}>{req}</span>
              </div>
            ))}
          </Card>

          {/* Timeline */}
          <Card style={{ padding: 28 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
              <div style={{ width: 40, height: 40, borderRadius: 12, background: C.primaryLight, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><rect x="2" y="3" width="14" height="13" rx="2" stroke={C.primary} strokeWidth="1.7"/><path d="M6 1.5v3M12 1.5v3M2 7.5h14" stroke={C.primary} strokeWidth="1.5" strokeLinecap="round"/></svg>
              </div>
              <SectionTitle size="sm">Jadwal Penting</SectionTitle>
            </div>
            <div style={{ position: 'relative', paddingLeft: 24 }}>
              <div style={{ position: 'absolute', left: 7, top: 8, bottom: 8, width: 2, background: C.border }} />
              {timelineItems.map((item, i) => (
                <div key={i} style={{ position: 'relative', marginBottom: 20 }}>
                  <div style={{ position: 'absolute', left: -24, top: 4, width: 14, height: 14, borderRadius: '50%', background: item.active ? C.primary : C.border, border: `2px solid ${item.active ? C.primary : C.border}`, boxShadow: item.active ? `0 0 0 3px ${C.primaryLight}` : 'none' }} />
                  <div style={{ fontFamily: T.sans, fontSize: 14, fontWeight: item.active ? 700 : 600, color: item.active ? C.primary : C.text }}>{item.label}</div>
                  <div style={{ fontFamily: T.sans, fontSize: 12, color: C.muted, marginTop: 2 }}>{item.date}</div>
                  {item.active && <Badge label="Sedang berlangsung" variant="primary" dot style={{ marginTop: 4 }} />}
                </div>
              ))}
            </div>
          </Card>

          {/* 7 Steps */}
          <Card style={{ padding: 28 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
              <div style={{ width: 40, height: 40, borderRadius: 12, background: C.primaryLight, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="7.5" stroke={C.primary} strokeWidth="1.7"/><path d="M9 5v4l2.5 2" stroke={C.primary} strokeWidth="1.7" strokeLinecap="round"/></svg>
              </div>
              <SectionTitle size="sm">7 Langkah Pendaftaran</SectionTitle>
            </div>
            {steps7.map((step, i) => (
              <div key={i} style={{ display: 'flex', gap: 12, marginBottom: 14, alignItems: 'flex-start' }}>
                <div style={{ width: 28, height: 28, borderRadius: '50%', background: C.primaryLight, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <span style={{ fontFamily: T.serif, fontSize: 12, fontWeight: 700, color: C.primary }}>{step.num}</span>
                </div>
                <div>
                  <div style={{ fontFamily: T.sans, fontSize: 13, fontWeight: 700, color: C.text }}>{step.title}</div>
                  <div style={{ fontFamily: T.sans, fontSize: 12, color: C.muted }}>{step.desc}</div>
                </div>
              </div>
            ))}
          </Card>
        </div>

        {/* FAQ — 2 column */}
        <div>
          <SectionTitle size="md" sub="Pertanyaan yang sering ditanya" style={{ marginBottom: 24 }}>FAQ</SectionTitle>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {faqs.map((faq, i) => (
              <div key={i} style={{ background: C.card, borderRadius: 12, overflow: 'hidden', border: `1px solid ${C.border}`, boxShadow: '0 2px 8px rgba(44,44,44,0.05)' }}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 12, padding: '16px 20px', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}>
                  <span style={{ fontFamily: T.sans, fontSize: 14, fontWeight: 600, color: C.text, flex: 1, lineHeight: 1.4 }}>{faq.q}</span>
                  <svg width="12" height="8" viewBox="0 0 12 8" fill="none" style={{ transform: openFaq === i ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0 }}>
                    <path d="M1 1l5 5 5-5" stroke={C.muted} strokeWidth="1.8" strokeLinecap="round"/>
                  </svg>
                </button>
                {openFaq === i && <div style={{ padding: '0 20px 16px', fontFamily: T.sans, fontSize: 13, color: C.textSub, lineHeight: 1.6, borderTop: `1px solid ${C.border}`, paddingTop: 14 }}>{faq.a}</div>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { PageLanding, PageInfo });
