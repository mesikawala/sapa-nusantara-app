# Cara Memperbaiki Error "Column does not exist" setelah Menambahkan Kolom

Jika Anda sudah menambahkan kolom `is_featured` dan `featured_order` ke database tapi masih mendapatkan error "column does not exist", kemungkinan besar **schema cache** di Supabase belum di-refresh.

## Solusi: Refresh Schema Cache di Supabase

### Cara 1: Melalui Supabase Dashboard (Paling Mudah)

1. Buka **Supabase Dashboard** → https://supabase.com/dashboard
2. Pilih **project** Anda
3. Klik menu **Settings** (ikon gear) di sidebar kiri
4. Pilih **API** di menu Settings
5. Scroll ke bawah ke bagian **Schema Cache**
6. Klik tombol **"Clear schema cache"** atau **"Refresh schema cache"**
7. Tunggu beberapa detik hingga cache ter-refresh
8. Refresh halaman aplikasi Anda
9. Coba lagi fitur Featured

### Cara 2: Via SQL (Alternative)

Jika cara pertama tidak tersedia, jalankan SQL ini di **SQL Editor**:

```sql
-- Refresh schema cache dengan melakukan query sederhana
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'games' 
AND column_name IN ('is_featured', 'featured_order');

-- Atau langsung query ke tabel games
SELECT id, title, is_featured, featured_order 
FROM public.games 
LIMIT 1;
```

Setelah menjalankan query ini, tunggu beberapa detik dan coba lagi.

### Cara 3: Restart Supabase (Jika menggunakan Local)

Jika Anda menggunakan Supabase local development:

```bash
supabase stop
supabase start
```

## Verifikasi Kolom Sudah Ada

Pastikan kolom sudah benar-benar ada di database:

1. Buka **Table Editor** di Supabase Dashboard
2. Pilih tabel **games**
3. Scroll ke kanan untuk melihat semua kolom
4. Pastikan kolom **is_featured** dan **featured_order** ada di daftar kolom
5. Jika belum ada, jalankan lagi migration SQL:

```sql
-- Tambahkan kolom jika belum ada
ALTER TABLE public.games
ADD COLUMN IF NOT EXISTS is_featured BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS featured_order INTEGER;

-- Verifikasi kolom sudah ada
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'games'
AND column_name IN ('is_featured', 'featured_order');
```

## Setelah Refresh Cache

1. **Hard refresh** browser Anda (Ctrl+Shift+R atau Cmd+Shift+R)
2. Buka halaman Admin
3. Coba klik checkbox Featured lagi
4. Seharusnya sudah berfungsi tanpa error

## Catatan

- Schema cache di Supabase biasanya auto-refresh dalam beberapa menit, tapi kadang perlu di-refresh manual
- Setelah menambahkan kolom baru ke database, selalu refresh schema cache agar aplikasi bisa mengakses kolom baru tersebut
- Jika masih error setelah refresh cache, pastikan:
  - Kolom sudah benar-benar ada di database (cek via Table Editor)
  - Nama kolom tepat: `is_featured` (dengan underscore, bukan spasi)
  - Tipe data benar: `BOOLEAN` untuk `is_featured`, `INTEGER` untuk `featured_order`

