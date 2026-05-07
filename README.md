# Dapur Nusantara Monorepo

Landing page modern untuk brand **Dapur Nusantara** dengan tema **Makanan Nasional Indonesia**.

## Stack

- Frontend: React + Vite + Tailwind CSS
- Backend: Express.js
- Struktur: Monorepo (`frontend` dan `backend`)

## Fitur Utama

- SEO friendly metadata (title, description, Open Graph)
- SEO lanjutan: JSON-LD schema + `robots.txt` + `sitemap.xml`
- Dark/Light mode dengan penyimpanan preferensi pengguna
- Dual language (Bahasa Indonesia + English)
- Floating WhatsApp icon
- Frontend terintegrasi ke backend API (`/api/brand` dan `/api/menu`)
- Motion animation menggunakan Framer Motion
- UI modern dan dinamis dengan layout hero, menu cards, dan CTA section

## Jalankan Proyek

```bash
npm install
npm run dev:frontend
```

Backend:

```bash
npm run dev:backend
```

Endpoint backend:

- `GET /api/health`
- `GET /api/brand`
- `GET /api/menu`

## Environment Variables

Frontend (`frontend/.env`):

```bash
VITE_API_BASE_URL=http://localhost:4000
```

Backend (`backend/.env`):

```bash
PORT=4000
CORS_ORIGIN=http://localhost:5173
```

## Deploy

Panduan deploy production tersedia di `DEPLOYMENT.md` untuk:

- Frontend: Vercel
- Backend: Render / Railway
