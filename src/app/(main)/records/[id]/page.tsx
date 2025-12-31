import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Download } from "lucide-react"

// 임시 데이터
const sampleRecord = {
  id: "1",
  title: "2024년 12월 4주차 주보",
  content: `
2024년 12월 4주차 주보

예배 순서:
1. 찬송 - 기쁘다 구주 오셨네
2. 기도
3. 성경봉독
4. 설교
5. 찬송
6. 축도

이번 주 말씀: 요한복음 1:1-14
  `,
  file_url: "/sample.pdf",
  created_at: "2024-12-22"
}

export default async function RecordDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  
  // TODO: Supabase에서 실제 데이터 조회
  const record = sampleRecord

  return (
    <div className="container mx-auto px-4 py-16">
      <Link href="/records">
        <Button variant="ghost" className="mb-8">
          <ArrowLeft className="w-4 h-4 mr-2" />
          목록으로
        </Button>
      </Link>

      <article className="max-w-3xl mx-auto">
        <header className="mb-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold mb-4">{record.title}</h1>
              <p className="text-muted-foreground">{record.created_at}</p>
            </div>
            {record.file_url && (
              <Button>
                <Download className="w-4 h-4 mr-2" />
                파일 다운로드
              </Button>
            )}
          </div>
        </header>
        
        <div className="prose prose-lg max-w-none">
          <p className="whitespace-pre-wrap text-foreground leading-relaxed">
            {record.content}
          </p>
        </div>
      </article>
    </div>
  )
}

