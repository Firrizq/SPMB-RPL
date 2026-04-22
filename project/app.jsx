// app.jsx — Main app with routing + state

const {
  C, T, BottomNav,
  PageLanding, PageInfo,
  PageAuth, PageDashboard,
  PageForm, PageUpload,
  PagePayment, PageStatus,
  IOSDevice, IOSStatusBar,
} = window;

const STEPS = ['Buat Akun', 'Formulir', 'Upload', 'Bayar', 'Verifikasi', 'Seleksi', 'Pengumuman'];

function App() {
  // ── Routing ──────────────────────────────────────────────
  const [page, setPage] = React.useState(() => localStorage.getItem('spmb_page') || 'landing');
  const [prevPage, setPrevPage] = React.useState(null);
  const [transDir, setTransDir] = React.useState('forward');
  const [animating, setAnimating] = React.useState(false);

  // ── App State ────────────────────────────────────────────
  const [isLoggedIn, setIsLoggedIn] = React.useState(() => localStorage.getItem('spmb_loggedIn') === 'true');
  const [registrationStep, setRegistrationStep] = React.useState(() => parseInt(localStorage.getItem('spmb_step') || '1'));
  const [formData, setFormData] = React.useState(() => {
    try { return JSON.parse(localStorage.getItem('spmb_form') || '{}'); } catch { return {}; }
  });
  const [uploadState, setUploadState] = React.useState(() => {
    try { return JSON.parse(localStorage.getItem('spmb_uploads') || '{"ijazah":"empty","pasfoto":"empty","kk":"empty","skl":"empty"}'); }
    catch { return { ijazah: 'empty', pasfoto: 'empty', kk: 'empty', skl: 'empty' }; }
  });
  const [paymentMethod, setPaymentMethod] = React.useState(null);

  // ── Persist state ────────────────────────────────────────
  React.useEffect(() => { localStorage.setItem('spmb_page', page); }, [page]);
  React.useEffect(() => { localStorage.setItem('spmb_loggedIn', isLoggedIn); }, [isLoggedIn]);
  React.useEffect(() => { localStorage.setItem('spmb_step', registrationStep); }, [registrationStep]);
  React.useEffect(() => { localStorage.setItem('spmb_form', JSON.stringify(formData)); }, [formData]);
  React.useEffect(() => { localStorage.setItem('spmb_uploads', JSON.stringify(uploadState)); }, [uploadState]);

  // ── Navigation ────────────────────────────────────────────
  const AUTH_PAGES = new Set(['dashboard','form','upload','payment','status']);
  const navigate = (to, dir) => {
    if (to === page) return;
    if (AUTH_PAGES.has(to) && !isLoggedIn) { setPage('auth'); return; }
    const fwd = dir === 'back' ? false : true;
    setTransDir(fwd ? 'forward' : 'back');
    setPrevPage(page);
    setPage(to);
  };

  // ── Step completion ───────────────────────────────────────
  const onStepComplete = (step) => {
    setRegistrationStep(prev => Math.max(prev, step + 1));
  };

  // ── Page component map ────────────────────────────────────
  const pages = {
    landing: <PageLanding navigate={navigate} />,
    info: <PageInfo navigate={navigate} />,
    auth: <PageAuth navigate={navigate} onLogin={() => setIsLoggedIn(true)} />,
    dashboard: <PageDashboard navigate={navigate} registrationStep={registrationStep} />,
    form: <PageForm navigate={navigate} formData={formData} setFormData={setFormData} onStepComplete={onStepComplete} />,
    upload: <PageUpload navigate={navigate} uploadState={uploadState} setUploadState={setUploadState} onStepComplete={onStepComplete} />,
    payment: <PagePayment navigate={navigate} paymentMethod={paymentMethod} setPaymentMethod={setPaymentMethod} onStepComplete={onStepComplete} />,
    status: <PageStatus navigate={navigate} registrationStep={registrationStep} uploadState={uploadState} />,
  };

  // ── Tweaks State ──────────────────────────────────────────
  const [tweaksVisible, setTweaksVisible] = React.useState(false);
  const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
    "accentColor": "#D4724A",
    "fontStyle": "serif",
    "darkMode": false,
    "demoStep": 1
  }/*EDITMODE-END*/;
  const [tweaks, setTweaks] = React.useState(TWEAK_DEFAULTS);

  React.useEffect(() => {
    window.parent.postMessage({ type: '__edit_mode_available' }, '*');
    const handler = (e) => {
      if (e.data?.type === '__activate_edit_mode') setTweaksVisible(true);
      if (e.data?.type === '__deactivate_edit_mode') setTweaksVisible(false);
    };
    window.addEventListener('message', handler);
    return () => window.removeEventListener('message', handler);
  }, []);

  const applyTweak = (key, val) => {
    setTweaks(t => ({ ...t, [key]: val }));
    window.parent.postMessage({ type: '__edit_mode_set_keys', edits: { [key]: val } }, '*');
    if (key === 'demoStep') setRegistrationStep(parseInt(val));
  };

  return (
    <div style={{
      minHeight: '100vh', background: '#1a1a1a',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '20px', fontFamily: T.sans,
    }}>
      {/* IOSDevice wrapper */}
      <div style={{ position: 'relative' }}>
        <IOSDevice width={402} height={874} dark={tweaks.darkMode}>
          {/* Content area — sits below status bar */}
          <div style={{
            height: '100%', background: C.bg,
            display: 'flex', flexDirection: 'column',
            paddingTop: 0, position: 'relative', overflow: 'hidden',
          }}>
            {/* Page with slide transition */}
            <div key={page} style={{
              position: 'absolute', inset: 0,
              animation: `slideIn${transDir === 'forward' ? 'Right' : 'Left'} 0.28s cubic-bezier(0.33,1,0.68,1) both`,
            }}>
              {pages[page] || pages.landing}
            </div>
          </div>
        </IOSDevice>

        {/* Reset button */}
        <button onClick={() => {
          localStorage.clear();
          setPage('landing'); setIsLoggedIn(false);
          setRegistrationStep(1); setFormData({});
          setUploadState({ ijazah: 'empty', pasfoto: 'empty', kk: 'empty', skl: 'empty' });
          setPaymentMethod(null);
        }} style={{
          position: 'absolute', bottom: -44, left: '50%', transform: 'translateX(-50%)',
          background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)',
          color: 'rgba(255,255,255,0.6)', borderRadius: 99, padding: '6px 18px',
          fontFamily: T.sans, fontSize: 12, cursor: 'pointer',
        }}>↺ Reset demo</button>
      </div>

      {/* Tweaks panel */}
      {tweaksVisible && (
        <div style={{
          position: 'fixed', bottom: 24, right: 24, zIndex: 9999,
          background: '#fff', borderRadius: 18, padding: '18px 20px',
          boxShadow: '0 8px 40px rgba(0,0,0,0.2)', width: 240,
          fontFamily: T.sans,
        }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: C.text, marginBottom: 14 }}>⚙ Tweaks</div>

          <div style={{ marginBottom: 14 }}>
            <div style={{ fontSize: 11, color: C.muted, marginBottom: 6, fontWeight: 600 }}>HALAMAN AKTIF</div>
            <select value={page} onChange={e => navigate(e.target.value)} style={{
              width: '100%', padding: '8px 10px', borderRadius: 8, border: `1px solid ${C.border}`,
              fontFamily: T.sans, fontSize: 13, background: C.bg,
            }}>
              {Object.keys(pages).map(p => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>

          <div style={{ marginBottom: 14 }}>
            <div style={{ fontSize: 11, color: C.muted, marginBottom: 6, fontWeight: 600 }}>STEP PENDAFTARAN (0–6)</div>
            <input type="range" min={0} max={6} value={tweaks.demoStep}
              onChange={e => applyTweak('demoStep', parseInt(e.target.value))}
              style={{ width: '100%', accentColor: C.primary }} />
            <div style={{ fontSize: 12, color: C.textSub, textAlign: 'center' }}>
              Step {tweaks.demoStep}: {STEPS[tweaks.demoStep]}
            </div>
          </div>

          <div style={{ marginBottom: 14 }}>
            <div style={{ fontSize: 11, color: C.muted, marginBottom: 6, fontWeight: 600 }}>MODE</div>
            <div style={{ display: 'flex', gap: 8 }}>
              {[['Login', true], ['Guest', false]].map(([label, val]) => (
                <button key={label} onClick={() => { setIsLoggedIn(val); if (!val) navigate('landing'); }} style={{
                  flex: 1, padding: '7px', borderRadius: 8, cursor: 'pointer',
                  fontFamily: T.sans, fontSize: 12, fontWeight: 600,
                  background: isLoggedIn === val ? C.primaryLight : C.bg,
                  color: isLoggedIn === val ? C.primary : C.textSub,
                  border: `1.5px solid ${isLoggedIn === val ? C.primary : C.border}`,
                }}>{label}</button>
              ))}
            </div>
          </div>

          <div>
            <div style={{ fontSize: 11, color: C.muted, marginBottom: 6, fontWeight: 600 }}>UPLOAD STATUS DEMO</div>
            <button onClick={() => setUploadState({ ijazah: 'uploaded', pasfoto: 'uploaded', kk: 'uploaded', skl: 'uploaded' })} style={{
              width: '100%', padding: '8px', borderRadius: 8, cursor: 'pointer',
              fontFamily: T.sans, fontSize: 12, background: C.successLight, color: C.success,
              border: `1px solid ${C.success}40`, fontWeight: 600,
            }}>Set Semua Uploaded</button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes slideInRight {
          from { transform: translateX(100%); opacity: 0.8; }
          to   { transform: translateX(0);    opacity: 1;   }
        }
        @keyframes slideInLeft {
          from { transform: translateX(-100%); opacity: 0.8; }
          to   { transform: translateX(0);     opacity: 1;   }
        }
        * { box-sizing: border-box; -webkit-tap-highlight-color: transparent; }
        ::-webkit-scrollbar { display: none; }
        select, input, textarea, button { font-family: inherit; }
      `}</style>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
