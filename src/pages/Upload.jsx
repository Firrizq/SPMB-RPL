import { useState, useRef } from 'react';
import { C, T } from '../tokens';
import { Btn, Card, Badge, PageHeader } from '../components';
import { useBreakpoint } from '../hooks/useBreakpoint';

export function PageUpload({ navigate, uploadState, setUploadState, uploadFiles, setUploadFiles, onStepComplete }) {
  const { isMobile, isTablet } = useBreakpoint();
  const isSmall = isMobile || isTablet;
  const [uploading, setUploading] = useState(null);
  const [dragging, setDragging] = useState(null);
  const fileInputRefs = useRef({});

  const docs = [
    { id: 'ijazah', label: 'Ijazah / SKL', icon: '🎓', desc: 'Ijazah SMA/SMK/MA atau Surat Keterangan Lulus', formats: 'JPG, PNG, PDF', maxSize: '5 MB', hint: 'Pastikan semua teks terbaca jelas, tidak blur', accept: '.jpg,.jpeg,.png,.pdf' },
    { id: 'pasfoto', label: 'Pas Foto', icon: '🖼️', desc: 'Foto formal terbaru ukuran 3×4 cm', formats: 'JPG, PNG', maxSize: '2 MB', hint: 'Latar merah, pakai seragam sekolah, wajah jelas', accept: '.jpg,.jpeg,.png' },
    { id: 'kk', label: 'Kartu Keluarga', icon: '🏠', desc: 'Kartu Keluarga (KK) yang masih berlaku', formats: 'JPG, PNG, PDF', maxSize: '5 MB', hint: 'Scan atau foto seluruh halaman KK dengan jelas', accept: '.jpg,.jpeg,.png,.pdf' },
    { id: 'skl', label: 'Surat Keterangan Lulus', icon: '📜', desc: 'SKL dari sekolah (jika ijazah belum terbit)', formats: 'JPG, PNG, PDF', maxSize: '5 MB', hint: 'Ditandatangani dan distempel oleh kepala sekolah', accept: '.jpg,.jpeg,.png,.pdf' },
  ];

  const statusCfg = {
    empty: { label: 'Belum Upload', color: C.muted, bg: C.border },
    uploading: { label: 'Mengupload...', color: C.primary, bg: C.primaryLight },
    uploaded: { label: 'Sudah Upload', color: C.warning, bg: C.warningLight },
    verified: { label: 'Terverifikasi ✓', color: C.success, bg: C.successLight },
    error: { label: 'Gagal — Ulangi', color: C.error, bg: C.errorLight },
  };

  const simulateUpload = (docId, fileName) => {
    setUploading(docId);
    setUploadState(prev => ({ ...prev, [docId]: 'uploading' }));
    if (fileName) setUploadFiles(prev => ({ ...prev, [docId]: fileName }));
    setTimeout(() => {
      setUploading(null);
      setUploadState(prev => ({ ...prev, [docId]: 'uploaded' }));
    }, 1500);
  };

  const handleFileChange = (docId, e) => {
    const file = e.target.files[0];
    if (file) simulateUpload(docId, file.name);
  };

  const handleDrop = (docId, e) => {
    e.preventDefault();
    setDragging(null);
    const file = e.dataTransfer.files[0];
    if (file) simulateUpload(docId, file.name);
  };

  const handleRemove = (docId) => {
    setUploadState(prev => ({ ...prev, [docId]: 'empty' }));
    setUploadFiles(prev => { const n = { ...prev }; delete n[docId]; return n; });
    if (fileInputRefs.current[docId]) fileInputRefs.current[docId].value = '';
  };

  const uploadedCount = Object.values(uploadState).filter(s => s === 'uploaded' || s === 'verified').length;
  const allDone = uploadedCount === 4;
  const pad = isMobile ? '20px 16px' : isTablet ? '24px 20px' : '36px 40px';

  return (
    <div style={{ padding: pad, maxWidth: 1100, margin: '0 auto' }}>
      <PageHeader
        title="Upload Dokumen"
        subtitle={isMobile ? '' : 'Upload semua dokumen yang diperlukan untuk melanjutkan pendaftaran'}
        breadcrumb="Dashboard / Upload Dokumen"
        actions={
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <Badge label={`${uploadedCount}/4`} variant={allDone ? 'success' : 'primary'} dot />
            <Btn size="md" disabled={!allDone} onClick={() => { onStepComplete(2); navigate('payment'); }}>
              {allDone ? 'Lanjut →' : `Sisa ${4 - uploadedCount}`}
            </Btn>
          </div>
        }
      />

      {/* Info banner */}
      <div style={{ background: C.primaryLight, borderRadius: 10, padding: '12px 16px', marginBottom: 20, display: 'flex', alignItems: 'flex-start', gap: 12 }}>
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ flexShrink: 0, marginTop: 1 }}><circle cx="9" cy="9" r="7.5" stroke={C.primary} strokeWidth="1.7"/><path d="M9 8v4" stroke={C.primary} strokeWidth="1.7" strokeLinecap="round"/><circle cx="9" cy="6" r="1.1" fill={C.primary}/></svg>
        <span style={{ fontFamily: T.sans, fontSize: 13, color: C.primary }}>
          <strong>Format:</strong> JPG, PNG, PDF · <strong>Maks:</strong> 5 MB per file · Klik kartu atau seret file
        </span>
      </div>

      {/* Progress bar */}
      <Card style={{ padding: '14px 20px', marginBottom: 20 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
          <span style={{ fontFamily: T.sans, fontSize: 13, fontWeight: 600, color: C.text }}>Progress Upload</span>
          <span style={{ fontFamily: T.sans, fontSize: 13, fontWeight: 600, color: allDone ? C.success : C.primary }}>
            {uploadedCount}/4{allDone ? ' ✓' : ''}
          </span>
        </div>
        <div style={{ height: 7, background: C.border, borderRadius: 4, overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${(uploadedCount / 4) * 100}%`, background: allDone ? C.success : C.primary, borderRadius: 4, transition: 'width 0.4s ease' }} />
        </div>
      </Card>

      {/* Document cards */}
      <div style={{ display: 'grid', gridTemplateColumns: isSmall ? '1fr' : '1fr 1fr', gap: 16 }}>
        {docs.map((doc) => {
          const status = uploadState[doc.id] || 'empty';
          const sc = statusCfg[status] || statusCfg.empty;
          const isUploadingThis = uploading === doc.id;
          const isDragging = dragging === doc.id;
          const isUploaded = status === 'uploaded' || status === 'verified';
          const fileName = uploadFiles[doc.id];

          return (
            <div key={doc.id}
              onDragOver={e => { e.preventDefault(); if (!isUploaded) setDragging(doc.id); }}
              onDragLeave={() => setDragging(null)}
              onDrop={e => { if (!isUploaded) handleDrop(doc.id, e); else { e.preventDefault(); setDragging(null); } }}
              style={{ background: C.card, borderRadius: 14, border: isDragging ? `2px dashed ${C.primary}` : isUploaded ? `1.5px solid ${sc.color}40` : `1px solid ${C.border}`, boxShadow: '0 2px 10px rgba(44,44,44,0.06)', transition: 'all 0.2s', overflow: 'hidden' }}>

              <input type="file" accept={doc.accept} ref={el => fileInputRefs.current[doc.id] = el} style={{ display: 'none' }} onChange={e => handleFileChange(doc.id, e)} />

              <div style={{ padding: '18px 20px 12px', display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                <div style={{ width: 46, height: 46, borderRadius: 12, background: sc.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>
                  {isUploadingThis ? (
                    <div style={{ width: 20, height: 20, borderRadius: '50%', border: `2.5px solid ${C.primary}`, borderTopColor: 'transparent', animation: 'spin 0.7s linear infinite' }} />
                  ) : doc.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8, marginBottom: 3 }}>
                    <div style={{ fontFamily: T.sans, fontSize: 14, fontWeight: 700, color: C.text }}>{doc.label}</div>
                    <span style={{ fontFamily: T.sans, fontSize: 11, fontWeight: 600, padding: '3px 8px', borderRadius: 99, background: sc.bg, color: sc.color, flexShrink: 0 }}>
                      {isUploadingThis ? 'Uploading...' : sc.label}
                    </span>
                  </div>
                  <div style={{ fontFamily: T.sans, fontSize: 12, color: C.muted }}>{doc.desc}</div>
                  <div style={{ display: 'flex', gap: 6, marginTop: 6 }}>
                    <span style={{ fontFamily: T.sans, fontSize: 11, color: C.muted, background: C.bg, padding: '2px 7px', borderRadius: 5 }}>{doc.formats}</span>
                    <span style={{ fontFamily: T.sans, fontSize: 11, color: C.muted, background: C.bg, padding: '2px 7px', borderRadius: 5 }}>Maks. {doc.maxSize}</span>
                  </div>
                </div>
              </div>

              {!isMobile && <div style={{ padding: '0 20px 10px', fontFamily: T.sans, fontSize: 12, color: C.textSub }}>💡 {doc.hint}</div>}

              <div style={{ margin: '0 16px 16px' }}>
                {!isUploaded ? (
                  <div
                    onClick={() => !isUploadingThis && fileInputRefs.current[doc.id]?.click()}
                    style={{ border: `1.5px dashed ${isDragging ? C.primary : C.border}`, borderRadius: 10, padding: isMobile ? '16px' : '18px', textAlign: 'center', cursor: isUploadingThis ? 'wait' : 'pointer', background: isDragging ? C.primaryLight : C.bg, transition: 'all 0.15s' }}
                  >
                    {isUploadingThis ? (
                      <div style={{ fontFamily: T.sans, fontSize: 13, color: C.primary }}>Mengupload file...</div>
                    ) : (
                      <>
                        <svg width="24" height="24" viewBox="0 0 28 28" fill="none" style={{ marginBottom: 6 }}>
                          <path d="M14 20V10m0 0l-4 4m4-4l4 4" stroke={C.primary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M23 19A5 5 0 0019.5 10H19a8 8 0 10-13.5 7" stroke={C.muted} strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                        <div style={{ fontFamily: T.sans, fontSize: 13, fontWeight: 600, color: C.primary, marginBottom: 3 }}>
                          {isMobile ? 'Tap untuk upload' : 'Klik atau seret file ke sini'}
                        </div>
                        <div style={{ fontFamily: T.sans, fontSize: 11, color: C.muted }}>{doc.formats} · Maks. {doc.maxSize}</div>
                      </>
                    )}
                  </div>
                ) : (
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    <div style={{ flex: 1, background: sc.bg, borderRadius: 8, padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 8, minWidth: 0 }}>
                      <svg width="14" height="18" viewBox="0 0 16 20" fill="none"><rect x="1" y="1" width="10" height="18" rx="2" stroke={sc.color} strokeWidth="1.5"/><path d="M4 6h7M4 10h5" stroke={sc.color} strokeWidth="1.3" strokeLinecap="round"/></svg>
                      <span style={{ fontFamily: T.sans, fontSize: 12, color: sc.color, fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {fileName || (status === 'verified' ? 'Terverifikasi' : 'Berhasil diupload')}
                      </span>
                    </div>
                    {status !== 'verified' && (
                      <button onClick={() => handleRemove(doc.id)} style={{ background: C.errorLight, border: 'none', borderRadius: 8, padding: '10px 12px', fontFamily: T.sans, fontSize: 12, color: C.error, cursor: 'pointer', fontWeight: 600, flexShrink: 0 }}>
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

      <div style={{ marginTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Btn variant="outline" size="md" onClick={() => navigate('form')}>← Formulir</Btn>
        <Btn size="md" disabled={!allDone} onClick={() => { onStepComplete(2); navigate('payment'); }}>
          {allDone ? 'Lanjut ke Pembayaran →' : `Upload ${4 - uploadedCount} lagi`}
        </Btn>
      </div>
    </div>
  );
}
