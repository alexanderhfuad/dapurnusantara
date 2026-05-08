import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Menu, X, ChefHat, Leaf, Zap, Globe, MapPin, Phone, Mail, UtensilsCrossed, Star, ShoppingBag, Clock } from "lucide-react";

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
  { name: "Rendang Minang", price: "Rp45.000", emoji: "🍛", image: "https://images.unsplash.com/photo-1585937421891-4277a5ad4d11?w=300&h=300&fit=crop", desc: "Daging sapi empuk dengan santan kaya rasa" },
  { name: "Sate Ayam Madura", price: "Rp35.000", emoji: "🍢", image: "https://images.unsplash.com/photo-1603894437490-bf54b25e6b2a?w=300&h=300&fit=crop", desc: "Daging ayam tusuk dengan bumbu kacang tradisional" },
  { name: "Nasi Goreng Nusantara", price: "Rp32.000", emoji: "🍚", image: "https://images.unsplash.com/photo-1609501676725-7186f017a4b3?w=300&h=300&fit=crop", desc: "Nasi goreng spesial dengan pilihan lauk" },
  { name: "Soto Betawi", price: "Rp38.000", emoji: "🥣", image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300&h=300&fit=crop", desc: "Sup tradisional Jakarta yang gurih dan lezat" }
];

function App() {
  const [lang, setLang] = useState("id");
  const [theme, setTheme] = useState("light");
  const [brandData, setBrandData] = useState(null);
  const [menuData, setMenuData] = useState(featuredMenu);
  const [apiState, setApiState] = useState("loading");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-orange-300/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-40 right-20 w-96 h-96 bg-amber-300/10 rounded-full blur-3xl"></div>
        <div className="absolute top-40 right-40 w-80 h-80 bg-orange-200/5 rounded-full blur-3xl"></div>
      </div>

      {/* Header */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="sticky top-0 z-40 border-b border-orange-100/50 bg-white/80 backdrop-blur-xl dark:border-zinc-800 dark:bg-zinc-900/80"
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 py-4">
          {/* Logo */}
          <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-2 text-lg font-extrabold tracking-wide text-brand-600">
            <ChefHat className="w-6 h-6" />
            <span>{brandData?.brand || "Dapur Nusantara"}</span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-8 text-sm font-medium">
            {t.navMenu.map((item, idx) => (
              <motion.a
                key={item}
                href={idx === 2 ? "#menu" : idx === 3 ? "#contact" : "#"}
                whileHover={{ color: "#f97316" }}
                className="text-zinc-700 transition dark:text-zinc-300"
              >
                {item}
              </motion.a>
            ))}
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setLang((prev) => (prev === "id" ? "en" : "id"))}
              className="px-3 py-2 text-xs font-bold rounded-lg bg-orange-100 text-brand-700 hover:bg-orange-200 transition dark:bg-zinc-800 dark:text-orange-300"
            >
              {lang === "id" ? "EN" : "ID"}
            </button>
            <button
              onClick={() => setTheme((prev) => (prev === "light" ? "dark" : "light"))}
              className="px-3 py-2 text-xs font-bold rounded-lg bg-zinc-100 text-zinc-700 hover:bg-zinc-200 transition dark:bg-zinc-800 dark:text-zinc-300"
              aria-label="toggle theme"
            >
              {theme === "light" ? "🌙" : "☀️"}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-orange-100 text-brand-700 dark:bg-zinc-800"
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: mobileMenuOpen ? 1 : 0, height: mobileMenuOpen ? "auto" : 0 }}
          className="md:hidden border-t border-orange-100 dark:border-zinc-800 overflow-hidden"
        >
          <div className="flex flex-col gap-2 p-4 bg-orange-50 dark:bg-zinc-900">
            {t.navMenu.map((item, idx) => (
              <a
                key={item}
                href={idx === 2 ? "#menu" : idx === 3 ? "#contact" : "#"}
                className="px-4 py-2 text-sm font-medium text-zinc-700 rounded-lg hover:bg-white dark:text-zinc-300 dark:hover:bg-zinc-800 transition"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item}
              </a>
            ))}
          </div>
        </motion.div>
      </motion.header>

      <main>
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 py-16 md:py-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Left Content */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <motion.span 
                  whileHover={{ scale: 1.05 }}
                  className="inline-flex items-center gap-2 rounded-full bg-orange-100 px-4 py-2 text-xs font-bold text-brand-700 dark:bg-zinc-800 dark:text-orange-300"
                >
                  <Star className="w-4 h-4" />
                  {t.heroBadge}
                </motion.span>
                
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight">
                  {t.heroTitle}
                </h1>
                
                <p className="text-base sm:text-lg leading-relaxed text-zinc-700 dark:text-zinc-300">
                  {t.heroDesc}
                </p>
                
                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row flex-wrap gap-3 pt-4">
                  <motion.a
                    href="#menu"
                    whileHover={{ scale: 1.05, boxShadow: "0 15px 35px -10px rgba(249, 115, 22, 0.4)" }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-600 px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-bold text-white shadow-lg transition"
                  >
                    <ShoppingBag className="w-5 h-5" />
                    {t.ctaPrimary}
                  </motion.a>
                  <motion.a
                    href="#contact"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-brand-600 px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-bold text-brand-600 transition hover:bg-orange-50 dark:border-orange-400 dark:text-orange-400 dark:hover:bg-zinc-900"
                  >
                    <Phone className="w-5 h-5" />
                    {t.ctaSecondary}
                  </motion.a>
                </div>
              </motion.div>

              {/* Right Featured Items Grid */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="grid grid-cols-2 gap-4"
              >
                {menuData.slice(0, 4).map((item, idx) => (
                  <motion.article
                    key={item.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    whileHover={{ y: -8, boxShadow: "0 20px 40px -15px rgba(249, 115, 22, 0.3)" }}
                    transition={{ delay: idx * 0.1 + 0.2 }}
                    viewport={{ once: true }}
                    className="group relative rounded-2xl overflow-hidden bg-gradient-to-br from-white to-orange-50 dark:from-zinc-900 dark:to-zinc-800 border border-orange-100 dark:border-zinc-700 p-4 sm:p-5 shadow-md transition"
                  >
                    {/* Image Container */}
                    <div className="relative h-32 sm:h-40 w-full rounded-xl overflow-hidden mb-4 bg-gradient-to-br from-orange-200 to-amber-200">
                      <motion.img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover transition group-hover:scale-110"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition" />
                    </div>

                    {/* Content */}
                    <h3 className="text-sm sm:text-base font-bold text-zinc-900 dark:text-white">
                      {item.name}
                    </h3>
                    <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1 line-clamp-2">
                      {item.desc}
                    </p>
                    <p className="text-base sm:text-lg font-bold text-brand-600 dark:text-orange-400 mt-3">
                      {item.price}
                    </p>
                  </motion.article>
                ))}
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* About Section */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="mx-auto max-w-7xl px-4 sm:px-6 py-16 md:py-24"
        >
          <div className="text-center mb-12">
            <motion.h2 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl md:text-5xl font-black mb-4"
            >
              {t.sectionAboutTitle}
            </motion.h2>
            <p className="text-base sm:text-lg max-w-2xl mx-auto text-zinc-700 dark:text-zinc-300">
              {t.sectionAboutDesc}
            </p>
          </div>

          {/* Feature Cards with Icons */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {[
              { title: t.cardTitle1, desc: t.cardDesc1, icon: Leaf, color: "from-green-500 to-emerald-500" },
              { title: t.cardTitle2, desc: t.cardDesc2, icon: ChefHat, color: "from-orange-500 to-red-500" },
              { title: t.cardTitle3, desc: t.cardDesc3, icon: Zap, color: "from-blue-500 to-cyan-500" }
            ].map((item, idx) => {
              const IconComponent = item.icon;
              return (
                <motion.article
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -8 }}
                  transition={{ delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="group relative rounded-2xl overflow-hidden"
                >
                  {/* Gradient Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-10 transition duration-300`}></div>

                  {/* Card Content */}
                  <div className="relative rounded-2xl border border-orange-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 sm:p-8 shadow-md hover:shadow-xl transition">
                    {/* Icon Container */}
                    <motion.div 
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${item.color} text-white mb-4`}
                    >
                      <IconComponent className="w-6 h-6" />
                    </motion.div>

                    {/* Text */}
                    <h3 className="text-lg sm:text-xl font-bold mb-3 text-zinc-900 dark:text-white">
                      {item.title}
                    </h3>
                    <p className="text-sm sm:text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
                      {item.desc}
                    </p>

                    {/* Hover Line */}
                    <motion.div 
                      initial={{ width: 0 }}
                      whileHover={{ width: "100%" }}
                      transition={{ duration: 0.3 }}
                      className={`mt-4 h-1 bg-gradient-to-r ${item.color}`}
                    />
                  </div>
                </motion.article>
              );
            })}
          </div>
        </motion.section>

        {/* Menu Section */}
        <motion.section
          id="menu"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          viewport={{ once: true }}
          className="mx-auto max-w-7xl px-4 sm:px-6 py-16 md:py-24"
        >
          <div className="text-center mb-12">
            <motion.h2 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl md:text-5xl font-black mb-4"
            >
              {t.sectionMenuTitle}
            </motion.h2>
            <p className="text-base sm:text-lg max-w-2xl mx-auto text-zinc-700 dark:text-zinc-300 mb-2">
              {t.sectionMenuDesc}
            </p>
            <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
              {apiState === "loading" ? t.loadingApi : apiState === "error" ? t.apiError : `${t.poweredBy}: ${apiBaseUrl}`}
            </p>
          </div>

          {/* Menu Grid View */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {menuData.map((item, idx) => (
              <motion.div
                key={`${item.name}-card`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -8 }}
                transition={{ delay: idx * 0.05 }}
                viewport={{ once: true }}
                className="group rounded-2xl overflow-hidden bg-gradient-to-br from-white to-orange-50 dark:from-zinc-900 dark:to-zinc-800 border border-orange-100 dark:border-zinc-700 shadow-md hover:shadow-xl transition"
              >
                {/* Image */}
                <div className="relative h-32 sm:h-40 bg-gradient-to-br from-orange-200 to-amber-200 overflow-hidden">
                  {item.image ? (
                    <motion.img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-4xl">
                      {item.emoji}
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition" />
                </div>

                {/* Content */}
                <div className="p-4 sm:p-5">
                  <h3 className="text-sm sm:text-base font-bold text-zinc-900 dark:text-white mb-2">
                    {item.name}
                  </h3>
                  {item.desc && (
                    <p className="text-xs text-zinc-600 dark:text-zinc-400 mb-3 line-clamp-2">
                      {item.desc}
                    </p>
                  )}
                  <div className="flex items-center justify-between pt-3 border-t border-orange-100 dark:border-zinc-700">
                    <span className="text-base sm:text-lg font-bold text-brand-600 dark:text-orange-400">
                      {item.price}
                    </span>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-2 rounded-lg bg-orange-100 text-brand-700 hover:bg-orange-200 transition dark:bg-zinc-800 dark:text-orange-300"
                      aria-label="add to order"
                    >
                      <ShoppingBag className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Contact Section */}
        <motion.section
          id="contact"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mx-auto max-w-7xl px-4 sm:px-6 py-16 md:py-24"
        >
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-brand-600 via-brand-500 to-amber-500 p-8 sm:p-12 shadow-2xl">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-80 h-80 bg-white rounded-full blur-3xl"></div>
            </div>

            {/* Content */}
            <div className="relative z-10">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4">
                  {t.sectionContactTitle}
                </h2>
                <p className="text-base sm:text-lg max-w-2xl text-orange-100 mb-6 sm:mb-8">
                  {t.sectionContactDesc}
                </p>

                {/* Contact Info Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                  <motion.div 
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-3 bg-white/20 backdrop-blur rounded-xl p-4"
                  >
                    <Phone className="w-5 h-5 text-white flex-shrink-0" />
                    <div>
                      <p className="text-xs text-orange-100">Telepon</p>
                      <p className="text-sm sm:text-base font-bold text-white">+62-812-3456-7890</p>
                    </div>
                  </motion.div>

                  <motion.div 
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-3 bg-white/20 backdrop-blur rounded-xl p-4"
                  >
                    <MapPin className="w-5 h-5 text-white flex-shrink-0" />
                    <div>
                      <p className="text-xs text-orange-100">Lokasi</p>
                      <p className="text-sm sm:text-base font-bold text-white">Jakarta, Indonesia</p>
                    </div>
                  </motion.div>
                </div>

                {/* CTA Button */}
                <motion.a
                  href="https://wa.me/6281234567890?text=Halo%20Dapur%20Nusantara!"
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ scale: 1.05, boxShadow: "0 15px 40px rgba(0,0,0,0.2)" }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 rounded-full bg-white px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-bold text-brand-700 shadow-lg transition hover:bg-orange-50"
                >
                  <span>💬</span>
                  {t.callNow}
                </motion.a>
              </motion.div>
            </div>
          </div>
        </motion.section>
      </main>

      {/* Floating WhatsApp Button */}
      <motion.a
        href="https://wa.me/6281234567890?text=Halo%20Dapur%20Nusantara!"
        target="_blank"
        rel="noreferrer"
        aria-label="whatsapp chat"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1, rotate: 10 }}
        whileTap={{ scale: 0.9 }}
        transition={{ delay: 0.5 }}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-green-400 to-green-600 text-2xl text-white shadow-2xl"
      >
        💬
      </motion.a>

      {/* Footer */}
      <motion.footer 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="border-t border-orange-100 dark:border-zinc-800 px-4 sm:px-6 py-8 sm:py-12 text-center"
      >
        <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mb-4">
          {t.footer}
        </p>
        <div className="flex items-center justify-center gap-2 text-xs text-zinc-500 dark:text-zinc-500">
          <span>© 2024 Dapur Nusantara</span>
          <span>•</span>
          <span>Made with ❤️ for Indonesia</span>
        </div>
      </motion.footer>
    </div>
  );
}

export default App;
