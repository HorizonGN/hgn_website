"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"
import { records as i18n } from "@/lib/translations"
import { useLanguage } from "@/context/LanguageContext"

interface PostActionsProps {
  postId: string
  authorId: string | null
  redirectTo: string
}

export default function PostActions({ postId, authorId, redirectTo }: PostActionsProps) {
  const router = useRouter()
  const { t } = useLanguage()
  const [canDelete, setCanDelete] = useState(false)

  useEffect(() => {
    const supabase = createClient()

    async function checkPermission() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      if (user.id === authorId) {
        setCanDelete(true)
        return
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("is_admin")
        .eq("id", user.id)
        .single()

      if (profile?.is_admin) {
        setCanDelete(true)
      }
    }

    checkPermission()
  }, [authorId])

  async function handleDelete() {
    if (!confirm(t(i18n.deleteConfirm.ko, i18n.deleteConfirm.en))) return

    const supabase = createClient()
    const { error } = await supabase
      .from("posts")
      .delete()
      .eq("id", postId)

    if (!error) {
      router.push(redirectTo)
      router.refresh()
    }
  }

  if (!canDelete) return null

  return (
    <Button variant="outline" size="sm" onClick={handleDelete} className="text-destructive hover:text-destructive">
      <Trash2 className="w-4 h-4 mr-2" />
      {t(i18n.delete.ko, i18n.delete.en)}
    </Button>
  )
}
