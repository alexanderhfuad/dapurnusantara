# Deployment Guide

## 1) Deploy Frontend to Vercel

1. Import repository ke Vercel.
2. Gunakan root project (karena `vercel.json` sudah disiapkan).
3. Tambahkan environment variable:
   - `VITE_API_BASE_URL=https://your-backend-url.onrender.com` (atau domain Railway)
4. Deploy.

## 2) Deploy Backend to Render

1. Pilih **New > Blueprint** pada Render.
2. Connect repository dan gunakan `render.yaml`.
3. Setelah deploy, ambil URL backend (contoh: `https://dapur-nusantara-backend.onrender.com`).
4. Update env `VITE_API_BASE_URL` di Vercel sesuai URL backend.

## 3) Deploy Backend to Railway (Alternatif)

1. Connect repository ke Railway.
2. Railway akan membaca `railway.json`.
3. Set environment variable:
   - `PORT=4000`
   - `CORS_ORIGIN=https://dapur-nusantara.vercel.app`
4. Gunakan URL Railway sebagai `VITE_API_BASE_URL` di Vercel.

## 4) Domain SEO

Setelah domain final siap:

- Update `frontend/index.html`:
  - canonical URL
  - Open Graph URL/image (jika ditambahkan)
- Update `frontend/public/sitemap.xml`
- Update `frontend/public/robots.txt`

## 5) Deploy to Hostinger (Shared Hosting)

### Frontend:
1. Jalankan `npm run build` di folder `frontend`.
2. Upload isi folder `dist` ke `public_html`.
3. Pastikan file `.htaccess` (dari `frontend/public`) ikut terupload untuk menangani routing SPA.

### Backend (Node.js Selector):
1. Upload folder `backend` ke server (direkomendasikan di luar `public_html`).
2. Di hPanel, buka **Node.js Dashboard**.
3. Set **Application Root** ke folder backend Anda.
4. Set **Application Startup File** ke file utama (misal `index.js` atau `server.js`).
5. Pastikan Environment Variables (`PORT`, `CORS_ORIGIN`) sudah diatur di panel tersebut.
6. Klik **Run npm install** dan **Start App**.
