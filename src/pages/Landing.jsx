import { C, T } from '../tokens';
import { Btn, Card, Badge, SectionTitle } from '../components';
import { useBreakpoint } from '../hooks/useBreakpoint';

export function PageLanding({ navigate }) {
  const { isMobile, isTablet } = useBreakpoint();
  const isSmall = isMobile || isTablet;

  const benefits = [
    { icon: '📋', title: 'Informasi Lengkap', desc: 'Semua syarat, jadwal, dan alur pendaftaran tersedia dalam satu halaman — tidak perlu cari ke mana-mana.' },
    { icon: '💻', title: 'Proses 100% Online', desc: 'Daftar, isi formulir, upload berkas, dan bayar dari mana saja tanpa perlu datang ke kampus.' },
    { icon: '🔔', title: 'Pantau Status Real-Time', desc: 'Lihat perkembangan pendaftaranmu secara langsung dan dapatkan notifikasi setiap ada update.' },
  ];
  const stats = [['2.400+', 'Kursi Tersedia'], ['42', 'Program Studi'], ['7', 'Langkah Mudah'], ['98%', 'Proses Online']];
  const timeline = [
    { date: '1–31 Mei 2026', event: 'Pendaftaran Dibuka', status: 'active' },
    { date: '1–5 Jun 2026', event: 'Verifikasi Berkas', status: 'upcoming' },
    { date: '10 Jun 2026', event: 'Pembayaran', status: 'upcoming' },
    { date: '15 Jun 2026', event: 'Pengumuman Hasil', status: 'upcoming' },
  ];

  return (
    <div style={{ background: C.bg, minHeight: '100vh' }}>
      {/* Hero */}
      <div style={{ background: 'linear-gradient(135deg, #1e1108 0%, #3d1f10 35%, #D4724A 65%, #E8956A 100%)', minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -100, right: -100, width: 500, height: 500, borderRadius: '50%', background: 'rgba(255,255,255,0.04)' }} />
        <div style={{ position: 'absolute', bottom: -80, left: '40%', width: 300, height: 300, borderRadius: '50%', background: 'rgba(255,255,255,0.03)' }} />

        <div style={{ height: 64 }} />

        <div style={{
          flex: 1,
          maxWidth: 1200, margin: '0 auto',
          padding: isMobile ? '32px 20px' : isTablet ? '40px 32px' : '0 48px',
          display: 'grid',
          gridTemplateColumns: isSmall ? '1fr' : '1fr 1fr',
          gap: isSmall ? 32 : 80,
          alignItems: 'center',
          width: '100%',
        }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.12)', borderRadius: 99, padding: '6px 16px', marginBottom: 24 }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#FFD580' }} />
              <span style={{ fontFamily: T.sans, fontSize: 12, color: 'rgba(255,255,255,0.9)', fontWeight: 600, letterSpacing: 0.5 }}>PENERIMAAN MAHASISWA BARU 2026/2027</span>
            </div>
            <h1 style={{ fontFamily: T.serif, fontSize: isMobile ? 36 : isTablet ? 44 : 52, fontWeight: 800, color: '#fff', lineHeight: 1.15, margin: '0 0 20px', textShadow: '0 2px 20px rgba(0,0,0,0.2)' }}>
              Mulai Perjalanan<br />Akademikmu di<br /><span style={{ color: '#FFD580' }}>Universitas Nusantara</span>
            </h1>
            <p style={{ fontFamily: T.sans, fontSize: isMobile ? 14 : 16, color: 'rgba(255,255,255,0.75)', lineHeight: 1.7, margin: '0 0 36px', maxWidth: 460 }}>
              Sistem pendaftaran yang mudah, transparan, dan bisa diselesaikan sepenuhnya secara online. Tidak perlu antre, tidak perlu bingung.
            </p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <Btn size={isMobile ? 'md' : 'xl'} onClick={() => navigate('auth')} style={{ background: '#fff', color: C.primary, boxShadow: '0 8px 32px rgba(0,0,0,0.2)' }}>
                Mulai Daftar Sekarang →
              </Btn>
              <Btn variant="outline" size={isMobile ? 'md' : 'xl'} onClick={() => navigate('info')} style={{ borderColor: 'rgba(255,255,255,0.5)', color: '#fff' }}>
                Lihat Info
              </Btn>
            </div>
          </div>

          {/* Right panel — hidden on mobile to keep hero clean */}
          {!isMobile && (
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
          )}
        </div>

        {/* Mobile stats strip */}
        {isMobile && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, padding: '0 20px 32px' }}>
            {stats.map(([num, label], i) => (
              <div key={i} style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, padding: '14px 16px' }}>
                <div style={{ fontFamily: T.serif, fontSize: 22, fontWeight: 700, color: '#FFD580' }}>{num}</div>
                <div style={{ fontFamily: T.sans, fontSize: 11, color: 'rgba(255,255,255,0.6)', marginTop: 2 }}>{label}</div>
              </div>
            ))}
          </div>
        )}

        <div style={{ textAlign: 'center', paddingBottom: 32, color: 'rgba(255,255,255,0.35)', fontFamily: T.sans, fontSize: 12 }}>
          ↓ Scroll untuk info lebih lanjut
        </div>
      </div>

      {/* Benefits */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: isMobile ? '48px 20px' : isTablet ? '56px 32px' : '72px 48px' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <SectionTitle size="lg">Kenapa Mendaftar di Sini?</SectionTitle>
          <p style={{ fontFamily: T.sans, fontSize: 15, color: C.muted, marginTop: 10 }}>Dirancang khusus untuk kamu — calon mahasiswa yang ingin proses mudah dan jelas</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : isTablet ? 'repeat(2,1fr)' : 'repeat(3,1fr)', gap: 20 }}>
          {benefits.map((b, i) => (
            <Card key={i} style={{ padding: 28, textAlign: 'center' }}>
              <div style={{ width: 60, height: 60, borderRadius: 16, background: C.primaryLight, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26, margin: '0 auto 18px' }}>{b.icon}</div>
              <div style={{ fontFamily: T.serif, fontSize: 18, fontWeight: 700, color: C.text, marginBottom: 10 }}>{b.title}</div>
              <div style={{ fontFamily: T.sans, fontSize: 14, color: C.muted, lineHeight: 1.7 }}>{b.desc}</div>
            </Card>
          ))}
        </div>
      </div>

      {/* CTA strip */}
      <div style={{ background: `linear-gradient(135deg, ${C.primary}, #B85A35)`, padding: isMobile ? '40px 20px' : '56px 48px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
          <div style={{ fontFamily: T.serif, fontSize: isMobile ? 26 : 34, fontWeight: 700, color: '#fff', marginBottom: 14 }}>Siap untuk Memulai?</div>
          <p style={{ fontFamily: T.sans, fontSize: 15, color: 'rgba(255,255,255,0.8)', marginBottom: 30, lineHeight: 1.6 }}>
            Ribuan calon mahasiswa sudah mendaftar. Jangan lewatkan kesempatan ini — pendaftaran ditutup 31 Mei 2026.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Btn size={isMobile ? 'md' : 'xl'} style={{ background: '#fff', color: C.primary }} onClick={() => navigate('auth')}>Daftar Sekarang →</Btn>
            <Btn size={isMobile ? 'md' : 'xl'} variant="outline" style={{ borderColor: 'rgba(255,255,255,0.5)', color: '#fff' }} onClick={() => navigate('info')}>Pelajari Dulu</Btn>
          </div>
        </div>
      </div>
    </div>
  );
}
