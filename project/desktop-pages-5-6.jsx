// desktop-pages-5-6.jsx — Form Data Diri + Upload Dokumen (desktop)

const { C, T, Btn, Card, Input, FormSelect, Badge, Divider, SectionTitle, PageHeader } = window;

// ── PAGE 5: FORM DATA DIRI ────────────────────────────────────
function PageForm({ navigate, formData, setFormData, onStepComplete }) {
  const [section, setSection] = React.useState(0);
  const [errors, setErrors] = React.useState({});
  const [saved, setSaved] = React.useState(false);

  const sections = [
    { id: 0, label: 'Data Pribadi', icon: '👤' },
    { id: 1, label: 'Asal Sekolah', icon: '🏫' },
    { id: 2, label: 'Pilihan Program Studi', icon: '🎓' },
  ];

  const prodiOptions = [
    { value: 'teknik-informatika', label: 'Teknik Informatika' },
    { value: 'sistem-informasi', label: 'Sistem Informasi' },
    { value: 'ilmu-komunikasi', label: 'Ilmu Komunikasi' },
    { value: 'manajemen', label: 'Manajemen' },
    { value: 'akuntansi', label: 'Akuntansi' },
    { value: 'psikologi', label: 'Psikologi' },
    { value: 'hukum', label: 'Ilmu Hukum' },
    { value: 'kedokteran', label: 'Pendidikan Dokter' },
  ];

  const update = (key, val) => setFormData(prev => ({ ...prev, [key]: val }));

  const validateSection = () => {
    const e = {};
    if (section === 0) {
      if (!formData.nama?.trim()) e.nama = 'Wajib diisi';
      if (!formData.nik || formData.nik.length < 16) e.nik = 'NIK harus 16 digit';
      if (!formData.ttl?.trim()) e.ttl = 'Wajib diisi';
      if (!formData.jk) e.jk = 'Pilih jenis kelamin';
      if (!formData.alamat?.trim()) e.alamat = 'Wajib diisi';
    }
    if (section === 1) {
      if (!formData.namaSekolah?.trim()) e.namaSekolah = 'Wajib diisi';
      if (!formData.kotaSekolah?.trim()) e.kotaSekolah = 'Wajib diisi';
      if (!formData.tahunLulus) e.tahunLulus = 'Pilih tahun';
      if (!formData.jurusan?.trim()) e.jurusan = 'Wajib diisi';
    }
    if (section === 2) {
      if (!formData.prodi1) e.prodi1 = 'Pilih pilihan pertama';
      if (!formData.jalur) e.jalur = 'Pilih jalur masuk';
    }
    setErrors(e);
    return !Object.keys(e).length;
  };

  const handleSaveDraft = () => { setSaved(true); setTimeout(() => setSaved(false), 2500); };

  const handleNext = () => {
    if (!validateSection()) return;
    if (section < 2) { setSection(section + 1); setErrors({}); }
    else { onStepComplete(1); navigate('upload'); }
  };

  return (
    <div style={{ padding: '36px 40px', maxWidth: 1000, margin: '0 auto' }}>
      <PageHeader
        title="Formulir Data Diri"
        subtitle="Isi semua bagian dengan benar sesuai dokumen resmi"
        breadcrumb="Dashboard / Formulir Data Diri"
        actions={
          <Btn variant={saved ? 'success' : 'outline'} size="md" onClick={handleSaveDraft}>
            {saved ? '✓ Draft Tersimpan' : 'Simpan Draft'}
          </Btn>
        }
      />

      {/* Section tabs + content */}
      <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: 28 }}>
        {/* Left: section navigator */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {sections.map((s, i) => {
            const done = i < section;
            const active = i === section;
            return (
              <button key={i} onClick={() => { if (i <= section) { setSection(i); setErrors({}); } }}
                style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', borderRadius: 12, background: active ? C.primary : done ? C.successLight : C.card, border: active ? 'none' : `1px solid ${done ? C.success + '40' : C.border}`, cursor: i <= section ? 'pointer' : 'not-allowed', textAlign: 'left', transition: 'all 0.15s' }}>
                <div style={{ width: 32, height: 32, borderRadius: 9, background: active ? 'rgba(255,255,255,0.2)' : done ? C.success : C.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: done ? 14 : 16, flexShrink: 0 }}>
                  {done ? <svg width="13" height="11" viewBox="0 0 13 11" fill="none"><path d="M1 5.5l4 4L12 1" stroke="#fff" strokeWidth="2" strokeLinecap="round"/></svg> : s.icon}
                </div>
                <div>
                  <div style={{ fontFamily: T.sans, fontSize: 13, fontWeight: 600, color: active ? '#fff' : done ? C.success : C.textSub }}>Bagian {i + 1}</div>
                  <div style={{ fontFamily: T.sans, fontSize: 12, color: active ? 'rgba(255,255,255,0.8)' : done ? C.success : C.muted }}>{s.label}</div>
                </div>
              </button>
            );
          })}

          {/* Progress */}
          <div style={{ background: C.card, borderRadius: 12, padding: '16px', border: `1px solid ${C.border}`, marginTop: 8 }}>
            <div style={{ fontFamily: T.sans, fontSize: 11, fontWeight: 600, color: C.muted, letterSpacing: 0.5, marginBottom: 8 }}>PROGRESS FORMULIR</div>
            <div style={{ height: 6, background: C.border, borderRadius: 4, overflow: 'hidden', marginBottom: 6 }}>
              <div style={{ height: '100%', width: `${((section + 0.5) / 3) * 100}%`, background: C.primary, borderRadius: 4, transition: 'width 0.4s' }} />
            </div>
            <div style={{ fontFamily: T.sans, fontSize: 12, color: C.muted }}>{section + 1} dari 3 bagian</div>
          </div>
        </div>

        {/* Right: form content */}
        <Card style={{ padding: 32 }}>
          <div style={{ marginBottom: 24, paddingBottom: 20, borderBottom: `1px solid ${C.border}` }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: 22 }}>{sections[section].icon}</span>
              <div>
                <div style={{ fontFamily: T.serif, fontSize: 20, fontWeight: 700, color: C.text }}>{sections[section].label}</div>
                <div style={{ fontFamily: T.sans, fontSize: 13, color: C.muted }}>
                  {section === 0 ? 'Isi sesuai data di Kartu Keluarga (KK)' : section === 1 ? 'Data sekolah tempat kamu lulus' : 'Pilih program studi yang diminati'}
                </div>
              </div>
            </div>
          </div>

          {/* Section 0: Data Pribadi */}
          {section === 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div style={{ gridColumn: '1 / -1' }}>
                  <Input label="NAMA LENGKAP *" value={formData.nama || ''} onChange={v => update('nama', v)} placeholder="Sesuai Kartu Keluarga" error={errors.nama} />
                </div>
                <Input label="NIK (16 DIGIT) *" value={formData.nik || ''} onChange={v => update('nik', v.replace(/\D/g,'').slice(0,16))} placeholder="3271xxxxxxxxxx" error={errors.nik} hint="Nomor Induk Kependudukan" />
                <Input label="TEMPAT, TANGGAL LAHIR *" value={formData.ttl || ''} onChange={v => update('ttl', v)} placeholder="Yogyakarta, 14 Februari 2007" error={errors.ttl} />
                <FormSelect label="JENIS KELAMIN *" value={formData.jk || ''} onChange={v => update('jk', v)} options={[{value:'L',label:'Laki-laki'},{value:'P',label:'Perempuan'}]} />
                {errors.jk && <span style={{ fontFamily: T.sans, fontSize: 12, color: C.error }}>{errors.jk}</span>}
                <FormSelect label="AGAMA" value={formData.agama || ''} onChange={v => update('agama', v)} options={['Islam','Kristen','Katolik','Hindu','Buddha','Konghucu'].map(a=>({value:a.toLowerCase(),label:a}))} />
                <Input label="NOMOR HP AKTIF" type="tel" value={formData.hp || ''} onChange={v => update('hp', v)} placeholder="08xxxxxxxxxx" hint="Nomor WhatsApp aktif" />
                <div style={{ gridColumn: '1 / -1' }}>
                  <Input label="ALAMAT LENGKAP *" value={formData.alamat || ''} onChange={v => update('alamat', v)} placeholder="Jl. Contoh No. 1, Kelurahan, Kecamatan, Kota, Provinsi" error={errors.alamat} rows={2} />
                </div>
              </div>
            </div>
          )}

          {/* Section 1: Asal Sekolah */}
          {section === 1 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div style={{ gridColumn: '1 / -1' }}>
                  <Input label="NAMA SEKOLAH *" value={formData.namaSekolah || ''} onChange={v => update('namaSekolah', v)} placeholder="SMA / SMK / MA Negeri atau Swasta" error={errors.namaSekolah} />
                </div>
                <Input label="KOTA / KABUPATEN *" value={formData.kotaSekolah || ''} onChange={v => update('kotaSekolah', v)} placeholder="Yogyakarta" error={errors.kotaSekolah} />
                <Input label="NPSN SEKOLAH" value={formData.npsn || ''} onChange={v => update('npsn', v)} placeholder="20400000" hint="Opsional — Nomor Pokok Sekolah" />
                <Input label="JURUSAN / PROGRAM KEAHLIAN *" value={formData.jurusan || ''} onChange={v => update('jurusan', v)} placeholder="IPA / IPS / Teknik Komputer" error={errors.jurusan} />
                <FormSelect label="TAHUN LULUS *" value={formData.tahunLulus || ''} onChange={v => update('tahunLulus', v)} options={['2026','2025','2024'].map(y=>({value:y,label:y}))} />
                {errors.tahunLulus && <span style={{ fontFamily: T.sans, fontSize: 12, color: C.error }}>{errors.tahunLulus}</span>}
                <Input label="NILAI RATA-RATA RAPOR" type="number" value={formData.nilaiRapor || ''} onChange={v => update('nilaiRapor', v)} placeholder="0.00 – 100.00" hint="Rata-rata semester 4, 5, dan 6" />
              </div>
            </div>
          )}

          {/* Section 2: Pilihan Prodi */}
          {section === 2 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <FormSelect label="PILIHAN PERTAMA *" value={formData.prodi1 || ''} onChange={v => update('prodi1', v)} options={prodiOptions} hint="Program studi utama yang diminati" />
                {errors.prodi1 && <span style={{ fontFamily: T.sans, fontSize: 12, color: C.error }}>{errors.prodi1}</span>}
                <FormSelect label="PILIHAN KEDUA (Opsional)" value={formData.prodi2 || ''} onChange={v => update('prodi2', v)} options={prodiOptions.filter(p=>p.value!==formData.prodi1)} hint="Cadangan jika pilihan pertama penuh" />
                <FormSelect label="JALUR MASUK *" value={formData.jalur || ''} onChange={v => update('jalur', v)} options={[{value:'reguler',label:'Reguler'},{value:'prestasi',label:'Jalur Prestasi'},{value:'afirmasi',label:'Jalur Afirmasi'}]} />
                {errors.jalur && <span style={{ fontFamily: T.sans, fontSize: 12, color: C.error }}>{errors.jalur}</span>}
                <div style={{ gridColumn: '1 / -1' }}>
                  <Input label="PRESTASI / PENGHARGAAN (Opsional)" value={formData.prestasi || ''} onChange={v => update('prestasi', v)} placeholder="Juara olimpiade, penerima beasiswa, dll." rows={2} />
                </div>
              </div>
              {formData.prodi1 && (
                <div style={{ background: C.successLight, borderRadius: 12, padding: '16px 20px', border: `1px solid ${C.success}30` }}>
                  <div style={{ fontFamily: T.sans, fontSize: 12, fontWeight: 700, color: C.success, marginBottom: 8 }}>✓ Ringkasan Pilihan</div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
                    {[['Pilihan 1', prodiOptions.find(p=>p.value===formData.prodi1)?.label || '-'],['Pilihan 2', prodiOptions.find(p=>p.value===formData.prodi2)?.label || 'Tidak dipilih'],['Jalur Masuk', [{value:'reguler',label:'Reguler'},{value:'prestasi',label:'Prestasi'},{value:'afirmasi',label:'Afirmasi'}].find(j=>j.value===formData.jalur)?.label || '-']].map(([lbl, val]) => (
                      <div key={lbl}><div style={{ fontFamily: T.sans, fontSize: 11, color: C.success, fontWeight: 600 }}>{lbl}</div><div style={{ fontFamily: T.sans, fontSize: 13, color: C.text, marginTop: 2 }}>{val}</div></div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Navigation buttons */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 32, paddingTop: 24, borderTop: `1px solid ${C.border}` }}>
            <Btn variant="outline" size="md" disabled={section === 0} onClick={() => { setSection(s => s - 1); setErrors({}); }}>← Sebelumnya</Btn>
            <Btn size="md" onClick={handleNext}>{section < 2 ? 'Lanjut →' : 'Simpan & Lanjut ke Upload →'}</Btn>
          </div>
        </Card>
      </div>
    </div>
  );
}

// ── PAGE 6: UPLOAD DOKUMEN ────────────────────────────────────
function PageUpload({ navigate, uploadState, setUploadState, onStepComplete }) {
  const [uploading, setUploading] = React.useState(null);
  const [dragging, setDragging] = React.useState(null);

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
    setTimeout(() => { setUploading(null); setUploadState(prev => ({ ...prev, [docId]: 'uploaded' })); }, 1500);
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
          <span style={{ fontFamily: T.sans, fontSize: 13, fontWeight: 600, color: allDone ? C.success : C.primary }}>{uploadedCount} dari 4 dokumen terupload{allDone ? ' ✓' : ''}</span>
        </div>
        <div style={{ height: 8, background: C.border, borderRadius: 4, overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${(uploadedCount / 4) * 100}%`, background: allDone ? C.success : C.primary, borderRadius: 4, transition: 'width 0.4s ease' }} />
        </div>
      </Card>

      {/* Document cards — 2×2 grid */}
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
              {/* Header */}
              <div style={{ padding: '20px 24px 16px', display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                <div style={{ width: 52, height: 52, borderRadius: 14, background: sc.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 }}>
                  {isUploadingThis ? <div style={{ width: 22, height: 22, borderRadius: '50%', border: `2.5px solid ${C.primary}`, borderTopColor: 'transparent', animation: 'spin 0.7s linear infinite' }} /> : doc.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 }}>
                    <div style={{ fontFamily: T.sans, fontSize: 15, fontWeight: 700, color: C.text }}>{doc.label}</div>
                    <span style={{ fontFamily: T.sans, fontSize: 11, fontWeight: 600, padding: '3px 10px', borderRadius: 99, background: sc.bg, color: sc.color }}>{isUploadingThis ? 'Mengupload...' : sc.label}</span>
                  </div>
                  <div style={{ fontFamily: T.sans, fontSize: 13, color: C.muted }}>{doc.desc}</div>
                  <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                    <span style={{ fontFamily: T.sans, fontSize: 11, color: C.muted, background: C.bg, padding: '3px 8px', borderRadius: 6 }}>{doc.formats}</span>
                    <span style={{ fontFamily: T.sans, fontSize: 11, color: C.muted, background: C.bg, padding: '3px 8px', borderRadius: 6 }}>Maks. {doc.maxSize}</span>
                  </div>
                </div>
              </div>

              {/* Hint */}
              <div style={{ padding: '0 24px 12px', fontFamily: T.sans, fontSize: 12, color: C.textSub }}>💡 {doc.hint}</div>

              {/* Upload zone */}
              <div style={{ margin: '0 20px 20px' }}>
                {!isUploaded ? (
                  <div onClick={() => !isUploadingThis && simulateUpload(doc.id)} style={{ border: `1.5px dashed ${isDragging ? C.primary : C.border}`, borderRadius: 12, padding: '20px', textAlign: 'center', cursor: isUploadingThis ? 'wait' : 'pointer', background: isDragging ? C.primaryLight : C.bg, transition: 'all 0.15s' }}>
                    {isUploadingThis ? (
                      <div style={{ fontFamily: T.sans, fontSize: 13, color: C.primary }}>Mengupload file...</div>
                    ) : (
                      <>
                        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" style={{ marginBottom: 8 }}><path d="M14 20V10m0 0l-4 4m4-4l4 4" stroke={C.primary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M23 19A5 5 0 0019.5 10H19a8 8 0 10-13.5 7" stroke={C.muted} strokeWidth="2" strokeLinecap="round"/></svg>
                        <div style={{ fontFamily: T.sans, fontSize: 13, fontWeight: 600, color: C.primary, marginBottom: 4 }}>Klik untuk upload atau seret file ke sini</div>
                        <div style={{ fontFamily: T.sans, fontSize: 12, color: C.muted }}>JPG, PNG, atau PDF · Maks. {doc.maxSize}</div>
                      </>
                    )}
                  </div>
                ) : (
                  <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                    <div style={{ flex: 1, background: sc.bg, borderRadius: 10, padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 10 }}>
                      <svg width="16" height="20" viewBox="0 0 16 20" fill="none"><rect x="1" y="1" width="10" height="18" rx="2" stroke={sc.color} strokeWidth="1.5"/><path d="M4 6h7M4 10h5" stroke={sc.color} strokeWidth="1.3" strokeLinecap="round"/></svg>
                      <span style={{ fontFamily: T.sans, fontSize: 13, color: sc.color, fontWeight: 600 }}>{status === 'verified' ? 'Berkas terverifikasi' : 'Berkas berhasil diupload'}</span>
                    </div>
                    {status !== 'verified' && (
                      <button onClick={() => setUploadState(prev => ({ ...prev, [doc.id]: 'empty' }))} style={{ background: C.errorLight, border: 'none', borderRadius: 10, padding: '12px 16px', fontFamily: T.sans, fontSize: 12, color: C.error, cursor: 'pointer', fontWeight: 600, whiteSpace: 'nowrap' }}>Hapus</button>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>

      {/* Bottom CTA */}
      <div style={{ marginTop: 28, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Btn variant="outline" size="md" onClick={() => navigate('form')}>← Kembali ke Formulir</Btn>
        <Btn size="md" disabled={!allDone} onClick={() => { onStepComplete(2); navigate('payment'); }}>
          {allDone ? 'Lanjut ke Pembayaran →' : `Upload ${4 - uploadedCount} dokumen lagi`}
        </Btn>
      </div>
    </div>
  );
}

Object.assign(window, { PageForm, PageUpload });
