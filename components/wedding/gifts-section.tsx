"use client"

import { Gift } from "lucide-react"

interface GiftsSectionProps {
  gifts: {
    message: string
  }
}

export function GiftsSection({ gifts }: GiftsSectionProps) {
  return (
    <section className="py-16 px-4">
      <div className="max-w-md mx-auto">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#c9a45c]/10 flex items-center justify-center">
            <Gift className="w-8 h-8 text-[#c9a45c]" />
          </div>
          <h2 className="font-[family-name:var(--font-script)] text-4xl md:text-5xl text-[#c9a45c] mb-6">
            Mesa de Regalos
          </h2>
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-[#c9a45c]/20">
            <p className="text-[#111111]/100 text-lg leading-relaxed whitespace-pre-line">
              {gifts.message}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
