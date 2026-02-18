"use client"

import Link from "next/link"
import { useLanguage } from "@/context/LanguageContext"
import { ArrowUpRight } from "lucide-react"
import { ministriesList } from "@/lib/ministries-data"

export default function MinistriesPage() {
  const { t } = useLanguage()

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 bg-gradient-to-br from-[oklch(0.18_0.05_245)] via-[oklch(0.22_0.07_245)] to-[oklch(0.16_0.05_245)] overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-64 h-64 bg-[oklch(0.52_0.20_12_/_0.2)] rounded-full blur-[100px]" />
        
        <div className="container mx-auto px-6 md:px-12 relative">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block text-[oklch(0.62_0.15_12)] text-sm font-semibold tracking-widest uppercase mb-4">
              Ministry
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              HGN MINISTRIES
            </h1>
            <p className="text-xl text-slate-400">
              {t("하나님의 사랑을 실천하는 다섯 가지 사역", "Five ministries practicing God's love")}
            </p>
          </div>
        </div>
      </section>

      {/* Ministries Grid */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ministriesList.map((ministry, i) => (
                <Link
                  href={`/ministries/${ministry.slug}`}
                  key={i}
                  className="group relative p-8 md:p-10 bg-slate-50 rounded-3xl border border-slate-200 hover:border-[oklch(0.32_0.10_245_/_0.3)] hover:shadow-xl hover:shadow-[oklch(0.32_0.10_245_/_0.08)] transition-all duration-500 overflow-hidden"
                >
                  {/* Hover overlay */}
                  <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-[oklch(0.32_0.10_245_/_0.08)] to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative">
                    <span className="text-5xl text-[oklch(0.52_0.20_12_/_0.4)] group-hover:text-[oklch(0.52_0.20_12)] transition-colors mb-6 block">
                      {ministry.icon}
                    </span>
                    <h2 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-[oklch(0.32_0.10_245)] transition-colors">
                      {ministry.title}
                    </h2>
                    <p className="text-slate-500 leading-relaxed mb-6">
                      {t(ministry.desc.ko, ministry.desc.en)}
                    </p>
                    <span className="inline-flex items-center gap-2 text-[oklch(0.32_0.10_245)] font-semibold group-hover:gap-3 transition-all">
                      {t("자세히 보기", "Learn more")}
                      <ArrowUpRight className="w-4 h-4" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
