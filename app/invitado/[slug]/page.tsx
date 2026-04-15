"use client"

import { useState, useEffect } from "react"

interface EnvelopeProps {
  bride: string
  groom: string
  date: string
  onOpen: () => void
  guestName?: string
}

export function Envelope({ bride, groom, date, onOpen, guestName }: EnvelopeProps) {
  const [isCardRising, setIsCardRising] = useState(false)
  const [isReady, setIsReady] = useState(false)
  const [isFadingOut, setIsFadingOut] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsReady(true), 800)
    return () => clearTimeout(timer)
  }, [])

  const handleClick = () => {
    if (isReady && !isCardRising) {
      setIsCardRising(true)
      setTimeout(() => setIsFadingOut(true), 1200)
      setTimeout(() => onOpen(), 2000)
    }
  }

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/final-xCOTv0UGLMpmlVuFxfNWsMzSpUlM69.png')",
        }}
      />

      <div className="absolute inset-0 bg-black/5" />

      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className={`relative transition-all duration-1000 ${isReady ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}>
          <div
            className={`relative cursor-pointer transition-transform duration-500 ${
              !isCardRising ? "hover:scale-[1.02]" : ""
            }`}
            onClick={handleClick}
          >
            <div className="relative w-[320px] h-[240px] sm:w-[420px] sm:h-[300px] md:w-[520px] md:h-[360px]">
              <div
                className="absolute left-1/2 top-1/2 w-[90%] transition-all ease-out"
                style={{
                  transform: `translateX(-50%) translateY(${isCardRising ? "-80%" : "-50%"})`,
                  zIndex: 15,
                }}
              >
                <div className="bg-[#fffef9] rounded-sm overflow-hidden shadow-lg">
                  <div className="m-3 border border-[#c1ab82]/50">
                    <div className="px-10 py-12 text-center">

                      {/* 🔥 PARA + NOMBRE */}
                      {guestName && (
                        <div className="mb-4">
                          <p className="text-[#8a7a68] text-xs tracking-[0.2em] mb-1">
                            Para:
                          </p>

                          <p
                            className="text-[#5a4a3a]"
                            style={{
                              fontFamily: "var(--font-script)",
                              fontSize: "32px",   // 👈 MÁS PEQUEÑO
                              lineHeight: "1.1",
                            }}
                          >
                            {guestName}
                          </p>
                        </div>
                      )}

                      {/* TITULO PRINCIPAL */}
                      <p className="text-[#5a4a3a] text-2xl tracking-[0.35em] uppercase mb-4">
                        Nos Casamos
                      </p>

                      <p className="text-[#5a4a3a] text-5xl" style={{ fontFamily: "var(--font-script)" }}>
                        {groom}
                      </p>

                      <p className="text-[#c1ab82] text-3xl my-2">&</p>

                      <p className="text-[#5a4a3a] text-5xl" style={{ fontFamily: "var(--font-script)" }}>
                        {bride}
                      </p>

                      <p className="mt-4 text-lg tracking-[0.25em] uppercase">
                        {date}
                      </p>

                      <p className="mt-4 text-sm text-[#c9a45c] italic animate-pulse">
                        Haz clic para ver la invitacion
                      </p>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {!isCardRising && isReady && (
            <div className="absolute -bottom-14 left-1/2 -translate-x-1/2 text-xs text-[#8a7a68] animate-pulse">
              TOCA AQUÍ
            </div>
          )}
        </div>
      </div>

      <div
        className={`absolute inset-0 bg-[#f8f5f0] transition-opacity duration-800 ${
          isFadingOut ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  )
}
