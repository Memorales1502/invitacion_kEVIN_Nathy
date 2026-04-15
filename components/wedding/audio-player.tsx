"use client"

import { Volume2, VolumeX } from "lucide-react"
import { Button } from "@/components/ui/button"

interface AudioPlayerProps {
  isPlaying: boolean
  onToggle: () => void
}

export function AudioPlayer({ isPlaying, onToggle }: AudioPlayerProps) {
  return (
    <>
      <Button
        onClick={onToggle}
        variant="outline"
        size="icon"
        className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-card/80 backdrop-blur-sm border-primary/30 shadow-lg hover:bg-primary/10 transition-all duration-300"
        aria-label={isPlaying ? "Pausar musica" : "Reproducir musica"}
      >
        {isPlaying ? (
          <Volume2 className="w-6 h-6 text-primary" />
        ) : (
          <VolumeX className="w-6 h-6 text-muted-foreground" />
        )}
      </Button>
      
      {/* Indicador visual de musica */}
      {isPlaying && (
        <div className="fixed bottom-24 right-8 z-40 flex items-center gap-1">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="w-1 bg-primary rounded-full animate-music-bar"
              style={{
                height: '16px',
                animationDelay: `${i * 0.15}s`
              }}
            />
          ))}
        </div>
      )}

      <style jsx>{`
        @keyframes music-bar {
          0%, 100% {
            transform: scaleY(0.3);
          }
          50% {
            transform: scaleY(1);
          }
        }
        
        .animate-music-bar {
          animation: music-bar 0.8s ease-in-out infinite;
        }
      `}</style>
    </>
  )
}
