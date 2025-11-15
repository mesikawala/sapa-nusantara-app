# Cara Menambahkan Fitur Banner Featured Games

Error "gagal mengupdate banner" terjadi karena kolom `is_featured` dan `featured_order` belum ada di database. Ikuti langkah-langkah berikut untuk menambahkan kolom tersebut.

## Cara 1: Melalui Supabase Dashboard (Paling Mudah)

1. Buka Supabase Dashboard Anda di https://supabase.com/dashboard
2. Pilih project Anda
3. Klik menu **SQL Editor** di sidebar kiri
4. Klik tombol **New Query**
5. Copy dan paste SQL berikut:

```sql
-- Add is_featured and featured_order columns to games table
ALTER TABLE public.games
ADD COLUMN IF NOT EXISTS is_featured BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS featured_order INTEGER;

-- Create index for better performance when querying featured games
CREATE INDEX IF NOT EXISTS idx_games_is_featured ON public.games(is_featured, featured_order);

-- Add comment for documentation
COMMENT ON COLUMN public.games.is_featured IS 'Whether this game should appear in the banner carousel';
COMMENT ON COLUMN public.games.featured_order IS 'Display order in the banner carousel (lower numbers appear first)';
```

6. Klik tombol **Run** atau tekan `Ctrl + Enter`
7. Tunggu hingga muncul pesan sukses
8. Refresh halaman Admin dan coba klik checkbox Featured lagi

## Cara 2: Melalui Supabase CLI (Jika Menggunakan Local Development)

Jika Anda menggunakan Supabase CLI untuk development lokal:

```bash
cd sapa-nusantara-app
supabase db push
```

Atau jika migration file sudah ada:

```bash
cd sapa-nusantara-app
supabase migration up
```

## Verifikasi

Setelah menjalankan SQL, Anda bisa verifikasi dengan:

1. Buka **Table Editor** di Supabase Dashboard
2. Pilih tabel **games**
3. Pastikan kolom `is_featured` dan `featured_order` sudah muncul di daftar kolom

## Setelah Migration Selesai

1. Refresh halaman Admin
2. Di section "Kelola Game Banner", Anda akan melihat:
   - Checkbox "Featured" untuk setiap game
   - Input "Urutan" yang muncul ketika game di-mark sebagai featured
3. Klik checkbox Featured pada game yang ingin ditampilkan di banner
4. Atur urutan tampil menggunakan input Urutan (angka lebih kecil akan muncul lebih dulu)

## Catatan

- Migration file sudah tersedia di: `supabase/migrations/20241211120000_add_featured_games.sql`
- Fitur ini memungkinkan admin untuk memilih game mana yang akan ditampilkan di banner carousel di halaman beranda
- Game yang di-mark sebagai featured akan otomatis muncul di banner berdasarkan urutan yang ditentukan

