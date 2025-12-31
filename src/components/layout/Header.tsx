"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { createClient } from "@/lib/supabase/client"
import { Menu, User, LogOut, ChevronDown } from "lucide-react"
import type { User as SupabaseUser } from "@supabase/supabase-js"
import { useLanguage } from "@/context/LanguageContext"
import { nav } from "@/lib/translations"

const navItems = [
  { href: "/about", labelKey: "about" as const },
  { href: "/ministries", labelKey: "ministries" as const },
  { href: "/newsletter", labelKey: "newsletter" as const },
  { href: "/records", labelKey: "records" as const },
  { href: "/contact", labelKey: "contact" as const },
]

export default function Header() {
  const pathname = usePathname()
  const router = useRouter()
  const [user, setUser] = useState<SupabaseUser | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { language, toggleLanguage, t } = useLanguage()

  const isHomePage = pathname === "/"

  useEffect(() => {
    const supabase = createClient()
    
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push("/")
    router.refresh()
  }

  const isActive = (href: string) => {
    return pathname === href || pathname.startsWith(href + "/")
  }

  const headerBg = isScrolled 
    ? "bg-white/80 backdrop-blur-xl border-b border-slate-200/50 shadow-sm" 
    : isHomePage 
      ? "bg-transparent" 
      : "bg-white border-b border-slate-100"
  
  const logoColor = isScrolled || !isHomePage ? "text-[oklch(0.22_0.06_250)]" : "text-white"
  const navColor = isScrolled || !isHomePage ? "text-slate-600 hover:text-slate-900" : "text-white/80 hover:text-white"
  const activeNavColor = isScrolled || !isHomePage ? "text-[oklch(0.32_0.08_250)] bg-[oklch(0.32_0.08_250_/_0.08)]" : "text-white bg-white/10"

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${headerBg}`}>
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex h-16 md:h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <span className={`text-2xl font-bold tracking-tight transition-colors ${logoColor}`}>
              HGN
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 ${
                  isActive(item.href)
                    ? activeNavColor
                    : navColor
                }`}
              >
                {t(nav[item.labelKey].ko, nav[item.labelKey].en)}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className={`px-3 py-1.5 text-sm font-semibold rounded-full border transition-all duration-200 ${
                isScrolled || !isHomePage
                  ? "border-slate-200 text-slate-600 hover:border-[oklch(0.52_0.2_20)] hover:text-[oklch(0.52_0.2_20)]"
                  : "border-white/30 text-white/90 hover:bg-white/10"
              }`}
            >
              {language === "ko" ? "한" : "EN"}
            </button>

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    className={`gap-2 rounded-full ${
                      isScrolled || !isHomePage ? "" : "text-white hover:bg-white/10"
                    }`}
                  >
                    <div className="w-8 h-8 rounded-full bg-[oklch(0.32_0.08_250_/_0.1)] flex items-center justify-center">
                      <User className="w-4 h-4 text-[oklch(0.32_0.08_250)]" />
                    </div>
                    <span className="max-w-[100px] truncate text-sm font-medium">
                      {user.email?.split("@")[0]}
                    </span>
                    <ChevronDown className="w-3 h-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 rounded-xl p-2">
                  <DropdownMenuItem className="text-muted-foreground text-xs rounded-lg">
                    {user.email}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-[oklch(0.52_0.2_20)] rounded-lg">
                    <LogOut className="w-4 h-4 mr-2" />
                    {t(nav.logout.ko, nav.logout.en)}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center gap-2">
                <Link href="/auth/login">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className={`rounded-full font-medium ${
                      isScrolled || !isHomePage ? "" : "text-white hover:bg-white/10"
                    }`}
                  >
                    {t(nav.login.ko, nav.login.en)}
                  </Button>
                </Link>
                <Link href="/auth/signup">
                  <Button 
                    size="sm" 
                    className="rounded-full bg-[oklch(0.32_0.08_250)] hover:bg-[oklch(0.28_0.08_250)] font-medium"
                  >
                    {t(nav.signup.ko, nav.signup.en)}
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={toggleLanguage}
              className={`px-2.5 py-1 text-sm font-semibold rounded-full border transition-all ${
                isScrolled || !isHomePage
                  ? "border-slate-200 text-slate-600"
                  : "border-white/30 text-white"
              }`}
            >
              {language === "ko" ? "한" : "EN"}
            </button>

            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className={`rounded-full ${
                    isScrolled || !isHomePage ? "" : "text-white hover:bg-white/10"
                  }`}
                >
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">{t(nav.openMenu.ko, nav.openMenu.en)}</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] p-0">
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                <div className="flex flex-col h-full">
                  <div className="p-6 border-b">
                    <span className="text-2xl font-bold text-[oklch(0.22_0.06_250)]">
                      HGN
                    </span>
                  </div>

                  <nav className="flex-1 p-6">
                    <div className="flex flex-col gap-1">
                      {navItems.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setIsOpen(false)}
                          className={`px-4 py-3.5 text-base font-medium rounded-xl transition-colors ${
                            isActive(item.href)
                              ? "text-[oklch(0.32_0.08_250)] bg-[oklch(0.32_0.08_250_/_0.08)]"
                              : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                          }`}
                        >
                          {t(nav[item.labelKey].ko, nav[item.labelKey].en)}
                        </Link>
                      ))}
                    </div>
                  </nav>

                  <div className="p-6 border-t bg-slate-50">
                    {user ? (
                      <div className="space-y-3">
                        <p className="px-4 text-sm text-muted-foreground truncate">
                          {user.email}
                        </p>
                        <Button
                          variant="outline"
                          className="w-full rounded-xl"
                          onClick={() => {
                            handleLogout()
                            setIsOpen(false)
                          }}
                        >
                          <LogOut className="w-4 h-4 mr-2" />
                          {t(nav.logout.ko, nav.logout.en)}
                        </Button>
                      </div>
                    ) : (
                      <div className="flex flex-col gap-2">
                        <Link href="/auth/login" onClick={() => setIsOpen(false)}>
                          <Button variant="outline" className="w-full rounded-xl">
                            {t(nav.login.ko, nav.login.en)}
                          </Button>
                        </Link>
                        <Link href="/auth/signup" onClick={() => setIsOpen(false)}>
                          <Button className="w-full rounded-xl bg-[oklch(0.32_0.08_250)] hover:bg-[oklch(0.28_0.08_250)]">
                            {t(nav.signup.ko, nav.signup.en)}
                          </Button>
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
