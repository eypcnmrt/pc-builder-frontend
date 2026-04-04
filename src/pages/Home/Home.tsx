import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useHome } from "../../hooks/useHome";

const FEATURES = [
  {
    icon: "🔌",
    title: "Uyumluluk Kontrolü",
    desc: "CPU socket, RAM tipi, kasa boyutu — her bileşeni seçerken anında uyumluluk bildirimi alırsın.",
  },
  {
    icon: "💰",
    title: "Fiyat Takibi",
    desc: "Seçtiğin bileşenlerin toplam fiyatı ve bütçe durumunu gerçek zamanlı takip et.",
  },
  {
    icon: "⚡",
    title: "Kolay Yapılandırma",
    desc: "8 adımlı rehberli kurulum sihirbazıyla dilediğin PC'yi dakikalar içinde oluştur.",
  },
];

const Home = () => {
  const { isAuthenticated } = useHome();

  return (
    <>
      <Helmet>
        <title>PC Builder — Kendi Bilgisayarını Yap</title>
        <meta name="description" content="PC bileşenlerini uyumluluk kontrolüyle yapılandır. İşlemci, anakart, RAM, GPU ve daha fazlası." />
        <meta property="og:title" content="PC Builder — Kendi Bilgisayarını Yap" />
        <meta property="og:description" content="PC bileşenlerini uyumluluk kontrolüyle yapılandır." />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "PC Builder",
          "applicationCategory": "UtilitiesApplication",
          "description": "PC bileşenlerini uyumluluk kontrolüyle yapılandır",
          "operatingSystem": "Web",
        })}</script>
      </Helmet>

      {/* Hero */}
      <section className="py-16 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
          Kendi Bilgisayarını <span className="text-blue-600">Kolayca Yap</span>
        </h1>
        <p className="text-lg text-slate-600 mb-8 max-w-xl mx-auto">
          İşlemciden kasaya her bileşeni uyumluluk kontrolüyle seç. Bütçeni aşma, anında öneri al.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          {isAuthenticated ? (
            <>
              <Link
                to="/build"
                className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors text-sm"
              >
                Yapılandırmaya Devam Et
              </Link>
              <Link
                to="/dashboard"
                className="px-6 py-3 bg-white text-slate-700 font-semibold rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors text-sm"
              >
                Build'imi Görüntüle
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/register"
                className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors text-sm"
              >
                Ücretsiz Başla
              </Link>
              <Link
                to="/login"
                className="px-6 py-3 bg-white text-slate-700 font-semibold rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors text-sm"
              >
                Giriş Yap
              </Link>
            </>
          )}
        </div>
      </section>

      {/* Özellik Kartları */}
      <section className="py-8">
        <div className="grid sm:grid-cols-3 gap-6">
          {FEATURES.map((f) => (
            <article key={f.title} className="bg-white rounded-xl border border-slate-200 p-6">
              <span className="text-3xl mb-3 block">{f.icon}</span>
              <h2 className="text-base font-semibold text-slate-900 mb-2">{f.title}</h2>
              <p className="text-sm text-slate-600 leading-relaxed">{f.desc}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
};

export default Home;
