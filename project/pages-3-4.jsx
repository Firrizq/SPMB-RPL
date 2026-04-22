// pages-3-4.jsx — Auth + Dashboard

const { C, T, Btn, Card, Input, Badge, PageHeader, BottomNav, SectionTitle, StepTracker, PageScroll } = window;

// ── PAGE 3: AUTH ──────────────────────────────────────────────
function PageAuth({ navigate, onLogin }) {
  const [tab, setTab] = React.useState('register');

  // Register state
  const [regName, setRegName] = React.useState('');
  const [regEmail, setRegEmail] = React.useState('');
  const [regPass, setRegPass] = React.useState('');
  const [regPassVisible, setRegPassVisible] = React.useState(false);
  const [regErrors, setRegErrors] = React.useState({});

  // Login state
  const [loginEmail, setLoginEmail] = React.useState('stefanny@gmail.com');
  const [loginPass, setLoginPass] = React.useState('password123');
  const [loginPassVisible, setLoginPassVisible] = React.useState(false);
  const [loginErrors, setLoginErrors] = React.useState({});
  const [loading, setLoading] = React.useState(false);

  const pwStrength = (pw) => {
    if (!pw) return { level: 0, label: '', color: C.border };
    if (pw.length < 6) return { level: 1, label: 'Lemah', color: C.error };
    if (pw.length < 10 || !/[0-9]/.test(pw)) return { level: 2, label: 'Sedang', color: C.warning };
    return { level: 3, label: 'Kuat', color: C.success };
  };
  const str = pwStrength(regPass);

  const validateRegister = () => {
    const errs = {};
    if (!regName.trim()) errs.name = 'Nama wajib diisi';
    if (!regEmail.includes('@')) errs.email = 'Email tidak valid';
    if (regPass.length < 6) errs.pass = 'Password minimal 6 karakter';
    setRegErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleRegister = () => {
    if (!validateRegister()) return;
    setLoading(true);
    setTimeout(() => { setLoading(false); onLogin(); navigate('dashboard'); }, 1000);
  };

  const handleLogin = () => {
    setLoading(true);
    setTimeout(() => { setLoading(false); onLogin(); navigate('dashboard'); }, 800);
  };

  const EyeIcon = ({ visible, onToggle }) => (
    <button onClick={onToggle} style={{ background: 'none', border: 'none', cursor: 'pointer', color: C.muted, display: 'flex', padding: 0 }}>
      {visible
        ? <svg width="18" height="14" viewBox="0 0 18 14" fill="none"><path d="M9 1C5 1 1.8 4.5 1 7c.8 2.5 4 6 8 6s7.2-3.5 8-6c-.8-2.5-4-6-8-6z" stroke="currentColor" strokeWidth="1.6"/><circle cx="9" cy="7" r="2.5" stroke="currentColor" strokeWidth="1.6"/><path d="M2 2l14 10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>
        : <svg width="18" height="14" viewBox="0 0 18 14" fill="none"><path d="M9 1C5 1 1.8 4.5 1 7c.8 2.5 4 6 8 6s7.2-3.5 8-6c-.8-2.5-4-6-8-6z" stroke="currentColor" strokeWidth="1.6"/><circle cx="9" cy="7" r="2.5" stroke="currentColor" strokeWidth="1.6"/></svg>
      }
    </button>
  );

  return (
    <div style={{ background: C.bg, height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Top art */}
      <div style={{ background: `linear-gradient(160deg, #C1563A, ${C.primary})`, padding: '64px 24px 28px', textAlign: 'center' }}>
        <div style={{ fontFamily: T.serif, fontSize: 24, fontWeight: 700, color: '#fff', marginBottom: 4 }}>
          {tab === 'register' ? 'Buat Akun Baru' : 'Selamat Datang!'}
        </div>
        <div style={{ fontFamily: T.sans, fontSize: 13, color: 'rgba(255,255,255,0.8)' }}>
          {tab === 'register' ? 'Isi data berikut untuk memulai pendaftaran' : 'Masuk untuk lanjutkan pendaftaranmu'}
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', WebkitOverflowScrolling: 'touch' }}>
        {/* Tab switcher */}
        <div style={{ background: C.card, padding: '0 16px', borderBottom: `1px solid ${C.border}` }}>
          <div style={{ display: 'flex', gap: 0 }}>
            {[['register', 'Daftar Akun Baru'], ['login', 'Masuk']].map(([id, label]) => (
              <button key={id} onClick={() => setTab(id)} style={{
                flex: 1, padding: '14px 0', background: 'none', border: 'none', cursor: 'pointer',
                fontFamily: T.sans, fontSize: 14, fontWeight: tab === id ? 700 : 400,
                color: tab === id ? C.primary : C.muted,
                borderBottom: tab === id ? `2.5px solid ${C.primary}` : '2.5px solid transparent',
                transition: 'color 0.15s, border-color 0.15s',
                WebkitTapHighlightColor: 'transparent',
              }}>{label}</button>
            ))}
          </div>
        </div>

        <div style={{ padding: '24px 20px', paddingBottom: 40 }}>
          {tab === 'register' ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <Input label="NAMA LENGKAP" value={regName} onChange={setRegName}
                placeholder="Masukkan nama lengkap sesuai KK" error={regErrors.name} />
              <Input label="ALAMAT EMAIL" type="email" value={regEmail} onChange={setRegEmail}
                placeholder="contoh@email.com" error={regErrors.email}
                hint="Gunakan email aktif untuk verifikasi" />
              <div>
                <Input label="PASSWORD" type={regPassVisible ? 'text' : 'password'} value={regPass} onChange={setRegPass}
                  placeholder="Minimal 6 karakter" error={regErrors.pass}
                  rightEl={<EyeIcon visible={regPassVisible} onToggle={() => setRegPassVisible(!regPassVisible)} />}
                />
                {regPass && (
                  <div style={{ marginTop: 8 }}>
                    <div style={{ display: 'flex', gap: 4, marginBottom: 4 }}>
                      {[1,2,3].map(n => (
                        <div key={n} style={{ flex: 1, height: 4, borderRadius: 4, background: n <= str.level ? str.color : C.border, transition: 'background 0.3s' }} />
                      ))}
                    </div>
                    <span style={{ fontFamily: T.sans, fontSize: 11, color: str.color }}>{str.label}</span>
                  </div>
                )}
              </div>

              <div style={{ background: C.primaryLight, borderRadius: 12, padding: '12px 14px' }}>
                <div style={{ fontFamily: T.sans, fontSize: 12, color: C.primary, lineHeight: 1.5 }}>
                  Dengan mendaftar, kamu menyetujui <strong>Syarat & Ketentuan</strong> dan <strong>Kebijakan Privasi</strong> Sistem Pendaftaran Mahasiswa Baru.
                </div>
              </div>

              <Btn fullWidth size="lg" onClick={handleRegister} disabled={loading}>
                {loading ? 'Memproses...' : 'Buat Akun →'}
              </Btn>

              <div style={{ textAlign: 'center' }}>
                <button onClick={() => setTab('login')} style={{ background: 'none', border: 'none', fontFamily: T.sans, fontSize: 13, color: C.textSub, cursor: 'pointer' }}>
                  Sudah punya akun? <span style={{ color: C.primary, fontWeight: 600 }}>Masuk</span>
                </button>
              </div>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ background: C.successLight, borderRadius: 12, padding: '12px 14px', display: 'flex', gap: 10, alignItems: 'center' }}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7" fill={C.success}/><path d="M5 8l2 2 4-4" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
                <span style={{ fontFamily: T.sans, fontSize: 12, color: C.success, fontWeight: 500 }}>Demo: email & password sudah terisi</span>
              </div>
              <Input label="ALAMAT EMAIL" type="email" value={loginEmail} onChange={setLoginEmail}
                placeholder="contoh@email.com" error={loginErrors.email} />
              <Input label="PASSWORD" type={loginPassVisible ? 'text' : 'password'} value={loginPass} onChange={setLoginPass}
                placeholder="Masukkan password" error={loginErrors.pass}
                rightEl={<EyeIcon visible={loginPassVisible} onToggle={() => setLoginPassVisible(!loginPassVisible)} />}
              />
              <button style={{ background: 'none', border: 'none', textAlign: 'right', fontFamily: T.sans, fontSize: 13, color: C.primary, cursor: 'pointer', fontWeight: 500 }}>
                Lupa password?
              </button>
              <Btn fullWidth size="lg" onClick={handleLogin} disabled={loading}>
                {loading ? 'Masuk...' : 'Masuk →'}
              </Btn>
              <div style={{ textAlign: 'center' }}>
                <button onClick={() => setTab('register')} style={{ background: 'none', border: 'none', fontFamily: T.sans, fontSize: 13, color: C.textSub, cursor: 'pointer' }}>
                  Belum punya akun? <span style={{ color: C.primary, fontWeight: 600 }}>Daftar</span>
                </button>
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
  const steps = ['Buat Akun', 'Formulir', 'Upload', 'Bayar', 'Verifikasi', 'Seleksi', 'Pengumuman'];

  const quickActions = [
    { icon: '📝', label: 'Isi Formulir', sub: 'Data diri & prodi', page: 'form', done: registrationStep > 1 },
    { icon: '📎', label: 'Upload Berkas', sub: '0 dari 4 dokumen', page: 'upload', done: registrationStep > 2 },
    { icon: '💳', label: 'Pembayaran', sub: 'Rp 250.000', page: 'payment', done: registrationStep > 3 },
    { icon: '📊', label: 'Lihat Status', sub: 'Pantau progress', page: 'status', done: false },
  ];

  const notifications = [
    { icon: '✅', msg: 'Akun berhasil dibuat', time: 'Baru saja', type: 'success' },
    { icon: '📋', msg: 'Lengkapi formulir data diri untuk melanjutkan', time: '1 jam lalu', type: 'info' },
    { icon: 'ℹ️', msg: 'Batas pendaftaran: 31 Mei 2025', time: '1 hari lalu', type: 'warning' },
  ];

  const hour = new Date().getHours();
  const greeting = hour < 11 ? 'Selamat Pagi' : hour < 15 ? 'Selamat Siang' : 'Selamat Sore';

  return (
    <div style={{ background: C.bg, height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Top bar */}
      <div style={{
        background: `linear-gradient(135deg, #C1563A 0%, ${C.primary} 100%)`,
        padding: '60px 16px 20px', position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: -30, right: -30, width: 130, height: 130, borderRadius: '50%', background: 'rgba(255,255,255,0.07)' }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div style={{ fontFamily: T.sans, fontSize: 12, color: 'rgba(255,255,255,0.7)', marginBottom: 2 }}>{greeting} 👋</div>
            <div style={{ fontFamily: T.serif, fontSize: 20, fontWeight: 700, color: '#fff' }}>Stefanny Aulia</div>
            <div style={{ fontFamily: T.sans, fontSize: 12, color: 'rgba(255,255,255,0.8)', marginTop: 4 }}>No. Daftar: <strong>2025-05821</strong></div>
          </div>
          <div style={{
            width: 42, height: 42, borderRadius: '50%', background: 'rgba(255,255,255,0.2)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: T.serif, fontSize: 18, color: '#fff', fontWeight: 700,
          }}>S</div>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', WebkitOverflowScrolling: 'touch', paddingBottom: 90 }}>
        {/* Step tracker card */}
        <div style={{ margin: '16px 16px 0' }}>
          <div style={{ background: C.card, borderRadius: 16, padding: '16px', boxShadow: '0 2px 12px rgba(44,44,44,0.08)', border: `1px solid ${C.border}` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
              <span style={{ fontFamily: T.sans, fontSize: 13, fontWeight: 700, color: C.text }}>Progress Pendaftaran</span>
              <span style={{ fontFamily: T.sans, fontSize: 12, color: C.muted }}>Langkah {registrationStep + 1}/7</span>
            </div>
            <StepTracker steps={steps} current={registrationStep} />
            <div style={{ marginTop: 14, background: C.primaryLight, borderRadius: 10, padding: '10px 12px', display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: C.primary }} />
              <span style={{ fontFamily: T.sans, fontSize: 12, color: C.primary, fontWeight: 600 }}>
                Langkah berikutnya: <strong>{steps[registrationStep]}</strong>
              </span>
            </div>
          </div>
        </div>

        {/* Quick actions */}
        <div style={{ padding: '20px 16px 0' }}>
          <div style={{ fontFamily: T.sans, fontSize: 13, fontWeight: 600, color: C.textSub, letterSpacing: 0.4, marginBottom: 12 }}>AKSI CEPAT</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {quickActions.map((action, i) => (
              <div key={i} onClick={() => navigate(action.page)} style={{
                background: C.card, borderRadius: 14, padding: '14px 14px',
                boxShadow: '0 2px 10px rgba(44,44,44,0.07)', cursor: 'pointer',
                border: `1px solid ${C.border}`, position: 'relative', overflow: 'hidden',
                transition: 'transform 0.15s',
              }}>
                {action.done && (
                  <div style={{ position: 'absolute', top: 8, right: 8, width: 18, height: 18, borderRadius: '50%', background: C.success, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="9" height="7" viewBox="0 0 9 7" fill="none"><path d="M1 3.5l2 2L8 1" stroke="#fff" strokeWidth="1.6" strokeLinecap="round"/></svg>
                  </div>
                )}
                <div style={{ fontSize: 24, marginBottom: 8 }}>{action.icon}</div>
                <div style={{ fontFamily: T.sans, fontSize: 13, fontWeight: 700, color: C.text }}>{action.label}</div>
                <div style={{ fontFamily: T.sans, fontSize: 11, color: C.muted, marginTop: 2 }}>{action.sub}</div>
                <div style={{ marginTop: 10, display: 'flex', alignItems: 'center', gap: 4 }}>
                  <span style={{ fontFamily: T.sans, fontSize: 11, color: C.primary, fontWeight: 600 }}>
                    {action.done ? 'Sudah selesai' : 'Lanjut'}
                  </span>
                  <svg width="6" height="10" viewBox="0 0 6 10" fill="none"><path d="M1 1l4 4-4 4" stroke={C.primary} strokeWidth="1.6" strokeLinecap="round"/></svg>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Notifications */}
        <div style={{ padding: '20px 16px 0' }}>
          <div style={{ fontFamily: T.sans, fontSize: 13, fontWeight: 600, color: C.textSub, letterSpacing: 0.4, marginBottom: 12 }}>NOTIFIKASI</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {notifications.map((n, i) => {
              const bgMap = { success: C.successLight, info: '#EEF3FF', warning: C.warningLight };
              const colorMap = { success: C.success, info: '#4A6FD4', warning: '#B87A0A' };
              return (
                <div key={i} style={{
                  background: bgMap[n.type], borderRadius: 12, padding: '12px 14px',
                  display: 'flex', gap: 12, alignItems: 'flex-start',
                }}>
                  <span style={{ fontSize: 16 }}>{n.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: T.sans, fontSize: 13, color: C.text, lineHeight: 1.4 }}>{n.msg}</div>
                    <div style={{ fontFamily: T.sans, fontSize: 11, color: colorMap[n.type], marginTop: 3 }}>{n.time}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Deadline reminder */}
        <div style={{ padding: '16px 16px 0' }}>
          <div style={{ background: C.warningLight, borderRadius: 14, padding: '14px 16px', border: `1px solid ${C.warning}30`, display: 'flex', gap: 12, alignItems: 'center' }}>
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><circle cx="11" cy="11" r="9" fill={C.warning} opacity="0.15"/><path d="M11 7v4" stroke={C.warning} strokeWidth="2" strokeLinecap="round"/><circle cx="11" cy="14.5" r="1" fill={C.warning}/></svg>
            <div>
              <div style={{ fontFamily: T.sans, fontSize: 13, fontWeight: 700, color: '#8B5E00' }}>Batas Pendaftaran</div>
              <div style={{ fontFamily: T.sans, fontSize: 12, color: '#B87A0A' }}>31 Mei 2025 — Segera lengkapi dokumenmu</div>
            </div>
          </div>
        </div>
      </div>

      <BottomNav current="dashboard" navigate={navigate} />
    </div>
  );
}

Object.assign(window, { PageAuth, PageDashboard });
