import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

const content = {
  id: {
    navMenu: ["Beranda", "Tentang", "Menu", "Kontak"],
    heroBadge: "Makanan Nasional Indonesia",
    heroTitle: "Cita Rasa Nusantara Dalam Sentuhan Modern",
    heroDesc:
      "Dapur Nusantara menghadirkan hidangan autentik dari seluruh Indonesia dengan tampilan premium, pelayanan cepat, dan pengalaman digital yang dinamis.",
    ctaPrimary: "Lihat Menu Favorit",
    ctaSecondary: "Hubungi Kami",
    sectionAboutTitle: "Kenapa Dapur Nusantara",
    sectionAboutDesc:
      "Terinspirasi dari kekayaan kuliner lokal dan referensi tampilan modern, kami fokus pada pengalaman visual yang bersih, interaktif, dan mudah diakses.",
    cardTitle1: "Bahan Segar Berkualitas",
    cardDesc1: "Dipilih langsung dari pemasok terbaik untuk menjaga cita rasa asli.",
    cardTitle2: "Resep Warisan Keluarga",
    cardDesc2: "Teknik memasak tradisional dipadukan presentasi kontemporer.",
    cardTitle3: "Pengiriman Cepat",
    cardDesc3: "Sistem pemesanan digital yang efisien untuk wilayah urban.",
    sectionMenuTitle: "Menu Andalan",
    sectionMenuDesc: "Koleksi menu nasional favorit yang menjadi kebanggaan Nusantara.",
    sectionContactTitle: "Siap Melayani Acara Anda",
    sectionContactDesc: "Konsultasikan kebutuhan catering, event, atau pemesanan harian.",
    callNow: "Chat via WhatsApp",
    footer: "Dapur Nusantara. Rasa Indonesia, untuk dunia.",
    loadingApi: "Memuat data menu dari server...",
    apiError: "Gagal memuat data backend, menampilkan data cadangan.",
    poweredBy: "Terhubung ke API"
  },
  en: {
    navMenu: ["Home", "About", "Menu", "Contact"],
    heroBadge: "Indonesia National Cuisine",
    heroTitle: "Nusantara Flavor With A Modern Touch",
    heroDesc:
      "Dapur Nusantara serves authentic dishes from across Indonesia with premium presentation, fast service, and a dynamic digital experience.",
    ctaPrimary: "Explore Signature Menu",
    ctaSecondary: "Contact Us",
    sectionAboutTitle: "Why Dapur Nusantara",
    sectionAboutDesc:
      "Inspired by local culinary richness and modern visual standards, we focus on a clean, interactive, and accessible experience.",
    cardTitle1: "Premium Fresh Ingredients",
    cardDesc1: "Selected from trusted suppliers to preserve authentic taste.",
    cardTitle2: "Heritage Family Recipes",
    cardDesc2: "Traditional cooking techniques with contemporary presentation.",
    cardTitle3: "Fast Delivery",
    cardDesc3: "Efficient digital ordering system for urban areas.",
    sectionMenuTitle: "Signature Dishes",
    sectionMenuDesc: "A curated set of Indonesia's most beloved national dishes.",
    sectionContactTitle: "Ready For Your Event",
    sectionContactDesc: "Consult us for catering, events, or daily food orders.",
    callNow: "Chat via WhatsApp",
    footer: "Dapur Nusantara. Indonesian Taste, for the world.",
    loadingApi: "Loading menu data from server...",
    apiError: "Failed to load backend data, showing fallback data.",
    poweredBy: "Connected to API"
  }
};

const featuredMenu = [
  { name: "Rendang Minang", price: "Rp45.000", emoji: "🍛" },
  { name: "Sate Ayam Madura", price: "Rp35.000", emoji: "🍢" },
  { name: "Nasi Goreng Nusantara", price: "Rp32.000", emoji: "🍚" },
  { name: "Soto Betawi", price: "Rp38.000", emoji: "🥣" }
];

function App() {
  const [lang, setLang] = useState("id");
  const [theme, setTheme] = useState("light");
  const [brandData, setBrandData] = useState(null);
  const [menuData, setMenuData] = useState(featuredMenu);
  const [apiState, setApiState] = useState("loading");
  const t = useMemo(() => content[lang], [lang]);
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000";

  useEffect(() => {
    const savedLang = localStorage.getItem("dn_lang");
    const savedTheme = localStorage.getItem("dn_theme");
    const isDarkPreferred = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const nextTheme = savedTheme || (isDarkPreferred ? "dark" : "light");

    if (savedLang === "id" || savedLang === "en") setLang(savedLang);
    setTheme(nextTheme);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("dn_theme", theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.lang = lang;
    localStorage.setItem("dn_lang", lang);
  }, [lang]);

  useEffect(() => {
    const fetchApiData = async () => {
      try {
        const [brandRes, menuRes] = await Promise.all([
          fetch(`${apiBaseUrl}/api/brand`),
          fetch(`${apiBaseUrl}/api/menu`)
        ]);

        if (!brandRes.ok || !menuRes.ok) throw new Error("API response is not ok");

        const brandJson = await brandRes.json();
        const menuJson = await menuRes.json();

        setBrandData(brandJson);
        if (Array.isArray(menuJson.items) && menuJson.items.length > 0) {
          setMenuData(menuJson.items);
        }
        setApiState("success");
      } catch (_error) {
        setApiState("error");
      }
    };

    fetchApiData();
  }, [apiBaseUrl]);

  useEffect(() => {
    const title =
      lang === "id"
        ? "Dapur Nusantara | Makanan Nasional Indonesia"
        : "Dapur Nusantara | Indonesian National Cuisine";
    const description =
      lang === "id"
        ? "Dapur Nusantara menghadirkan hidangan autentik Indonesia dengan tampilan modern dan pengalaman digital dinamis."
        : "Dapur Nusantara serves authentic Indonesian dishes with modern visuals and a dynamic digital experience.";
    const metaDesc = document.querySelector('meta[name="description"]');
    const scriptId = "ld-json-dapur-nusantara";
    const oldScript = document.getElementById(scriptId);

    document.title = title;
    if (metaDesc) metaDesc.setAttribute("content", description);

    if (oldScript) oldScript.remove();
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "Restaurant",
      name: "Dapur Nusantara",
      servesCuisine: "Indonesian",
      url: "https://dapur-nusantara.vercel.app",
      slogan: lang === "id" ? "Makanan Nasional Indonesia" : "Indonesian National Cuisine",
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+62-812-3456-7890",
        contactType: "customer support",
        availableLanguage: ["Indonesian", "English"]
      }
    };
    const script = document.createElement("script");
    script.id = scriptId;
    script.type = "application/ld+json";
    script.text = JSON.stringify(jsonLd);
    document.head.appendChild(script);
  }, [lang]);

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-40 border-b border-orange-100/70 bg-white/85 backdrop-blur-lg dark:border-zinc-800 dark:bg-zinc-900/85">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <a href="#" className="text-lg font-extrabold tracking-wide text-brand-600">
            {brandData?.brand || "Dapur Nusantara"}
          </a>
          <div className="hidden gap-8 text-sm md:flex">
            {t.navMenu.map((item, idx) => (
              <a
                key={item}
                href={idx === 2 ? "#menu" : idx === 3 ? "#contact" : "#"}
                className="text-zinc-700 transition hover:text-brand-600 dark:text-zinc-300"
              >
                {item}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setLang((prev) => (prev === "id" ? "en" : "id"))}
              className="rounded-full border border-zinc-300 px-3 py-1 text-xs font-semibold dark:border-zinc-700"
            >
              {lang === "id" ? "EN" : "ID"}
            </button>
            <button
              onClick={() => setTheme((prev) => (prev === "light" ? "dark" : "light"))}
              className="rounded-full border border-zinc-300 px-3 py-1 text-xs font-semibold dark:border-zinc-700"
              aria-label="toggle theme"
            >
              {theme === "light" ? "Dark" : "Light"}
            </button>
          </div>
        </nav>
      </header>

      <main>
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="relative overflow-hidden"
        >
          <div className="absolute -left-16 top-10 h-48 w-48 rounded-full bg-orange-300/30 blur-3xl" />
          <div className="absolute -right-16 bottom-0 h-56 w-56 rounded-full bg-amber-300/30 blur-3xl" />
          <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 md:grid-cols-2 md:py-20">
            <div className="space-y-6">
              <span className="inline-flex rounded-full bg-brand-100 px-4 py-2 text-xs font-bold text-brand-700 dark:bg-zinc-800 dark:text-orange-300">
                {t.heroBadge}
              </span>
              <h1 className="text-4xl font-black leading-tight md:text-5xl">{t.heroTitle}</h1>
              <p className="text-base leading-relaxed text-zinc-700 dark:text-zinc-300">{t.heroDesc}</p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="#menu"
                  className="rounded-full bg-brand-600 px-6 py-3 text-sm font-bold text-white shadow-glow transition hover:bg-brand-700"
                >
                  {t.ctaPrimary}
                </a>
                <a
                  href="#contact"
                  className="rounded-full border border-zinc-300 px-6 py-3 text-sm font-bold transition hover:border-brand-600 hover:text-brand-600 dark:border-zinc-700"
                >
                  {t.ctaSecondary}
                </a>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {menuData.slice(0, 4).map((item) => (
                <article
                  key={item.name}
                  className="rounded-2xl border border-orange-100 bg-white p-4 shadow-md transition hover:-translate-y-1 hover:shadow-xl dark:border-zinc-800 dark:bg-zinc-900"
                >
                  <p className="text-3xl">{item.emoji}</p>
                  <h2 className="mt-3 text-sm font-bold">{item.name}</h2>
                  <p className="mt-1 text-sm text-brand-600 dark:text-orange-300">{item.price}</p>
                </article>
              ))}
            </div>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="mx-auto max-w-6xl px-6 py-14"
        >
          <h2 className="text-2xl font-bold md:text-3xl">{t.sectionAboutTitle}</h2>
          <p className="mt-3 max-w-3xl text-zinc-700 dark:text-zinc-300">{t.sectionAboutDesc}</p>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              { title: t.cardTitle1, desc: t.cardDesc1 },
              { title: t.cardTitle2, desc: t.cardDesc2 },
              { title: t.cardTitle3, desc: t.cardDesc3 }
            ].map((item) => (
              <article
                key={item.title}
                className="rounded-2xl border border-orange-100 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900"
              >
                <h3 className="font-bold">{item.title}</h3>
                <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">{item.desc}</p>
              </article>
            ))}
          </div>
        </motion.section>

        <motion.section
          id="menu"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          viewport={{ once: true }}
          className="mx-auto max-w-6xl px-6 py-14"
        >
          <h2 className="text-2xl font-bold md:text-3xl">{t.sectionMenuTitle}</h2>
          <p className="mt-3 text-zinc-700 dark:text-zinc-300">{t.sectionMenuDesc}</p>
          <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
            {apiState === "loading" ? t.loadingApi : apiState === "error" ? t.apiError : `${t.poweredBy}: ${apiBaseUrl}`}
          </p>
          <div className="mt-8 overflow-hidden rounded-3xl border border-orange-100 dark:border-zinc-800">
            <div className="grid grid-cols-1 divide-y divide-orange-100 dark:divide-zinc-800">
              {menuData.map((item) => (
                <div
                  key={`${item.name}-row`}
                  className="flex items-center justify-between bg-white px-5 py-4 dark:bg-zinc-900"
                >
                  <span className="font-semibold">{item.name}</span>
                  <span className="font-bold text-brand-600 dark:text-orange-300">{item.price}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        <motion.section
          id="contact"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mx-auto max-w-6xl px-6 py-14"
        >
          <div className="rounded-3xl bg-gradient-to-r from-brand-600 to-amber-500 p-8 text-white shadow-xl">
            <h2 className="text-2xl font-bold md:text-3xl">{t.sectionContactTitle}</h2>
            <p className="mt-2 max-w-2xl text-orange-100">{t.sectionContactDesc}</p>
            <a
              href="https://wa.me/6281234567890?text=Halo%20Dapur%20Nusantara!"
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex rounded-full bg-white px-5 py-3 text-sm font-bold text-brand-700 transition hover:bg-orange-50"
            >
              {t.callNow}
            </a>
          </div>
        </motion.section>
      </main>

      <a
        href="https://wa.me/6281234567890?text=Halo%20Dapur%20Nusantara!"
        target="_blank"
        rel="noreferrer"
        aria-label="whatsapp chat"
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-2xl text-white shadow-xl transition hover:scale-110"
      >
        💬
      </a>

      <footer className="border-t border-orange-100 px-6 py-8 text-center text-sm text-zinc-600 dark:border-zinc-800 dark:text-zinc-400">
        {t.footer}
      </footer>
    </div>
  );
}

export default App;
