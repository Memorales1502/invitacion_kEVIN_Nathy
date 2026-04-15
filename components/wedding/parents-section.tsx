"use client"

import { Heart } from "lucide-react"

interface ParentsSectionProps {
  parents: {
    brideFather: string
    brideMother: string
    groomFather: string
    groomMother: string
  }
}

export function ParentsSection({ parents }: ParentsSectionProps) {
  return (
    <section className="py-20 px-4 bg-white/40 backdrop-blur-sm">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-lg md:text-xl tracking-[0.4em] text-[#5a4a3a] uppercase mb-8 font-medium">
          Con la bendicion de Dios y nuestros padres
        </h2>
        
        <div className="grid md:grid-cols-2 gap-12 md:gap-16">
          {/* Padres del Novio primero */}
          <div className="space-y-3">
            <p className="text-xl md:text-2xl text-[#5a4a3a]">
              {parents.groomFather}
            </p>
            <p className="text-xl text-[#c9a45c]">&</p>
            <p className="text-xl md:text-2xl text-[#5a4a3a]">
              {parents.groomMother}
            </p>
          </div>

          {/* Padres de la Novia */}
          <div className="space-y-3">
            <p className="text-xl md:text-2xl text-[#5a4a3a]">
              {parents.brideFather}
            </p>
            <p className="text-xl text-[#c9a45c]">&</p>
            <p className="text-xl md:text-2xl text-[#5a4a3a]">
              {parents.brideMother}
            </p>
          </div>
        </div>

        {/* Decorador */}
        <div className="flex items-center justify-center gap-4 mt-12">
          <div className="h-px w-20 bg-[#c9a45c]" />
          <Heart className="w-5 h-5 text-[#c9a45c] fill-current" />
          <div className="h-px w-20 bg-[#c9a45c]" />
        </div>
      </div>
    </section>
  )
}
