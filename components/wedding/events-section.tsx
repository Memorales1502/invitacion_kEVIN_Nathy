"use client"

import { Church, PartyPopper, MapPin, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"

interface EventsSectionProps {
  ceremony: {
    time: string
    church: string
    address: string
    mapsUrl: string
  }
  reception: {
    time: string
    venue: string
    address: string
    mapsUrl: string
  }
}

export function EventsSection({ ceremony, reception }: EventsSectionProps) {
  return (
    <section className="py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="font-[family-name:var(--font-script)] text-4xl md:text-5xl text-center text-[#c9a45c] mb-12">
          Celebremos Juntos
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Ceremonia */}
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 text-center shadow-lg border border-[#c9a45c]/20 hover:shadow-xl transition-shadow">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#c9a45c]/10 flex items-center justify-center">
              <Church className="w-8 h-8 text-[#c9a45c]" />
            </div>
            <h3 className="text-2xl font-semibold text-[#5a4a3a] mb-2">Ceremonia Religiosa</h3>
            <div className="space-y-3 text-[#5a4a3a]">
              <div className="flex items-center justify-center gap-2">
                <Clock className="w-5 h-5" />
                <span className="text-xl">{ceremony.time} hrs</span>
              </div>
              <p className="text-xl font-medium text-[#5a4a3a]">{ceremony.church}</p>
              <p className="text-lg">{ceremony.address}</p>
            </div>
            <Button 
              variant="outline"
              className="mt-6 border-[#c9a45c] text-[#c9a45c] hover:bg-[#c9a45c] hover:text-white"
              onClick={() => window.open(ceremony.mapsUrl, '_blank')}
            >
              <MapPin className="w-4 h-4 mr-2" />
              Ver Ubicacion
            </Button>
          </div>

          {/* Recepcion */}
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 text-center shadow-lg border border-[#c9a45c]/20 hover:shadow-xl transition-shadow">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#c9a45c]/10 flex items-center justify-center">
              <PartyPopper className="w-8 h-8 text-[#c9a45c]" />
            </div>
            <h3 className="text-2xl font-semibold text-[#5a4a3a] mb-2">Recepcion</h3>
            <div className="space-y-3 text-[#5a4a3a]">
              <div className="flex items-center justify-center gap-2">
                <Clock className="w-5 h-5" />
                <span className="text-xl">{reception.time} hrs</span>
              </div>
              <p className="text-xl font-medium text-[#5a4a3a]">{reception.venue}</p>
              <p className="text-lg">{reception.address}</p>
            </div>
            <Button 
              variant="outline"
              className="mt-6 border-[#c9a45c] text-[#c9a45c] hover:bg-[#c9a45c] hover:text-white"
              onClick={() => window.open(reception.mapsUrl, '_blank')}
            >
              <MapPin className="w-4 h-4 mr-2" />
              Ver Ubicacion
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
