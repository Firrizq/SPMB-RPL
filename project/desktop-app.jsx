// desktop-app.jsx — Desktop app with sidebar layout + routing

const {
  C, T, Btn, TopNav, Sidebar,
  PageLanding, PageInfo, PageAuth, PageDashboard,
  PageForm, PageUpload, PagePayment, PageStatus,
} = window;

function App() {
  const [page, setPage] = React.useState(() => localStorage.getItem('spmb_page') || 'landing');
  const [isLoggedIn, setIsLoggedIn] = React.useState(() => localStorage.getItem('spmb_loggedIn') === 'true');
  const [registrationStep, setRegistrationStep] = React.useState(() => parseInt(localStorage.getItem('spmb_step') || '1'));
  const [formData, setFormData] = React.useState(() => { try { return JSON.parse(localStorage.getItem('spmb_form') || '{}'); } catch { return {}; } });
  const [uploadState, setUploadState] = React.useState(() => { try { return JSON.parse(localStorage.getItem('spmb_uploads') || '{"ijazah":"empty","pasfoto":"empty","kk":"empty","skl":"empty"}'); } catch { return { ijazah:'empty', pasfoto:'empty', kk:'empty', skl:'empty' }; } });
  const [paymentMethod, setPaymentMethod] = React.useState(null);
  const [tweaksVisible, setTweaksVisible] = React.useState(false);

  React.useEffect(() => { localStorage.setItem('spmb_page', page); }, [page]);
  React.useEffect(() => { localStorage.setItem('spmb_loggedIn', isLoggedIn); }, [isLoggedIn]);
  React.useEffect(() => { localStorage.setItem('spmb_step', registrationStep); }, [registrationStep]);
  React.useEffect(() => { localStorage.setItem('spmb_form', JSON.stringify(formData)); }, [formData]);
  React.useEffect(() => { localStorage.setItem('spmb_uploads', JSON.stringify(uploadState)); }, [uploadState]);

  // Tweaks listener — register before announcing
  React.useEffect(() => {
    const handler = (e) => {
      if (e.data?.type === '__activate_edit_mode') setTweaksVisible(true);
      if (e.data?.type === '__deactivate_edit_mode') setTweaksVisible(false);
    };
    window.addEventListener('message', handler);
    window.parent.postMessage({ type: '__edit_mode_available' }, '*');
    return () => window.removeEventListener('message', handler);
  }, []);

  const AUTH_PAGES = new Set(['dashboard','form','upload','payment','status']);
  const navigate = (to) => {
    if (to === page) return;
    if (AUTH_PAGES.has(to) && !isLoggedIn) { setPage('auth'); return; }
    setPage(to);
    window.scrollTo({ top: 0 });
  };

  const onStepComplete = (step) => setRegistrationStep(prev => Math.max(prev, step + 1));
  const onLogout = () => { setIsLoggedIn(false); setPage('landing'); };

  const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
    "demoStep": 1,
    "showAsStepped": false
  }/*EDITMODE-END*/;
  const [tweaks, setTweaks] = React.useState(TWEAK_DEFAULTS);
  const applyTweak = (key, val) => {
    setTweaks(t => ({ ...t, [key]: val }));
    window.parent.postMessage({ type: '__edit_mode_set_keys', edits: { [key]: val } }, '*');
    if (key === 'demoStep') setRegistrationStep(parseInt(val));
  };

  const steps7 = ['Buat Akun','Formulir','Upload','Bayar','Verifikasi','Seleksi','Pengumuman'];
  const isPreLogin = !isLoggedIn || ['landing','info','auth'].includes(page);

  const pageProps = { navigate, formData, setFormData, uploadState, setUploadState, paymentMethod, setPaymentMethod, onStepComplete, registrationStep };

  const renderPage = () => {
    switch (page) {
      case 'landing':   return <PageLanding navigate={navigate} />;
      case 'info':      return <PageInfo navigate={navigate} />;
      case 'auth':      return <PageAuth navigate={navigate} onLogin={() => setIsLoggedIn(true)} />;
      case 'dashboard': return <PageDashboard {...pageProps} />;
      case 'form':      return <PageForm {...pageProps} />;
      case 'upload':    return <PageUpload {...pageProps} />;
      case 'payment':   return <PagePayment {...pageProps} />;
      case 'status':    return <PageStatus {...pageProps} />;
      default:          return <PageLanding navigate={navigate} />;
    }
  };

  return (
    <div style={{ minWidth: 1280, fontFamily: T.sans, WebkitFontSmoothing: 'antialiased' }}>
      {/* Pre-login: full-width with top navbar */}
      {isPreLogin ? (
        <>
          <TopNav navigate={navigate} page={page} />
          <div style={{ paddingTop: ['landing','info'].includes(page) ? 0 : 64 }}>
            <div key={page} style={{ animation: 'fadeIn 0.2s ease' }}>
              {renderPage()}
            </div>
          </div>
        </>
      ) : (
        /* Post-login: sidebar + scrollable content */
        <div style={{ display: 'flex' }}>
          <Sidebar navigate={navigate} page={page} registrationStep={registrationStep} onLogout={onLogout} />
          <div style={{ marginLeft: 256, flex: 1, minHeight: '100vh', background: C.bg, overflowY: 'auto' }}>
            <div key={page} style={{ animation: 'fadeIn 0.2s ease', minHeight: '100vh' }}>
              {renderPage()}
            </div>
          </div>
        </div>
      )}

      {/* Tweaks panel */}
      {tweaksVisible && (
        <div style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 9999, background: '#fff', borderRadius: 18, padding: '20px 24px', boxShadow: '0 8px 40px rgba(0,0,0,0.18)', width: 280, fontFamily: T.sans }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: C.text, marginBottom: 18 }}>⚙ Tweaks</div>

          <div style={{ marginBottom: 18 }}>
            <div style={{ fontSize: 11, color: C.muted, marginBottom: 8, fontWeight: 600, letterSpacing: 0.5 }}>HALAMAN AKTIF</div>
            <select value={page} onChange={e => navigate(e.target.value)} style={{ width: '100%', padding: '9px 12px', borderRadius: 8, border: `1px solid ${C.border}`, fontFamily: T.sans, fontSize: 13, background: C.bg, cursor: 'pointer' }}>
              {['landing','info','auth','dashboard','form','upload','payment','status'].map(p => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>

          <div style={{ marginBottom: 18 }}>
            <div style={{ fontSize: 11, color: C.muted, marginBottom: 8, fontWeight: 600, letterSpacing: 0.5 }}>STEP PENDAFTARAN (0–6)</div>
            <input type="range" min={0} max={6} value={tweaks.demoStep} onChange={e => applyTweak('demoStep', parseInt(e.target.value))} style={{ width: '100%', accentColor: C.primary, marginBottom: 6 }} />
            <div style={{ fontSize: 12, color: C.textSub, textAlign: 'center' }}>Step {tweaks.demoStep}: <strong>{steps7[tweaks.demoStep]}</strong></div>
          </div>

          <div style={{ marginBottom: 18 }}>
            <div style={{ fontSize: 11, color: C.muted, marginBottom: 8, fontWeight: 600, letterSpacing: 0.5 }}>STATUS LOGIN</div>
            <div style={{ display: 'flex', gap: 8 }}>
              {[['Sudah Login', true],['Tamu', false]].map(([label, val]) => (
                <button key={label} onClick={() => { setIsLoggedIn(val); if (!val) navigate('landing'); }} style={{ flex: 1, padding: '8px', borderRadius: 8, cursor: 'pointer', fontFamily: T.sans, fontSize: 12, fontWeight: 600, background: isLoggedIn === val ? C.primaryLight : C.bg, color: isLoggedIn === val ? C.primary : C.textSub, border: `1.5px solid ${isLoggedIn === val ? C.primary : C.border}` }}>{label}</button>
              ))}
            </div>
          </div>

          <div>
            <div style={{ fontSize: 11, color: C.muted, marginBottom: 8, fontWeight: 600, letterSpacing: 0.5 }}>DEMO UPLOAD</div>
            <button onClick={() => setUploadState({ ijazah:'uploaded', pasfoto:'uploaded', kk:'uploaded', skl:'uploaded' })} style={{ width: '100%', padding: '9px', borderRadius: 8, cursor: 'pointer', fontFamily: T.sans, fontSize: 12, background: C.successLight, color: C.success, border: `1px solid ${C.success}40`, fontWeight: 600 }}>Set Semua Dokumen Uploaded</button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 6px; } ::-webkit-scrollbar-track { background: transparent; } ::-webkit-scrollbar-thumb { background: ${C.border}; border-radius: 3px; }
        select, input, textarea, button { font-family: inherit; }
        input[type=range] { cursor: pointer; }
      `}</style>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
