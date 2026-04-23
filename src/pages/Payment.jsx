import { useState, useEffect } from 'react';
import { C, T } from '../tokens';
import { Btn, Card, Divider, PageHeader } from '../components';
import { useBreakpoint } from '../hooks/useBreakpoint';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
const fmtDate = (d) => `${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()}, ${String(d.getHours()).padStart(2,'0')}.${String(d.getMinutes()).padStart(2,'0')}`;

const PRODI_LABELS = {
  'teknik-informatika': 'Teknik Informatika', 'sistem-informasi': 'Sistem Informasi',
  'ilmu-komunikasi': 'Ilmu Komunikasi', 'manajemen': 'Manajemen',
  'akuntansi': 'Akuntansi', 'psikologi': 'Psikologi',
  'hukum': 'Ilmu Hukum', 'kedokteran': 'Pendidikan Dokter',
};

const VA_PREFIXES = { BCA: '1234567890', BNI: '8899001122', BRI: '0089123400', Mandiri: '7878456700' };
const genVA = (bank) => {
  const prefix = VA_PREFIXES[bank] || '9900';
  const suffix = String(Math.floor(100000 + Math.random() * 900000));
  return (prefix + suffix).slice(0, 16);
};

const QR_DOTS = [
  1,1,1,1,1,1,0, 0,1,0,0,1,0, 1,1,1,1,1,1,0,
  1,0,0,0,0,1,0, 0,0,1,0,0,0, 1,0,0,0,0,1,0,
  1,0,1,1,0,1,0, 1,0,1,1,0,1, 1,0,1,1,0,1,0,
  1,0,0,0,0,1,0, 0,1,0,0,1,0, 1,0,0,0,0,1,0,
  1,1,1,1,1,1,0, 0,0,0,1,0,0, 1,1,1,1,1,1,0,
  0,0,0,0,0,0,0, 1,0,1,0,0,1, 0,0,0,0,0,0,0,
  1,1,0,1,0,1,1, 0,1,0,0,1,0, 1,0,1,1,0,0,1,
].slice(0, 49);

export function PagePayment({ navigate, paymentMethod, setPaymentMethod, onStepComplete, userData, formData }) {
  const { isMobile, isTablet } = useBreakpoint();
  const isSmall = isMobile || isTablet;

  const [confirmed, setConfirmed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(23 * 3600 + 45 * 60 + 30);
  const [selectedVABank, setSelectedVABank] = useState(null);
  const [vaNumber, setVaNumber] = useState(null);
  const [confirmedAt, setConfirmedAt] = useState(null);

  useEffect(() => {
    const t = setInterval(() => setCountdown(c => Math.max(0, c - 1)), 1000);
    return () => clearInterval(t);
  }, []);

  const fmt = (s) => {
    const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), sec = s % 60;
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
  };

  const handleSelectVABank = (bank) => {
    setSelectedVABank(bank);
    setVaNumber(genVA(bank));
  };

  const copyVA = () => { if (vaNumber) navigator.clipboard?.writeText(vaNumber); };

  const methods = [
    {
      id: 'va', label: 'Virtual Account', banks: ['BCA', 'BNI', 'BRI', 'Mandiri'],
      desc: 'Nomor VA otomatis. Transfer persis Rp 250.000.',
      instructions: ['Pilih bank di bawah', 'Salin nomor Virtual Account', 'Transfer persis Rp 250.000', 'Konfirmasi di halaman ini'],
    },
    {
      id: 'transfer', label: 'Transfer Bank', banks: ['BCA', 'BNI', 'BRI', 'Mandiri', 'CIMB'],
      desc: 'Transfer langsung ke rekening resmi universitas.',
      instructions: ['Rekening: BNI 0123456789 a/n Univ. Nusantara', 'Transfer persis Rp 250.000', 'Simpan bukti transfer', 'Konfirmasi di halaman ini'],
    },
    { id: 'qris', label: 'QRIS', banks: [], desc: 'Scan QR dengan GoPay, OVO, Dana, ShopeePay.', instructions: [] },
  ];

  const selected = methods.find(m => m.id === paymentMethod);
  const userName = userData?.name || 'Pengguna';
  const regNo = userData?.registrationNo || '-';
  const prodiLabel = PRODI_LABELS[formData?.prodi1] || (formData?.prodi1 || '-');
  const pad = isMobile ? '20px 16px' : isTablet ? '24px 20px' : '36px 40px';

  const handleConfirm = () => {
    setLoading(true);
    setTimeout(() => { setLoading(false); setConfirmed(true); setConfirmedAt(new Date()); onStepComplete(3); }, 1500);
  };

  if (confirmed) {
    const txId = `TRX-${new Date().getFullYear()}-${regNo.replace('2026-', '')}`;
    return (
      <div style={{ padding: pad, maxWidth: 560, margin: '0 auto', textAlign: 'center' }}>
        <div style={{ background: C.card, borderRadius: 20, padding: isMobile ? '40px 24px' : '56px 40px', boxShadow: '0 4px 24px rgba(44,44,44,0.1)', border: `1px solid ${C.border}` }}>
          <div style={{ width: 72, height: 72, borderRadius: '50%', background: C.successLight, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
            <svg width="32" height="26" viewBox="0 0 36 30" fill="none"><path d="M2 16l10 10L34 2" stroke={C.success} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
          <h2 style={{ fontFamily: T.serif, fontSize: isMobile ? 24 : 30, fontWeight: 700, color: C.text, marginBottom: 10 }}>Pembayaran Berhasil!</h2>
          <p style={{ fontFamily: T.sans, fontSize: 14, color: C.muted, lineHeight: 1.7, marginBottom: 28 }}>
            Terima kasih, {userName.split(' ')[0]}! Pendaftaranmu sedang diproses.
          </p>
          <div style={{ background: C.bg, borderRadius: 12, padding: '18px 20px', marginBottom: 24, textAlign: 'left' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              {[['No. Transaksi', txId], ['Metode', selected?.label || '-'], ['Nominal', 'Rp 250.000'], ['Waktu', confirmedAt ? fmtDate(confirmedAt) : '-']].map(([k, v]) => (
                <div key={k}>
                  <div style={{ fontFamily: T.sans, fontSize: 11, color: C.muted, marginBottom: 2 }}>{k}</div>
                  <div style={{ fontFamily: T.sans, fontSize: 13, fontWeight: 600, color: C.text }}>{v}</div>
                </div>
              ))}
            </div>
          </div>
          <Btn fullWidth size="lg" onClick={() => navigate('status')}>Lihat Status Pendaftaran →</Btn>
        </div>
      </div>
    );
  }

  // Summary card (reused in both layouts)
  const summaryCard = (
    <div>
      {!isSmall && <div style={{ fontFamily: T.sans, fontSize: 12, fontWeight: 600, color: C.muted, letterSpacing: 0.8, marginBottom: 14 }}>RINGKASAN PEMBAYARAN</div>}
      <Card style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ background: `linear-gradient(135deg, ${C.primary}, #B85A35)`, padding: '18px 22px' }}>
          <div style={{ fontFamily: T.sans, fontSize: 12, color: 'rgba(255,255,255,0.7)', marginBottom: 3 }}>Total yang harus dibayar</div>
          <div style={{ fontFamily: T.serif, fontSize: 28, fontWeight: 700, color: '#fff' }}>Rp 250.000</div>
        </div>
        <div style={{ padding: '18px 22px' }}>
          {[['Biaya Pendaftaran', 'Rp 250.000'], ['Biaya Administrasi', 'Rp 0'], ['Diskon', 'Rp 0']].map(([l, v], i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '9px 0', borderBottom: i < 2 ? `1px solid ${C.border}` : 'none' }}>
              <span style={{ fontFamily: T.sans, fontSize: 13, color: C.textSub }}>{l}</span>
              <span style={{ fontFamily: T.sans, fontSize: 13, color: C.text, fontWeight: v === 'Rp 0' ? 400 : 600 }}>{v}</span>
            </div>
          ))}
          <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 12, borderTop: `2px solid ${C.border}` }}>
            <span style={{ fontFamily: T.sans, fontSize: 14, fontWeight: 700, color: C.text }}>Total</span>
            <span style={{ fontFamily: T.serif, fontSize: 17, fontWeight: 700, color: C.primary }}>Rp 250.000</span>
          </div>
        </div>
        <div style={{ padding: '0 22px 18px' }}>
          <Divider style={{ marginBottom: 14 }} />
          {[['Nama Pendaftar', userName], ['No. Pendaftaran', regNo], ['Program Studi', prodiLabel]].map(([k, v]) => (
            <div key={k} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 9 }}>
              <span style={{ fontFamily: T.sans, fontSize: 12, color: C.muted }}>{k}</span>
              <span style={{ fontFamily: T.sans, fontSize: 12, fontWeight: 600, color: C.text, textAlign: 'right', maxWidth: 160 }}>{v}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );

  return (
    <div style={{ padding: pad, maxWidth: 1100, margin: '0 auto' }}>
      <PageHeader
        title="Pembayaran"
        subtitle={isMobile ? '' : 'Selesaikan pembayaran untuk melanjutkan proses pendaftaranmu'}
        breadcrumb="Dashboard / Pembayaran"
        actions={
          <div style={{ background: countdown < 3600 ? C.errorLight : C.warningLight, borderRadius: 10, padding: '8px 14px', display: 'flex', gap: 10, alignItems: 'center', border: `1px solid ${countdown < 3600 ? C.error : C.warning}30` }}>
            <svg width="16" height="16" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="7.5" stroke={countdown < 3600 ? C.error : C.warning} strokeWidth="1.7"/><path d="M9 5v4l2.5 2" stroke={countdown < 3600 ? C.error : C.warning} strokeWidth="1.7" strokeLinecap="round"/></svg>
            <div style={{ fontFamily: T.sans, fontSize: 15, fontWeight: 800, color: countdown < 3600 ? C.error : '#8B5E00', letterSpacing: 1 }}>{fmt(countdown)}</div>
          </div>
        }
      />

      {/* On mobile: summary first, then methods */}
      {isSmall && <div style={{ marginBottom: 20 }}>{summaryCard}</div>}

      <div style={{ display: 'grid', gridTemplateColumns: isSmall ? '1fr' : '1fr 360px', gap: 24 }}>
        {/* Payment methods */}
        <div>
          <div style={{ fontFamily: T.sans, fontSize: 12, fontWeight: 600, color: C.muted, letterSpacing: 0.8, marginBottom: 14 }}>PILIH METODE PEMBAYARAN</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
            {methods.map(m => {
              const sel = paymentMethod === m.id;
              return (
                <div key={m.id} onClick={() => { setPaymentMethod(m.id); setSelectedVABank(null); setVaNumber(null); }} style={{ background: C.card, borderRadius: 12, border: sel ? `2px solid ${C.primary}` : `1px solid ${C.border}`, boxShadow: sel ? `0 0 0 3px ${C.primaryLight}` : '0 2px 6px rgba(44,44,44,0.04)', cursor: 'pointer', transition: 'all 0.15s', overflow: 'hidden' }}>
                  <div style={{ padding: '16px 18px', display: 'flex', alignItems: 'center', gap: 14 }}>
                    <div style={{ width: 40, height: 40, borderRadius: 10, background: sel ? C.primaryLight : C.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      {m.id === 'va' && <svg width="20" height="15" viewBox="0 0 22 16" fill="none"><rect x="1" y="1" width="20" height="14" rx="3" stroke={sel ? C.primary : C.muted} strokeWidth="1.7"/><path d="M1 6h20" stroke={sel ? C.primary : C.muted} strokeWidth="1.7"/></svg>}
                      {m.id === 'transfer' && <svg width="20" height="17" viewBox="0 0 22 18" fill="none"><path d="M11 1L2 7h18L11 1z" stroke={sel ? C.primary : C.muted} strokeWidth="1.7" strokeLinejoin="round"/><path d="M4 7v9M11 7v9M18 7v9" stroke={sel ? C.primary : C.muted} strokeWidth="1.7" strokeLinecap="round"/><path d="M1 16h20" stroke={sel ? C.primary : C.muted} strokeWidth="1.7"/></svg>}
                      {m.id === 'qris' && <svg width="20" height="20" viewBox="0 0 22 22" fill="none"><rect x="2" y="2" width="7" height="7" rx="1.5" stroke={sel ? C.primary : C.muted} strokeWidth="1.7"/><rect x="13" y="2" width="7" height="7" rx="1.5" stroke={sel ? C.primary : C.muted} strokeWidth="1.7"/><rect x="2" y="13" width="7" height="7" rx="1.5" stroke={sel ? C.primary : C.muted} strokeWidth="1.7"/><rect x="4" y="4" width="3" height="3" fill={sel ? C.primary : C.muted} rx="0.5"/><rect x="15" y="4" width="3" height="3" fill={sel ? C.primary : C.muted} rx="0.5"/><rect x="4" y="15" width="3" height="3" fill={sel ? C.primary : C.muted} rx="0.5"/></svg>}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontFamily: T.sans, fontSize: 14, fontWeight: 700, color: C.text, marginBottom: 2 }}>{m.label}</div>
                      <div style={{ fontFamily: T.sans, fontSize: 12, color: C.muted }}>{m.desc}</div>
                      {m.banks.length > 0 && (
                        <div style={{ display: 'flex', gap: 5, marginTop: 6, flexWrap: 'wrap' }}>
                          {m.banks.map(b => <span key={b} style={{ fontFamily: T.sans, fontSize: 10, fontWeight: 600, background: C.bg, color: C.textSub, padding: '2px 7px', borderRadius: 5 }}>{b}</span>)}
                        </div>
                      )}
                    </div>
                    <div style={{ width: 20, height: 20, borderRadius: '50%', border: `2px solid ${sel ? C.primary : C.border}`, background: sel ? C.primary : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      {sel && <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#fff' }} />}
                    </div>
                  </div>

                  {sel && (
                    <div style={{ borderTop: `1px solid ${C.border}`, background: C.bg }} onClick={e => e.stopPropagation()}>
                      {m.id === 'va' && (
                        <div style={{ padding: '16px 18px' }}>
                          <div style={{ fontFamily: T.sans, fontSize: 13, fontWeight: 600, color: C.text, marginBottom: 10 }}>Pilih bank untuk nomor VA:</div>
                          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: vaNumber ? 14 : 0 }}>
                            {m.banks.map(bank => (
                              <button key={bank} onClick={() => handleSelectVABank(bank)} style={{ padding: '7px 14px', borderRadius: 8, border: `1.5px solid ${selectedVABank === bank ? C.primary : C.border}`, background: selectedVABank === bank ? C.primaryLight : C.card, fontFamily: T.sans, fontSize: 13, fontWeight: selectedVABank === bank ? 700 : 400, color: selectedVABank === bank ? C.primary : C.text, cursor: 'pointer' }}>
                                {bank}
                              </button>
                            ))}
                          </div>
                          {vaNumber && (
                            <div style={{ background: C.card, borderRadius: 10, padding: '14px 16px', border: `1px solid ${C.border}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10 }}>
                              <div>
                                <div style={{ fontFamily: T.sans, fontSize: 11, color: C.muted, marginBottom: 3 }}>Nomor VA {selectedVABank}</div>
                                <div style={{ fontFamily: 'monospace', fontSize: isMobile ? 16 : 19, fontWeight: 700, color: C.text, letterSpacing: 2 }}>{vaNumber}</div>
                              </div>
                              <button onClick={copyVA} style={{ background: C.primaryLight, border: 'none', borderRadius: 7, padding: '7px 12px', fontFamily: T.sans, fontSize: 12, fontWeight: 600, color: C.primary, cursor: 'pointer', flexShrink: 0 }}>Salin</button>
                            </div>
                          )}
                        </div>
                      )}

                      {m.id === 'qris' && (
                        <div style={{ padding: '18px', display: 'flex', gap: 20, alignItems: 'center', flexWrap: 'wrap' }}>
                          <div style={{ width: 120, height: 120, background: '#fff', borderRadius: 10, border: `1px solid ${C.border}`, flexShrink: 0, padding: 8, display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: 1.5 }}>
                            {QR_DOTS.map((dot, i) => <div key={i} style={{ background: dot ? '#1a1a1a' : 'transparent', borderRadius: 1 }} />)}
                          </div>
                          <div>
                            <div style={{ fontFamily: T.sans, fontSize: 13, fontWeight: 600, color: C.text, marginBottom: 6 }}>Cara Bayar QRIS</div>
                            <div style={{ fontFamily: T.sans, fontSize: 12, color: C.textSub, lineHeight: 1.7 }}>
                              1. Buka e-wallet atau m-Banking<br/>
                              2. Pilih Scan QR / QRIS<br/>
                              3. Arahkan ke QR code<br/>
                              4. Masukkan <strong>Rp 250.000</strong>
                            </div>
                          </div>
                        </div>
                      )}

                      {m.id === 'transfer' && (
                        <div style={{ padding: '14px 18px', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', gap: 10 }}>
                          {m.instructions.map((step, i) => (
                            <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                              <div style={{ width: 20, height: 20, borderRadius: '50%', background: C.primaryLight, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
                                <span style={{ fontFamily: T.sans, fontSize: 10, fontWeight: 700, color: C.primary }}>{i + 1}</span>
                              </div>
                              <span style={{ fontFamily: T.sans, fontSize: 12, color: C.textSub, lineHeight: 1.5 }}>{step}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Btn variant="outline" size="md" onClick={() => navigate('upload')}>← Kembali</Btn>
            <Btn size="lg" disabled={!paymentMethod || loading} onClick={handleConfirm}>
              {loading ? 'Memproses...' : 'Konfirmasi Pembayaran →'}
            </Btn>
          </div>
        </div>

        {/* Summary — desktop only (mobile shown above) */}
        {!isSmall && summaryCard}
      </div>
    </div>
  );
}
