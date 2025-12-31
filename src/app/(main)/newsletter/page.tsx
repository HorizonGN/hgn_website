import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { createClient } from "@/lib/supabase/server"
import { PenLine } from "lucide-react"

// 임시 데이터 (추후 Supabase에서 가져옴)
const samplePosts = [
  {
    id: "1",
    title: "2024년 크리스마스 특별 예배 안내",
    content: "올해 크리스마스 예배에 대한 안내입니다...",
    created_at: "2024-12-20"
  },
  {
    id: "2", 
    title: "선교지 소식 - 12월호",
    content: "해외 선교지의 근황을 전해드립니다...",
    created_at: "2024-12-15"
  },
  {
    id: "3",
    title: "송년감사예배 안내",
    content: "한 해를 마무리하는 송년감사예배를 드립니다...",
    created_at: "2024-12-10"
  }
]

export default async function NewsletterPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold">선교 소식</h1>
          <p className="text-muted-foreground mt-2">소식과 뉴스레터를 확인하세요.</p>
        </div>
        {user && (
          <Link href="/newsletter/write">
            <Button>
              <PenLine className="w-4 h-4 mr-2" />
              글쓰기
            </Button>
          </Link>
        )}
      </div>

      <div className="grid gap-4">
        {samplePosts.map((post) => (
          <Link href={`/newsletter/${post.id}`} key={post.id}>
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl">{post.title}</CardTitle>
                  <CardDescription>{post.created_at}</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground line-clamp-2">{post.content}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {samplePosts.length === 0 && (
        <div className="text-center py-16">
          <p className="text-muted-foreground">등록된 글이 없습니다.</p>
        </div>
      )}
    </div>
  )
}

