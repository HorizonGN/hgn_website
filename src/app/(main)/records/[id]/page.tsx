import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"
import { isImageUrl, getAuthorName } from "@/lib/post-utils"
import CommentSection from "@/components/comments/CommentSection"
import PostActions from "@/components/posts/PostActions"

export default async function RecordDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await createClient()

  const { data: record, error } = await supabase
    .from("posts")
    .select("*")
    .eq("id", id)
    .eq("category", "records")
    .single()

  if (error || !record) {
    notFound()
  }

  // Fetch author profile separately
  let authorName: string | null = null
  if (record.author_id) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("first_name, last_name")
      .eq("id", record.author_id)
      .single()
    authorName = getAuthorName(profile) || null
  }

  const hasImage = record.file_url && isImageUrl(record.file_url)

  return (
    <div className="container mx-auto px-4 py-16">
      <Link href="/records">
        <Button variant="ghost" className="mb-8">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
      </Link>

      <article className="max-w-3xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold mb-4">{record.title}</h1>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 text-muted-foreground">
              {authorName && <span>{authorName}</span>}
              {authorName && <span>·</span>}
              <span>{new Date(record.created_at).toLocaleDateString("ko-KR")}</span>
            </div>
            <PostActions postId={record.id} authorId={record.author_id} redirectTo="/records" />
          </div>
        </header>

        {hasImage && (
          <div className="mb-8 relative w-full max-h-[500px] overflow-hidden rounded-lg">
            <Image
              src={record.file_url!}
              alt={record.title}
              width={800}
              height={500}
              className="w-full h-auto object-contain"
              unoptimized
            />
          </div>
        )}

        <div className="prose prose-lg max-w-none">
          <p className="whitespace-pre-wrap text-foreground leading-relaxed">
            {record.content}
          </p>
        </div>

        <CommentSection postId={record.id} />
      </article>
    </div>
  )
}
