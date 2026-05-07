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
