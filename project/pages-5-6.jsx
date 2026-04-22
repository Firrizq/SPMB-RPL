// pages-5-6.jsx — Form Data Diri + Upload Dokumen

const { C, T, Btn, Card, Input, FormSelect, Badge, PageHeader, BottomNav, SectionTitle, Divider } = window;

// ── PAGE 5: FORM DATA DIRI ────────────────────────────────────
function PageForm({ navigate, formData, setFormData, onStepComplete }) {
  const [section, setSection] = React.useState(0);
  const [errors, setErrors] = React.useState({});
  const [saved, setSaved] = React.useState(false);

  const sections = ['Data Pribadi', 'Asal Sekolah', 'Pilihan Prodi'];

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

  const jalurOptions = [
    { value: 'reguler', label: 'Reguler' },
    { value: 'prestasi', label: 'Jalur Prestasi' },
    { value: 'afirmasi', label: 'Jalur Afirmasi' },
  ];

  const jkOptions = [
    { value: 'L', label: 'Laki-laki' },
    { value: 'P', label: 'Perempuan' },
  ];

  const agamaOptions = ['Islam','Kristen','Katolik','Hindu','Buddha','Konghucu'];

  const update = (key, val) => setFormData(prev => ({ ...prev, [key]: val }));

  const validateSection = () => {
    const errs = {};
    if (section === 0) {
      if (!formData.nama?.trim()) errs.nama = 'Wajib diisi';
      if (!formData.nik || formData.nik.length < 16) errs.nik = 'NIK harus 16 digit';
      if (!formData.ttl?.trim()) errs.ttl = 'Wajib diisi';
      if (!formData.jk) errs.jk = 'Pilih jenis kelamin';
      if (!formData.alamat?.trim()) errs.alamat = 'Wajib diisi';
    }
    if (section === 1) {
      if (!formData.namaSekolah?.trim()) errs.namaSekolah = 'Wajib diisi';
      if (!formData.kotaSekolah?.trim()) errs.kotaSekolah = 'Wajib diisi';
      if (!formData.tahunLulus) errs.tahunLulus = 'Pilih tahun';
      if (!formData.jurusan?.trim()) errs.jurusan = 'Wajib diisi';
    }
    if (section === 2) {
      if (!formData.prodi1) errs.prodi1 = 'Pilih pilihan pertama';
      if (!formData.jalur) errs.jalur = 'Pilih jalur masuk';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSaveDraft = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleNext = () => {
    if (!validateSection()) return;
    if (section < 2) {
      setSection(section + 1);
      setErrors({});
    } else {
      onStepComplete(1);
      navigate('upload');
    }
  };

  const progress = ((section) / 3) * 100;

  return (
    <div style={{ background: C.bg, height: '100%', display: 'flex', flexDirection: 'column' }}>
      <PageHeader title="Formulir Data Diri" onBack={() => navigate('dashboard')}
        subtitle={`Bagian ${section + 1} dari 3`}
        rightEl={
          <button onClick={handleSaveDraft} style={{
            background: saved ? C.successLight : C.primaryLight, border: 'none', borderRadius: 8,
            padding: '6px 12px', fontFamily: T.sans, fontSize: 12, fontWeight: 600,
            color: saved ? C.success : C.primary, cursor: 'pointer',
          }}>{saved ? '✓ Tersimpan' : 'Simpan Draft'}</button>
        }
      />

      {/* Progress bar */}
      <div style={{ background: C.card, padding: '12px 16px', borderBottom: `1px solid ${C.border}` }}>
        <div style={{ display: 'flex', gap: 0, marginBottom: 10 }}>
          {sections.map((s, i) => (
            <button key={i} onClick={() => { if (i <= section) { setSection(i); setErrors({}); } }} style={{
              flex: 1, background: 'none', border: 'none', cursor: i <= section ? 'pointer' : 'default',
              padding: '0 0 8px', position: 'relative',
              fontFamily: T.sans, fontSize: 11, fontWeight: i === section ? 700 : 400,
              color: i === section ? C.primary : i < section ? C.success : C.muted,
            }}>
              {s}
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0, height: 2.5, borderRadius: 2,
                background: i === section ? C.primary : i < section ? C.success : C.border,
              }} />
            </button>
          ))}
        </div>
        <div style={{ height: 4, background: C.border, borderRadius: 4, overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${Math.round(((section + 0.5) / 3) * 100)}%`, background: C.primary, borderRadius: 4, transition: 'width 0.4s' }} />
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', WebkitOverflowScrolling: 'touch', paddingBottom: 100 }}>
        <div style={{ padding: '20px 16px', display: 'flex', flexDirection: 'column', gap: 16 }}>

          {/* Section 0: Data Pribadi */}
          {section === 0 && (
            <>
              <div style={{ background: C.primaryLight, borderRadius: 10, padding: '10px 14px' }}>
                <span style={{ fontFamily: T.sans, fontSize: 12, color: C.primary }}>💡 Isi sesuai data di Kartu Keluarga (KK)</span>
              </div>
              <Input label="NAMA LENGKAP" value={formData.nama || ''} onChange={v => update('nama', v)}
                placeholder="Sesuai Kartu Keluarga" error={errors.nama} />
              <Input label="NIK (16 DIGIT)" value={formData.nik || ''} onChange={v => update('nik', v.replace(/\D/g, '').slice(0, 16))}
                placeholder="3271xxxxxxxxxx" error={errors.nik} hint="Nomor Induk Kependudukan sesuai KTP/KK" />
              <Input label="TEMPAT, TANGGAL LAHIR" value={formData.ttl || ''} onChange={v => update('ttl', v)}
                placeholder="Yogyakarta, 14 Februari 2007" error={errors.ttl} />
              <FormSelect label="JENIS KELAMIN" value={formData.jk || ''} onChange={v => update('jk', v)}
                options={jkOptions} />
              {errors.jk && <span style={{ fontFamily: T.sans, fontSize: 11, color: C.error, marginTop: -10 }}>{errors.jk}</span>}
              <FormSelect label="AGAMA" value={formData.agama || ''} onChange={v => update('agama', v)}
                options={agamaOptions.map(a => ({ value: a.toLowerCase(), label: a }))} />
              <Input label="NOMOR HP AKTIF" type="tel" value={formData.hp || ''} onChange={v => update('hp', v)}
                placeholder="08xxxxxxxxxx" hint="Nomor WhatsApp yang aktif" />
              <Input label="ALAMAT LENGKAP" value={formData.alamat || ''} onChange={v => update('alamat', v)}
                placeholder="Jl. Contoh No. 1, Kelurahan, Kecamatan, Kota" error={errors.alamat} rows={3} />
            </>
          )}

          {/* Section 1: Asal Sekolah */}
          {section === 1 && (
            <>
              <div style={{ background: C.primaryLight, borderRadius: 10, padding: '10px 14px' }}>
                <span style={{ fontFamily: T.sans, fontSize: 12, color: C.primary }}>📚 Isi data sekolah tempat kamu lulus</span>
              </div>
              <Input label="NAMA SEKOLAH" value={formData.namaSekolah || ''} onChange={v => update('namaSekolah', v)}
                placeholder="SMA / SMK / MA" error={errors.namaSekolah} />
              <Input label="KOTA / KABUPATEN SEKOLAH" value={formData.kotaSekolah || ''} onChange={v => update('kotaSekolah', v)}
                placeholder="Yogyakarta" error={errors.kotaSekolah} />
              <Input label="NPSN SEKOLAH" value={formData.npsn || ''} onChange={v => update('npsn', v)}
                placeholder="20400000" hint="Nomor Pokok Sekolah Nasional (opsional)" />
              <Input label="JURUSAN / PROGRAM KEAHLIAN" value={formData.jurusan || ''} onChange={v => update('jurusan', v)}
                placeholder="IPA / IPS / Teknik Komputer" error={errors.jurusan} />
              <FormSelect label="TAHUN LULUS" value={formData.tahunLulus || ''} onChange={v => update('tahunLulus', v)}
                options={['2025','2024','2023'].map(y => ({ value: y, label: y }))}
                hint="Tahun kelulusan dari SMA/SMK/MA" />
              {errors.tahunLulus && <span style={{ fontFamily: T.sans, fontSize: 11, color: C.error, marginTop: -10 }}>{errors.tahunLulus}</span>}
              <Input label="NILAI RATA-RATA RAPOR" type="number" value={formData.nilaiRapor || ''} onChange={v => update('nilaiRapor', v)}
                placeholder="0.00 - 100.00" hint="Rata-rata nilai semester 4, 5, dan 6" />
            </>
          )}

          {/* Section 2: Pilihan Prodi */}
          {section === 2 && (
            <>
              <div style={{ background: C.primaryLight, borderRadius: 10, padding: '10px 14px' }}>
                <span style={{ fontFamily: T.sans, fontSize: 12, color: C.primary }}>🎓 Kamu bisa pilih 2 program studi sebagai cadangan</span>
              </div>
              <FormSelect label="PILIHAN PERTAMA *" value={formData.prodi1 || ''} onChange={v => update('prodi1', v)}
                options={prodiOptions} hint="Program studi utama yang kamu minati" />
              {errors.prodi1 && <span style={{ fontFamily: T.sans, fontSize: 11, color: C.error, marginTop: -10 }}>{errors.prodi1}</span>}
              <FormSelect label="PILIHAN KEDUA (Opsional)" value={formData.prodi2 || ''} onChange={v => update('prodi2', v)}
                options={prodiOptions.filter(p => p.value !== formData.prodi1)}
                hint="Akan dipertimbangkan jika pilihan pertama penuh" />
              <FormSelect label="JALUR MASUK" value={formData.jalur || ''} onChange={v => update('jalur', v)}
                options={jalurOptions} />
              {errors.jalur && <span style={{ fontFamily: T.sans, fontSize: 11, color: C.error, marginTop: -10 }}>{errors.jalur}</span>}
              <Input label="PRESTASI / PENGHARGAAN (Opsional)" value={formData.prestasi || ''} onChange={v => update('prestasi', v)}
                placeholder="Juara olimpiade, beasiswa, dll." rows={2} />

              {/* Summary card */}
              {formData.prodi1 && (
                <div style={{ background: C.successLight, borderRadius: 12, padding: '14px 14px', border: `1px solid ${C.success}30` }}>
                  <div style={{ fontFamily: T.sans, fontSize: 12, fontWeight: 700, color: C.success, marginBottom: 6 }}>Ringkasan Pilihan</div>
                  <div style={{ fontFamily: T.sans, fontSize: 13, color: C.text }}>
                    <strong>Pilihan 1:</strong> {prodiOptions.find(p => p.value === formData.prodi1)?.label}<br/>
                    {formData.prodi2 && <><strong>Pilihan 2:</strong> {prodiOptions.find(p => p.value === formData.prodi2)?.label}<br/></>}
                    <strong>Jalur:</strong> {jalurOptions.find(j => j.value === formData.jalur)?.label || '-'}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Bottom CTA */}
      <div style={{ padding: '12px 16px 30px', background: C.card, borderTop: `1px solid ${C.border}` }}>
        <div style={{ display: 'flex', gap: 10 }}>
          {section > 0 && (
            <Btn variant="outline" size="md" style={{ flex: 1 }} onClick={() => { setSection(section - 1); setErrors({}); }}>
              ← Kembali
            </Btn>
          )}
          <Btn size="md" style={{ flex: 2 }} onClick={handleNext}>
            {section < 2 ? 'Lanjut →' : 'Simpan & Lanjut →'}
          </Btn>
        </div>
      </div>
    </div>
  );
}

// ── PAGE 6: UPLOAD DOKUMEN ────────────────────────────────────
function PageUpload({ navigate, uploadState, setUploadState, onStepComplete }) {
  const [dragging, setDragging] = React.useState(null);
  const [uploading, setUploading] = React.useState(null);

  const docs = [
    {
      id: 'ijazah', label: 'Ijazah / SKL', icon: '🎓',
      desc: 'Ijazah SMA/SMK/MA atau Surat Keterangan Lulus',
      formats: 'JPG, PNG, PDF', maxSize: '5 MB',
      hint: 'Pastikan semua teks terbaca dengan jelas',
    },
    {
      id: 'pasfoto', label: 'Pas Foto', icon: '🖼️',
      desc: 'Foto formal terbaru ukuran 3×4 cm',
      formats: 'JPG, PNG', maxSize: '2 MB',
      hint: 'Latar belakang merah, pakai seragam sekolah',
    },
    {
      id: 'kk', label: 'Kartu Keluarga', icon: '🏠',
      desc: 'Kartu Keluarga (KK) yang masih berlaku',
      formats: 'JPG, PNG, PDF', maxSize: '5 MB',
      hint: 'Scan atau foto seluruh halaman KK',
    },
    {
      id: 'skl', label: 'Surat Keterangan Lulus', icon: '📜',
      desc: 'SKL dari sekolah (jika ijazah belum terbit)',
      formats: 'JPG, PNG, PDF', maxSize: '5 MB',
      hint: 'Ditandatangani dan distempel oleh sekolah',
    },
  ];

  const statusConfig = {
    empty: { label: 'Belum Upload', color: C.muted, bg: C.border, icon: null },
    uploaded: { label: 'Sudah Upload', color: C.warning, bg: C.warningLight, icon: '⏳' },
    verified: { label: 'Terverifikasi', color: C.success, bg: C.successLight, icon: '✅' },
    error: { label: 'Gagal — Ulangi', color: C.error, bg: C.errorLight, icon: '❌' },
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
    <div style={{ background: C.bg, height: '100%', display: 'flex', flexDirection: 'column' }}>
      <PageHeader title="Upload Dokumen" onBack={() => navigate('form')}
        subtitle={`${uploadedCount} dari 4 dokumen terupload`} />

      {/* Progress summary */}
      <div style={{ background: C.card, padding: '12px 16px', borderBottom: `1px solid ${C.border}` }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
          <span style={{ fontFamily: T.sans, fontSize: 12, color: C.textSub }}>{uploadedCount}/4 dokumen</span>
          <span style={{ fontFamily: T.sans, fontSize: 12, fontWeight: 600, color: allDone ? C.success : C.primary }}>
            {allDone ? '✓ Semua lengkap' : `${4 - uploadedCount} tersisa`}
          </span>
        </div>
        <div style={{ height: 6, background: C.border, borderRadius: 4, overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${(uploadedCount / 4) * 100}%`, background: allDone ? C.success : C.primary, borderRadius: 4, transition: 'width 0.4s' }} />
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', WebkitOverflowScrolling: 'touch', paddingBottom: 100 }}>
        {/* Info banner */}
        <div style={{ margin: '16px 16px 0', background: C.primaryLight, borderRadius: 12, padding: '12px 14px' }}>
          <div style={{ fontFamily: T.sans, fontSize: 12, color: C.primary, lineHeight: 1.5 }}>
            📎 <strong>Format yang diterima:</strong> JPG, PNG, PDF<br/>
            <strong>Ukuran maksimal:</strong> 5 MB per file — Pastikan foto tidak buram
          </div>
        </div>

        <div style={{ padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 12 }}>
          {docs.map((doc) => {
            const status = uploadState[doc.id] || 'empty';
            const isUploading = uploading === doc.id;
            const sc = statusConfig[status] || statusConfig.empty;
            const isDraggingThis = dragging === doc.id;

            return (
              <div key={doc.id}
                onDragOver={e => { e.preventDefault(); setDragging(doc.id); }}
                onDragLeave={() => setDragging(null)}
                onDrop={e => { e.preventDefault(); setDragging(null); simulateUpload(doc.id); }}
                style={{
                  background: C.card, borderRadius: 16,
                  border: isDraggingThis ? `2px dashed ${C.primary}` : status === 'uploaded' || status === 'verified' ? `1.5px solid ${sc.color}40` : `1px solid ${C.border}`,
                  boxShadow: isDraggingThis ? `0 0 0 3px ${C.primaryLight}` : '0 2px 10px rgba(44,44,44,0.06)',
                  transition: 'all 0.2s', overflow: 'hidden',
                }}>
                {/* Card header */}
                <div style={{ padding: '14px 14px 10px', display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  <div style={{ width: 42, height: 42, borderRadius: 12, background: sc.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>
                    {isUploading ? (
                      <div style={{ width: 20, height: 20, borderRadius: '50%', border: `2.5px solid ${C.primary}`, borderTopColor: 'transparent', animation: 'spin 0.7s linear infinite' }} />
                    ) : status !== 'empty' ? sc.icon || doc.icon : doc.icon}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div style={{ fontFamily: T.sans, fontSize: 14, fontWeight: 700, color: C.text }}>{doc.label}</div>
                      <span style={{
                        fontFamily: T.sans, fontSize: 10, fontWeight: 600, letterSpacing: 0.3,
                        padding: '3px 8px', borderRadius: 99, background: sc.bg, color: sc.color,
                      }}>{isUploading ? 'Mengupload...' : sc.label}</span>
                    </div>
                    <div style={{ fontFamily: T.sans, fontSize: 12, color: C.muted, marginTop: 3 }}>{doc.desc}</div>
                  </div>
                </div>

                {/* File info */}
                <div style={{ padding: '0 14px', display: 'flex', gap: 12 }}>
                  <span style={{ fontFamily: T.sans, fontSize: 11, color: C.muted, background: C.bg, padding: '3px 8px', borderRadius: 6 }}>{doc.formats}</span>
                  <span style={{ fontFamily: T.sans, fontSize: 11, color: C.muted, background: C.bg, padding: '3px 8px', borderRadius: 6 }}>Maks. {doc.maxSize}</span>
                </div>

                {/* Hint */}
                <div style={{ padding: '8px 14px', fontFamily: T.sans, fontSize: 11, color: C.textSub }}>
                  💡 {doc.hint}
                </div>

                {/* Drop zone / Upload button */}
                <div style={{ margin: '0 14px 14px' }}>
                  {status === 'empty' || status === 'error' ? (
                    <div
                      onClick={() => simulateUpload(doc.id)}
                      style={{
                        border: `1.5px dashed ${isDraggingThis ? C.primary : C.border}`,
                        borderRadius: 10, padding: '14px', textAlign: 'center', cursor: 'pointer',
                        background: isDraggingThis ? C.primaryLight : C.bg,
                        transition: 'all 0.15s',
                      }}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ marginBottom: 4 }}>
                        <path d="M12 16V8m0 0l-3 3m3-3l3 3" stroke={C.primary} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M20 16.5A4 4 0 0017 9h-.7A7 7 0 104 16" stroke={C.muted} strokeWidth="1.8" strokeLinecap="round"/>
                      </svg>
                      <div style={{ fontFamily: T.sans, fontSize: 12, color: C.primary, fontWeight: 600 }}>Ketuk untuk upload</div>
                      <div style={{ fontFamily: T.sans, fontSize: 11, color: C.muted, marginTop: 2 }}>atau seret file ke sini</div>
                    </div>
                  ) : (
                    <div style={{ display: 'flex', gap: 8 }}>
                      <div style={{ flex: 1, background: sc.bg, borderRadius: 8, padding: '10px 12px', display: 'flex', alignItems: 'center', gap: 8 }}>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="2" y="1" width="9" height="14" rx="1.5" stroke={sc.color} strokeWidth="1.5"/><path d="M5 5h6M5 8h4" stroke={sc.color} strokeWidth="1.3" strokeLinecap="round"/></svg>
                        <span style={{ fontFamily: T.sans, fontSize: 12, color: sc.color, fontWeight: 600 }}>
                          {status === 'verified' ? 'Berkas terverifikasi ✓' : 'Berkas terupload'}
                        </span>
                      </div>
                      {status !== 'verified' && (
                        <button onClick={() => setUploadState(prev => ({ ...prev, [doc.id]: 'empty' }))} style={{
                          background: C.errorLight, border: 'none', borderRadius: 8, padding: '0 12px',
                          fontFamily: T.sans, fontSize: 12, color: C.error, cursor: 'pointer',
                        }}>Hapus</button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom CTA */}
      <div style={{ padding: '12px 16px 30px', background: C.card, borderTop: `1px solid ${C.border}` }}>
        {!allDone && (
          <div style={{ fontFamily: T.sans, fontSize: 12, color: C.muted, textAlign: 'center', marginBottom: 10 }}>
            Upload semua dokumen untuk melanjutkan ke pembayaran
          </div>
        )}
        <Btn fullWidth size="lg" disabled={!allDone} onClick={() => { onStepComplete(2); navigate('payment'); }}>
          {allDone ? 'Lanjut ke Pembayaran →' : `Upload ${4 - uploadedCount} dokumen lagi`}
        </Btn>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>

      <BottomNav current="form" navigate={navigate} />
    </div>
  );
}

Object.assign(window, { PageForm, PageUpload });
