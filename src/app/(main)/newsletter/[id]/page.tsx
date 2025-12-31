import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

// 임시 데이터
const samplePost = {
  id: "1",
  title: "2024년 크리스마스 특별 예배 안내",
  content: `
사랑하는 성도 여러분,

2024년 크리스마스를 맞이하여 특별 예배를 드리게 되었습니다.

예배 일시: 2024년 12월 25일 오전 11시
장소: 본당

모든 성도님들의 참석을 부탁드립니다.
주님의 은혜와 평강이 함께 하시길 기도합니다.
  `,
  created_at: "2024-12-20"
}

export default async function NewsletterDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  
  // TODO: Supabase에서 실제 데이터 조회
  const post = samplePost

  return (
    <div className="container mx-auto px-4 py-16">
      <Link href="/newsletter">
        <Button variant="ghost" className="mb-8">
          <ArrowLeft className="w-4 h-4 mr-2" />
          목록으로
        </Button>
      </Link>

      <article className="max-w-3xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
          <p className="text-muted-foreground">{post.created_at}</p>
        </header>
        
        <div className="prose prose-lg max-w-none">
          <p className="whitespace-pre-wrap text-foreground leading-relaxed">
            {post.content}
          </p>
        </div>
      </article>
    </div>
  )
}

