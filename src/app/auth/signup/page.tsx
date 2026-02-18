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

export default function SignupPage() {
  const router = useRouter()
  const { t } = useLanguage()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [organization, setOrganization] = useState("")
  const [position, setPosition] = useState("")
  const [phone, setPhone] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    if (password !== confirmPassword) {
      setError(t(i18n.passwordMismatch.ko, i18n.passwordMismatch.en))
      setIsLoading(false)
      return
    }

    if (password.length < 6) {
      setError(t(i18n.passwordTooShort.ko, i18n.passwordTooShort.en))
      setIsLoading(false)
      return
    }

    try {
      const supabase = createClient()
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      })

      if (error) {
        if (error.message.includes("already registered")) {
          setError(t(i18n.alreadyRegistered.ko, i18n.alreadyRegistered.en))
        } else {
          setError(t(i18n.signupError.ko, i18n.signupError.en))
        }
        return
      }

      if (data.user) {
        await supabase.from("profiles").upsert({
          id: data.user.id,
          email,
          first_name: firstName,
          last_name: lastName,
          organization: organization || null,
          position: position || null,
          phone: phone || null,
          is_admin: false,
          is_approved: false,
        })
      }

      setSuccess(true)
    } catch {
      setError(t(i18n.signupError.ko, i18n.signupError.en))
    } finally {
      setIsLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-[calc(100vh-200px)] flex items-center justify-center px-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">{t(i18n.checkEmail.ko, i18n.checkEmail.en)}</CardTitle>
            <CardDescription>
              {email}{t(i18n.checkEmailDesc.ko, i18n.checkEmailDesc.en)}
            </CardDescription>
            <CardDescription className="mt-2 text-amber-600 font-medium">
              {t(i18n.signupSuccessDesc.ko, i18n.signupSuccessDesc.en)}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/auth/login">
              <Button className="w-full">{t(i18n.goToLogin.ko, i18n.goToLogin.en)}</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center px-4 py-8">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">{t(i18n.signup.ko, i18n.signup.en)}</CardTitle>
          <CardDescription>
            {t(i18n.signupDesc.ko, i18n.signupDesc.en)}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignup} className="space-y-4">
            {error && (
              <div className="p-3 text-sm text-red-600 bg-red-50 rounded-md">
                {error}
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">{t(i18n.firstName.ko, i18n.firstName.en)} *</Label>
                <Input
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder={t(i18n.firstNamePlaceholder.ko, i18n.firstNamePlaceholder.en)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">{t(i18n.lastName.ko, i18n.lastName.en)} *</Label>
                <Input
                  id="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder={t(i18n.lastNamePlaceholder.ko, i18n.lastNamePlaceholder.en)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">{t(i18n.email.ko, i18n.email.en)} *</Label>
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
              <Label htmlFor="password">{t(i18n.password.ko, i18n.password.en)} *</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={t(i18n.passwordMinLength.ko, i18n.passwordMinLength.en)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">{t(i18n.confirmPassword.ko, i18n.confirmPassword.en)} *</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder={t(i18n.confirmPasswordPlaceholder.ko, i18n.confirmPasswordPlaceholder.en)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="organization">{t(i18n.organization.ko, i18n.organization.en)}</Label>
              <Input
                id="organization"
                value={organization}
                onChange={(e) => setOrganization(e.target.value)}
                placeholder={t(i18n.organizationPlaceholder.ko, i18n.organizationPlaceholder.en)}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="position">{t(i18n.position.ko, i18n.position.en)}</Label>
                <Input
                  id="position"
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                  placeholder={t(i18n.positionPlaceholder.ko, i18n.positionPlaceholder.en)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">{t(i18n.phone.ko, i18n.phone.en)}</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder={t(i18n.phonePlaceholder.ko, i18n.phonePlaceholder.en)}
                />
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? t(i18n.signingUp.ko, i18n.signingUp.en) : t(i18n.signup.ko, i18n.signup.en)}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm">
            <span className="text-muted-foreground">{t(i18n.hasAccount.ko, i18n.hasAccount.en)} </span>
            <Link href="/auth/login" className="text-primary hover:underline">
              {t(i18n.login.ko, i18n.login.en)}
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
