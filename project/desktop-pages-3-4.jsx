// desktop-pages-3-4.jsx — Auth + Dashboard (desktop)

const { C, T, Btn, Card, Input, Badge, Divider, SectionTitle, StepTracker, PageHeader } = window;

// ── PAGE 3: AUTH ──────────────────────────────────────────────
function PageAuth({ navigate, onLogin }) {
  const [tab, setTab] = React.useState('login');
  const [regName, setRegName] = React.useState('');
  const [regEmail, setRegEmail] = React.useState('');
  const [regPass, setRegPass] = React.useState('');
  const [regPassVis, setRegPassVis] = React.useState(false);
  const [regErrors, setRegErrors] = React.useState({});
  const [loginEmail, setLoginEmail] = React.useState('stefanny@gmail.com');
  const [loginPass, setLoginPass] = React.useState('password123');
  const [loginPassVis, setLoginPassVis] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const pwStr = (pw) => {
    if (!pw) return { level: 0, label: '', color: C.border };
    if (pw.length < 6) return { level: 1, label: 'Lemah', color: C.error };
    if (pw.length < 10 || !/[0-9]/.test(pw)) return { level: 2, label: 'Sedang', color: C.warning };
    return { level: 3, label: 'Kuat', color: C.success };
  };
  const str = pwStr(regPass);

  const validateReg = () => {
    const e = {};
    if (!regName.trim()) e.name = 'Wajib diisi';
    if (!regEmail.includes('@')) e.email = 'Email tidak valid';
    if (regPass.length < 6) e.pass = 'Minimal 6 karakter';
    setRegErrors(e);
    return !Object.keys(e).length;
  };

  const handleLogin = () => { setLoading(true); setTimeout(() => { setLoading(false); onLogin(); navigate('dashboard'); }, 900); };
  const handleRegister = () => { if (!validateReg()) return; setLoading(true); setTimeout(() => { setLoading(false); onLogin(); navigate('dashboard'); }, 1000); };

  const EyeBtn = ({ vis, toggle }) => (
    <button onClick={toggle} style={{ background: 'none', border: 'none', cursor: 'pointer', color: C.muted, display: 'flex', padding: 2 }}>
      {vis ? <svg width="18" height="14" viewBox="0 0 18 14" fill="none"><path d="M9 1C5 1 1.8 4.5 1 7c.8 2.5 4 6 8 6s7.2-3.5 8-6c-.8-2.5-4-6-8-6z" stroke="currentColor" strokeWidth="1.6"/><circle cx="9" cy="7" r="2.5" stroke="currentColor" strokeWidth="1.6"/><path d="M2 2l14 10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>
        : <svg width="18" height="14" viewBox="0 0 18 14" fill="none"><path d="M9 1C5 1 1.8 4.5 1 7c.8 2.5 4 6 8 6s7.2-3.5 8-6c-.8-2.5-4-6-8-6z" stroke="currentColor" strokeWidth="1.6"/><circle cx="9" cy="7" r="2.5" stroke="currentColor" strokeWidth="1.6"/></svg>}
    </button>
  );

  return (
    <div style={{ minHeight: '100vh', background: C.bg, display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
      {/* Left panel — art */}
      <div style={{ background: `linear-gradient(160deg, #1e1108 0%, #3d1f10 40%, ${C.primary} 100%)`, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '80px 64px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -60, right: -60, width: 300, height: 300, borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />
        <div style={{ position: 'absolute', bottom: -40, left: -40, width: 200, height: 200, borderRadius: '50%', background: 'rgba(255,255,255,0.04)' }} />
        <div style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 48 }}>
            <div style={{ width: 40, height: 40, borderRadius: 12, background: C.primary, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 1L1 8v11h6v-7h6v7h6V8L10 1z" fill="#fff"/></svg>
            </div>
            <div>
              <div style={{ fontFamily: T.serif, fontSize: 18, fontWeight: 700, color: '#fff' }}>Universitas Nusantara</div>
              <div style={{ fontFamily: T.sans, fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>SPMB 2026/2027</div>
            </div>
          </div>
          <h2 style={{ fontFamily: T.serif, fontSize: 36, fontWeight: 700, color: '#fff', lineHeight: 1.3, marginBottom: 16 }}>
            Gerbang Menuju<br/>Masa Depanmu
          </h2>
          <p style={{ fontFamily: T.sans, fontSize: 15, color: 'rgba(255,255,255,0.65)', lineHeight: 1.7, marginBottom: 40, maxWidth: 360 }}>
            Bergabung dengan ribuan mahasiswa baru. Proses pendaftaran yang mudah, cepat, dan transparan.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {[['✓','Pendaftaran 100% online'],['✓','Pantau status real-time'],['✓','7 langkah yang mudah diikuti']].map(([ic, t], i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <span style={{ color: '#FFD580', fontSize: 12, fontWeight: 700 }}>{ic}</span>
                </div>
                <span style={{ fontFamily: T.sans, fontSize: 14, color: 'rgba(255,255,255,0.75)' }}>{t}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel — form */}
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '80px 64px', overflowY: 'auto' }}>
        <div style={{ width: '100%', maxWidth: 420 }}>
          <h2 style={{ fontFamily: T.serif, fontSize: 30, fontWeight: 700, color: C.text, marginBottom: 6 }}>
            {tab === 'login' ? 'Selamat Datang Kembali!' : 'Buat Akun Baru'}
          </h2>
          <p style={{ fontFamily: T.sans, fontSize: 14, color: C.muted, marginBottom: 28 }}>
            {tab === 'login' ? 'Masuk untuk melanjutkan pendaftaranmu.' : 'Isi data berikut untuk mulai mendaftar.'}
          </p>

          {/* Tab */}
          <div style={{ display: 'flex', background: C.bg, borderRadius: 12, padding: 4, marginBottom: 28 }}>
            {[['login','Masuk'],['register','Daftar Baru']].map(([id, label]) => (
              <button key={id} onClick={() => setTab(id)} style={{ flex: 1, padding: '10px', borderRadius: 9, background: tab === id ? C.card : 'transparent', border: 'none', cursor: 'pointer', fontFamily: T.sans, fontSize: 14, fontWeight: tab === id ? 700 : 400, color: tab === id ? C.primary : C.muted, boxShadow: tab === id ? '0 2px 8px rgba(44,44,44,0.1)' : 'none', transition: 'all 0.15s' }}>{label}</button>
            ))}
          </div>

          {tab === 'login' ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              <div style={{ background: C.successLight, borderRadius: 10, padding: '10px 14px', display: 'flex', gap: 8, alignItems: 'center' }}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="6" fill={C.success}/><path d="M4 7l2 2 4-4" stroke="#fff" strokeWidth="1.6" strokeLinecap="round"/></svg>
                <span style={{ fontFamily: T.sans, fontSize: 12, color: C.success }}>Demo: email & password sudah terisi otomatis</span>
              </div>
              <Input label="ALAMAT EMAIL" type="email" value={loginEmail} onChange={setLoginEmail} placeholder="contoh@email.com" />
              <Input label="PASSWORD" type={loginPassVis ? 'text' : 'password'} value={loginPass} onChange={setLoginPass} placeholder="Password kamu" rightEl={<EyeBtn vis={loginPassVis} toggle={() => setLoginPassVis(!loginPassVis)} />} />
              <div style={{ textAlign: 'right' }}>
                <button style={{ background: 'none', border: 'none', fontFamily: T.sans, fontSize: 13, color: C.primary, cursor: 'pointer', fontWeight: 500 }}>Lupa password?</button>
              </div>
              <Btn fullWidth size="lg" onClick={handleLogin} disabled={loading}>{loading ? 'Masuk...' : 'Masuk ke Dashboard →'}</Btn>
              <Divider label="atau" />
              <div style={{ textAlign: 'center', fontFamily: T.sans, fontSize: 14, color: C.textSub }}>
                Belum punya akun? <button onClick={() => setTab('register')} style={{ background: 'none', border: 'none', color: C.primary, fontWeight: 600, cursor: 'pointer', fontSize: 14 }}>Daftar sekarang</button>
              </div>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <Input label="NAMA LENGKAP" value={regName} onChange={setRegName} placeholder="Sesuai Kartu Keluarga" error={regErrors.name} />
              <Input label="ALAMAT EMAIL" type="email" value={regEmail} onChange={setRegEmail} placeholder="contoh@email.com" error={regErrors.email} hint="Gunakan email aktif untuk verifikasi" />
              <div>
                <Input label="PASSWORD" type={regPassVis ? 'text' : 'password'} value={regPass} onChange={setRegPass} placeholder="Minimal 6 karakter" error={regErrors.pass} rightEl={<EyeBtn vis={regPassVis} toggle={() => setRegPassVis(!regPassVis)} />} />
                {regPass && <div style={{ marginTop: 8 }}>
                  <div style={{ display: 'flex', gap: 4, marginBottom: 4 }}>{[1,2,3].map(n => <div key={n} style={{ flex: 1, height: 4, borderRadius: 4, background: n <= str.level ? str.color : C.border, transition: 'background 0.3s' }} />)}</div>
                  <span style={{ fontFamily: T.sans, fontSize: 12, color: str.color }}>{str.label}</span>
                </div>}
              </div>
              <div style={{ background: C.primaryLight, borderRadius: 10, padding: '12px 14px' }}>
                <span style={{ fontFamily: T.sans, fontSize: 12, color: C.primary, lineHeight: 1.6 }}>Dengan mendaftar, kamu menyetujui <strong>Syarat & Ketentuan</strong> dan <strong>Kebijakan Privasi</strong> Universitas Nusantara.</span>
              </div>
              <Btn fullWidth size="lg" onClick={handleRegister} disabled={loading}>{loading ? 'Memproses...' : 'Buat Akun →'}</Btn>
              <div style={{ textAlign: 'center', fontFamily: T.sans, fontSize: 14, color: C.textSub }}>
                Sudah punya akun? <button onClick={() => setTab('login')} style={{ background: 'none', border: 'none', color: C.primary, fontWeight: 600, cursor: 'pointer', fontSize: 14 }}>Masuk</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── PAGE 4: DASHBOARD ─────────────────────────────────────────
function PageDashboard({ navigate, registrationStep }) {
  const steps = ['Buat Akun','Isi Formulir','Upload Berkas','Pembayaran','Verifikasi','Seleksi','Pengumuman'];
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

  return (
    <div style={{ padding: '36px 40px', maxWidth: 1100, margin: '0 auto' }}>
      {/* Welcome header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 32 }}>
        <div>
          <div style={{ fontFamily: T.sans, fontSize: 13, color: C.muted, marginBottom: 4 }}>{greeting} 👋</div>
          <h1 style={{ fontFamily: T.serif, fontSize: 32, fontWeight: 700, color: C.text, margin: 0 }}>Halo, Stefanny!</h1>
          <p style={{ fontFamily: T.sans, fontSize: 14, color: C.muted, marginTop: 6 }}>No. Pendaftaran: <strong style={{ color: C.text }}>2026-05821</strong> · Terakhir login: 22 Apr 2026</p>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <Btn variant="outline" size="md" onClick={() => navigate('info')}>Info Pendaftaran</Btn>
          <Btn size="md" onClick={() => navigate(steps[registrationStep]?.toLowerCase() === 'isi formulir' ? 'form' : registrationStep === 2 ? 'upload' : registrationStep === 3 ? 'payment' : 'status')}>
            Lanjutkan → {steps[registrationStep]}
          </Btn>
        </div>
      </div>

      {/* Step tracker — full width card */}
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

      {/* Main grid: quick actions + notifications */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 24 }}>
        {/* Quick action cards — 2×2 grid */}
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
                    {done && <div style={{ width: 22, height: 22, borderRadius: '50%', background: C.success, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4l2.5 3L9 1" stroke="#fff" strokeWidth="1.8" strokeLinecap="round"/></svg></div>}
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

          {/* Deadline card */}
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

Object.assign(window, { PageAuth, PageDashboard });
