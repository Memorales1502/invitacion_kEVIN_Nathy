"use client"

import { Heart } from "lucide-react"

interface WeddingFooterProps {
  bride: string
  groom: string
}

export function WeddingFooter({ bride, groom }: WeddingFooterProps) {
  return (
    <footer className="py-16 px-4 text-center bg-white/40 backdrop-blur-sm">
      <div className="max-w-2xl mx-auto">
        {/* Decorative divider */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#c9a45c]/50" />
          <Heart className="w-6 h-6 text-[#c9a45c] fill-[#c9a45c]/20" />
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#c9a45c]/50" />
        </div>
        
        <h2 className="font-[family-name:var(--font-script)] text-4xl md:text-5xl text-[#c9a45c] mb-6">
          Gracias por ser parte de nuestra historia
        </h2>
        
        <p className="text-xl md:text-2xl text-[#5a4a3a] mb-10 leading-relaxed">
          Esperamos con ansias celebrar este dia tan especial junto a ti.
          Tu presencia hara nuestra boda aun mas memorable.
        </p>
        
        <p className="font-[family-name:var(--font-script)] text-3xl text-[#5a4a3a]">
          Con  cariño  y  Aprecio,
        </p>
        <p className="font-[family-name:var(--font-script)] text-5xl md:text-6xl text-[#c9a45c] mt-3">
          {groom} & {bride}
        </p>
        
        {/* Copyright */}
        <div className="mt-14 pt-8 border-t border-[#c9a45c]/20">
          <p className="text-2xl text-[#5a4a3a] font-medium">
            01.05.2026
          </p>
        </div>
      </div>
    </footer>
  )
}
