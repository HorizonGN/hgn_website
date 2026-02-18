"use client"

import Link from "next/link"
import { useLanguage } from "@/context/LanguageContext"
import { nav, footer, common } from "@/lib/translations"
import { ArrowUpRight } from "lucide-react"

export default function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="bg-[oklch(0.16_0.05_245)] text-white">
      <div className="container mx-auto px-6 md:px-12 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-6">
              <span className="text-3xl font-bold">HGN</span>
            </Link>
            <p className="text-slate-500 text-sm mb-2 mt-4">
              Horizon Global Network
            </p>
            <p className="text-[oklch(0.62_0.15_12)] text-sm font-medium">
              The unity of all people in Jesus Christ
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-6">
              {t(footer.quickLinks.ko, footer.quickLinks.en)}
            </h4>
            <ul className="space-y-4">
              {[
                { href: "/about", label: nav.about },
                { href: "/ministries", label: nav.ministries },
                { href: "/newsletter", label: nav.newsletter },
                { href: "/records", label: nav.records },
              ].map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href} 
                    className="group inline-flex items-center gap-1 text-slate-300 hover:text-white transition-colors"
                  >
                    {t(link.label.ko, link.label.en)}
                    <ArrowUpRight className="w-4 h-4 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-6">
              {t(footer.contactInfo.ko, footer.contactInfo.en)}
            </h4>
            <ul className="space-y-4 text-slate-300">
              <li className="text-sm">
                Lynchburg, Virginia
              </li>
              <li>
                <a href="mailto:office.hgn@gmail.com" className="hover:text-white transition-colors">
                  office.hgn@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-slate-800 mt-16 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} Horizon Global Network. {t(footer.allRightsReserved.ko, footer.allRightsReserved.en)}
          </p>
          <div className="flex items-center gap-6">
            <span className="text-sm text-slate-500">
              {t(common.privacyPolicy.ko, common.privacyPolicy.en)}
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
