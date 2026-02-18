"use client"

import { useParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { useLanguage } from "@/context/LanguageContext"
import { ArrowLeft, ArrowUpRight } from "lucide-react"
import { ministriesList } from "@/lib/ministries-data"

interface Program {
  title: { ko: string; en: string }
  subtitle: { ko: string; en: string }
  steps?: { ko: string; en: string }[]
  features?: { ko: string; en: string }[]
  note?: { ko: string; en: string }
}

interface IphCategory {
  title: { ko: string; en: string }
  subtitle: { ko: string; en: string }
  items: { label: string; text: { ko: string; en: string } }[]
}

const ministriesData: Record<string, {
  title: string
  icon: string
  description: { ko: string; en: string }
  content: { ko: string; en: string }
  hasCustomContent?: boolean
  visionMission?: {
    vision: { title: string; text: string; verse: string }
    mission: { title: string; text: string; verse: string }
    keyPoints: string[]
    quote: { text: string; verse: string }
  }
  programs?: Program[]
  iphPrograms?: {
    title: { ko: string; en: string }
    categories: IphCategory[]
  }
  director?: {
    name: string
    title: string
    photo: string | null
    bio: string
  }
}> = {
  "christian-education": {
    title: "Christian Education",
    icon: "◇",
    description: { 
      ko: "성경적 교육을 통한 신앙 성장", 
      en: "Faith growth through biblical education" 
    },
    content: {
      ko: "Christian education means education that is Christian. It is unique in that its goal is love. The Bible says in 1 Tim 1:5, \"Now the goal of our instruction is love that comes from a pure heart, a good conscience, and a sincere faith.\" Instruction in this verse means teaching. All of what Christians teach in churches, schools, homes, and elsewhere should produce love in learners' lives. Jesus Christ did not try to train His disciples to make them smart, better looking, rich, famous, or even socially influential. He wanted them to love.\n\nAccording to the verse, love springs from three sources: a pure heart, a good conscience, and a sincere faith. These three are the essential elements without which Christian education cannot succeed. Fortifying these sources is a hard work; we have work to do. Would you join us?",
      en: "Christian education means education that is Christian. It is unique in that its goal is love. The Bible says in 1 Tim 1:5, \"Now the goal of our instruction is love that comes from a pure heart, a good conscience, and a sincere faith.\" Instruction in this verse means teaching. All of what Christians teach in churches, schools, homes, and elsewhere should produce love in learners' lives. Jesus Christ did not try to train His disciples to make them smart, better looking, rich, famous, or even socially influential. He wanted them to love.\n\nAccording to the verse, love springs from three sources: a pure heart, a good conscience, and a sincere faith. These three are the essential elements without which Christian education cannot succeed. Fortifying these sources is a hard work; we have work to do. Would you join us?"
    },
    hasCustomContent: true,
    visionMission: {
      vision: {
        title: "VISION",
        text: "The unity of all people in Jesus Christ in love",
        verse: "John 13:34-35"
      },
      mission: {
        title: "MISSION", 
        text: "To share instruction to love and to be loved",
        verse: "1Tim 1:5"
      },
      keyPoints: [
        "Education that is Christian!",
        "Education with a final goal of love!",
        "Education with the unique method of love!"
      ],
      quote: {
        text: "joined together in love, so that they may have all the riches of assured understanding and have the knowledge of God's mystery-Christ. All the treasures of wisdom and knowledge are hidden in Him.",
        verse: "Col 2:2-3"
      }
    },
    director: {
      name: "Timothy Chong, PhD",
      title: "Director of Christian Education Ministries, Horizon Global Network",
      photo: null,
      bio: "Dr. Timothy Chong served as a dean at Liberty University in Lynchburg, Virginia and at Midwestern Baptist Theological Seminary in Kansas City, Missouri. His pastoral experiences span over thirty years in various ministries ranging from youth to young adult to the senior pastorate. He is committed to the advancement of missions through HGN. He is married to his faithfully supportive wife and has two grown daughters whose husbands are faithful men of God."
    }
  },
  "expository-preaching": {
    title: "Expository Preaching Ministries",
    icon: "□",
    description: { 
      ko: "말씀 강해를 통한 복음 전파", 
      en: "Spreading the gospel through expository preaching" 
    },
    content: {
      ko: "The ministries at Horizon Global Network (HGN) began in spite of the challenging situations brought by COVID-19. Though the situations are not as good as we would like them to be, God must have good will toward our beginning. I am glad that we are able to work together and expect what God may do through HGN in the upcoming future.\n\nI have served as a pastor, the president and board member of a mission organization, and faculty at theological seminaries and directly verified how important it was to teach and learn biblical preaching in order to build the healthy disciples of Jesus and healthy communities. I desire to minister to Christian workers to help them to preach expository sermons by coaching and providing tools and methods through HGN – Expository Preaching.\n\nPlease pray for us and help and cooperate with us.",
      en: "The ministries at Horizon Global Network (HGN) began in spite of the challenging situations brought by COVID-19. Though the situations are not as good as we would like them to be, God must have good will toward our beginning. I am glad that we are able to work together and expect what God may do through HGN in the upcoming future.\n\nI have served as a pastor, the president and board member of a mission organization, and faculty at theological seminaries and directly verified how important it was to teach and learn biblical preaching in order to build the healthy disciples of Jesus and healthy communities. I desire to minister to Christian workers to help them to preach expository sermons by coaching and providing tools and methods through HGN – Expository Preaching.\n\nPlease pray for us and help and cooperate with us."
    },
    hasCustomContent: true,
    visionMission: {
      vision: {
        title: "VISION",
        text: "The unity of all people in Jesus Christ in the Word of God",
        verse: "2 Thess 3:1"
      },
      mission: {
        title: "MISSION",
        text: "To spread and honor the Word of God",
        verse: "2 Thess 3:1"
      },
      keyPoints: [
        "Correctly handling the word of truth!",
        "Preaching what God has said!"
      ],
      quote: {
        text: "Do your best to present yourself to God as one approved, a worker who does not need to be ashamed and who correctly handles the word of truth.",
        verse: "2 Timothy 2:15"
      }
    },
    programs: [
      {
        title: { ko: "강해설교 세미나", en: "Expository Preaching Seminar" },
        subtitle: { ko: "강해설교 준비과정", en: "Sermon Preparation Process" },
        steps: [
          { ko: "석의", en: "Exegesis" },
          { ko: "강해", en: "Exposition" },
          { ko: "설교 작성", en: "Sermon Writing" }
        ]
      },
      {
        title: { ko: "설교 코칭", en: "Sermon Coaching" },
        subtitle: { ko: "그룹 설교 코칭 (10명 내외)", en: "Group Sermon Coaching (up to 10)" },
        features: [
          { ko: "성경연구 (석의, 강해)", en: "Bible Study (Exegesis, Exposition)" },
          { ko: "설교적 명제 및 대지 만들기", en: "Creating Sermon Propositions and Outlines" }
        ],
        note: { ko: "* 필수 요건: 강해설교 세미나", en: "* Required: Expository Preaching Seminar" }
      }
    ],
    director: {
      name: "Sungtaek Kim, DMin",
      title: "Director of Expository Preaching Ministries, Horizon Global Network",
      photo: null,
      bio: "Dr. Kim served as a director of Korean ministries and as an assistant professor at Liberty University in Lynchburg, Virginia. He has over 30 years of various pastoral ministries and mission works in Korea and in US. As president of the WWFMC mission organization, he served native missionaries around the world and supported Bible colleges and seminaries in the mission field. He also led many seminars for the native missionaries. He serves as an adjunct professor at Liberty University and at Midwestern Baptist Theological Seminary in Kansas City, Missouri. He and his wife have a married son."
    }
  },
  "international-public-health": {
    title: "International Public Health",
    icon: "○",
    description: { 
      ko: "글로벌 공중보건 사역", 
      en: "Global public health ministry" 
    },
    content: {
      ko: "People generally use the word relationship, but I believe the way God feels and connects with us is through providence rather than a relationship. The most important part of public health is that we meet the right people at the right time and that we work together during the time permitted. A famous female actress, as an honorary ambassador for UNICEF, once said the following to a child in Africa: \"I am helping you not because you are poor, but because you are the future for this country.\"\n\nI believe that the field of public health requires more cooperation and expertise than other areas, and it also touches the hearts of those who are in pain.\n\nI want to dedicate my efforts to support the various projects of HGN to follow the path of Jesus in helping the poor and sick.\n\nThank you.",
      en: "People generally use the word relationship, but I believe the way God feels and connects with us is through providence rather than a relationship. The most important part of public health is that we meet the right people at the right time and that we work together during the time permitted. A famous female actress, as an honorary ambassador for UNICEF, once said the following to a child in Africa: \"I am helping you not because you are poor, but because you are the future for this country.\"\n\nI believe that the field of public health requires more cooperation and expertise than other areas, and it also touches the hearts of those who are in pain.\n\nI want to dedicate my efforts to support the various projects of HGN to follow the path of Jesus in helping the poor and sick.\n\nThank you."
    },
    hasCustomContent: true,
    visionMission: {
      vision: {
        title: "VISION",
        text: "The unity of all people in Jesus Christ in life",
        verse: "2 Cor 5:1-5"
      },
      mission: {
        title: "MISSION",
        text: "To offer the gift of health to the world",
        verse: ""
      },
      keyPoints: [
        "Health is a gift of God; we should cherish it."
      ],
      quote: {
        text: "For we know that if the earthly tent we live in is destroyed, we have a building from God, an eternal house in heaven, not built by human hands.",
        verse: "2 Cor 5:1"
      }
    },
    iphPrograms: {
      title: { ko: "보건사업(IPH) 운영체계", en: "IPH Operating System" },
      categories: [
        {
          title: { ko: "HGN 신규 사업 발굴", en: "HGN New Project Development" },
          subtitle: { ko: "국가별 / 지역별", en: "By Country / Region" },
          items: [
            { label: "A", text: { ko: "취약계층 보건수준 향상", en: "Improving health standards for vulnerable populations" } },
            { label: "B", text: { ko: "건강증진 교육 프로그램", en: "Health promotion education programs" } }
          ]
        },
        {
          title: { ko: "선교지 요청 사업", en: "Mission Field Requested Projects" },
          subtitle: { ko: "사업지 간 협력체계", en: "Inter-site cooperation system" },
          items: [
            { label: "C", text: { ko: "복음화에 기여 가능한 지역 질환 분석/대응", en: "Regional disease analysis/response contributing to evangelization" } },
            { label: "D", text: { ko: "감염병 예방 교육", en: "Infectious disease prevention education" } }
          ]
        }
      ]
    },
    director: {
      name: "Yunseop Kim, PhD, MPH",
      title: "Director of International Public Health Ministries, Horizon Global Network",
      photo: null,
      bio: "Dr. Yunseop Kim is serving as a research professor at Korea University in Seoul, South Korea and as adjunct faculty at Liberty University in Lynchburg, Virginia and at Midwestern Baptist Theological Seminary, Kansas City, Missouri. His professional expertise in the field of international public health has taken him to numerous developing countries in all over the world, and his knowledge and experiences provide vital help to those with public health needs. His services are frequently channeled through UNICEF, UNFPA, and WHO/PAHO through Official Development Assistance (ODA) projects. He desires to live out the gospel message in the public health field through HGN. He is married to his faithful wife, a very valuable gift from God, and has a son with a bright future."
    }
  },
  "love-foundation": {
    title: "Love Foundation",
    icon: "♡",
    description: { 
      ko: "사랑의 나눔과 섬김", 
      en: "Sharing and serving with love" 
    },
    content: {
      ko: "Love Foundation은 도움이 필요한 이들에게 실질적인 지원을 제공합니다. 구호 사업, 교육 지원, 지역사회 개발 등을 통해 하나님의 사랑을 나누고 희망을 전합니다.",
      en: "Love Foundation provides practical support to those in need. We share God's love and bring hope through relief work, educational support, and community development."
    },
    hasCustomContent: true,
    visionMission: {
      vision: {
        title: "VISION",
        text: "The unity of all people in Jesus Christ in loving their neighbors",
        verse: "Matt 22:39"
      },
      mission: {
        title: "MISSION",
        text: "To offer neighborly compassion to Koreans",
        verse: ""
      },
      keyPoints: [
        "Providing spiritual and humanitarian aid",
        "Caring for the under-privileged",
        "Establishing Christian institutions to minister to neighbors"
      ],
      quote: {
        text: "Love your neighbor as yourself.",
        verse: "Matthew 22:39"
      }
    }
  },
  "worship-arts": {
    title: "Worship Arts",
    icon: "△",
    description: { 
      ko: "예술을 통한 예배와 찬양", 
      en: "Worship and praise through the arts" 
    },
    content: {
      ko: "The book of Genesis states that God created the heavens and the earth in all their vast arrays in six days. The result was the presentation of God's perfect art piece that could not be adequately described in words but was awe-inspiring. Furthermore, as the author of the Creation, God blessed us with His artistic wisdom and skills!\n\nAs the Lord Christ has redeemed us, we need to reclaim the God-given arts, and that is what the Worship Arts Ministries at HGN (HGN-WAM) endeavors. Our team links Christian artists to generate collaboration for the kingdom of God and assists them in the ways specific to the needs and plans for acceptable worship to God. We also help Christian artists become God's true disciples and pass on the discipleship to the next generation. We are prayerfully looking forward to our Lord's powerful guidance in our efforts in the HGN group.\n\nThank you.",
      en: "The book of Genesis states that God created the heavens and the earth in all their vast arrays in six days. The result was the presentation of God's perfect art piece that could not be adequately described in words but was awe-inspiring. Furthermore, as the author of the Creation, God blessed us with His artistic wisdom and skills!\n\nAs the Lord Christ has redeemed us, we need to reclaim the God-given arts, and that is what the Worship Arts Ministries at HGN (HGN-WAM) endeavors. Our team links Christian artists to generate collaboration for the kingdom of God and assists them in the ways specific to the needs and plans for acceptable worship to God. We also help Christian artists become God's true disciples and pass on the discipleship to the next generation. We are prayerfully looking forward to our Lord's powerful guidance in our efforts in the HGN group.\n\nThank you."
    },
    hasCustomContent: true,
    visionMission: {
      vision: {
        title: "VISION",
        text: "To develop worship arts and artists of God",
        verse: ""
      },
      mission: {
        title: "MISSION",
        text: "The unity of all people in worshipping Jesus",
        verse: "Psalm 86:9"
      },
      keyPoints: [
        "Worship Arts Ministries at HGN (HGN-WAM) endeavor to redeem the God-given arts to worship God.",
        "In the center of art-redemption ministries is producing and sharing Total Art Worship with the global communities.",
        "Various activities of redeeming arts are legitimately based on the following Scriptural verses and principles."
      ],
      quote: {
        text: "All the nations you have made will come and worship before you, Lord; they will bring glory to your name.",
        verse: "Psalm 86:9"
      }
    },
    director: {
      name: "Taeseong Kim, DMA",
      title: "Director of Worship Arts Ministries, Horizon Global Network",
      photo: null,
      bio: "Currently serving as music faculty in the School of Music of Liberty University, Lynchburg, Virginia, he is skilled in music composition, piano, conducting, chamber music, and public speaking with a Doctor of Musical Arts degree in piano pedagogy from the University of South Carolina, Columbia. Interested in the concept of integrated and innovative worship, he has been pursuing another doctorate in worship studies at Liberty University since 2015. In April 2017, he directed and premiered Total Art Worship, a non-verbal worship presentation that incorporates various art forms such as dance, music, and visual arts as media for delivering a biblical message. He has been blessed with a talented family in a variety of arts."
    }
  },
}


export default function MinistryDetailPage() {
  const params = useParams()
  const slug = params.slug as string
  const { t } = useLanguage()

  const ministry = ministriesData[slug]

  if (!ministry) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            {t("페이지를 찾을 수 없습니다", "Page Not Found")}
          </h1>
          <Link href="/ministries" className="text-[oklch(0.32_0.10_245)] font-semibold">
            {t("사역 목록으로 돌아가기", "Back to Ministries")}
          </Link>
        </div>
      </div>
    )
  }

  const otherMinistries = ministriesList.filter(m => m.slug !== slug)

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 bg-gradient-to-br from-[oklch(0.18_0.05_245)] via-[oklch(0.22_0.07_245)] to-[oklch(0.16_0.05_245)] overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-64 h-64 bg-[oklch(0.52_0.20_12_/_0.2)] rounded-full blur-[100px]" />
        
        <div className="container mx-auto px-6 md:px-12 relative">
          <div className="max-w-4xl mx-auto text-center">
            {/* Back link */}
            <Link 
              href="/ministries"
              className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              {t("모든 사역 보기", "All Ministries")}
            </Link>
            
            <span className="block text-6xl md:text-7xl mb-6 text-[oklch(0.62_0.15_12)]">
              {ministry.icon}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              {ministry.title}
            </h1>
            <p className="text-xl text-slate-400">
              {t(ministry.description.ko, ministry.description.en)}
            </p>
          </div>
        </div>
      </section>

      {/* Vision & Mission Section - Only for pages with visionMission data */}
      {ministry.visionMission && (
        <section className="py-16 md:py-24 bg-slate-50">
          <div className="container mx-auto px-6 md:px-12">
            <div className="max-w-6xl mx-auto">
              {/* Vision & Mission Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                {/* Vision Card */}
                <div className="relative p-8 md:p-10 rounded-3xl bg-gradient-to-br from-[oklch(0.32_0.10_245)] to-[oklch(0.25_0.10_245)] text-white overflow-hidden">
                  <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyIi8+PC9nPjwvZz48L3N2Zz4=')]" />
                  <div className="relative">
                    <h3 className="text-3xl md:text-4xl font-bold mb-4">{ministry.visionMission.vision.title}</h3>
                    <p className="text-xl md:text-2xl italic text-white/90 mb-3">
                      {ministry.visionMission.vision.text}
                    </p>
                    <p className="text-white/70 font-medium">({ministry.visionMission.vision.verse})</p>
                  </div>
                </div>

                {/* Mission Card */}
                <div className="relative p-8 md:p-10 rounded-3xl bg-gradient-to-br from-[oklch(0.45_0.15_245)] to-[oklch(0.35_0.12_245)] text-white overflow-hidden">
                  <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyIi8+PC9nPjwvZz48L3N2Zz4=')]" />
                  <div className="relative">
                    <h3 className="text-3xl md:text-4xl font-bold mb-4">{ministry.visionMission.mission.title}</h3>
                    <p className="text-xl md:text-2xl italic text-white/90 mb-3">
                      {ministry.visionMission.mission.text}
                    </p>
                    <p className="text-white/70 font-medium">({ministry.visionMission.mission.verse})</p>
                  </div>
                </div>
              </div>

              {/* Key Points */}
              <div className="text-center mb-12">
                <ul className="inline-flex flex-col gap-3">
                  {ministry.visionMission.keyPoints.map((point, i) => (
                    <li key={i} className="flex items-center gap-3 text-lg md:text-xl text-slate-700">
                      <span className="w-2 h-2 rounded-full bg-[oklch(0.52_0.20_12)]" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Quote */}
              <div className="max-w-4xl mx-auto text-center">
                <blockquote className="text-lg md:text-xl text-slate-600 italic leading-relaxed mb-4">
                  "{ministry.visionMission.quote.text}"
                </blockquote>
                <cite className="text-[oklch(0.52_0.20_12)] font-semibold">
                  ({ministry.visionMission.quote.verse})
                </cite>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* IPH Programs Section - Only for International Public Health */}
      {ministry.iphPrograms && (
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-6 md:px-12">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
                  {t(ministry.iphPrograms.title.ko, ministry.iphPrograms.title.en)}
                </h2>
              </div>

              {/* Operating System Diagram */}
              <div className="mb-12">
                {/* Top Level - HGN Leadership */}
                <div className="flex justify-center mb-8">
                  <div className="px-8 py-4 bg-[oklch(0.35_0.12_170)] text-white font-bold rounded-xl text-center">
                    {t("HGN 대표이사", "HGN President")}
                  </div>
                </div>

                {/* Arrow down */}
                <div className="flex justify-center mb-4">
                  <div className="flex flex-col items-center">
                    <div className="w-0.5 h-8 bg-[oklch(0.35_0.12_170)]" />
                    <div className="w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[10px] border-t-[oklch(0.35_0.12_170)]" />
                  </div>
                </div>

                {/* Middle Level - Board/Division */}
                <div className="flex justify-center mb-8">
                  <div className="px-8 py-4 bg-[oklch(0.40_0.10_170)] text-white font-bold rounded-xl text-center">
                    {t("HGN 이사회 / IPH Division", "HGN Board / IPH Division")}
                  </div>
                </div>

                {/* Arrows to categories */}
                <div className="flex justify-center gap-32 mb-4">
                  <div className="flex flex-col items-center">
                    <div className="w-0.5 h-8 bg-[oklch(0.35_0.12_170)]" />
                    <div className="w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[10px] border-t-[oklch(0.35_0.12_170)]" />
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-0.5 h-8 bg-[oklch(0.35_0.12_170)]" />
                    <div className="w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[10px] border-t-[oklch(0.35_0.12_170)]" />
                  </div>
                </div>
              </div>

              {/* Categories Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {ministry.iphPrograms.categories.map((category, i) => (
                  <div key={i} className="relative">
                    {/* Category Header */}
                    <div className="px-6 py-4 bg-[oklch(0.32_0.10_245)] text-white rounded-t-2xl">
                      <h3 className="text-xl font-bold text-center">
                        {t(category.title.ko, category.title.en)}
                      </h3>
                      <p className="text-sm text-center text-white/70 mt-1">
                        {t(category.subtitle.ko, category.subtitle.en)}
                      </p>
                    </div>

                    {/* Category Items */}
                    <div className="grid grid-cols-2 gap-4 p-6 bg-slate-50 rounded-b-2xl border border-t-0 border-slate-200">
                      {category.items.map((item, j) => (
                        <div key={j} className="bg-white p-4 rounded-xl border border-slate-200 text-center">
                          <span className="inline-block w-8 h-8 bg-[oklch(0.52_0.20_12_/_0.2)] text-[oklch(0.52_0.20_12)] font-bold rounded mb-2 leading-8">
                            {item.label}
                          </span>
                          <p className="text-sm text-slate-700 leading-snug">
                            {t(item.text.ko, item.text.en)}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Programs Section - Only for pages with programs data */}
      {ministry.programs && ministry.programs.length > 0 && (
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-6 md:px-12">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
                  {t("프로그램", "Programs")}
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {ministry.programs.map((program, i) => (
                  <div 
                    key={i}
                    className="relative p-8 md:p-10 rounded-3xl bg-gradient-to-br from-slate-50 to-white border border-slate-200 overflow-hidden"
                  >
                    {/* Decorative corner */}
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-[oklch(0.32_0.10_245_/_0.1)] to-transparent rounded-bl-full" />
                    
                    <div className="relative">
                      <h3 className="text-2xl font-bold text-[oklch(0.32_0.10_245)] mb-2">
                        {t(program.title.ko, program.title.en)}
                      </h3>
                      <p className="text-slate-500 font-medium mb-6">
                        {t(program.subtitle.ko, program.subtitle.en)}
                      </p>

                      {/* Steps (for Seminar) */}
                      {program.steps && program.steps.length > 0 && (
                        <div className="flex items-center justify-center gap-2 sm:gap-3 md:gap-5 mb-4">
                          {program.steps.map((step, j) => (
                            <div key={j} className="flex items-center gap-2 sm:gap-3 md:gap-5">
                              <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 shrink-0 rounded-full border-2 border-[oklch(0.32_0.10_245)] flex items-center justify-center bg-white shadow-sm">
                                <span className="text-xs sm:text-sm font-semibold text-[oklch(0.32_0.10_245)] text-center leading-tight">
                                  {t(step.ko, step.en)}
                                </span>
                              </div>
                              {j < (program.steps?.length ?? 0) - 1 && (
                                <div className="flex items-center text-[oklch(0.32_0.10_245)] shrink-0">
                                  <div className="w-3 sm:w-4 md:w-6 h-0.5 bg-[oklch(0.32_0.10_245)]" />
                                  <div className="w-0 h-0 border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent border-l-[6px] border-l-[oklch(0.32_0.10_245)]" />
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Features (for Coaching) */}
                      {program.features && (
                        <ul className="space-y-3 mb-4">
                          {program.features.map((feature, j) => (
                            <li key={j} className="flex items-start gap-3">
                              <span className="text-[oklch(0.52_0.20_12)] font-bold">▸</span>
                              <span className="text-slate-700 font-medium">
                                {t(feature.ko, feature.en)}
                              </span>
                            </li>
                          ))}
                        </ul>
                      )}

                      {/* Note */}
                      {program.note && (
                        <p className="text-sm text-slate-500 italic">
                          {t(program.note.ko, program.note.en)}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Content Section */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-4xl mx-auto">
            {/* Main Content */}
            <div className="prose prose-lg prose-slate max-w-none">
              {t(ministry.content.ko, ministry.content.en).split('\n\n').map((paragraph, i) => (
                <p key={i} className="text-xl text-slate-600 leading-relaxed mb-6">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Director Section */}
            {ministry.director && (
              <div className="mt-16 p-8 md:p-10 rounded-3xl bg-slate-50 border border-slate-200">
                <div className="flex flex-col md:flex-row gap-8 items-start">
                  {/* Director Photo */}
                  <div className="flex-shrink-0">
                    <div className="w-32 h-32 md:w-40 md:h-40 rounded-2xl bg-slate-200 overflow-hidden">
                      {ministry.director.photo ? (
                        <Image
                          src={ministry.director.photo}
                          alt={ministry.director.name}
                          width={160}
                          height={160}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-400">
                          <span className="text-4xl">👤</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Director Info */}
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-slate-900 mb-1">
                      {ministry.director.name}
                    </h3>
                    <p className="text-[oklch(0.32_0.10_245)] font-medium mb-4">
                      {ministry.director.title}
                    </p>
                    <p className="text-slate-600 leading-relaxed">
                      {ministry.director.bio}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Placeholder for ministries without custom content */}
            {!ministry.hasCustomContent && (
              <div className="mt-12 p-8 rounded-3xl bg-slate-50 border border-slate-200">
                <p className="text-slate-500 text-center">
                  {t("더 많은 내용이 곧 추가됩니다.", "More content coming soon.")}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Other Ministries */}
      <section className="py-20 md:py-28 bg-slate-50">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
              {t("다른 사역 보기", "Explore Other Ministries")}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {otherMinistries.map((m, i) => (
                <Link
                  href={`/ministries/${m.slug}`}
                  key={i}
                  className="group p-6 bg-white rounded-2xl border border-slate-200 hover:border-[oklch(0.32_0.10_245_/_0.3)] hover:shadow-lg transition-all duration-300"
                >
                  <span className="text-3xl text-[oklch(0.52_0.20_12_/_0.5)] group-hover:text-[oklch(0.52_0.20_12)] transition-colors block mb-3">
                    {m.icon}
                  </span>
                  <h3 className="font-bold text-slate-900 group-hover:text-[oklch(0.32_0.10_245)] transition-colors">
                    {m.title}
                  </h3>
                  <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-[oklch(0.32_0.10_245)] mt-2 transition-colors" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

