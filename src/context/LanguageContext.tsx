"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"

type Language = "ko" | "en"

interface LanguageContextType {
  language: Language
  toggleLanguage: () => void
  t: (ko: string, en: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("ko")

  // Load language preference from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("language") as Language
    if (saved === "ko" || saved === "en") {
      setLanguage(saved)
    }
  }, [])

  // Save language preference to localStorage
  useEffect(() => {
    localStorage.setItem("language", language)
  }, [language])

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "ko" ? "en" : "ko"))
  }

  // Translation helper function
  const t = (ko: string, en: string): string => {
    return language === "ko" ? ko : en
  }

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}



