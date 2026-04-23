import { useState } from 'react';
import { C, T } from '../tokens';
import { Btn, Input, Divider } from '../components';
import { useBreakpoint } from '../hooks/useBreakpoint';

const nameFromEmail = (email) => {
  if (!email) return 'Pengguna';
  const prefix = email.split('@')[0];
  return prefix.split(/[._-]/).map(p => p.charAt(0).toUpperCase() + p.slice(1)).join(' ');
};

export function PageAuth({ navigate, onLogin }) {
  const { isMobile } = useBreakpoint();
  const [tab, setTab] = useState('login');
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPass, setRegPass] = useState('');
  const [regPassVis, setRegPassVis] = useState(false);
  const [regErrors, setRegErrors] = useState({});
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPass, setLoginPass] = useState('');
  const [loginPassVis, setLoginPassVis] = useState(false);
  const [loginErrors, setLoginErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const pwStr = (pw) => {
    if (!pw) return { level: 0, label: '', color: C.border };
    if (pw.length < 6) return { level: 1, label: 'Lemah', color: C.error };
    if (pw.length < 10 || !/[0-9]/.test(pw)) return { level: 2, label: 'Sedang', color: C.warning };
    return { level: 3, label: 'Kuat', color: C.success };
  };
  const str = pwStr(regPass);

  const validateLogin = () => {
    const e = {};
    if (!loginEmail.includes('@')) e.email = 'Email tidak valid';
    if (loginPass.length < 4) e.pass = 'Password terlalu pendek';
    setLoginErrors(e);
    return !Object.keys(e).length;
  };

  const validateReg = () => {
    const e = {};
    if (!regName.trim()) e.name = 'Wajib diisi';
    if (!regEmail.includes('@')) e.email = 'Email tidak valid';
    if (regPass.length < 6) e.pass = 'Minimal 6 karakter';
    setRegErrors(e);
    return !Object.keys(e).length;
  };

  const handleLogin = () => {
    if (!validateLogin()) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onLogin({ name: nameFromEmail(loginEmail), email: loginEmail });
      navigate('dashboard');
    }, 900);
  };

  const handleRegister = () => {
    if (!validateReg()) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onLogin({ name: regName.trim(), email: regEmail });
      navigate('dashboard');
    }, 1000);
  };

  const EyeBtn = ({ vis, toggle }) => (
    <button onClick={toggle} style={{ background: 'none', border: 'none', cursor: 'pointer', color: C.muted, display: 'flex', padding: 2 }}>
      {vis ? (
        <svg width="18" height="14" viewBox="0 0 18 14" fill="none"><path d="M9 1C5 1 1.8 4.5 1 7c.8 2.5 4 6 8 6s7.2-3.5 8-6c-.8-2.5-4-6-8-6z" stroke="currentColor" strokeWidth="1.6"/><circle cx="9" cy="7" r="2.5" stroke="currentColor" strokeWidth="1.6"/><path d="M2 2l14 10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>
      ) : (
        <svg width="18" height="14" viewBox="0 0 18 14" fill="none"><path d="M9 1C5 1 1.8 4.5 1 7c.8 2.5 4 6 8 6s7.2-3.5 8-6c-.8-2.5-4-6-8-6z" stroke="currentColor" strokeWidth="1.6"/><circle cx="9" cy="7" r="2.5" stroke="currentColor" strokeWidth="1.6"/></svg>
      )}
    </button>
  );

  const formPanel = (
    <div style={{ width: '100%', maxWidth: 420, margin: '0 auto' }}>
      <h2 style={{ fontFamily: T.serif, fontSize: isMobile ? 26 : 30, fontWeight: 700, color: C.text, marginBottom: 6 }}>
        {tab === 'login' ? 'Selamat Datang!' : 'Buat Akun Baru'}
      </h2>
      <p style={{ fontFamily: T.sans, fontSize: 14, color: C.muted, marginBottom: 28 }}>
        {tab === 'login' ? 'Masuk untuk melanjutkan pendaftaranmu.' : 'Isi data berikut untuk mulai mendaftar.'}
      </p>

      <div style={{ display: 'flex', background: C.bg, borderRadius: 12, padding: 4, marginBottom: 28 }}>
        {[['login', 'Masuk'], ['register', 'Daftar Baru']].map(([id, label]) => (
          <button key={id} onClick={() => setTab(id)} style={{ flex: 1, padding: '10px', borderRadius: 9, background: tab === id ? C.card : 'transparent', border: 'none', cursor: 'pointer', fontFamily: T.sans, fontSize: 14, fontWeight: tab === id ? 700 : 400, color: tab === id ? C.primary : C.muted, boxShadow: tab === id ? '0 2px 8px rgba(44,44,44,0.1)' : 'none', transition: 'all 0.15s' }}>
            {label}
          </button>
        ))}
      </div>

      {tab === 'login' ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <Input label="ALAMAT EMAIL" type="email" value={loginEmail} onChange={setLoginEmail} placeholder="contoh@email.com" error={loginErrors.email} />
          <Input label="PASSWORD" type={loginPassVis ? 'text' : 'password'} value={loginPass} onChange={setLoginPass} placeholder="Password kamu" error={loginErrors.pass} rightEl={<EyeBtn vis={loginPassVis} toggle={() => setLoginPassVis(!loginPassVis)} />} />
          <div style={{ textAlign: 'right' }}>
            <button style={{ background: 'none', border: 'none', fontFamily: T.sans, fontSize: 13, color: C.primary, cursor: 'pointer', fontWeight: 500 }}>Lupa password?</button>
          </div>
          <Btn fullWidth size="lg" onClick={handleLogin} disabled={loading}>{loading ? 'Masuk...' : 'Masuk ke Dashboard →'}</Btn>
          <Divider label="atau" />
          <div style={{ textAlign: 'center', fontFamily: T.sans, fontSize: 14, color: C.textSub }}>
            Belum punya akun?{' '}
            <button onClick={() => setTab('register')} style={{ background: 'none', border: 'none', color: C.primary, fontWeight: 600, cursor: 'pointer', fontSize: 14 }}>Daftar sekarang</button>
          </div>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <Input label="NAMA LENGKAP" value={regName} onChange={setRegName} placeholder="Sesuai Kartu Keluarga" error={regErrors.name} />
          <Input label="ALAMAT EMAIL" type="email" value={regEmail} onChange={setRegEmail} placeholder="contoh@email.com" error={regErrors.email} hint="Gunakan email aktif untuk verifikasi" />
          <div>
            <Input label="PASSWORD" type={regPassVis ? 'text' : 'password'} value={regPass} onChange={setRegPass} placeholder="Minimal 6 karakter" error={regErrors.pass} rightEl={<EyeBtn vis={regPassVis} toggle={() => setRegPassVis(!regPassVis)} />} />
            {regPass && (
              <div style={{ marginTop: 8 }}>
                <div style={{ display: 'flex', gap: 4, marginBottom: 4 }}>
                  {[1, 2, 3].map(n => (
                    <div key={n} style={{ flex: 1, height: 4, borderRadius: 4, background: n <= str.level ? str.color : C.border, transition: 'background 0.3s' }} />
                  ))}
                </div>
                <span style={{ fontFamily: T.sans, fontSize: 12, color: str.color }}>{str.label}</span>
              </div>
            )}
          </div>
          <div style={{ background: C.primaryLight, borderRadius: 10, padding: '12px 14px' }}>
            <span style={{ fontFamily: T.sans, fontSize: 12, color: C.primary, lineHeight: 1.6 }}>
              Dengan mendaftar, kamu menyetujui <strong>Syarat & Ketentuan</strong> dan <strong>Kebijakan Privasi</strong> Universitas Nusantara.
            </span>
          </div>
          <Btn fullWidth size="lg" onClick={handleRegister} disabled={loading}>{loading ? 'Memproses...' : 'Buat Akun →'}</Btn>
          <div style={{ textAlign: 'center', fontFamily: T.sans, fontSize: 14, color: C.textSub }}>
            Sudah punya akun?{' '}
            <button onClick={() => setTab('login')} style={{ background: 'none', border: 'none', color: C.primary, fontWeight: 600, cursor: 'pointer', fontSize: 14 }}>Masuk</button>
          </div>
        </div>
      )}
    </div>
  );

  if (isMobile) {
    return (
      <div style={{ minHeight: '100vh', background: C.bg, display: 'flex', flexDirection: 'column' }}>
        {/* Compact brand header */}
        <div style={{ background: 'linear-gradient(160deg, #1e1108 0%, #3d1f10 60%, #D4724A 100%)', padding: '32px 20px 28px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: C.primary, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M9 1L1 7v10h5v-6h6v6h5V7L9 1z" fill="#fff"/></svg>
            </div>
            <div>
              <div style={{ fontFamily: T.serif, fontSize: 16, fontWeight: 700, color: '#fff' }}>Universitas Nusantara</div>
              <div style={{ fontFamily: T.sans, fontSize: 11, color: 'rgba(255,255,255,0.5)' }}>SPMB 2026/2027</div>
            </div>
          </div>
          <h2 style={{ fontFamily: T.serif, fontSize: 26, fontWeight: 700, color: '#fff', lineHeight: 1.3, margin: 0 }}>
            Gerbang Menuju<br />Masa Depanmu
          </h2>
        </div>
        <div style={{ flex: 1, padding: '32px 20px' }}>
          {formPanel}
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: C.bg, display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
      {/* Left panel */}
      <div style={{ background: 'linear-gradient(160deg, #1e1108 0%, #3d1f10 40%, #D4724A 100%)', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '80px 64px', position: 'relative', overflow: 'hidden' }}>
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
            Gerbang Menuju<br />Masa Depanmu
          </h2>
          <p style={{ fontFamily: T.sans, fontSize: 15, color: 'rgba(255,255,255,0.65)', lineHeight: 1.7, marginBottom: 40, maxWidth: 360 }}>
            Bergabung dengan ribuan mahasiswa baru. Proses pendaftaran yang mudah, cepat, dan transparan.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {[['✓', 'Pendaftaran 100% online'], ['✓', 'Pantau status real-time'], ['✓', '7 langkah yang mudah diikuti']].map(([ic, t], i) => (
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

      {/* Right panel */}
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '80px 64px', overflowY: 'auto' }}>
        {formPanel}
      </div>
    </div>
  );
}
