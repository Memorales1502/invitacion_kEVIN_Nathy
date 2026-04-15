"use client"

import { Church, Camera, Wine, UtensilsCrossed, Music, PartyPopper } from "lucide-react"

interface ScheduleItem {
  time: string
  event: string
  icon: string
}

interface ScheduleSectionProps {
  schedule: ScheduleItem[]
}

const iconMap: Record<string, React.ReactNode> = {
  church: <Church className="w-5 h-5" />,
  camera: <Camera className="w-5 h-5" />,
  cocktail: <Wine className="w-5 h-5" />,
  dinner: <UtensilsCrossed className="w-5 h-5" />,
  dance: <Music className="w-5 h-5" />,
  party: <PartyPopper className="w-5 h-5" />,
}

export function ScheduleSection({ schedule }: ScheduleSectionProps) {
  return (
    <section className="py-16 px-4 bg-white/30 backdrop-blur-sm">
      <div className="max-w-2xl mx-auto">
        <h2 className="font-[family-name:var(--font-script)] text-4xl md:text-5xl text-center text-[#c9a45c] mb-12">
          Itinerario
        </h2>
        
        <div className="relative">
          {/* Linea vertical */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-[#c9a45c]/20 via-[#c9a45c]/40 to-[#c9a45c]/20" />
          
          <div className="space-y-8">
            {schedule.map((item, index) => (
              <div 
                key={index}
                className={`flex items-center gap-4 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
              >
                <div className={`flex-1 ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                  <p className="text-xl font-semibold text-[#5a4a3a]">{item.event}</p>
                  <p className="text-lg text-[#5a4a3a]">{item.time} hrs</p>
                </div>
                
                <div className="relative z-10 w-12 h-12 rounded-full bg-white border-2 border-[#c9a45c] flex items-center justify-center text-[#c9a45c] shadow-lg">
                  {iconMap[item.icon] || <PartyPopper className="w-5 h-5" />}
                </div>
                
                <div className="flex-1" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
