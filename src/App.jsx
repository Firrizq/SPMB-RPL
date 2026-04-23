import { useState, useEffect } from 'react';
import { C, T } from './tokens';
import { TopNav, Sidebar } from './components';
import { PageLanding, PageInfo, PageAuth, PageDashboard, PageForm, PageUpload, PagePayment, PageStatus } from './pages';
import { useBreakpoint } from './hooks/useBreakpoint';

const genRegNo = () => `2026-0${Math.floor(10000 + Math.random() * 89999)}`;

function App() {
  const { isDesktop } = useBreakpoint();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [page, setPage] = useState(() => localStorage.getItem('spmb_page') || 'landing');
  const [isLoggedIn, setIsLoggedIn] = useState(() => localStorage.getItem('spmb_loggedIn') === 'true');
  const [registrationStep, setRegistrationStep] = useState(() => parseInt(localStorage.getItem('spmb_step') || '1'));
  const [formData, setFormData] = useState(() => {
    try { return JSON.parse(localStorage.getItem('spmb_form') || '{}'); } catch { return {}; }
  });
  const [uploadState, setUploadState] = useState(() => {
    try { return JSON.parse(localStorage.getItem('spmb_uploads') || '{"ijazah":"empty","pasfoto":"empty","kk":"empty","skl":"empty"}'); }
    catch { return { ijazah: 'empty', pasfoto: 'empty', kk: 'empty', skl: 'empty' }; }
  });
  const [uploadFiles, setUploadFiles] = useState(() => {
    try { return JSON.parse(localStorage.getItem('spmb_uploadFiles') || '{}'); } catch { return {}; }
  });
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [userData, setUserData] = useState(() => {
    try { return JSON.parse(localStorage.getItem('spmb_user') || 'null'); } catch { return null; }
  });
  const [stepDates, setStepDates] = useState(() => {
    try { return JSON.parse(localStorage.getItem('spmb_stepDates') || '{}'); } catch { return {}; }
  });

  useEffect(() => { localStorage.setItem('spmb_page', page); }, [page]);
  useEffect(() => { localStorage.setItem('spmb_loggedIn', isLoggedIn); }, [isLoggedIn]);
  useEffect(() => { localStorage.setItem('spmb_step', registrationStep); }, [registrationStep]);
  useEffect(() => { localStorage.setItem('spmb_form', JSON.stringify(formData)); }, [formData]);
  useEffect(() => { localStorage.setItem('spmb_uploads', JSON.stringify(uploadState)); }, [uploadState]);
  useEffect(() => { localStorage.setItem('spmb_uploadFiles', JSON.stringify(uploadFiles)); }, [uploadFiles]);

  // Close sidebar on desktop resize
  useEffect(() => { if (isDesktop) setSidebarOpen(false); }, [isDesktop]);

  const AUTH_PAGES = new Set(['dashboard', 'form', 'upload', 'payment', 'status']);

  const navigate = (to) => {
    setSidebarOpen(false);
    if (to === page) return;
    if (AUTH_PAGES.has(to) && !isLoggedIn) { setPage('auth'); return; }
    setPage(to);
    window.scrollTo({ top: 0 });
  };

  const onLogin = (data) => {
    let user = userData;
    if (!user) {
      user = {
        name: data?.name || 'Pengguna',
        email: data?.email || '',
        registrationNo: genRegNo(),
        loginTime: new Date().toISOString(),
      };
      setUserData(user);
      localStorage.setItem('spmb_user', JSON.stringify(user));
    } else {
      user = { ...userData, loginTime: new Date().toISOString() };
      setUserData(user);
      localStorage.setItem('spmb_user', JSON.stringify(user));
    }
    setIsLoggedIn(true);
    setStepDates(prev => {
      if (prev[0]) return prev;
      const updated = { ...prev, 0: new Date().toISOString() };
      localStorage.setItem('spmb_stepDates', JSON.stringify(updated));
      return updated;
    });
  };

  const onStepComplete = (step) => {
    setRegistrationStep(prev => Math.max(prev, step + 1));
    setStepDates(prev => {
      if (prev[step]) return prev;
      const updated = { ...prev, [step]: new Date().toISOString() };
      localStorage.setItem('spmb_stepDates', JSON.stringify(updated));
      return updated;
    });
  };

  const onLogout = () => { setIsLoggedIn(false); setPage('landing'); };

  const onReset = () => {
    const keys = ['spmb_page', 'spmb_loggedIn', 'spmb_step', 'spmb_form', 'spmb_uploads', 'spmb_uploadFiles', 'spmb_user', 'spmb_stepDates'];
    keys.forEach(k => localStorage.removeItem(k));
    setRegistrationStep(1);
    setFormData({});
    setUploadState({ ijazah: 'empty', pasfoto: 'empty', kk: 'empty', skl: 'empty' });
    setUploadFiles({});
    setPaymentMethod(null);
    setUserData(null);
    setStepDates({});
    setIsLoggedIn(false);
    setPage('landing');
  };

  const isPreLogin = !isLoggedIn || ['landing', 'auth'].includes(page);

  const pageProps = {
    navigate, formData, setFormData,
    uploadState, setUploadState, uploadFiles, setUploadFiles,
    paymentMethod, setPaymentMethod,
    onStepComplete, registrationStep,
    onReset,
    userData, stepDates,
  };

  const renderPage = () => {
    switch (page) {
      case 'landing':   return <PageLanding navigate={navigate} />;
      case 'info':      return <PageInfo navigate={navigate} isLoggedIn={isLoggedIn} />;
      case 'auth':      return <PageAuth navigate={navigate} onLogin={onLogin} />;
      case 'dashboard': return <PageDashboard {...pageProps} />;
      case 'form':      return <PageForm {...pageProps} />;
      case 'upload':    return <PageUpload {...pageProps} />;
      case 'payment':   return <PagePayment {...pageProps} />;
      case 'status':    return <PageStatus {...pageProps} />;
      default:          return <PageLanding navigate={navigate} />;
    }
  };

  return (
    <div style={{ fontFamily: T.sans, WebkitFontSmoothing: 'antialiased' }}>
      {isPreLogin ? (
        <>
          <TopNav navigate={navigate} page={page} />
          <div style={{ paddingTop: ['landing', 'info'].includes(page) ? 0 : 64 }}>
            <div key={page} style={{ animation: 'fadeIn 0.2s ease' }}>
              {renderPage()}
            </div>
          </div>
        </>
      ) : (
        <div style={{ display: 'flex' }}>
          <Sidebar
            navigate={navigate}
            page={page}
            registrationStep={registrationStep}
            onLogout={onLogout}
            userData={userData}
            isOpen={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
          />

          {/* Mobile/tablet top bar */}
          {!isDesktop && (
            <div style={{
              position: 'fixed', top: 0, left: 0, right: 0, height: 56, zIndex: 40,
              background: C.card, borderBottom: `1px solid ${C.border}`,
              display: 'flex', alignItems: 'center', padding: '0 16px', gap: 12,
            }}>
              <button
                onClick={() => setSidebarOpen(true)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: C.text, display: 'flex', alignItems: 'center', justifyContent: 'center', width: 36, height: 36, borderRadius: 8, flexShrink: 0 }}
              >
                <svg width="20" height="16" viewBox="0 0 20 16" fill="none">
                  <path d="M1 1h18M1 8h18M1 15h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 28, height: 28, borderRadius: 8, background: C.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 1L1 5.5V13h4v-4h4v4h4V5.5L7 1z" fill="#fff"/></svg>
                </div>
                <span style={{ fontFamily: T.serif, fontSize: 15, fontWeight: 700, color: C.text }}>SPMB 2026</span>
              </div>
            </div>
          )}

          <div style={{
            marginLeft: isDesktop ? 256 : 0,
            flex: 1, minHeight: '100vh', background: C.bg,
            paddingTop: isDesktop ? 0 : 56,
          }}>
            <div key={page} style={{ animation: 'fadeIn 0.2s ease', minHeight: '100vh' }}>
              {renderPage()}
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: ${C.border}; border-radius: 3px; }
        select, input, textarea, button { font-family: inherit; }
      `}</style>
    </div>
  );
}

export default App;
