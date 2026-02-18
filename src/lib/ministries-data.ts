export interface MinistryItem {
  title: string
  desc: { ko: string; en: string }
  icon: string
  slug: string
}

export const ministriesList: MinistryItem[] = [
  {
    title: "Christian Education",
    desc: { ko: "성경적 교육을 통한 신앙 성장", en: "Faith growth through biblical education" },
    icon: "◇",
    slug: "christian-education",
  },
  {
    title: "Expository Preaching Ministries",
    desc: { ko: "말씀 강해를 통한 복음 전파", en: "Spreading the gospel through expository preaching" },
    icon: "□",
    slug: "expository-preaching",
  },
  {
    title: "International Public Health",
    desc: { ko: "글로벌 공중보건 사역", en: "Global public health ministry" },
    icon: "○",
    slug: "international-public-health",
  },
  {
    title: "Love Foundation",
    desc: { ko: "사랑의 나눔과 섬김", en: "Sharing and serving with love" },
    icon: "♡",
    slug: "love-foundation",
  },
  {
    title: "Worship Arts",
    desc: { ko: "예술을 통한 예배와 찬양", en: "Worship and praise through the arts" },
    icon: "△",
    slug: "worship-arts",
  },
]
