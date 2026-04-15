"use client"

import { Heart, Sparkles } from "lucide-react"
import Image from "next/image"

interface CoupleSectionProps {
  bride: string
  groom: string
  brideFullName: string
  groomFullName: string
  image?: string
}

export function CoupleSection({ bride, groom, brideFullName, groomFullName, image }: CoupleSectionProps) {
  return (
    <section className="py-20 px-4 relative overflow-hidden">
      <div className="max-w-2xl mx-auto text-center relative z-10">
        <div className="flex items-center justify-center gap-2 mb-6">
          <Sparkles className="w-5 h-5 text-[#c9a45c]" />
          <h2 className="text-lg md:text-xl tracking-[0.4em] text-[#5a4a3a] uppercase font-medium">
            Nosotros
          </h2>
          <Sparkles className="w-5 h-5 text-[#c9a45c]" />
        </div>

        {/* Nombres completos */}
        <div className="mb-8">
          <h3 className="font-[family-name:var(--font-script)] text-3xl md:text-4xl lg:text-5xl text-[#5a4a3a] mb-2">
            {groomFullName}
          </h3>
          <span className="font-[family-name:var(--font-script)] text-3xl md:text-4xl text-[#c9a45c] block my-3">
            &
          </span>
          <h3 className="font-[family-name:var(--font-script)] text-3xl md:text-4xl lg:text-5xl text-[#5a4a3a]">
            {brideFullName}
          </h3>
        </div>

        <p className="text-xl md:text-2xl text-[#5a4a3a] leading-relaxed mb-8">
          Nos encantaria celebrar junto a ti nuestra boda
        </p>

        <div className="flex items-center justify-center gap-4">
          <div className="h-px w-16 bg-[#c9a45c]" />
          <Heart className="w-6 h-6 text-[#c9a45c] fill-current animate-pulse" />
          <div className="h-px w-16 bg-[#c9a45c]" />
        </div>

        {/* Foto de la pareja - mas grande y sin circulos decorativos */}
        <div className="mt-12">
          <div className="relative w-80 h-96 md:w-96 md:h-[500px] mx-auto rounded-2xl border-4 border-[#c9a45c]/30 overflow-hidden bg-white/50 shadow-xl">
            {image ? (
              <Image 
                src={image} 
                alt={`${bride} y ${groom}`}
                fill
                className="object-cover object-center"
              />
            ) : (
              <div className="text-center p-8">
                <Heart className="w-16 h-16 text-[#c9a45c] mx-auto mb-4" />
                <p className="text-sm text-[#5a4a3a]/60">
                  Espacio para foto de la pareja
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
