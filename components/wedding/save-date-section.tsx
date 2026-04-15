"use client"

import { CalendarPlus, Download } from "lucide-react"
import { Button } from "@/components/ui/button"

interface SaveDateSectionProps {
  date: Date
  ceremony: {
    time: string
    church: string
    address: string
  }
  reception: {
    time: string
    venue: string
    address: string
  }
  bride: string
  groom: string
}

export function SaveDateSection({ date, ceremony, reception, bride, groom }: SaveDateSectionProps) {
  const formatDateForGoogle = (d: Date, time: string) => {
    const [hours, minutes] = time.split(':')
    const startDate = new Date(d)
    startDate.setHours(parseInt(hours), parseInt(minutes))
    
    const endDate = new Date(startDate)
    endDate.setHours(endDate.getHours() + 6)
    
    const format = (dt: Date) => dt.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'
    return `${format(startDate)}/${format(endDate)}`
  }

  const generateGoogleCalendarUrl = () => {
    const title = encodeURIComponent(`Boda de ${bride} y ${groom}`)
    const details = encodeURIComponent(
      `Ceremonia: ${ceremony.time} hrs en ${ceremony.church}\n` +
      `Recepcion: ${reception.time} hrs en ${reception.venue}\n\n` +
      `Los esperamos!`
    )
    const location = encodeURIComponent(`${ceremony.church}, ${ceremony.address}`)
    const dates = formatDateForGoogle(date, ceremony.time)
    
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}&dates=${dates}`
  }

  const generateICS = () => {
    const [ceremonyHours, ceremonyMinutes] = ceremony.time.split(':')
    const startDate = new Date(date)
    startDate.setHours(parseInt(ceremonyHours), parseInt(ceremonyMinutes))
    
    const endDate = new Date(startDate)
    endDate.setHours(endDate.getHours() + 6)

    const formatICSDate = (d: Date) => {
      return d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'
    }

    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Wedding Invitation//ES
BEGIN:VEVENT
UID:${Date.now()}@wedding
DTSTAMP:${formatICSDate(new Date())}
DTSTART:${formatICSDate(startDate)}
DTEND:${formatICSDate(endDate)}
SUMMARY:Boda de ${bride} y ${groom}
DESCRIPTION:Ceremonia: ${ceremony.time} hrs en ${ceremony.church}\\nRecepcion: ${reception.time} hrs en ${reception.venue}
LOCATION:${ceremony.church}, ${ceremony.address}
END:VEVENT
END:VCALENDAR`

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `boda-${bride.toLowerCase()}-${groom.toLowerCase()}.ics`
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <section className="py-16 px-4 bg-white/30 backdrop-blur-sm">
      <div className="max-w-md mx-auto text-center">
        <h2 className="font-[family-name:var(--font-script)] text-4xl md:text-5xl text-[#c9a45c] mb-4">
          Guarda la Fecha
        </h2>
        <p className="text-[#5a4a3a]/70 mb-8">
          No olvides nuestra celebración, agregala a tu calendario
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            onClick={() => window.open(generateGoogleCalendarUrl(), '_blank')}
            className="bg-[#c9a45c] hover:bg-[#b8944c] text-white"
          >
            <CalendarPlus className="w-4 h-4 mr-2" />
            Google Calendar
          </Button>
          
          <Button 
            variant="outline"
            onClick={generateICS}
            className="border-[#c9a45c] text-[#c9a45c] hover:bg-[#c9a45c] hover:text-white"
          >
            <Download className="w-4 h-4 mr-2" />
            Descargar .ICS
          </Button>
        </div>
      </div>
    </section>
  )
}
