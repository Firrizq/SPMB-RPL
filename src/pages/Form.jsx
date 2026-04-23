import { useState } from 'react';
import { C, T } from '../tokens';
import { Btn, Card, Input, FormSelect, PageHeader } from '../components';
import { useBreakpoint } from '../hooks/useBreakpoint';

export function PageForm({ navigate, formData, setFormData, onStepComplete }) {
  const { isMobile, isTablet } = useBreakpoint();
  const isSmall = isMobile || isTablet;

  const [section, setSection] = useState(0);
  const [errors, setErrors] = useState({});
  const [saved, setSaved] = useState(false);

  const sections = [
    { id: 0, label: 'Data Pribadi', icon: '👤' },
    { id: 1, label: 'Asal Sekolah', icon: '🏫' },
    { id: 2, label: 'Pilihan Prodi', icon: '🎓' },
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

  const pad = isMobile ? '20px 16px' : isTablet ? '24px 20px' : '36px 40px';

  return (
    <div style={{ padding: pad, maxWidth: 1000, margin: '0 auto' }}>
      <PageHeader
        title="Formulir Data Diri"
        subtitle={isMobile ? '' : 'Isi semua bagian dengan benar sesuai dokumen resmi'}
        breadcrumb="Dashboard / Formulir Data Diri"
        actions={
          <Btn variant={saved ? 'success' : 'outline'} size="md" onClick={handleSaveDraft}>
            {saved ? '✓ Tersimpan' : 'Simpan Draft'}
          </Btn>
        }
      />

      {/* Section tabs — horizontal on mobile, vertical sidebar on desktop */}
      {isSmall ? (
        <div style={{ display: 'flex', gap: 8, marginBottom: 20, overflowX: 'auto', paddingBottom: 4 }}>
          {sections.map((s, i) => {
            const done = i < section;
            const active = i === section;
            return (
              <button key={i}
                onClick={() => { if (i <= section) { setSection(i); setErrors({}); } }}
                style={{
                  display: 'flex', alignItems: 'center', gap: 8, padding: '10px 14px',
                  borderRadius: 10, flexShrink: 0,
                  background: active ? C.primary : done ? C.successLight : C.card,
                  border: active ? 'none' : `1px solid ${done ? C.success + '40' : C.border}`,
                  cursor: i <= section ? 'pointer' : 'not-allowed',
                }}
              >
                <span style={{ fontSize: 14 }}>{done ? '✓' : s.icon}</span>
                <span style={{ fontFamily: T.sans, fontSize: 13, fontWeight: 600, color: active ? '#fff' : done ? C.success : C.textSub, whiteSpace: 'nowrap' }}>
                  {s.label}
                </span>
              </button>
            );
          })}
        </div>
      ) : null}

      <div style={{ display: 'grid', gridTemplateColumns: isSmall ? '1fr' : '220px 1fr', gap: 24 }}>
        {/* Vertical section navigator — desktop only */}
        {!isSmall && (
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

            <div style={{ background: C.card, borderRadius: 12, padding: '14px', border: `1px solid ${C.border}`, marginTop: 8 }}>
              <div style={{ fontFamily: T.sans, fontSize: 11, fontWeight: 600, color: C.muted, letterSpacing: 0.5, marginBottom: 8 }}>PROGRESS</div>
              <div style={{ height: 6, background: C.border, borderRadius: 4, overflow: 'hidden', marginBottom: 6 }}>
                <div style={{ height: '100%', width: `${((section + 0.5) / 3) * 100}%`, background: C.primary, borderRadius: 4, transition: 'width 0.4s' }} />
              </div>
              <div style={{ fontFamily: T.sans, fontSize: 12, color: C.muted }}>{section + 1} dari 3 bagian</div>
            </div>
          </div>
        )}

        {/* Form content */}
        <Card style={{ padding: isMobile ? 20 : 32 }}>
          <div style={{ marginBottom: 20, paddingBottom: 16, borderBottom: `1px solid ${C.border}` }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: 20 }}>{sections[section].icon}</span>
              <div>
                <div style={{ fontFamily: T.serif, fontSize: 18, fontWeight: 700, color: C.text }}>{sections[section].label}</div>
                <div style={{ fontFamily: T.sans, fontSize: 13, color: C.muted }}>
                  {section === 0 ? 'Isi sesuai data di Kartu Keluarga (KK)' : section === 1 ? 'Data sekolah tempat kamu lulus' : 'Pilih program studi yang diminati'}
                </div>
              </div>
            </div>
          </div>

          {section === 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 14 }}>
                <div style={{ gridColumn: isMobile ? '1' : '1 / -1' }}>
                  <Input label="NAMA LENGKAP *" value={formData.nama || ''} onChange={v => update('nama', v)} placeholder="Sesuai Kartu Keluarga" error={errors.nama} />
                </div>
                <Input label="NIK (16 DIGIT) *" value={formData.nik || ''} onChange={v => update('nik', v.replace(/\D/g, '').slice(0, 16))} placeholder="3271xxxxxxxxxx" error={errors.nik} hint="Nomor Induk Kependudukan" />
                <Input label="TEMPAT, TANGGAL LAHIR *" value={formData.ttl || ''} onChange={v => update('ttl', v)} placeholder="Yogyakarta, 14 Feb 2007" error={errors.ttl} />
                <FormSelect label="JENIS KELAMIN *" value={formData.jk || ''} onChange={v => update('jk', v)} options={[{ value: 'L', label: 'Laki-laki' }, { value: 'P', label: 'Perempuan' }]} />
                {errors.jk && <span style={{ fontFamily: T.sans, fontSize: 12, color: C.error }}>{errors.jk}</span>}
                <FormSelect label="AGAMA" value={formData.agama || ''} onChange={v => update('agama', v)} options={['Islam', 'Kristen', 'Katolik', 'Hindu', 'Buddha', 'Konghucu'].map(a => ({ value: a.toLowerCase(), label: a }))} />
                <Input label="NOMOR HP AKTIF" type="tel" value={formData.hp || ''} onChange={v => update('hp', v)} placeholder="08xxxxxxxxxx" hint="Nomor WhatsApp aktif" />
                <div style={{ gridColumn: isMobile ? '1' : '1 / -1' }}>
                  <Input label="ALAMAT LENGKAP *" value={formData.alamat || ''} onChange={v => update('alamat', v)} placeholder="Jl. Contoh No. 1, Kelurahan, Kecamatan, Kota" error={errors.alamat} rows={2} />
                </div>
              </div>
            </div>
          )}

          {section === 1 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 14 }}>
                <div style={{ gridColumn: isMobile ? '1' : '1 / -1' }}>
                  <Input label="NAMA SEKOLAH *" value={formData.namaSekolah || ''} onChange={v => update('namaSekolah', v)} placeholder="SMA / SMK / MA Negeri atau Swasta" error={errors.namaSekolah} />
                </div>
                <Input label="KOTA / KABUPATEN *" value={formData.kotaSekolah || ''} onChange={v => update('kotaSekolah', v)} placeholder="Yogyakarta" error={errors.kotaSekolah} />
                <Input label="NPSN SEKOLAH" value={formData.npsn || ''} onChange={v => update('npsn', v)} placeholder="20400000" hint="Opsional" />
                <Input label="JURUSAN *" value={formData.jurusan || ''} onChange={v => update('jurusan', v)} placeholder="IPA / IPS / Teknik Komputer" error={errors.jurusan} />
                <FormSelect label="TAHUN LULUS *" value={formData.tahunLulus || ''} onChange={v => update('tahunLulus', v)} options={['2026', '2025', '2024'].map(y => ({ value: y, label: y }))} />
                {errors.tahunLulus && <span style={{ fontFamily: T.sans, fontSize: 12, color: C.error }}>{errors.tahunLulus}</span>}
                <Input label="NILAI RATA-RATA RAPOR" type="number" value={formData.nilaiRapor || ''} onChange={v => update('nilaiRapor', v)} placeholder="0.00 – 100.00" hint="Rata-rata semester 4, 5, dan 6" />
              </div>
            </div>
          )}

          {section === 2 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 14 }}>
                <FormSelect label="PILIHAN PERTAMA *" value={formData.prodi1 || ''} onChange={v => update('prodi1', v)} options={prodiOptions} hint="Program studi utama yang diminati" />
                {errors.prodi1 && <span style={{ fontFamily: T.sans, fontSize: 12, color: C.error }}>{errors.prodi1}</span>}
                <FormSelect label="PILIHAN KEDUA (Opsional)" value={formData.prodi2 || ''} onChange={v => update('prodi2', v)} options={prodiOptions.filter(p => p.value !== formData.prodi1)} hint="Cadangan jika pilihan pertama penuh" />
                <FormSelect label="JALUR MASUK *" value={formData.jalur || ''} onChange={v => update('jalur', v)} options={[{ value: 'reguler', label: 'Reguler' }, { value: 'prestasi', label: 'Jalur Prestasi' }, { value: 'afirmasi', label: 'Jalur Afirmasi' }]} />
                {errors.jalur && <span style={{ fontFamily: T.sans, fontSize: 12, color: C.error }}>{errors.jalur}</span>}
                <div style={{ gridColumn: isMobile ? '1' : '1 / -1' }}>
                  <Input label="PRESTASI / PENGHARGAAN (Opsional)" value={formData.prestasi || ''} onChange={v => update('prestasi', v)} placeholder="Juara olimpiade, penerima beasiswa, dll." rows={2} />
                </div>
              </div>
              {formData.prodi1 && (
                <div style={{ background: C.successLight, borderRadius: 12, padding: '14px 18px', border: `1px solid ${C.success}30` }}>
                  <div style={{ fontFamily: T.sans, fontSize: 12, fontWeight: 700, color: C.success, marginBottom: 8 }}>✓ Ringkasan Pilihan</div>
                  <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(3, 1fr)', gap: 10 }}>
                    {[
                      ['Pilihan 1', prodiOptions.find(p => p.value === formData.prodi1)?.label || '-'],
                      ['Pilihan 2', prodiOptions.find(p => p.value === formData.prodi2)?.label || 'Tidak dipilih'],
                      ['Jalur', [{ value: 'reguler', label: 'Reguler' }, { value: 'prestasi', label: 'Prestasi' }, { value: 'afirmasi', label: 'Afirmasi' }].find(j => j.value === formData.jalur)?.label || '-'],
                    ].map(([lbl, val]) => (
                      <div key={lbl}>
                        <div style={{ fontFamily: T.sans, fontSize: 11, color: C.success, fontWeight: 600 }}>{lbl}</div>
                        <div style={{ fontFamily: T.sans, fontSize: 13, color: C.text, marginTop: 2 }}>{val}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 28, paddingTop: 20, borderTop: `1px solid ${C.border}` }}>
            <Btn variant="outline" size="md" disabled={section === 0} onClick={() => { setSection(s => s - 1); setErrors({}); }}>← Sebelumnya</Btn>
            <Btn size="md" onClick={handleNext}>{section < 2 ? 'Lanjut →' : 'Simpan & Lanjut →'}</Btn>
          </div>
        </Card>
      </div>
    </div>
  );
}
