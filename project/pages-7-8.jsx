// pages-7-8.jsx — Pembayaran + Status & Pengumuman

const { C, T, Btn, Card, Badge, PageHeader, BottomNav, Divider, SectionTitle } = window;

// ── PAGE 7: PEMBAYARAN ────────────────────────────────────────
function PagePayment({ navigate, paymentMethod, setPaymentMethod, onStepComplete }) {
  const [confirmed, setConfirmed] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [countdown, setCountdown] = React.useState(24 * 60 * 60); // 24 jam

  React.useEffect(() => {
    const t = setInterval(() => setCountdown(c => Math.max(0, c - 1)), 1000);
    return () => clearInterval(t);
  }, []);

  const fmt = (s) => {
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;
    return `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(sec).padStart(2,'0')}`;
  };

  const methods = [
    {
      id: 'va', label: 'Virtual Account', icon: (
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><rect x="2" y="4" width="18" height="14" rx="3" stroke="currentColor" strokeWidth="1.8"/><path d="M2 9h18" stroke="currentColor" strokeWidth="1.8"/><path d="M6 14h3M14 14h2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
      ),
      banks: ['BCA', 'BNI', 'BRI', 'Mandiri'],
      desc: 'Transfer ke nomor VA yang kami berikan',
    },
    {
      id: 'transfer', label: 'Transfer Bank', icon: (
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M11 2L2 7h18L11 2z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/><path d="M4 7v10M8 7v10M14 7v10M18 7v10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/><path d="M2 17h18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
      ),
      banks: ['BCA', 'BNI', 'BRI', 'Mandiri', 'CIMB'],
      desc: 'Transfer langsung ke rekening kampus',
    },
    {
      id: 'qris', label: 'QRIS', icon: (
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><rect x="2" y="2" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8"/><rect x="13" y="2" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8"/><rect x="2" y="13" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8"/><rect x="4" y="4" width="3" height="3" fill="currentColor" rx="0.5"/><rect x="15" y="4" width="3" height="3" fill="currentColor" rx="0.5"/><rect x="4" y="15" width="3" height="3" fill="currentColor" rx="0.5"/><path d="M13 13h3v3h-3zM16 16h3M16 13v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
      ),
      banks: [],
      desc: 'Scan QR code dengan aplikasi e-wallet',
    },
  ];

  const selected = methods.find(m => m.id === paymentMethod);

  const handleConfirm = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setConfirmed(true);
      onStepComplete(3);
    }, 1500);
  };

  if (confirmed) {
    return (
      <div style={{ background: C.bg, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 32px', textAlign: 'center' }}>
        <div style={{ width: 80, height: 80, borderRadius: '50%', background: C.successLight, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
          <svg width="36" height="30" viewBox="0 0 36 30" fill="none"><path d="M2 16l10 10L34 2" stroke={C.success} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </div>
        <div style={{ fontFamily: T.serif, fontSize: 24, fontWeight: 700, color: C.text, marginBottom: 10 }}>Pembayaran Berhasil!</div>
        <div style={{ fontFamily: T.sans, fontSize: 14, color: C.textSub, lineHeight: 1.6, marginBottom: 28 }}>
          Terima kasih! Pendaftaranmu sedang diproses. Kamu akan mendapat notifikasi setiap ada update.
        </div>
        <div style={{ background: C.card, borderRadius: 16, padding: '16px', width: '100%', boxShadow: '0 2px 12px rgba(44,44,44,0.08)', marginBottom: 24 }}>
          <div style={{ fontFamily: T.sans, fontSize: 12, color: C.muted, marginBottom: 4 }}>No. Transaksi</div>
          <div style={{ fontFamily: T.sans, fontSize: 15, fontWeight: 700, color: C.text }}>TRX-2025-0058219</div>
          <Divider style={{ margin: '12px 0' }} />
          <div style={{ fontFamily: T.sans, fontSize: 12, color: C.muted, marginBottom: 4 }}>Biaya Dibayar</div>
          <div style={{ fontFamily: T.serif, fontSize: 18, fontWeight: 700, color: C.success }}>Rp 250.000</div>
        </div>
        <Btn fullWidth size="lg" onClick={() => navigate('status')}>Lihat Status Pendaftaran →</Btn>
      </div>
    );
  }

  return (
    <div style={{ background: C.bg, height: '100%', display: 'flex', flexDirection: 'column' }}>
      <PageHeader title="Pembayaran" onBack={() => navigate('upload')} subtitle="Biaya Pendaftaran" />

      <div style={{ flex: 1, overflowY: 'auto', WebkitOverflowScrolling: 'touch', paddingBottom: 100 }}>
        {/* Countdown */}
        <div style={{ margin: '16px 16px 0', background: countdown < 3600 ? C.errorLight : C.warningLight, borderRadius: 14, padding: '14px 16px', border: `1px solid ${countdown < 3600 ? C.error : C.warning}30` }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontFamily: T.sans, fontSize: 12, color: C.textSub, marginBottom: 2 }}>Batas waktu pembayaran</div>
              <div style={{ fontFamily: T.sans, fontSize: 12, color: countdown < 3600 ? C.error : '#8B5E00' }}>Segera bayar sebelum masa berlaku habis</div>
            </div>
            <div style={{ fontFamily: T.sans, fontSize: 22, fontWeight: 800, color: countdown < 3600 ? C.error : '#8B5E00', letterSpacing: 1 }}>{fmt(countdown)}</div>
          </div>
        </div>

        {/* Order summary */}
        <div style={{ margin: '14px 16px 0' }}>
          <div style={{ background: C.card, borderRadius: 14, overflow: 'hidden', boxShadow: '0 2px 10px rgba(44,44,44,0.07)', border: `1px solid ${C.border}` }}>
            <div style={{ padding: '14px 16px', background: C.primaryLight, borderBottom: `1px solid ${C.border}` }}>
              <div style={{ fontFamily: T.sans, fontSize: 13, fontWeight: 700, color: C.primary }}>Rincian Pembayaran</div>
            </div>
            {[
              ['Biaya Pendaftaran', 'Rp 250.000'],
              ['Biaya Admin', 'Rp 0'],
              ['Diskon', 'Rp 0'],
            ].map(([label, val], i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 16px', borderBottom: i < 2 ? `1px solid ${C.border}` : 'none' }}>
                <span style={{ fontFamily: T.sans, fontSize: 14, color: C.textSub }}>{label}</span>
                <span style={{ fontFamily: T.sans, fontSize: 14, color: C.text }}>{val}</span>
              </div>
            ))}
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '14px 16px', background: C.bg, borderTop: `1.5px solid ${C.border}` }}>
              <span style={{ fontFamily: T.sans, fontSize: 15, fontWeight: 700, color: C.text }}>Total</span>
              <span style={{ fontFamily: T.serif, fontSize: 18, fontWeight: 700, color: C.primary }}>Rp 250.000</span>
            </div>
          </div>
        </div>

        {/* Payment methods */}
        <div style={{ padding: '20px 16px 0' }}>
          <div style={{ fontFamily: T.sans, fontSize: 13, fontWeight: 600, color: C.textSub, letterSpacing: 0.4, marginBottom: 12 }}>METODE PEMBAYARAN</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {methods.map(m => {
              const isSelected = paymentMethod === m.id;
              return (
                <div key={m.id} onClick={() => setPaymentMethod(m.id)} style={{
                  background: C.card, borderRadius: 14, padding: '14px 14px',
                  border: isSelected ? `2px solid ${C.primary}` : `1px solid ${C.border}`,
                  boxShadow: isSelected ? `0 0 0 3px ${C.primaryLight}` : '0 2px 8px rgba(44,44,44,0.05)',
                  cursor: 'pointer', transition: 'all 0.15s',
                  display: 'flex', alignItems: 'center', gap: 12,
                }}>
                  <div style={{ color: isSelected ? C.primary : C.muted, display: 'flex', flexShrink: 0 }}>{m.icon}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: T.sans, fontSize: 14, fontWeight: 700, color: C.text }}>{m.label}</div>
                    <div style={{ fontFamily: T.sans, fontSize: 12, color: C.muted, marginTop: 1 }}>{m.desc}</div>
                    {m.banks.length > 0 && (
                      <div style={{ display: 'flex', gap: 6, marginTop: 8, flexWrap: 'wrap' }}>
                        {m.banks.map(b => (
                          <span key={b} style={{ fontFamily: T.sans, fontSize: 10, fontWeight: 600, background: C.bg, color: C.textSub, padding: '2px 8px', borderRadius: 6 }}>{b}</span>
                        ))}
                      </div>
                    )}
                  </div>
                  <div style={{
                    width: 20, height: 20, borderRadius: '50%', flexShrink: 0,
                    border: `2px solid ${isSelected ? C.primary : C.border}`,
                    background: isSelected ? C.primary : 'transparent',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    {isSelected && <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#fff' }} />}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Instructions */}
        {paymentMethod && (
          <div style={{ margin: '16px 16px 0', background: C.card, borderRadius: 14, overflow: 'hidden', border: `1px solid ${C.border}` }}>
            <div style={{ padding: '12px 16px', borderBottom: `1px solid ${C.border}` }}>
              <div style={{ fontFamily: T.sans, fontSize: 13, fontWeight: 700, color: C.text }}>Cara Pembayaran via {selected?.label}</div>
            </div>
            {paymentMethod === 'qris' ? (
              <div style={{ padding: '16px', textAlign: 'center' }}>
                <div style={{ width: 140, height: 140, margin: '0 auto 12px', background: C.bg, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', border: `1px solid ${C.border}` }}>
                  <div style={{ fontFamily: 'monospace', fontSize: 10, color: C.muted, textAlign: 'center' }}>QR Code<br/>akan tampil<br/>di sini</div>
                </div>
                <div style={{ fontFamily: T.sans, fontSize: 12, color: C.textSub }}>Scan dengan GoPay, OVO, Dana, atau m-Banking</div>
              </div>
            ) : (
              <div style={{ padding: '14px 16px' }}>
                {[
                  paymentMethod === 'va' ? `Pilih bank dan dapatkan nomor VA` : 'Transfer ke rekening berikut:',
                  paymentMethod === 'va' ? 'Nomor VA: 1234-5678-9012-3456 (BCA)' : 'Bank BNI - 0123456789 a/n Universitas Nusantara',
                  `Nominal tepat: Rp 250.000`,
                  'Konfirmasi pembayaran dengan klik tombol di bawah',
                ].map((step, i) => (
                  <div key={i} style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
                    <div style={{ width: 22, height: 22, borderRadius: '50%', background: C.primaryLight, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <span style={{ fontFamily: T.sans, fontSize: 11, fontWeight: 700, color: C.primary }}>{i + 1}</span>
                    </div>
                    <span style={{ fontFamily: T.sans, fontSize: 13, color: C.text, lineHeight: 1.5 }}>{step}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* CTA */}
      <div style={{ padding: '12px 16px 30px', background: C.card, borderTop: `1px solid ${C.border}` }}>
        <Btn fullWidth size="lg" disabled={!paymentMethod || loading} onClick={handleConfirm}>
          {loading ? 'Memproses...' : 'Konfirmasi Pembayaran →'}
        </Btn>
        {!paymentMethod && <div style={{ fontFamily: T.sans, fontSize: 12, color: C.muted, textAlign: 'center', marginTop: 8 }}>Pilih metode pembayaran terlebih dahulu</div>}
      </div>

      <BottomNav current="form" navigate={navigate} />
    </div>
  );
}

// ── PAGE 8: STATUS & PENGUMUMAN ───────────────────────────────
function PageStatus({ navigate, registrationStep, uploadState }) {
  const steps = [
    { label: 'Buat Akun', date: '22 Apr 2025', desc: 'Akun berhasil dibuat dan diverifikasi' },
    { label: 'Isi Formulir', date: '22 Apr 2025', desc: 'Data diri dan pilihan prodi tersimpan' },
    { label: 'Upload Berkas', date: '-', desc: 'Ijazah, pasfoto, KK, dan SKL' },
    { label: 'Pembayaran', date: '-', desc: 'Biaya pendaftaran Rp 250.000' },
    { label: 'Verifikasi Berkas', date: '-', desc: 'Tim admin memeriksa dokumenmu' },
    { label: 'Proses Seleksi', date: '-', desc: 'Seleksi akademik dan administrasi' },
    { label: 'Pengumuman', date: '15 Jun 2025', desc: 'Hasil seleksi diumumkan' },
  ];

  const getStepStatus = (i) => {
    if (i < registrationStep) return 'done';
    if (i === registrationStep) return 'current';
    return 'pending';
  };

  const resultStatus = registrationStep >= 6 ? 'diterima' : 'proses';

  const notifications = [
    { title: 'Akun Dibuat', msg: 'Selamat datang, Stefanny! Akun kamu sudah aktif.', time: '22 Apr, 09.15', type: 'success' },
    { title: 'Formulir Tersimpan', msg: 'Data diri & pilihan prodi berhasil disimpan.', time: '22 Apr, 09.42', type: 'success' },
    { title: 'Ingatkan Upload', msg: 'Segera upload dokumen pendukungmu.', time: '22 Apr, 10.00', type: 'info' },
  ];

  return (
    <div style={{ background: C.bg, height: '100%', display: 'flex', flexDirection: 'column' }}>
      <PageHeader title="Status Pendaftaran" subtitle="No. Daftar: 2025-05821" />

      <div style={{ flex: 1, overflowY: 'auto', WebkitOverflowScrolling: 'touch', paddingBottom: 90 }}>

        {/* Result card */}
        <div style={{ margin: '16px 16px 0' }}>
          {resultStatus === 'diterima' ? (
            <div style={{ background: `linear-gradient(135deg, ${C.success}, #5A8A5E)`, borderRadius: 16, padding: '20px', textAlign: 'center' }}>
              <div style={{ fontSize: 36, marginBottom: 8 }}>🎉</div>
              <div style={{ fontFamily: T.serif, fontSize: 22, fontWeight: 700, color: '#fff', marginBottom: 6 }}>Selamat, Kamu Diterima!</div>
              <div style={{ fontFamily: T.sans, fontSize: 13, color: 'rgba(255,255,255,0.85)', lineHeight: 1.5 }}>di Program Studi <strong>Teknik Informatika</strong></div>
            </div>
          ) : (
            <div style={{ background: `linear-gradient(135deg, ${C.primary}, #B85A35)`, borderRadius: 16, padding: '20px', display: 'flex', gap: 14, alignItems: 'center' }}>
              <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><circle cx="11" cy="11" r="9" stroke="#fff" strokeWidth="1.8"/><path d="M11 7v4.5l3 1.5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round"/></svg>
              </div>
              <div>
                <div style={{ fontFamily: T.serif, fontSize: 18, fontWeight: 700, color: '#fff' }}>Dalam Proses</div>
                <div style={{ fontFamily: T.sans, fontSize: 12, color: 'rgba(255,255,255,0.85)', marginTop: 3 }}>
                  Pengumuman: <strong>15 Juni 2025</strong>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Timeline */}
        <div style={{ padding: '20px 16px 0' }}>
          <div style={{ fontFamily: T.sans, fontSize: 13, fontWeight: 600, color: C.textSub, letterSpacing: 0.4, marginBottom: 14 }}>ALUR PENDAFTARAN</div>
          <div style={{ position: 'relative', paddingLeft: 36 }}>
            <div style={{ position: 'absolute', left: 11, top: 14, bottom: 14, width: 2, background: C.border }} />
            {steps.map((step, i) => {
              const status = getStepStatus(i);
              const dotColor = status === 'done' ? C.success : status === 'current' ? C.primary : C.border;
              return (
                <div key={i} style={{ display: 'flex', gap: 14, marginBottom: 18, position: 'relative', alignItems: 'flex-start' }}>
                  <div style={{
                    position: 'absolute', left: -36, top: 2,
                    width: 24, height: 24, borderRadius: '50%',
                    background: dotColor, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: status !== 'pending' ? `0 2px 8px ${dotColor}50` : 'none',
                    transition: 'background 0.3s',
                  }}>
                    {status === 'done' ? (
                      <svg width="11" height="9" viewBox="0 0 11 9" fill="none"><path d="M1 4.5l3 3L10 1" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    ) : status === 'current' ? (
                      <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#fff' }} />
                    ) : (
                      <span style={{ fontFamily: T.sans, fontSize: 9, fontWeight: 700, color: C.muted }}>{i + 1}</span>
                    )}
                  </div>
                  <div style={{
                    background: status === 'current' ? C.primaryLight : status === 'done' ? C.successLight : C.card,
                    borderRadius: 12, padding: '12px 14px', flex: 1,
                    border: `1px solid ${status === 'current' ? C.primary + '40' : status === 'done' ? C.success + '30' : C.border}`,
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ fontFamily: T.sans, fontSize: 13, fontWeight: 700, color: C.text }}>{step.label}</div>
                      {status === 'done' && <span style={{ fontFamily: T.sans, fontSize: 10, color: C.success, fontWeight: 600 }}>✓ Selesai</span>}
                      {status === 'current' && <span style={{ fontFamily: T.sans, fontSize: 10, color: C.primary, fontWeight: 600 }}>● Sekarang</span>}
                      {status === 'pending' && <span style={{ fontFamily: T.sans, fontSize: 10, color: C.muted }}>Menunggu</span>}
                    </div>
                    <div style={{ fontFamily: T.sans, fontSize: 12, color: C.muted, marginTop: 3 }}>{step.desc}</div>
                    {step.date !== '-' && (
                      <div style={{ fontFamily: T.sans, fontSize: 11, color: C.textSub, marginTop: 4 }}>📅 {step.date}</div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Notifications history */}
        <div style={{ padding: '16px 16px 0' }}>
          <div style={{ fontFamily: T.sans, fontSize: 13, fontWeight: 600, color: C.textSub, letterSpacing: 0.4, marginBottom: 12 }}>RIWAYAT NOTIFIKASI</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {notifications.map((n, i) => (
              <div key={i} style={{ background: C.card, borderRadius: 12, padding: '12px 14px', border: `1px solid ${C.border}`, display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: n.type === 'success' ? C.success : C.primary, marginTop: 5, flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: T.sans, fontSize: 13, fontWeight: 600, color: C.text }}>{n.title}</div>
                  <div style={{ fontFamily: T.sans, fontSize: 12, color: C.textSub, marginTop: 2 }}>{n.msg}</div>
                  <div style={{ fontFamily: T.sans, fontSize: 11, color: C.muted, marginTop: 4 }}>{n.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div style={{ padding: '20px 16px 0' }}>
          {registrationStep < 2 && (
            <Btn fullWidth size="lg" onClick={() => navigate('upload')}>
              Lanjut Upload Dokumen →
            </Btn>
          )}
          {registrationStep === 2 && (
            <Btn fullWidth size="lg" onClick={() => navigate('payment')}>
              Lanjut ke Pembayaran →
            </Btn>
          )}
        </div>
      </div>

      <BottomNav current="status" navigate={navigate} />
    </div>
  );
}

Object.assign(window, { PagePayment, PageStatus });
