"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Upload } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { useLanguage } from "@/context/LanguageContext"
import { newsletter as i18n } from "@/lib/translations"

export default function WriteNewsletterPage() {
  const router = useRouter()
  const { t } = useLanguage()
  const [isLoading, setIsLoading] = useState(false)
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [youtubeUrl, setYoutubeUrl] = useState("")
  const [file, setFile] = useState<File | null>(null)
  const [isChecking, setIsChecking] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      if (!user) {
        router.replace("/auth/login")
        return
      }

      const { data } = await supabase
        .from("profiles")
        .select("is_approved")
        .eq("id", user.id)
        .single()

      if (!data?.is_approved) {
        router.replace("/newsletter")
        return
      }

      setIsAuthenticated(true)
      setIsChecking(false)
    })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  if (isChecking || !isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center py-16">
          <p className="text-muted-foreground">...</p>
        </div>
      </div>
    )
  }

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
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.replace("/auth/login")
        return
      }

      let fileUrl: string | null = null

      if (file) {
        const fileExt = file.name.split(".").pop()
        const fileName = `${Date.now()}.${fileExt}`
        const { error: uploadError } = await supabase.storage
          .from("records")
          .upload(fileName, file)

        if (uploadError) throw uploadError

        const { data: urlData } = supabase.storage
          .from("records")
          .getPublicUrl(fileName)

        fileUrl = urlData.publicUrl
      }

      const { error } = await supabase.from("posts").insert({
        category: "newsletter" as const,
        title,
        content,
        file_url: fileUrl,
        youtube_url: youtubeUrl || null,
        author_id: user.id,
      })

      if (error) throw error

      router.push("/newsletter")
      router.refresh()
    } catch (error) {
      console.error("Error saving post:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <Link href="/newsletter">
        <Button variant="ghost" className="mb-8">
          <ArrowLeft className="w-4 h-4 mr-2" />
          {t(i18n.backToList.ko, i18n.backToList.en)}
        </Button>
      </Link>

      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle>{t(i18n.writeTitle.ko, i18n.writeTitle.en)}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">{t(i18n.titleLabel.ko, i18n.titleLabel.en)}</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={t(i18n.titlePlaceholder.ko, i18n.titlePlaceholder.en)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">{t(i18n.contentLabel.ko, i18n.contentLabel.en)}</Label>
              <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder={t(i18n.contentPlaceholder.ko, i18n.contentPlaceholder.en)}
                className="w-full min-h-[300px] p-3 border rounded-md resize-y focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="file">{t(i18n.fileLabel.ko, i18n.fileLabel.en)}</Label>
              <div className="border-2 border-dashed rounded-lg p-8 text-center">
                <input
                  id="file"
                  type="file"
                  onChange={handleFileChange}
                  accept=".jpg,.jpeg,.png,.gif,.webp"
                  className="hidden"
                />
                <label
                  htmlFor="file"
                  className="cursor-pointer flex flex-col items-center gap-2"
                >
                  <Upload className="w-8 h-8 text-muted-foreground" />
                  <span className="text-muted-foreground">
                    {file ? file.name : t(i18n.fileSelect.ko, i18n.fileSelect.en)}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {t(i18n.fileSupport.ko, i18n.fileSupport.en)}
                  </span>
                </label>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="youtubeUrl">{t(i18n.youtubeUrl.ko, i18n.youtubeUrl.en)}</Label>
              <Input
                id="youtubeUrl"
                value={youtubeUrl}
                onChange={(e) => setYoutubeUrl(e.target.value)}
                placeholder={t(i18n.youtubeUrlPlaceholder.ko, i18n.youtubeUrlPlaceholder.en)}
              />
            </div>

            <div className="flex gap-4">
              <Button type="submit" disabled={isLoading}>
                {isLoading ? t(i18n.saving.ko, i18n.saving.en) : t(i18n.save.ko, i18n.save.en)}
              </Button>
              <Link href="/newsletter">
                <Button type="button" variant="outline">
                  {t(i18n.cancel.ko, i18n.cancel.en)}
                </Button>
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
