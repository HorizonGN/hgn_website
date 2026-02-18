import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"
import { isImageUrl, extractYoutubeId, getAuthorName } from "@/lib/post-utils"
import CommentSection from "@/components/comments/CommentSection"

export default async function NewsletterDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await createClient()

  const { data: post, error } = await supabase
    .from("posts")
    .select("*")
    .eq("id", id)
    .eq("category", "newsletter")
    .single()

  if (error || !post) {
    notFound()
  }

  // Fetch author profile separately
  let authorName: string | null = null
  if (post.author_id) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("first_name, last_name")
      .eq("id", post.author_id)
      .single()
    authorName = getAuthorName(profile) || null
  }

  const youtubeId = post.youtube_url ? extractYoutubeId(post.youtube_url) : null

  return (
    <div className="container mx-auto px-4 py-16">
      <Link href="/newsletter">
        <Button variant="ghost" className="mb-8">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
      </Link>

      <article className="max-w-3xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
          <div className="flex items-center gap-3 text-muted-foreground">
            {authorName && <span>{authorName}</span>}
            {authorName && <span>·</span>}
            <span>{new Date(post.created_at).toLocaleDateString("ko-KR")}</span>
          </div>
        </header>

        {post.file_url && isImageUrl(post.file_url) && (
          <div className="mb-8 relative w-full max-h-[500px] overflow-hidden rounded-lg">
            <Image
              src={post.file_url}
              alt={post.title}
              width={800}
              height={500}
              className="w-full h-auto object-contain"
              unoptimized
            />
          </div>
        )}

        {youtubeId && (
          <div className="mb-8 aspect-video rounded-lg overflow-hidden">
            <iframe
              src={`https://www.youtube.com/embed/${youtubeId}`}
              title={post.title}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        )}

        <div className="prose prose-lg max-w-none">
          <p className="whitespace-pre-wrap text-foreground leading-relaxed">
            {post.content}
          </p>
        </div>

        <CommentSection postId={post.id} />
      </article>
    </div>
  )
}
