"use client"

import { useLanguage } from "@/context/LanguageContext"

export default function AboutPage() {
  const { t } = useLanguage()

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 bg-gradient-to-br from-[oklch(0.18_0.04_250)] via-[oklch(0.22_0.06_250)] to-[oklch(0.16_0.04_250)] overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-64 h-64 bg-[oklch(0.32_0.08_250_/_0.3)] rounded-full blur-[100px]" />
        
        <div className="container mx-auto px-6 md:px-12 relative">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block text-[oklch(0.62_0.15_20)] text-sm font-semibold tracking-widest uppercase mb-4">
              About Us
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              {t("단체 소개", "About HGN")}
            </h1>
            <p className="text-xl text-slate-400">
              Let's run to The Horizon
            </p>
          </div>
        </div>
      </section>

      {/* Welcome to HGN */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Image */}
              <div className="relative">
                <div className="aspect-[4/5] rounded-3xl bg-gradient-to-br from-slate-100 to-slate-200 overflow-hidden">
                  <div className="w-full h-full flex items-center justify-center text-slate-400">
                    <div className="text-center">
                      <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-slate-300" />
                      <p className="text-sm">Representative Photo</p>
                    </div>
                  </div>
                </div>
                {/* Decorative element */}
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[oklch(0.52_0.2_20_/_0.15)] rounded-3xl -z-10" />
              </div>

              {/* Content */}
              <div>
                <span className="inline-block text-[oklch(0.32_0.08_250)] text-sm font-semibold tracking-widest uppercase mb-4">
                  Welcome to HGN
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                  Dear Partners in Christ,
                </h2>
                <div className="prose prose-lg prose-slate">
                  <p className="text-slate-600 leading-relaxed mb-4">
                    Greetings in the name of our Savior Jesus Christ!
                  </p>
                  <p className="text-slate-600 leading-relaxed mb-4">
                    It is my privilege to introduce Horizon Global Network (HGN).
                  </p>
                  <p className="text-slate-600 leading-relaxed mb-4">
                    HGN stands on <span className="font-semibold text-slate-800">Ephesians 1:10</span>, which states: <em>"…to bring everything together in the Messiah, both things in heaven and things on earth in Him."</em> The name Horizon is born out of the verse.
                  </p>
                  <p className="text-slate-600 leading-relaxed mb-4">
                    We do not have to look far to find out that the world needs redemption. Even the things of nature suffer in sickness and death; we also groan to be released from pain and suffering. But there is good news!
                  </p>
                  <p className="text-slate-600 leading-relaxed mb-4">
                    <span className="font-semibold text-slate-800">The Savior who died on the cross for the sins of the world and rose again on the third day is coming back!</span>
                  </p>
                  <p className="text-slate-600 leading-relaxed mb-4">
                    We long for the day when He reigns at The Horizon; our hearts beat for the day when all people, all creation gather together and shout praises to Him from the deepest part of our beings.
                  </p>
                  <p className="text-slate-600 leading-relaxed mb-4">
                    I am honored to trek together to The Horizon with dedicated Board members, respected Development Committee members, faithful Horizon Friends, kind Cooperating Organizations, and many others who share the same heart for the Kingdom of God.
                  </p>
                  <p className="text-slate-600 leading-relaxed mb-6">
                    There are many works to accomplish and many people to serve with the love of God. Please join us in this race. I trust and pray that God may make us blessings to all who need Him.
                  </p>
                  <p className="text-xl font-bold text-[oklch(0.52_0.2_20)]">
                    Let's run to The Horizon!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-20 md:py-28 bg-slate-50">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <span className="inline-block text-[oklch(0.52_0.2_20)] text-sm font-semibold tracking-widest uppercase mb-4">
                {t("비전", "Vision")}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
                {t("우리의 비전", "Our Vision")}
              </h2>
            </div>

            <div className="bg-white rounded-3xl p-8 md:p-12 border border-slate-200 shadow-sm">
              <blockquote className="text-center">
                <p className="text-xl md:text-2xl text-slate-700 leading-relaxed mb-6 italic">
                  "…to bring everything together in the Messiah, both things in heaven and things on earth in Him."
                </p>
                <cite className="text-[oklch(0.32_0.08_250)] font-semibold">— Ephesians 1:10</cite>
              </blockquote>
            </div>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl p-8 border border-slate-200">
                <h3 className="text-xl font-bold text-slate-900 mb-4">
                  {t("사명", "Mission")}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {t(
                    "예수 그리스도 안에서 모든 사람들이 하나 되는 그 날을 향해 달려가며, 하나님의 사랑으로 섬기고 복음을 전파합니다.",
                    "Running toward the day when all people are united in Jesus Christ, serving with God's love and spreading the Gospel."
                  )}
                </p>
              </div>
              <div className="bg-white rounded-2xl p-8 border border-slate-200">
                <h3 className="text-xl font-bold text-slate-900 mb-4">
                  {t("핵심 가치", "Core Values")}
                </h3>
                <ul className="text-slate-600 space-y-2">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[oklch(0.52_0.2_20)]" />
                    {t("말씀 중심", "Word-centered")}
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[oklch(0.52_0.2_20)]" />
                    {t("글로벌 사역", "Global outreach")}
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[oklch(0.52_0.2_20)]" />
                    {t("섬김과 나눔", "Service & sharing")}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* History Section */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <span className="inline-block text-[oklch(0.32_0.08_250)] text-sm font-semibold tracking-widest uppercase mb-4">
                {t("연혁", "History")}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
                {t("우리의 여정", "Our Journey")}
              </h2>
            </div>

            <div className="space-y-8">
              {[
                { year: "2020", event: { ko: "Horizon Global Network 설립", en: "Horizon Global Network Founded" } },
                { year: "2021", event: { ko: "첫 선교 사역 시작", en: "First Mission Ministry Launched" } },
                { year: "2023", event: { ko: "글로벌 사역 확장", en: "Global Ministry Expansion" } },
              ].map((item, i) => (
                <div 
                  key={i}
                  className="flex gap-6 md:gap-8 items-start group"
                >
                  <div className="flex-shrink-0 w-20 md:w-24">
                    <span className="text-2xl md:text-3xl font-bold text-[oklch(0.32_0.08_250)] group-hover:text-[oklch(0.52_0.2_20)] transition-colors">
                      {item.year}
                    </span>
                  </div>
                  <div className="flex-1 pb-8 border-b border-slate-100 group-last:border-0">
                    <p className="text-lg text-slate-700">
                      {t(item.event.ko, item.event.en)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
