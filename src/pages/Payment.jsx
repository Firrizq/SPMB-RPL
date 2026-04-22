import { useState, useEffect } from 'react';
import { C, T } from '../tokens';
import { Btn, Card, Divider, PageHeader } from '../components';

export function PagePayment({ navigate, paymentMethod, setPaymentMethod, onStepComplete }) {
  const [confirmed, setConfirmed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(23 * 3600 + 45 * 60 + 30);

  useEffect(() => {
    const t = setInterval(() => setCountdown(c => Math.max(0, c - 1)), 1000);
    return () => clearInterval(t);
  }, []);

  const fmt = (s) => {
    const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), sec = s % 60;
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
  };

  const methods = [
    {
      id: 'va', label: 'Virtual Account', banks: ['BCA', 'BNI', 'BRI', 'Mandiri'],
      desc: 'Nomor VA otomatis. Transfer persis sesuai nominal untuk konfirmasi otomatis.',
      instructions: ['Pilih bank yang kamu gunakan di bawah', 'Catat atau salin nomor Virtual Account', 'Transfer persis Rp 250.000 ke nomor VA tersebut', 'Konfirmasi pembayaran di halaman ini'],
    },
    {
      id: 'transfer', label: 'Transfer Bank', banks: ['BCA', 'BNI', 'BRI', 'Mandiri', 'CIMB'],
      desc: 'Transfer langsung ke rekening resmi universitas.',
      instructions: ['Catat nomor rekening: BNI 0123456789 a/n Universitas Nusantara', 'Transfer persis Rp 250.000', 'Simpan bukti transfer', 'Konfirmasi pembayaran di halaman ini'],
    },
    {
      id: 'qris', label: 'QRIS', banks: [],
      desc: 'Scan QR code dengan GoPay, OVO, Dana, ShopeePay, atau m-Banking.',
      instructions: [],
    },
  ];

  const selected = methods.find(m => m.id === paymentMethod);

  const handleConfirm = () => {
    setLoading(true);
    setTimeout(() => { setLoading(false); setConfirmed(true); onStepComplete(3); }, 1500);
  };

  if (confirmed) {
    return (
      <div style={{ padding: '36px 40px', maxWidth: 600, margin: '0 auto', textAlign: 'center' }}>
        <div style={{ background: C.card, borderRadius: 24, padding: '56px 40px', boxShadow: '0 4px 24px rgba(44,44,44,0.1)', border: `1px solid ${C.border}` }}>
          <div style={{ width: 80, height: 80, borderRadius: '50%', background: C.successLight, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
            <svg width="36" height="30" viewBox="0 0 36 30" fill="none"><path d="M2 16l10 10L34 2" stroke={C.success} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
          <h2 style={{ fontFamily: T.serif, fontSize: 30, fontWeight: 700, color: C.text, marginBottom: 12 }}>Pembayaran Berhasil!</h2>
          <p style={{ fontFamily: T.sans, fontSize: 15, color: C.muted, lineHeight: 1.7, marginBottom: 32 }}>
            Terima kasih! Pendaftaranmu sedang diproses. Kami akan mengirim notifikasi setiap ada perkembangan.
          </p>
          <div style={{ background: C.bg, borderRadius: 14, padding: '20px 24px', marginBottom: 28, textAlign: 'left' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              {[['No. Transaksi', 'TRX-2026-0058219'], ['Metode', selected?.label || '-'], ['Nominal', 'Rp 250.000'], ['Waktu', '22 Apr 2026, 11.32']].map(([k, v]) => (
                <div key={k}>
                  <div style={{ fontFamily: T.sans, fontSize: 12, color: C.muted, marginBottom: 3 }}>{k}</div>
                  <div style={{ fontFamily: T.sans, fontSize: 14, fontWeight: 600, color: C.text }}>{v}</div>
                </div>
              ))}
            </div>
          </div>
          <Btn fullWidth size="lg" onClick={() => navigate('status')}>Lihat Status Pendaftaran →</Btn>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '36px 40px', maxWidth: 1100, margin: '0 auto' }}>
      <PageHeader
        title="Pembayaran Pendaftaran"
        subtitle="Selesaikan pembayaran untuk melanjutkan proses pendaftaranmu"
        breadcrumb="Dashboard / Pembayaran"
        actions={
          <div style={{ background: countdown < 3600 ? C.errorLight : C.warningLight, borderRadius: 10, padding: '10px 18px', display: 'flex', gap: 12, alignItems: 'center', border: `1px solid ${countdown < 3600 ? C.error : C.warning}30` }}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="7.5" stroke={countdown < 3600 ? C.error : C.warning} strokeWidth="1.7"/><path d="M9 5v4l2.5 2" stroke={countdown < 3600 ? C.error : C.warning} strokeWidth="1.7" strokeLinecap="round"/></svg>
            <div>
              <div style={{ fontFamily: T.sans, fontSize: 11, color: C.muted }}>Batas waktu</div>
              <div style={{ fontFamily: T.sans, fontSize: 17, fontWeight: 800, color: countdown < 3600 ? C.error : '#8B5E00', letterSpacing: 1 }}>{fmt(countdown)}</div>
            </div>
          </div>
        }
      />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 28 }}>
        {/* Payment methods */}
        <div>
          <div style={{ fontFamily: T.sans, fontSize: 12, fontWeight: 600, color: C.muted, letterSpacing: 0.8, marginBottom: 14 }}>PILIH METODE PEMBAYARAN</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
            {methods.map(m => {
              const sel = paymentMethod === m.id;
              return (
                <div key={m.id} onClick={() => setPaymentMethod(m.id)} style={{ background: C.card, borderRadius: 14, border: sel ? `2px solid ${C.primary}` : `1px solid ${C.border}`, boxShadow: sel ? `0 0 0 3px ${C.primaryLight}` : '0 2px 8px rgba(44,44,44,0.05)', cursor: 'pointer', transition: 'all 0.15s', overflow: 'hidden' }}>
                  <div style={{ padding: '18px 20px', display: 'flex', alignItems: 'center', gap: 16 }}>
                    <div style={{ width: 44, height: 44, borderRadius: 12, background: sel ? C.primaryLight : C.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      {m.id === 'va' && <svg width="22" height="16" viewBox="0 0 22 16" fill="none"><rect x="1" y="1" width="20" height="14" rx="3" stroke={sel ? C.primary : C.muted} strokeWidth="1.7"/><path d="M1 6h20" stroke={sel ? C.primary : C.muted} strokeWidth="1.7"/></svg>}
                      {m.id === 'transfer' && <svg width="22" height="18" viewBox="0 0 22 18" fill="none"><path d="M11 1L2 7h18L11 1z" stroke={sel ? C.primary : C.muted} strokeWidth="1.7" strokeLinejoin="round"/><path d="M4 7v9M11 7v9M18 7v9" stroke={sel ? C.primary : C.muted} strokeWidth="1.7" strokeLinecap="round"/><path d="M1 16h20" stroke={sel ? C.primary : C.muted} strokeWidth="1.7"/></svg>}
                      {m.id === 'qris' && <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><rect x="2" y="2" width="7" height="7" rx="1.5" stroke={sel ? C.primary : C.muted} strokeWidth="1.7"/><rect x="13" y="2" width="7" height="7" rx="1.5" stroke={sel ? C.primary : C.muted} strokeWidth="1.7"/><rect x="2" y="13" width="7" height="7" rx="1.5" stroke={sel ? C.primary : C.muted} strokeWidth="1.7"/><rect x="4" y="4" width="3" height="3" fill={sel ? C.primary : C.muted} rx="0.5"/><rect x="15" y="4" width="3" height="3" fill={sel ? C.primary : C.muted} rx="0.5"/><rect x="4" y="15" width="3" height="3" fill={sel ? C.primary : C.muted} rx="0.5"/><path d="M13 13h4v4" stroke={sel ? C.primary : C.muted} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M17 13v4h4" stroke={sel ? C.primary : C.muted} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontFamily: T.sans, fontSize: 15, fontWeight: 700, color: C.text, marginBottom: 3 }}>{m.label}</div>
                      <div style={{ fontFamily: T.sans, fontSize: 13, color: C.muted }}>{m.desc}</div>
                      {m.banks.length > 0 && (
                        <div style={{ display: 'flex', gap: 6, marginTop: 8, flexWrap: 'wrap' }}>
                          {m.banks.map(b => <span key={b} style={{ fontFamily: T.sans, fontSize: 11, fontWeight: 600, background: C.bg, color: C.textSub, padding: '3px 8px', borderRadius: 6 }}>{b}</span>)}
                        </div>
                      )}
                    </div>
                    <div style={{ width: 22, height: 22, borderRadius: '50%', border: `2px solid ${sel ? C.primary : C.border}`, background: sel ? C.primary : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      {sel && <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#fff' }} />}
                    </div>
                  </div>

                  {sel && (
                    <div style={{ borderTop: `1px solid ${C.border}`, background: C.bg }}>
                      {m.id === 'qris' ? (
                        <div style={{ padding: '20px', display: 'flex', gap: 24, alignItems: 'center' }}>
                          <div style={{ width: 140, height: 140, background: C.card, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', border: `1px solid ${C.border}`, flexShrink: 0 }}>
                            <div style={{ fontFamily: 'monospace', fontSize: 10, color: C.muted, textAlign: 'center', lineHeight: 1.6 }}>QR Code<br/>akan ditampilkan<br/>di sini</div>
                          </div>
                          <div>
                            <div style={{ fontFamily: T.sans, fontSize: 14, fontWeight: 600, color: C.text, marginBottom: 8 }}>Cara Pembayaran QRIS</div>
                            <div style={{ fontFamily: T.sans, fontSize: 13, color: C.textSub, lineHeight: 1.7 }}>
                              1. Buka aplikasi e-wallet atau m-Banking<br/>
                              2. Pilih fitur Scan QR / QRIS<br/>
                              3. Arahkan kamera ke QR code di sebelah kiri<br/>
                              4. Masukkan nominal Rp 250.000<br/>
                              5. Konfirmasi pembayaran
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div style={{ padding: '16px 20px', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
                          {m.instructions.map((step, i) => (
                            <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                              <div style={{ width: 22, height: 22, borderRadius: '50%', background: C.primaryLight, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
                                <span style={{ fontFamily: T.sans, fontSize: 11, fontWeight: 700, color: C.primary }}>{i + 1}</span>
                              </div>
                              <span style={{ fontFamily: T.sans, fontSize: 13, color: C.textSub, lineHeight: 1.5 }}>{step}</span>
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

        {/* Order summary */}
        <div>
          <div style={{ fontFamily: T.sans, fontSize: 12, fontWeight: 600, color: C.muted, letterSpacing: 0.8, marginBottom: 14 }}>RINGKASAN PEMBAYARAN</div>
          <Card style={{ padding: 0, overflow: 'hidden' }}>
            <div style={{ background: `linear-gradient(135deg, ${C.primary}, #B85A35)`, padding: '20px 24px' }}>
              <div style={{ fontFamily: T.sans, fontSize: 12, color: 'rgba(255,255,255,0.7)', marginBottom: 4 }}>Total yang harus dibayar</div>
              <div style={{ fontFamily: T.serif, fontSize: 32, fontWeight: 700, color: '#fff' }}>Rp 250.000</div>
            </div>
            <div style={{ padding: '20px 24px' }}>
              {[['Biaya Pendaftaran', 'Rp 250.000'], ['Biaya Administrasi', 'Rp 0'], ['Diskon', 'Rp 0']].map(([l, v], i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: i < 2 ? `1px solid ${C.border}` : 'none' }}>
                  <span style={{ fontFamily: T.sans, fontSize: 14, color: C.textSub }}>{l}</span>
                  <span style={{ fontFamily: T.sans, fontSize: 14, color: C.text, fontWeight: v === 'Rp 0' ? 400 : 600 }}>{v}</span>
                </div>
              ))}
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 14, borderTop: `2px solid ${C.border}` }}>
                <span style={{ fontFamily: T.sans, fontSize: 15, fontWeight: 700, color: C.text }}>Total</span>
                <span style={{ fontFamily: T.serif, fontSize: 18, fontWeight: 700, color: C.primary }}>Rp 250.000</span>
              </div>
            </div>
            <div style={{ padding: '0 24px 20px' }}>
              <Divider style={{ marginBottom: 16 }} />
              {[['Nama Pendaftar', 'Stefanny Aulia'], ['No. Pendaftaran', '2026-05821'], ['Program Studi', 'Teknik Informatika']].map(([k, v]) => (
                <div key={k} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                  <span style={{ fontFamily: T.sans, fontSize: 12, color: C.muted }}>{k}</span>
                  <span style={{ fontFamily: T.sans, fontSize: 12, fontWeight: 600, color: C.text, textAlign: 'right', maxWidth: 180 }}>{v}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
