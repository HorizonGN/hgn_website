"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { createClient } from "@/lib/supabase/client"
import { PenLine, ShieldAlert, List, LayoutGrid, ImageIcon } from "lucide-react"
import { useLanguage } from "@/context/LanguageContext"
import { newsletter as i18n, auth as authI18n } from "@/lib/translations"
import { isImageUrl, extractYoutubeId, getAuthorName } from "@/lib/post-utils"
import type { Profile } from "@/types/database"
import type { User } from "@supabase/supabase-js"

interface PostItem {
  id: string
  title: string
  content: string | null
  file_url: string | null
  youtube_url: string | null
  author_id: string | null
  created_at: string
}

type AuthorMap = Record<string, Pick<Profile, "first_name" | "last_name">>

function getThumbnail(post: PostItem): string | null {
  if (post.file_url && isImageUrl(post.file_url)) {
    return post.file_url
  }
  if (post.youtube_url) {
    const videoId = extractYoutubeId(post.youtube_url)
    if (videoId) {
      return `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`
    }
  }
  return null
}

export default function NewsletterPage() {
  const { t } = useLanguage()
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [posts, setPosts] = useState<PostItem[]>([])
  const [authors, setAuthors] = useState<AuthorMap>({})
  const [loading, setLoading] = useState(true)
  const [viewMode, setViewMode] = useState<"list" | "grid">("list")

  useEffect(() => {
    const supabase = createClient()

    const init = async () => {
      const [{ data: { user } }, { data: posts }] = await Promise.all([
        supabase.auth.getUser(),
        supabase
          .from("posts")
          .select("*")
          .eq("category", "newsletter")
          .order("created_at", { ascending: false }),
      ])

      setUser(user)
      setPosts(posts ?? [])

      if (user) {
        const { data } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single()
        setProfile(data)
      }

      // Fetch author profiles
      if (posts && posts.length > 0) {
        const authorIds = [...new Set(posts.map((p) => p.author_id).filter(Boolean))] as string[]
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

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold">{t(i18n.title.ko, i18n.title.en)}</h1>
          <p className="text-muted-foreground mt-2">{t(i18n.subtitle.ko, i18n.subtitle.en)}</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex border rounded-md overflow-hidden">
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 ${viewMode === "list" ? "bg-primary text-primary-foreground" : "bg-background hover:bg-muted"}`}
              title={t(i18n.listView.ko, i18n.listView.en)}
            >
              <List className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 ${viewMode === "grid" ? "bg-primary text-primary-foreground" : "bg-background hover:bg-muted"}`}
              title={t(i18n.gridView.ko, i18n.gridView.en)}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
          </div>
          <Link href="/newsletter/write">
            <Button>
              <PenLine className="w-4 h-4 mr-2" />
              {t(i18n.write.ko, i18n.write.en)}
            </Button>
          </Link>
        </div>
      </div>

      {viewMode === "list" ? (
        <div className="grid gap-4">
          {posts.map((post) => (
            <Link href={`/newsletter/${post.id}`} key={post.id}>
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-xl">{post.title}</CardTitle>
                    <CardDescription className="whitespace-nowrap ml-4">
                      {new Date(post.created_at).toLocaleDateString("ko-KR")}
                    </CardDescription>
                  </div>
                  {post.author_id && getAuthorName(authors[post.author_id]) && (
                    <CardDescription>{getAuthorName(authors[post.author_id])}</CardDescription>
                  )}
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground line-clamp-2">{post.content}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => {
            const thumbnail = getThumbnail(post)
            return (
              <Link href={`/newsletter/${post.id}`} key={post.id}>
                <Card className="hover:shadow-md transition-shadow cursor-pointer overflow-hidden h-full">
                  <div className="aspect-video bg-muted relative overflow-hidden">
                    {thumbnail ? (
                      <Image
                        src={thumbnail}
                        alt={post.title}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <ImageIcon className="w-12 h-12 text-muted-foreground/30" />
                      </div>
                    )}
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg line-clamp-2">{post.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex justify-between items-center text-sm text-muted-foreground">
                      <span>{post.author_id ? getAuthorName(authors[post.author_id]) : ""}</span>
                      <span>{new Date(post.created_at).toLocaleDateString("ko-KR")}</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      )}

      {posts.length === 0 && (
        <div className="text-center py-16">
          <p className="text-muted-foreground">{t(i18n.empty.ko, i18n.empty.en)}</p>
        </div>
      )}
    </div>
  )
}
