import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { createClient } from "@/lib/supabase/server";
import { PenLine, FileText, Download } from "lucide-react";

// 임시 데이터 (추후 Supabase에서 가져옴)
const sampleRecords = [
  {
    id: "1",
    title: "2024년 12월 4주차 주보",
    content: "12월 4주차 주보입니다.",
    file_url: "/sample.pdf",
    created_at: "2024-12-22",
  },
  {
    id: "2",
    title: "2024년 12월 3주차 주보",
    content: "12월 3주차 주보입니다.",
    file_url: "/sample.pdf",
    created_at: "2024-12-15",
  },
  {
    id: "3",
    title: "2024년 12월 2주차 주보",
    content: "12월 2주차 주보입니다.",
    file_url: "/sample.pdf",
    created_at: "2024-12-08",
  },
];

export default async function RecordsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold">주보 및 자료실</h1>
          <p className="text-muted-foreground mt-2">
            주보와 기록물을 확인하고 다운로드하세요.
          </p>
        </div>
        {user && (
          <Link href="/records/write">
            <Button>
              <PenLine className="w-4 h-4 mr-2" />
              자료 등록
            </Button>
          </Link>
        )}
      </div>

      <div className="grid gap-4">
        {sampleRecords.map((record) => (
          <Card key={record.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-primary" />
                  <div>
                    <Link href={`/records/${record.id}`}>
                      <CardTitle className="text-xl hover:text-primary transition-colors cursor-pointer">
                        {record.title}
                      </CardTitle>
                    </Link>
                    <CardDescription>{record.created_at}</CardDescription>
                  </div>
                </div>
                {record.file_url && (
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    다운로드
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{record.content}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {sampleRecords.length === 0 && (
        <div className="text-center py-16">
          <p className="text-muted-foreground">등록된 자료가 없습니다.</p>
        </div>
      )}
    </div>
  );
}
