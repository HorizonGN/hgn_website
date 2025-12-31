"use client"

import Link from "next/link"
import { useLanguage } from "@/context/LanguageContext"
import { ArrowUpRight, ExternalLink } from "lucide-react"

export default function HomePage() {
  const { t } = useLanguage()

  // Partner organizations placeholder data
  const partners = [
    { name: "Partner 1", logo: null, url: "#" },
    { name: "Partner 2", logo: null, url: "#" },
    { name: "Partner 3", logo: null, url: "#" },
    { name: "Partner 4", logo: null, url: "#" },
    { name: "Partner 5", logo: null, url: "#" },
    { name: "Partner 6", logo: null, url: "#" },
    { name: "Partner 7", logo: null, url: "#" },
    { name: "Partner 8", logo: null, url: "#" },
    { name: "Partner 9", logo: null, url: "#" },
    { name: "Partner 10", logo: null, url: "#" },
    { name: "Partner 11", logo: null, url: "#" },
    { name: "Partner 12", logo: null, url: "#" },
  ]

  return (
    <div className="flex flex-col">
      {/* Hero Section - Full Screen */}
      <section className="relative min-h-screen -mt-16 md:-mt-20 pt-16 md:pt-20 flex items-center justify-center overflow-hidden bg-gradient-to-br from-[oklch(0.18_0.04_250)] via-[oklch(0.22_0.06_250)] to-[oklch(0.16_0.04_250)]">
        {/* Animated gradient orbs */}
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-[oklch(0.32_0.08_250_/_0.4)] rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-[oklch(0.52_0.2_20_/_0.2)] rounded-full blur-[100px] animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[oklch(0.32_0.08_250_/_0.15)] rounded-full blur-[150px]" />
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />

        {/* Content */}
        <div className="relative z-10 container mx-auto px-6 md:px-12">
          <div className="max-w-5xl mx-auto text-center">
            {/* Main Title */}
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-bold tracking-tight leading-[1.05] mb-8 opacity-0 animate-fade-up">
              <span className="text-white">
                Let's run to The
              </span>
              <br />
              <span className="bg-gradient-to-r from-[oklch(0.65_0.15_20)] via-[oklch(0.58_0.18_20)] to-[oklch(0.52_0.2_20)] bg-clip-text text-transparent">
                HORIZON
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed opacity-0 animate-fade-up animation-delay-200">
              The unity of all people in Jesus Christ (Eph 1:10)
            </p>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
          <div className="w-6 h-10 rounded-full border-2 border-white/20 flex justify-center pt-2">
            <div className="w-1 h-2 bg-white/60 rounded-full animate-bounce" />
          </div>
        </div>
      </section>

      {/* HGN Group Section */}
      <section className="py-24 md:py-32 bg-white">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block text-[oklch(0.52_0.2_20)] text-sm font-semibold tracking-widest uppercase mb-4">
              Global Network
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-12">
              HGN Group
            </h2>

            {/* HGN Group Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6">
              <Link
                href="/about"
                className="group w-full sm:w-auto px-10 py-5 bg-[oklch(0.32_0.08_250)] text-white font-semibold rounded-2xl hover:bg-[oklch(0.28_0.08_250)] transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-[oklch(0.32_0.08_250_/_0.25)] flex items-center justify-center gap-3"
              >
                <span className="text-lg">HGN US</span>
                <ArrowUpRight className="w-4 h-4 opacity-60 group-hover:opacity-100 transition-opacity" />
              </Link>
              <Link
                href="#"
                className="group w-full sm:w-auto px-10 py-5 bg-[oklch(0.32_0.08_250)] text-white font-semibold rounded-2xl hover:bg-[oklch(0.28_0.08_250)] transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-[oklch(0.32_0.08_250_/_0.25)] flex items-center justify-center gap-3"
              >
                <span className="text-lg">HGN KOREA</span>
                <ExternalLink className="w-4 h-4 opacity-60 group-hover:opacity-100 transition-opacity" />
              </Link>
              <Link
                href="#"
                className="group w-full sm:w-auto px-10 py-5 bg-[oklch(0.32_0.08_250)] text-white font-semibold rounded-2xl hover:bg-[oklch(0.28_0.08_250)] transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-[oklch(0.32_0.08_250_/_0.25)] flex items-center justify-center gap-3"
              >
                <span className="text-lg">HGN HTI</span>
                <ExternalLink className="w-4 h-4 opacity-60 group-hover:opacity-100 transition-opacity" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Partner Organizations Section */}
      <section className="py-24 md:py-32 bg-slate-50">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <span className="inline-block text-[oklch(0.32_0.08_250)] text-sm font-semibold tracking-widest uppercase mb-4">
                Partners
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                {t("협력 단체", "Partner Organizations")}
              </h2>
              <p className="text-lg text-slate-500">
                {t("함께 사역하는 단체들입니다", "Organizations we work with")}
              </p>
            </div>

            {/* Partner Logo Grid - 3 columns x 4 rows = 12 items */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {partners.map((partner, i) => (
                <Link
                  key={i}
                  href={partner.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group aspect-[3/2] bg-white rounded-2xl border border-slate-200 hover:border-[oklch(0.32_0.08_250_/_0.3)] hover:shadow-lg transition-all duration-300 flex items-center justify-center p-6 relative overflow-hidden"
                >
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-[oklch(0.32_0.08_250_/_0.03)] opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  {partner.logo ? (
                    // If logo exists, display it
                    <img 
                      src={partner.logo} 
                      alt={partner.name}
                      className="max-w-full max-h-full object-contain"
                    />
                  ) : (
                    // Placeholder
                    <div className="text-center relative z-10">
                      <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-slate-100 group-hover:bg-[oklch(0.32_0.08_250_/_0.1)] transition-colors flex items-center justify-center">
                        <span className="text-slate-400 group-hover:text-[oklch(0.32_0.08_250)] text-lg font-bold transition-colors">
                          {i + 1}
                        </span>
                      </div>
                      <p className="text-sm text-slate-400 group-hover:text-slate-600 transition-colors">
                        {partner.name}
                      </p>
                    </div>
                  )}

                  {/* External link icon */}
                  <ExternalLink className="absolute top-3 right-3 w-4 h-4 text-slate-300 group-hover:text-[oklch(0.32_0.08_250)] opacity-0 group-hover:opacity-100 transition-all" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Ministry Section */}
      <section className="py-24 md:py-32 bg-white">
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <span className="inline-block text-[oklch(0.52_0.2_20)] text-sm font-semibold tracking-widest uppercase mb-4">
              Ministry
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900">
              HGN MINISTRIES
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              { 
                title: "Christian Education", 
                desc: { ko: "성경적 교육을 통한 신앙 성장", en: "Faith growth through biblical education" },
                icon: "◇",
                slug: "christian-education"
              },
              { 
                title: "Expository Preaching Ministries", 
                desc: { ko: "말씀 강해를 통한 복음 전파", en: "Spreading the gospel through expository preaching" },
                icon: "□",
                slug: "expository-preaching"
              },
              { 
                title: "International Public Health", 
                desc: { ko: "글로벌 공중보건 사역", en: "Global public health ministry" },
                icon: "○",
                slug: "international-public-health"
              },
              { 
                title: "Love Foundation", 
                desc: { ko: "사랑의 나눔과 섬김", en: "Sharing and serving with love" },
                icon: "♡",
                slug: "love-foundation"
              },
              { 
                title: "Worship Arts", 
                desc: { ko: "예술을 통한 예배와 찬양", en: "Worship and praise through the arts" },
                icon: "△",
                slug: "worship-arts"
              },
            ].map((item, i) => (
              <Link
                href={`/ministries/${item.slug}`}
                key={i}
                className="group relative p-8 bg-slate-50 rounded-3xl border border-slate-200 hover:border-[oklch(0.32_0.08_250_/_0.3)] hover:shadow-xl hover:shadow-[oklch(0.32_0.08_250_/_0.08)] transition-all duration-500 cursor-pointer overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[oklch(0.32_0.08_250_/_0.08)] to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative">
                  <span className="text-4xl text-[oklch(0.52_0.2_20_/_0.4)] group-hover:text-[oklch(0.52_0.2_20)] transition-colors mb-6 block">
                    {item.icon}
                  </span>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-slate-500 leading-relaxed">
                    {t(item.desc.ko, item.desc.en)}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link 
              href="/ministries"
              className="inline-flex items-center gap-2 text-[oklch(0.32_0.08_250)] font-semibold hover:gap-3 transition-all"
            >
              {t("사역 자세히 보기", "View all ministries")}
              <ArrowUpRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
