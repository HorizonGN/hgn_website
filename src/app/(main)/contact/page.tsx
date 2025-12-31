"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Phone, Mail, Clock } from "lucide-react"
import { useLanguage } from "@/context/LanguageContext"
import { contact } from "@/lib/translations"

export default function ContactPage() {
  const { t } = useLanguage()

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-center mb-4">{t(contact.title.ko, contact.title.en)}</h1>
      <p className="text-center text-muted-foreground mb-12">
        {t(contact.subtitle.ko, contact.subtitle.en)}
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {/* 지도 영역 */}
        <Card>
          <CardContent className="p-0">
            <div className="aspect-square bg-muted flex items-center justify-center rounded-lg">
              <p className="text-muted-foreground">
                {t(contact.mapArea.ko, contact.mapArea.en)}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* 연락처 정보 */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary" />
                {t(contact.address.ko, contact.address.en)}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                {t(contact.addressText1.ko, contact.addressText1.en)}<br />
                {t(contact.addressText2.ko, contact.addressText2.en)}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="w-5 h-5 text-primary" />
                {t(contact.phone.ko, contact.phone.en)}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">02-1234-5678</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-primary" />
                {t(contact.email.ko, contact.email.en)}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">contact@hgn.org</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                {t(contact.meetingTimes.ko, contact.meetingTimes.en)}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-muted-foreground">
                <p><span className="font-medium text-foreground">{t(contact.sundayService.ko, contact.sundayService.en)}</span> {t("오전 11:00", "11:00 AM")}</p>
                <p><span className="font-medium text-foreground">{t(contact.wednesdayService.ko, contact.wednesdayService.en)}</span> {t("오후 7:30", "7:30 PM")}</p>
                <p><span className="font-medium text-foreground">{t(contact.morningPrayer.ko, contact.morningPrayer.en)}</span> {t("오전 5:30", "5:30 AM")}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
