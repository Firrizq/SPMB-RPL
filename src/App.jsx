import { useState, useEffect } from 'react';
import { C, T } from './tokens';
import { TopNav, Sidebar } from './components';
import { PageLanding, PageInfo, PageAuth, PageDashboard, PageForm, PageUpload, PagePayment, PageStatus } from './pages';

function App() {
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
  const [paymentMethod, setPaymentMethod] = useState(null);

  useEffect(() => { localStorage.setItem('spmb_page', page); }, [page]);
  useEffect(() => { localStorage.setItem('spmb_loggedIn', isLoggedIn); }, [isLoggedIn]);
  useEffect(() => { localStorage.setItem('spmb_step', registrationStep); }, [registrationStep]);
  useEffect(() => { localStorage.setItem('spmb_form', JSON.stringify(formData)); }, [formData]);
  useEffect(() => { localStorage.setItem('spmb_uploads', JSON.stringify(uploadState)); }, [uploadState]);

  const AUTH_PAGES = new Set(['dashboard', 'form', 'upload', 'payment', 'status']);

  const navigate = (to) => {
    if (to === page) return;
    if (AUTH_PAGES.has(to) && !isLoggedIn) { setPage('auth'); return; }
    setPage(to);
    window.scrollTo({ top: 0 });
  };

  const onStepComplete = (step) => setRegistrationStep(prev => Math.max(prev, step + 1));
  const onLogout = () => { setIsLoggedIn(false); setPage('landing'); };

  const isPreLogin = !isLoggedIn || ['landing', 'info', 'auth'].includes(page);

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
          <Sidebar navigate={navigate} page={page} registrationStep={registrationStep} onLogout={onLogout} />
          <div style={{ marginLeft: 256, flex: 1, minHeight: '100vh', background: C.bg, overflowY: 'auto' }}>
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
        input[type=range] { cursor: pointer; }
      `}</style>
    </div>
  );
}

export default App;
