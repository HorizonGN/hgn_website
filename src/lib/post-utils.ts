export function isImageUrl(url: string): boolean {
  const pathOnly = url.split("?")[0]
  const ext = pathOnly.split(".").pop()?.toLowerCase()
  return !!ext && ["jpg", "jpeg", "png", "gif", "webp"].includes(ext)
}

export function extractYoutubeId(url: string): string | null {
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/)
  return match ? match[1] : null
}

export function getAuthorName(profile: { first_name: string | null; last_name: string | null } | undefined | null): string {
  if (!profile) return ""
  const parts = [profile.last_name, profile.first_name].filter(Boolean)
  return parts.join("")
}
