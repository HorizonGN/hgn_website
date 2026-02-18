"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { getAuthorName } from "@/lib/post-utils"
import { comments as t } from "@/lib/translations"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"

interface CommentWithProfile {
  id: string
  post_id: string
  user_id: string
  content: string
  created_at: string
  profiles: {
    first_name: string | null
    last_name: string | null
  } | null
}

export default function CommentSection({ postId }: { postId: string }) {
  const supabase = createClient()
  const [comments, setComments] = useState<CommentWithProfile[]>([])
  const [content, setContent] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [userId, setUserId] = useState<string | null>(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function init() {
      const { data: { user } } = await supabase.auth.getUser()
      setUserId(user?.id ?? null)

      if (user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("is_admin")
          .eq("id", user.id)
          .single()
        setIsAdmin(profile?.is_admin ?? false)
      }

      await fetchComments()
      setLoading(false)
    }
    init()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postId])

  async function fetchComments() {
    const { data } = await supabase
      .from("comments")
      .select("*, profiles:user_id(first_name, last_name)")
      .eq("post_id", postId)
      .order("created_at", { ascending: true })

    if (data) {
      setComments(data as CommentWithProfile[])
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!content.trim() || !userId) return

    setSubmitting(true)
    const { error } = await supabase.from("comments").insert({
      post_id: postId,
      user_id: userId,
      content: content.trim(),
    })

    if (!error) {
      setContent("")
      await fetchComments()
    }
    setSubmitting(false)
  }

  async function handleDelete(commentId: string) {
    if (!confirm(t.deleteConfirm.ko)) return

    const { error } = await supabase
      .from("comments")
      .delete()
      .eq("id", commentId)

    if (!error) {
      setComments((prev) => prev.filter((c) => c.id !== commentId))
    }
  }

  if (loading) return null

  return (
    <section className="mt-12 border-t pt-8">
      <h2 className="text-xl font-bold mb-6">{t.title.ko}</h2>

      {comments.length === 0 ? (
        <p className="text-muted-foreground mb-6">{t.empty.ko}</p>
      ) : (
        <ul className="space-y-4 mb-8">
          {comments.map((comment) => (
            <li key={comment.id} className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">
                    {getAuthorName(comment.profiles)}
                  </span>
                  <span>·</span>
                  <span>
                    {new Date(comment.created_at).toLocaleDateString("ko-KR")}
                  </span>
                </div>
                {(userId === comment.user_id || isAdmin) && (
                  <button
                    onClick={() => handleDelete(comment.id)}
                    className="text-muted-foreground hover:text-destructive transition-colors"
                    title={t.delete.ko}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
              <p className="whitespace-pre-wrap text-sm">{comment.content}</p>
            </li>
          ))}
        </ul>
      )}

      {userId ? (
        <form onSubmit={handleSubmit} className="space-y-3">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={t.placeholder.ko}
            rows={3}
            className="w-full rounded-lg border bg-background px-4 py-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring"
          />
          <div className="flex justify-end">
            <Button type="submit" disabled={submitting || !content.trim()}>
              {submitting ? t.submitting.ko : t.submit.ko}
            </Button>
          </div>
        </form>
      ) : (
        <p className="text-sm text-muted-foreground">{t.loginRequired.ko}</p>
      )}
    </section>
  )
}
