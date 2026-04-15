"use client"

import { Gift, Landmark, Wallet } from "lucide-react"

interface GiftsSectionProps {
  gifts: {
    message: string
  }
}

export function GiftsSection({ gifts }: GiftsSectionProps) {
  return (
    <section className="py-16 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#c9a45c]/10 flex items-center justify-center">
            <Gift className="w-8 h-8 text-[#c9a45c]" />
          </div>

          <h2 className="font-[family-name:var(--font-script)] text-4xl md:text-5xl text-[#c9a45c] mb-8">
            Mesa de Regalos
          </h2>

          <div className="bg-white/80 backdrop-blur-sm rounded-[28px] p-8 md:p-10 shadow-lg border border-[#c9a45c]/20">
            <div className="space-y-8">
              <div>
                <p className="text-[#111111] text-lg md:text-xl leading-relaxed">
                  Tu presencia es nuestro mejor regalo. Si deseas hacernos un
                  obsequio, el día del evento encontrarás un espacio destinado
                  para recibir aportes en efectivo.
                </p>
              </div>

              <div className="w-20 h-px bg-[#c9a45c]/40 mx-auto" />

              <div className="bg-[#faf7f2] border border-[#c9a45c]/70 rounded-2xl p-6 md:p-8 text-left">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <Landmark className="w-5 h-5 text-[#111111]" />
                  <h3 className="text-[#111111] uppercase tracking-[0.18em] text-sm font-medium">
                    Si lo Prefieres
                  </h3>
                </div>

                <div className="space-y-3 text-center">
                  <p className="text-[#111111] text-base md:text-lg leading-relaxed">
                    También puedes realizar tu obsequio por
                    medio de transferencia bancaria.
                  </p>

                  <div className="bg-white rounded-xl border border-[#111111]/100 px-5 py-4 shadow-sm">
                    <p className="text-sm uppercase tracking-[0.18em] text-[#111111] mb-2">
                      Banco Industrial - Cuenta Monetaria
                    </p>
                    <p className="text-[#111111] text-xl md:text-2xl tracking-wide font-medium">
                      7179774679
                    </p>
                    <p className="text-[#111111]/80 text-base mt-3">
                      A nombre de Sandra Nathaly G.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center gap-2 text-[#111111]/70">
                <Wallet className="w-4 h-4 text-[#c9a45c]" />
                <p className="text-sm md:text-base">
                  “Gracias por acompañarnos en este día tan especial; tu presencia es, sin duda, nuestro mejor regalo.”.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
