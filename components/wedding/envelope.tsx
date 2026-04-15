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
          backgroundImage: `url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/final-xCOTv0UGLMpmlVuFxfNWsMzSpUlM69.png')`,
        }}
      />

      <div className="absolute inset-0 bg-black/5" />

      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div
          className={`relative transition-all duration-1000 ${
            isReady ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
        >
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
                  transform: `translateX(-50%) translateY(${isCardRising ? "-80%" : "-50%"}) scale(${isCardRising ? "1.05" : "1"})`,
                  transitionDuration: "1200ms",
                  transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
                  zIndex: 15,
                }}
              >
                <div
                  className="bg-[#fffef9] rounded-sm overflow-hidden"
                  style={{
                    boxShadow: isCardRising
                      ? "0 25px 60px rgba(0,0,0,0.2), 0 10px 25px rgba(0,0,0,0.15)"
                      : "0 8px 25px rgba(0,0,0,0.12), 0 3px 10px rgba(0,0,0,0.08)",
                  }}
                >
                  <div
                    className="m-2 sm:m-3 rounded-sm"
                    style={{
                      border: "1px solid rgba(193,171,130,0.5)",
                      boxShadow: "inset 0 0 0 1px rgba(193,171,130,0.15)",
                    }}
                  >
                    <div className="px-6 py-8 sm:px-10 sm:py-12 md:px-14 md:py-16 text-center">
                      {guestName && (
                        <div className="mb-3 sm:mb-4">
                          <p
                            className="text-[#8a7a68] text-[10px] sm:text-xs tracking-[0.2em] mb-1"
                            style={{ fontFamily: "var(--font-serif)", fontWeight: 400 }}
                          >
                            Para:
                          </p>
                          <p
                            className="text-[#5a4a3a] text-xl sm:text-2xl md:text-3xl font-medium leading-tight"
                            style={{ fontFamily: "var(--font-script)" }}
                          >
                            {guestName}
                          </p>
                        </div>
                      )}

                      <p
                        className="text-[#5a4a3a] text-base sm:text-xl md:text-2xl tracking-[0.35em] uppercase mb-4 sm:mb-5 font-medium"
                        style={{ fontFamily: "var(--font-serif)" }}
                      >
                        Nos Casamos
                      </p>

                      <div className="flex items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                        <LeafBranch className="w-10 h-5 sm:w-14 sm:h-7 text-[#c1ab82]" />
                        <HeartIcon className="w-3 h-3 sm:w-4 sm:h-4 text-[#c1ab82]" />
                        <LeafBranch className="w-10 h-5 sm:w-14 sm:h-7 text-[#c1ab82] -scale-x-100" />
                      </div>

                      <div className="mb-3 sm:mb-4">
                        <h1
                          className="text-[#5a4a3a] text-3xl sm:text-5xl md:text-6xl leading-tight"
                          style={{ fontFamily: "var(--font-script)" }}
                        >
                          {groom}
                        </h1>
                        <span
                          className="text-[#c1ab82] text-2xl sm:text-3xl md:text-4xl block my-1 sm:my-2"
                          style={{ fontFamily: "var(--font-script)" }}
                        >
                          &
                        </span>
                        <h1
                          className="text-[#5a4a3a] text-3xl sm:text-5xl md:text-6xl leading-tight"
                          style={{ fontFamily: "var(--font-script)" }}
                        >
                          {bride}
                        </h1>
                      </div>

                      <div className="flex items-center justify-center gap-2 sm:gap-3 mb-4 sm:mb-5">
                        <LeafBranch className="w-8 h-4 sm:w-12 sm:h-6 text-[#c1ab82]" />
                        <HeartIcon className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#c1ab82]" />
                        <LeafBranch className="w-8 h-4 sm:w-12 sm:h-6 text-[#c1ab82] -scale-x-100" />
                      </div>

                      <p
                        className="text-[#5a4a3a] text-base sm:text-xl md:text-2xl tracking-[0.25em] uppercase mb-5 sm:mb-6 font-medium"
                        style={{ fontFamily: "var(--font-serif)" }}
                      >
                        {date}
                      </p>

                      <p
                        className={`text-[#c9a45c] text-sm sm:text-base md:text-lg tracking-wide transition-opacity duration-500 font-medium ${
                          isCardRising ? "opacity-0" : "opacity-100 animate-pulse"
                        }`}
                        style={{ fontFamily: "var(--font-serif)", fontStyle: "italic" }}
                      >
                        Haz clic para ver la invitacion
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {!isCardRising && isReady && (
            <div className="absolute -bottom-14 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 animate-pulse">
              <ClickIcon className="w-6 h-6 text-[#8a7a68]/70" />
              <span
                className="text-[#8a7a68]/60 text-[10px] tracking-wider"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                TOCA AQUÍ
              </span>
            </div>
          )}
        </div>
      </div>

      <div
        className={`absolute inset-0 bg-[#f8f5f0] transition-opacity duration-800 pointer-events-none ${
          isFadingOut ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  )
}

function LeafBranch({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 50 25" fill="currentColor">
      <path
        d="M0 12.5 Q5 10 10 11 Q15 12 20 10 Q25 8 30 9 Q35 10 40 8 Q45 6 50 7"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.7"
      />
      <ellipse cx="8" cy="10" rx="4" ry="2" transform="rotate(-20 8 10)" opacity="0.6" />
      <ellipse cx="18" cy="9" rx="4" ry="2" transform="rotate(-15 18 9)" opacity="0.6" />
      <ellipse cx="28" cy="8" rx="4" ry="2" transform="rotate(-10 28 8)" opacity="0.6" />
      <ellipse cx="38" cy="7" rx="4" ry="2" transform="rotate(-5 38 7)" opacity="0.6" />
      <ellipse cx="12" cy="14" rx="3.5" ry="1.8" transform="rotate(15 12 14)" opacity="0.5" />
      <ellipse cx="22" cy="13" rx="3.5" ry="1.8" transform="rotate(10 22 13)" opacity="0.5" />
      <ellipse cx="32" cy="11" rx="3.5" ry="1.8" transform="rotate(5 32 11)" opacity="0.5" />
    </svg>
  )
}

function HeartIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  )
}

function ClickIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M13 2v10.17l3.59-3.58L18 10l-6 6-6-6 1.41-1.41L11 12.17V2h2zm-7 18h12v2H6v-2z" />
    </svg>
  )
}
