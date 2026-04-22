import { useState } from 'react';
import { C, T } from '../tokens';
import { Btn, Card, Badge, PageHeader } from '../components';

export function PageUpload({ navigate, uploadState, setUploadState, onStepComplete }) {
  const [uploading, setUploading] = useState(null);
  const [dragging, setDragging] = useState(null);

  const docs = [
    { id: 'ijazah', label: 'Ijazah / SKL', icon: '🎓', desc: 'Ijazah SMA/SMK/MA atau Surat Keterangan Lulus', formats: 'JPG, PNG, PDF', maxSize: '5 MB', hint: 'Pastikan semua teks terbaca jelas, tidak blur' },
    { id: 'pasfoto', label: 'Pas Foto', icon: '🖼️', desc: 'Foto formal terbaru ukuran 3×4 cm', formats: 'JPG, PNG', maxSize: '2 MB', hint: 'Latar merah, pakai seragam sekolah, wajah terlihat jelas' },
    { id: 'kk', label: 'Kartu Keluarga', icon: '🏠', desc: 'Kartu Keluarga (KK) yang masih berlaku', formats: 'JPG, PNG, PDF', maxSize: '5 MB', hint: 'Scan atau foto seluruh halaman KK dengan jelas' },
    { id: 'skl', label: 'Surat Keterangan Lulus', icon: '📜', desc: 'SKL dari sekolah (jika ijazah belum terbit)', formats: 'JPG, PNG, PDF', maxSize: '5 MB', hint: 'Ditandatangani dan distempel oleh kepala sekolah' },
  ];

  const statusCfg = {
    empty: { label: 'Belum Upload', color: C.muted, bg: C.border },
    uploading: { label: 'Mengupload...', color: C.primary, bg: C.primaryLight },
    uploaded: { label: 'Sudah Upload', color: C.warning, bg: C.warningLight },
    verified: { label: 'Terverifikasi ✓', color: C.success, bg: C.successLight },
    error: { label: 'Gagal — Ulangi', color: C.error, bg: C.errorLight },
  };

  const simulateUpload = (docId) => {
    setUploading(docId);
    setUploadState(prev => ({ ...prev, [docId]: 'uploading' }));
    setTimeout(() => {
      setUploading(null);
      setUploadState(prev => ({ ...prev, [docId]: 'uploaded' }));
    }, 1500);
  };

  const uploadedCount = Object.values(uploadState).filter(s => s === 'uploaded' || s === 'verified').length;
  const allDone = uploadedCount === 4;

  return (
    <div style={{ padding: '36px 40px', maxWidth: 1100, margin: '0 auto' }}>
      <PageHeader
        title="Upload Dokumen"
        subtitle="Upload semua dokumen yang diperlukan untuk melanjutkan pendaftaran"
        breadcrumb="Dashboard / Upload Dokumen"
        actions={
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <Badge label={`${uploadedCount}/4 dokumen`} variant={allDone ? 'success' : 'primary'} dot />
            <Btn size="md" disabled={!allDone} onClick={() => { onStepComplete(2); navigate('payment'); }}>
              {allDone ? 'Lanjut ke Pembayaran →' : `Sisa ${4 - uploadedCount} dokumen`}
            </Btn>
          </div>
        }
      />

      {/* Info banner */}
      <div style={{ background: C.primaryLight, borderRadius: 12, padding: '14px 20px', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 14 }}>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="8.5" stroke={C.primary} strokeWidth="1.7"/><path d="M10 9v5" stroke={C.primary} strokeWidth="1.7" strokeLinecap="round"/><circle cx="10" cy="6.5" r="1.2" fill={C.primary}/></svg>
        <span style={{ fontFamily: T.sans, fontSize: 13, color: C.primary }}>
          <strong>Format diterima:</strong> JPG, PNG, PDF · <strong>Ukuran maksimal:</strong> 5 MB per file · Klik kartu atau seret file untuk mengupload
        </span>
      </div>

      {/* Progress bar */}
      <Card style={{ padding: '16px 24px', marginBottom: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
          <span style={{ fontFamily: T.sans, fontSize: 13, fontWeight: 600, color: C.text }}>Progress Upload</span>
          <span style={{ fontFamily: T.sans, fontSize: 13, fontWeight: 600, color: allDone ? C.success : C.primary }}>
            {uploadedCount} dari 4 dokumen terupload{allDone ? ' ✓' : ''}
          </span>
        </div>
        <div style={{ height: 8, background: C.border, borderRadius: 4, overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${(uploadedCount / 4) * 100}%`, background: allDone ? C.success : C.primary, borderRadius: 4, transition: 'width 0.4s ease' }} />
        </div>
      </Card>

      {/* Document cards — 2×2 */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        {docs.map((doc) => {
          const status = uploadState[doc.id] || 'empty';
          const sc = statusCfg[status] || statusCfg.empty;
          const isUploadingThis = uploading === doc.id;
          const isDragging = dragging === doc.id;
          const isUploaded = status === 'uploaded' || status === 'verified';

          return (
            <div key={doc.id}
              onDragOver={e => { e.preventDefault(); setDragging(doc.id); }}
              onDragLeave={() => setDragging(null)}
              onDrop={e => { e.preventDefault(); setDragging(null); if (!isUploaded) simulateUpload(doc.id); }}
              style={{ background: C.card, borderRadius: 16, border: isDragging ? `2px dashed ${C.primary}` : isUploaded ? `1.5px solid ${sc.color}40` : `1px solid ${C.border}`, boxShadow: isDragging ? `0 0 0 4px ${C.primaryLight}` : '0 2px 12px rgba(44,44,44,0.07)', transition: 'all 0.2s', overflow: 'hidden' }}>
              <div style={{ padding: '20px 24px 16px', display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                <div style={{ width: 52, height: 52, borderRadius: 14, background: sc.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 }}>
                  {isUploadingThis ? (
                    <div style={{ width: 22, height: 22, borderRadius: '50%', border: `2.5px solid ${C.primary}`, borderTopColor: 'transparent', animation: 'spin 0.7s linear infinite' }} />
                  ) : doc.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 }}>
                    <div style={{ fontFamily: T.sans, fontSize: 15, fontWeight: 700, color: C.text }}>{doc.label}</div>
                    <span style={{ fontFamily: T.sans, fontSize: 11, fontWeight: 600, padding: '3px 10px', borderRadius: 99, background: sc.bg, color: sc.color }}>
                      {isUploadingThis ? 'Mengupload...' : sc.label}
                    </span>
                  </div>
                  <div style={{ fontFamily: T.sans, fontSize: 13, color: C.muted }}>{doc.desc}</div>
                  <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                    <span style={{ fontFamily: T.sans, fontSize: 11, color: C.muted, background: C.bg, padding: '3px 8px', borderRadius: 6 }}>{doc.formats}</span>
                    <span style={{ fontFamily: T.sans, fontSize: 11, color: C.muted, background: C.bg, padding: '3px 8px', borderRadius: 6 }}>Maks. {doc.maxSize}</span>
                  </div>
                </div>
              </div>

              <div style={{ padding: '0 24px 12px', fontFamily: T.sans, fontSize: 12, color: C.textSub }}>💡 {doc.hint}</div>

              <div style={{ margin: '0 20px 20px' }}>
                {!isUploaded ? (
                  <div onClick={() => !isUploadingThis && simulateUpload(doc.id)} style={{ border: `1.5px dashed ${isDragging ? C.primary : C.border}`, borderRadius: 12, padding: '20px', textAlign: 'center', cursor: isUploadingThis ? 'wait' : 'pointer', background: isDragging ? C.primaryLight : C.bg, transition: 'all 0.15s' }}>
                    {isUploadingThis ? (
                      <div style={{ fontFamily: T.sans, fontSize: 13, color: C.primary }}>Mengupload file...</div>
                    ) : (
                      <>
                        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" style={{ marginBottom: 8 }}>
                          <path d="M14 20V10m0 0l-4 4m4-4l4 4" stroke={C.primary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M23 19A5 5 0 0019.5 10H19a8 8 0 10-13.5 7" stroke={C.muted} strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                        <div style={{ fontFamily: T.sans, fontSize: 13, fontWeight: 600, color: C.primary, marginBottom: 4 }}>Klik untuk upload atau seret file ke sini</div>
                        <div style={{ fontFamily: T.sans, fontSize: 12, color: C.muted }}>JPG, PNG, atau PDF · Maks. {doc.maxSize}</div>
                      </>
                    )}
                  </div>
                ) : (
                  <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                    <div style={{ flex: 1, background: sc.bg, borderRadius: 10, padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 10 }}>
                      <svg width="16" height="20" viewBox="0 0 16 20" fill="none"><rect x="1" y="1" width="10" height="18" rx="2" stroke={sc.color} strokeWidth="1.5"/><path d="M4 6h7M4 10h5" stroke={sc.color} strokeWidth="1.3" strokeLinecap="round"/></svg>
                      <span style={{ fontFamily: T.sans, fontSize: 13, color: sc.color, fontWeight: 600 }}>
                        {status === 'verified' ? 'Berkas terverifikasi' : 'Berkas berhasil diupload'}
                      </span>
                    </div>
                    {status !== 'verified' && (
                      <button onClick={() => setUploadState(prev => ({ ...prev, [doc.id]: 'empty' }))} style={{ background: C.errorLight, border: 'none', borderRadius: 10, padding: '12px 16px', fontFamily: T.sans, fontSize: 12, color: C.error, cursor: 'pointer', fontWeight: 600, whiteSpace: 'nowrap' }}>
                        Hapus
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>

      <div style={{ marginTop: 28, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Btn variant="outline" size="md" onClick={() => navigate('form')}>← Kembali ke Formulir</Btn>
        <Btn size="md" disabled={!allDone} onClick={() => { onStepComplete(2); navigate('payment'); }}>
          {allDone ? 'Lanjut ke Pembayaran →' : `Upload ${4 - uploadedCount} dokumen lagi`}
        </Btn>
      </div>
    </div>
  );
}
