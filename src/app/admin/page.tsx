"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { createClient } from "@/lib/supabase/client"
import { ShieldAlert, CheckCircle, XCircle, Users, Clock } from "lucide-react"
import { useLanguage } from "@/context/LanguageContext"
import { admin as i18n } from "@/lib/translations"
import { useAuth } from "@/hooks/useAuth"
import type { Profile } from "@/types/database"

type Tab = "pending" | "all"

export default function AdminPage() {
  const router = useRouter()
  const { t } = useLanguage()
  const { user, isAdmin, loading: authLoading } = useAuth()
  const [activeTab, setActiveTab] = useState<Tab>("pending")
  const [pendingUsers, setPendingUsers] = useState<Profile[]>([])
  const [allUsers, setAllUsers] = useState<Profile[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (authLoading) return
    if (!user || !isAdmin) {
      setLoading(false)
      return
    }

    const fetchUsers = async () => {
      const supabase = createClient()

      const { data: pending } = await supabase
        .from("profiles")
        .select("*")
        .eq("is_approved", false)
        .order("created_at", { ascending: false })

      const { data: all } = await supabase
        .from("profiles")
        .select("*")
        .order("created_at", { ascending: false })

      setPendingUsers(pending ?? [])
      setAllUsers(all ?? [])
      setLoading(false)
    }

    fetchUsers()
  }, [authLoading, user, isAdmin])

  const handleApprove = async (userId: string) => {
    const supabase = createClient()
    const { error } = await supabase
      .from("profiles")
      .update({ is_approved: true })
      .eq("id", userId)

    if (!error) {
      setPendingUsers((prev) => prev.filter((u) => u.id !== userId))
      setAllUsers((prev) =>
        prev.map((u) => (u.id === userId ? { ...u, is_approved: true } : u))
      )
    }
  }

  const handleReject = async (userId: string) => {
    const supabase = createClient()
    const { error } = await supabase
      .from("profiles")
      .update({ is_approved: false })
      .eq("id", userId)

    if (!error) {
      setAllUsers((prev) =>
        prev.map((u) => (u.id === userId ? { ...u, is_approved: false } : u))
      )
    }
  }

  if (authLoading || loading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center py-16">
          <p className="text-muted-foreground">...</p>
        </div>
      </div>
    )
  }

  if (!user || !isAdmin) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <ShieldAlert className="w-16 h-16 text-red-500 mb-4" />
          <h2 className="text-2xl font-bold mb-2">{t(i18n.noAccess.ko, i18n.noAccess.en)}</h2>
        </div>
      </div>
    )
  }

  const displayName = (profile: Profile) => {
    if (profile.first_name || profile.last_name) {
      return `${profile.first_name ?? ""} ${profile.last_name ?? ""}`.trim()
    }
    return profile.email.split("@")[0]
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8">{t(i18n.title.ko, i18n.title.en)}</h1>

      <div className="flex gap-2 mb-8">
        <Button
          variant={activeTab === "pending" ? "default" : "outline"}
          onClick={() => setActiveTab("pending")}
          className="gap-2"
        >
          <Clock className="w-4 h-4" />
          {t(i18n.pendingUsers.ko, i18n.pendingUsers.en)}
          {pendingUsers.length > 0 && (
            <span className="ml-1 bg-red-500 text-white text-xs rounded-full px-2 py-0.5">
              {pendingUsers.length}
            </span>
          )}
        </Button>
        <Button
          variant={activeTab === "all" ? "default" : "outline"}
          onClick={() => setActiveTab("all")}
          className="gap-2"
        >
          <Users className="w-4 h-4" />
          {t(i18n.allUsers.ko, i18n.allUsers.en)}
        </Button>
      </div>

      {activeTab === "pending" && (
        <div className="space-y-4">
          {pendingUsers.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground">{t(i18n.noPendingUsers.ko, i18n.noPendingUsers.en)}</p>
            </div>
          ) : (
            pendingUsers.map((profile) => (
              <Card key={profile.id}>
                <CardContent className="pt-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="space-y-1">
                      <p className="font-semibold text-lg">{displayName(profile)}</p>
                      <p className="text-sm text-muted-foreground">{profile.email}</p>
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mt-2">
                        {profile.organization && (
                          <span>{t(i18n.organization.ko, i18n.organization.en)}: {profile.organization}</span>
                        )}
                        {profile.position && (
                          <span>{t(i18n.position.ko, i18n.position.en)}: {profile.position}</span>
                        )}
                        {profile.phone && (
                          <span>{t(i18n.phone.ko, i18n.phone.en)}: {profile.phone}</span>
                        )}
                        <span>{t(i18n.joinDate.ko, i18n.joinDate.en)}: {new Date(profile.created_at).toLocaleDateString("ko-KR")}</span>
                      </div>
                    </div>
                    <div className="flex gap-2 shrink-0">
                      <Button
                        size="sm"
                        onClick={() => handleApprove(profile.id)}
                        className="gap-1"
                      >
                        <CheckCircle className="w-4 h-4" />
                        {t(i18n.approve.ko, i18n.approve.en)}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      )}

      {activeTab === "all" && (
        <div className="space-y-4">
          {allUsers.map((profile) => (
            <Card key={profile.id}>
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-lg">{displayName(profile)}</p>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        profile.is_approved
                          ? "bg-green-100 text-green-700"
                          : "bg-amber-100 text-amber-700"
                      }`}>
                        {profile.is_approved
                          ? t(i18n.approved.ko, i18n.approved.en)
                          : t(i18n.pending.ko, i18n.pending.en)}
                      </span>
                      {profile.is_admin && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">
                          Admin
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{profile.email}</p>
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mt-2">
                      {profile.organization && (
                        <span>{t(i18n.organization.ko, i18n.organization.en)}: {profile.organization}</span>
                      )}
                      {profile.position && (
                        <span>{t(i18n.position.ko, i18n.position.en)}: {profile.position}</span>
                      )}
                      {profile.phone && (
                        <span>{t(i18n.phone.ko, i18n.phone.en)}: {profile.phone}</span>
                      )}
                      <span>{t(i18n.joinDate.ko, i18n.joinDate.en)}: {new Date(profile.created_at).toLocaleDateString("ko-KR")}</span>
                    </div>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    {!profile.is_approved ? (
                      <Button
                        size="sm"
                        onClick={() => handleApprove(profile.id)}
                        className="gap-1"
                      >
                        <CheckCircle className="w-4 h-4" />
                        {t(i18n.approve.ko, i18n.approve.en)}
                      </Button>
                    ) : !profile.is_admin ? (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleReject(profile.id)}
                        className="gap-1 text-amber-600"
                      >
                        <XCircle className="w-4 h-4" />
                        {t(i18n.revokeApproval.ko, i18n.revokeApproval.en)}
                      </Button>
                    ) : null}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
