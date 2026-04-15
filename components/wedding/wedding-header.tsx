"use client"

interface WeddingHeaderProps {
  bride: string
  groom: string
  date: string
  quote: string
  quoteReference: string
}

export function WeddingHeader({ bride, groom, date, quote, quoteReference }: WeddingHeaderProps) {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-center px-4 py-20 relative overflow-hidden">
      {/* Decoracion sutil */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 bg-[#c9a45c]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-[#d4c4a8]/20 rounded-full blur-3xl" />
      </div>

      {/* Nombres - Kevin primero, & en medio */}
      <div className="animate-fade-in-up mb-4">
        <h1 className="font-[family-name:var(--font-script)] text-5xl md:text-7xl lg:text-8xl text-[#5a4a3a]">
          {groom}
        </h1>
        <span className="font-[family-name:var(--font-script)] text-3xl md:text-4xl text-[#c9a45c] block my-2">
          &
        </span>
        <h1 className="font-[family-name:var(--font-script)] text-5xl md:text-7xl lg:text-8xl text-[#5a4a3a]">
          {bride}
        </h1>
      </div>

      {/* Fecha */}
      <div className="flex items-center gap-4 mb-8 animate-fade-in-up animation-delay-200">
        <div className="h-px w-16 md:w-24 bg-[#c9a45c]" />
        <p className="text-2xl md:text-3xl tracking-[0.3em] text-[#5a4a3a] font-medium">
          {date}
        </p>
        <div className="h-px w-16 md:w-24 bg-[#c9a45c]" />
      </div>

      {/* Cita biblica */}
      <div className="max-w-2xl mx-auto animate-fade-in-up animation-delay-400">
        <p className="text-xl md:text-2xl text-[#5a4a3a] italic leading-relaxed">
          &ldquo;{quote}&rdquo;
        </p>
        <p className="text-lg md:text-xl text-[#5a4a3a]/80 mt-3 tracking-wider">
          — {quoteReference}
        </p>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-[#c9a45c] rounded-full flex justify-center">
          <div className="w-1 h-3 bg-[#c9a45c] rounded-full mt-2 animate-scroll" />
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes fade-in-up {
          from { 
            opacity: 0; 
            transform: translateY(20px);
          }
          to { 
            opacity: 1; 
            transform: translateY(0);
          }
        }
        
        @keyframes scroll {
          0%, 100% { transform: translateY(0); opacity: 1; }
          50% { transform: translateY(6px); opacity: 0.5; }
        }
        
        .animate-fade-in {
          animation: fade-in 1s ease-out forwards;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out forwards;
        }
        
        .animation-delay-200 {
          animation-delay: 0.2s;
          opacity: 0;
          animation-fill-mode: forwards;
        }
        
        .animation-delay-400 {
          animation-delay: 0.4s;
          opacity: 0;
          animation-fill-mode: forwards;
        }
        
        .animate-scroll {
          animation: scroll 1.5s ease-in-out infinite;
        }
      `}</style>
    </section>
  )
}
