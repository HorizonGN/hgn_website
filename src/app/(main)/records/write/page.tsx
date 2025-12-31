"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Upload } from "lucide-react"

export default function WriteRecordPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [file, setFile] = useState<File | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // TODO: Supabase Storage에 파일 업로드
      // TODO: Supabase에 글 저장
      console.log({ title, content, file, category: "records" })
      
      // 성공 시 목록으로 이동
      router.push("/records")
    } catch (error) {
      console.error("Error saving record:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <Link href="/records">
        <Button variant="ghost" className="mb-8">
          <ArrowLeft className="w-4 h-4 mr-2" />
          목록으로
        </Button>
      </Link>

      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle>자료 등록</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">제목</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="자료 제목을 입력하세요"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">설명</Label>
              <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="자료에 대한 설명을 입력하세요"
                className="w-full min-h-[150px] p-3 border rounded-md resize-y focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="file">파일 첨부</Label>
              <div className="border-2 border-dashed rounded-lg p-8 text-center">
                <input
                  id="file"
                  type="file"
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx,.hwp,.jpg,.jpeg,.png"
                  className="hidden"
                />
                <label
                  htmlFor="file"
                  className="cursor-pointer flex flex-col items-center gap-2"
                >
                  <Upload className="w-8 h-8 text-muted-foreground" />
                  <span className="text-muted-foreground">
                    {file ? file.name : "클릭하여 파일을 선택하세요"}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    PDF, DOC, HWP, JPG, PNG 파일 지원
                  </span>
                </label>
              </div>
            </div>

            <div className="flex gap-4">
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "저장 중..." : "저장하기"}
              </Button>
              <Link href="/records">
                <Button type="button" variant="outline">
                  취소
                </Button>
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

