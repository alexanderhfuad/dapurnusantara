import express from "express";
import cors from "cors";

const app = express();
const port = process.env.PORT || 4000;
const allowedOrigin = process.env.CORS_ORIGIN || "*";

app.use(
  cors({
    origin: allowedOrigin
  })
);
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, service: "dapur-nusantara-backend" });
});

app.get("/api/brand", (_req, res) => {
  res.json({
    brand: "Dapur Nusantara",
    tagline: "Makanan Nasional Indonesia",
    supports: ["id", "en"]
  });
});

app.get("/api/menu", (_req, res) => {
  res.json({
    items: [
      { name: "Rendang Minang", price: "Rp45.000", emoji: "🍛" },
      { name: "Sate Ayam Madura", price: "Rp35.000", emoji: "🍢" },
      { name: "Nasi Goreng Nusantara", price: "Rp32.000", emoji: "🍚" },
      { name: "Soto Betawi", price: "Rp38.000", emoji: "🥣" },
      { name: "Gado-Gado Jakarta", price: "Rp30.000", emoji: "🥗" },
      { name: "Pempek Palembang", price: "Rp34.000", emoji: "🍢" }
    ]
  });
});

app.listen(port, () => {
  console.log(`Dapur Nusantara backend running on port ${port}`);
});
