# Panduan Setup Google OAuth di Supabase

Error yang muncul: `"Unsupported provider: provider is not enabled"` berarti Google OAuth provider belum diaktifkan di Supabase dashboard.

## Langkah-langkah Setup:

### 1. Buat Google OAuth Credentials

1. Buka [Google Cloud Console](https://console.cloud.google.com/)
2. Pilih atau buat project baru
3. Pergi ke **APIs & Services** > **Credentials**
4. Klik **Create Credentials** > **OAuth client ID**
5. Jika diminta, konfigurasi OAuth consent screen terlebih dahulu:
   - Pilih **External** (untuk testing) atau **Internal** (jika menggunakan Google Workspace)
   - Isi informasi yang diperlukan
   - Tambahkan scopes: `email`, `profile`, `openid`
   - Tambahkan test users jika diperlukan
6. Buat OAuth Client ID:
   - Application type: **Web application**
   - Name: Nama aplikasi Anda (contoh: "Game Store")
   - Authorized JavaScript origins:
     - `http://localhost:5173` (untuk development)
     - `https://your-project-ref.supabase.co` (Supabase URL)
   - Authorized redirect URIs:
     - `https://your-project-ref.supabase.co/auth/v1/callback`
     - `http://localhost:5173/auth/v1/callback` (untuk development)
7. Salin **Client ID** dan **Client Secret**

### 2. Aktifkan Google Provider di Supabase

1. Buka [Supabase Dashboard](https://app.supabase.com/)
2. Pilih project Anda
3. Pergi ke **Authentication** > **Providers**
4. Cari **Google** di daftar providers
5. Klik untuk mengaktifkan Google provider
6. Masukkan:
   - **Client ID (for OAuth)**: Client ID dari Google Cloud Console
   - **Client Secret (for OAuth)**: Client Secret dari Google Cloud Console
7. Klik **Save**

### 3. Konfigurasi Redirect URLs

1. Di halaman yang sama (Authentication > Providers > Google)
2. Pastikan **Redirect URLs** sudah benar:
   - `https://your-project-ref.supabase.co/auth/v1/callback`
   - Tambahkan URL production jika sudah ada

### 4. Test Login

Setelah konfigurasi selesai, coba login dengan Google lagi. Error seharusnya sudah hilang.

## Catatan Penting:

- Pastikan redirect URI di Google Cloud Console **sama persis** dengan yang ada di Supabase
- Untuk development, gunakan `http://localhost:5173` (atau port yang digunakan)
- Untuk production, tambahkan domain production Anda
- Client Secret harus dirahasiakan dan jangan di-commit ke repository

## Troubleshooting:

- **Error "redirect_uri_mismatch"**: Pastikan redirect URI di Google Console sama dengan yang di Supabase
- **Error "invalid_client"**: Periksa kembali Client ID dan Client Secret
- **Error "access_denied"**: Pastikan OAuth consent screen sudah dikonfigurasi dengan benar

