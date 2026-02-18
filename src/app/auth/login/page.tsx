"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { createClient } from "@/lib/supabase/client"
import { useLanguage } from "@/context/LanguageContext"
import { auth as i18n } from "@/lib/translations"

export default function LoginPage() {
  const router = useRouter()
  const { t } = useLanguage()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const supabase = createClient()
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        setError(t(i18n.loginError.ko, i18n.loginError.en))
        return
      }

      router.push("/")
      router.refresh()
    } catch {
      setError(t(i18n.loginGeneralError.ko, i18n.loginGeneralError.en))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">{t(i18n.login.ko, i18n.login.en)}</CardTitle>
          <CardDescription>
            {t(i18n.loginDesc.ko, i18n.loginDesc.en)}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <div className="p-3 text-sm text-red-600 bg-red-50 rounded-md">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">{t(i18n.email.ko, i18n.email.en)}</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@email.com"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">{t(i18n.password.ko, i18n.password.en)}</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={t(i18n.passwordPlaceholder.ko, i18n.passwordPlaceholder.en)}
                required
              />
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? t(i18n.loggingIn.ko, i18n.loggingIn.en) : t(i18n.login.ko, i18n.login.en)}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm">
            <span className="text-muted-foreground">{t(i18n.noAccount.ko, i18n.noAccount.en)} </span>
            <Link href="/auth/signup" className="text-primary hover:underline">
              {t(i18n.signup.ko, i18n.signup.en)}
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
