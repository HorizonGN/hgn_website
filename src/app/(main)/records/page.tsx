"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/client"
import { PenLine, ShieldAlert } from "lucide-react"
import { useLanguage } from "@/context/LanguageContext"
import { records as i18n, auth as authI18n } from "@/lib/translations"
import { getAuthorName } from "@/lib/post-utils"
import type { Profile } from "@/types/database"
import type { User } from "@supabase/supabase-js"

interface RecordItem {
  id: string
  title: string
  content: string | null
  file_url: string | null
  author_id: string | null
  created_at: string
}

type AuthorMap = Record<string, Pick<Profile, "first_name" | "last_name">>

export default function RecordsPage() {
  const { t } = useLanguage()
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [records, setRecords] = useState<RecordItem[]>([])
  const [authors, setAuthors] = useState<AuthorMap>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const supabase = createClient()

    const init = async () => {
      const [{ data: { user } }, { data: records }] = await Promise.all([
        supabase.auth.getUser(),
        supabase
          .from("posts")
          .select("*")
          .eq("category", "records")
          .order("created_at", { ascending: false }),
      ])

      setUser(user)
      setRecords(records ?? [])

      if (user) {
        const { data } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single()
        setProfile(data)
      }

      // Fetch author profiles
      if (records && records.length > 0) {
        const authorIds = [...new Set(records.map((r) => r.author_id).filter(Boolean))] as string[]
        if (authorIds.length > 0) {
          const { data: profiles } = await supabase
            .from("profiles")
            .select("id, first_name, last_name")
            .in("id", authorIds)
          if (profiles) {
            const map: AuthorMap = {}
            for (const p of profiles) {
              map[p.id] = { first_name: p.first_name, last_name: p.last_name }
            }
            setAuthors(map)
          }
        }
      }

      setLoading(false)
    }

    init()
  }, [])

  const isApproved = profile?.is_approved ?? false

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center py-16">
          <p className="text-muted-foreground">...</p>
        </div>
      </div>
    )
  }

  if (!user || !isApproved) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <ShieldAlert className="w-16 h-16 text-amber-500 mb-4" />
          <h2 className="text-2xl font-bold mb-2">{t(authI18n.pendingApproval.ko, authI18n.pendingApproval.en)}</h2>
          <p className="text-muted-foreground max-w-md">
            {t(authI18n.pendingApprovalDesc.ko, authI18n.pendingApprovalDesc.en)}
          </p>
          {!user && (
            <Link href="/auth/login" className="mt-4">
              <Button>{t(authI18n.login.ko, authI18n.login.en)}</Button>
            </Link>
          )}
        </div>
      </div>
    )
  }

  const totalCount = records.length

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold">{t(i18n.title.ko, i18n.title.en)}</h1>
          <p className="text-muted-foreground mt-2">
            {t(i18n.subtitle.ko, i18n.subtitle.en)}
          </p>
        </div>
        <Link href="/records/write">
          <Button>
            <PenLine className="w-4 h-4 mr-2" />
            {t(i18n.register.ko, i18n.register.en)}
          </Button>
        </Link>
      </div>

      {records.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-muted-foreground">{t(i18n.empty.ko, i18n.empty.en)}</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b-2 border-foreground/20">
                <th className="hidden sm:table-cell py-3 px-4 text-left text-sm font-semibold w-16">
                  {t(i18n.number.ko, i18n.number.en)}
                </th>
                <th className="py-3 px-4 text-left text-sm font-semibold">
                  {t(i18n.titleLabel.ko, i18n.titleLabel.en)}
                </th>
                <th className="py-3 px-4 text-left text-sm font-semibold w-28">
                  {t(i18n.author.ko, i18n.author.en)}
                </th>
                <th className="py-3 px-4 text-left text-sm font-semibold w-28">
                  {t(i18n.date.ko, i18n.date.en)}
                </th>
              </tr>
            </thead>
            <tbody>
              {records.map((record, index) => (
                <tr
                  key={record.id}
                  className="border-b border-foreground/10 hover:bg-muted/50 transition-colors"
                >
                  <td className="hidden sm:table-cell py-3 px-4 text-sm text-muted-foreground">
                    {totalCount - index}
                  </td>
                  <td className="py-3 px-4">
                    <Link
                      href={`/records/${record.id}`}
                      className="text-sm font-medium hover:text-primary transition-colors"
                    >
                      {record.title}
                    </Link>
                  </td>
                  <td className="py-3 px-4 text-sm text-muted-foreground">
                    {record.author_id ? getAuthorName(authors[record.author_id]) : ""}
                  </td>
                  <td className="py-3 px-4 text-sm text-muted-foreground">
                    {new Date(record.created_at).toLocaleDateString("ko-KR")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
