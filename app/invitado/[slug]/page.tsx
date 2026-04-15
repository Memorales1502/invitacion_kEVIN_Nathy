"use client"

import { useState, useRef, use } from "react"
import { notFound } from "next/navigation"
import { Envelope } from "@/components/wedding/envelope"
import { AudioPlayer } from "@/components/wedding/audio-player"
import { WeddingHeader } from "@/components/wedding/wedding-header"
import { ParentsSection } from "@/components/wedding/parents-section"
import { CoupleSection } from "@/components/wedding/couple-section"
import { CalendarSection } from "@/components/wedding/calendar-section"
import { EventsSection } from "@/components/wedding/events-section"
import { ScheduleSection } from "@/components/wedding/schedule-section"
import { PersonalizedRsvpSection } from "@/components/wedding/personalized-rsvp-section"
import { SaveDateSection } from "@/components/wedding/save-date-section"
import { GiftsSection } from "@/components/wedding/gifts-section"
import { PhotoGallery } from "@/components/wedding/photo-gallery"
import { MessagesSection } from "@/components/wedding/messages-section"
import { WeddingFooter } from "@/components/wedding/wedding-footer"
import { getGuestBySlug } from "@/lib/guests"

// Configuracion de la boda (misma que en page.tsx principal)
const WEDDING_CONFIG = {
  bride: "Nathaly",
  groom: "Kevin",
  brideFullName: "Sandra Nathaly García García",
  groomFullName: "Kevin Emanuel Antonio López Deocuté",
  date: new Date(2026, 4, 1),
  dateString: "01.05.2026",
  biblicalQuote: "El amor es paciente, es bondadoso. El amor no es envidioso ni jactancioso ni orgulloso.",
  biblicalReference: "1 Corintios 13:4",
  parents: {
    brideFather: "Julio Enrique García Alvizures",
    brideMother: "Sandra Isabel García Oscal de García",
    groomFather: "Marco Antonio Lopéz Rodriguez",
    groomMother: "Mayra Elizabeth Deocuté Raymundo",
  },
  ceremony: {
    time: "15:00",
    church: "Parroquia Laguna Bermeja",
    address: "Calle Principal, Laguna Bermeja, zona 7, Santa Catarina Pinula",
    mapsUrl: "https://maps.app.goo.gl/apGV57mBSAH1NiUE7",
  },
  reception: {
    time: "17:00",
    venue: "Finca Don Pepe",
    address: "Carretera Principal, Laguna Bermeja, zona 7, Santa Catarina pinula",
    mapsUrl: "https://maps.app.goo.gl/p9jkehoAmaKkt55e6",
  },
  whatsapp: "50230811932",
  gifts: {
    message: "Tu presencia es nuestro mejor regalo; sin embargo, si deseas obsequiarnos algo, el dia del evento encontraras un espacio destinado para recibir aportes en efectivo.",
  },
  schedule: [
    { time: "15:00", event: "Misa", icon: "church" },
    { time: "16:30", event: "Sesion de Fotos", icon: "camera" },
    { time: "17:00", event: "Ingreso de Novios", icon: "party" },
    { time: "17:30", event: "Brindis", icon: "cocktail" },
    { time: "18:00", event: "Cena", icon: "dinner" },
    { time: "18:30", event: "Primer Baile", icon: "dance" },
    { time: "19:00", event: "Fiesta", icon: "party" },
  ],
  coupleImage: "/images/couple.jpeg",
  songUrl: "/primera.mp3",
}

export default function GuestInvitation({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const guest = getGuestBySlug(slug)

  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  // Si no existe el invitado, mostrar 404
  if (!guest) {
    notFound()
  }

  const handleOpenEnvelope = () => {
    setIsEnvelopeOpen(true)
    if (audioRef.current) {
      audioRef.current.play().then(() => {
        setIsPlaying(true)
      }).catch(() => {
        console.log("[v0] Autoplay blocked by browser")
      })
    }
  }

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Fondo */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/final-xCOTv0UGLMpmlVuFxfNWsMzSpUlM69.png')`,
          filter: 'blur(8px) brightness(1.1)',
          transform: 'scale(1.1)',
        }}
      />
      <div className="fixed inset-0 bg-gradient-to-b from-white/85 via-white/80 to-white/85" />

      <audio ref={audioRef} src={WEDDING_CONFIG.songUrl} loop />

      {isEnvelopeOpen && (
        <AudioPlayer isPlaying={isPlaying} onToggle={toggleMusic} />
      )}

      {/* Sobre con nombre personalizado */}
      {!isEnvelopeOpen && (
        <Envelope
          bride={WEDDING_CONFIG.bride}
          groom={WEDDING_CONFIG.groom}
          date={WEDDING_CONFIG.dateString}
          onOpen={handleOpenEnvelope}
          guestName={guest.name}
        />
      )}

      {/* Contenido */}
      {isEnvelopeOpen && (
        <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000">
          {/* Saludo personalizado al invitado */}
          <section className="pt-20 pb-8 px-4 text-center relative z-10">
            <p className="text-lg md:text-xl text-[#5a4a3a]/70 mb-2">Querido(a)</p>
            <h1 className="font-[family-name:var(--font-script)] text-4xl md:text-5xl lg:text-6xl text-[#c9a45c] mb-4">
              {guest.name}
            </h1>
            {guest.message && (
              <p className="text-lg text-[#5a4a3a]/80 italic max-w-lg mx-auto">
                {guest.message}
              </p>
            )}
            <div className="mt-6 inline-flex items-center gap-2 bg-[#c9a45c]/10 px-6 py-3 rounded-full">
              <span className="text-[#5a4a3a] text-lg">
                Tienes <strong className="text-[#c9a45c] text-2xl">{guest.passes}</strong> {guest.passes === 1 ? 'pase' : 'pases'}
              </span>
            </div>
          </section>

          <WeddingHeader
            bride={WEDDING_CONFIG.bride}
            groom={WEDDING_CONFIG.groom}
            date={WEDDING_CONFIG.dateString}
            quote={WEDDING_CONFIG.biblicalQuote}
            quoteReference={WEDDING_CONFIG.biblicalReference}
          />

          <ParentsSection parents={WEDDING_CONFIG.parents} />

          <CoupleSection
            bride={WEDDING_CONFIG.bride}
            groom={WEDDING_CONFIG.groom}
            brideFullName={WEDDING_CONFIG.brideFullName}
            groomFullName={WEDDING_CONFIG.groomFullName}
            image={WEDDING_CONFIG.coupleImage}
          />

          <CalendarSection date={WEDDING_CONFIG.date} />

          <EventsSection
            ceremony={WEDDING_CONFIG.ceremony}
            reception={WEDDING_CONFIG.reception}
          />

          <ScheduleSection schedule={WEDDING_CONFIG.schedule} />

          {/* RSVP Personalizado - Confirmacion con base de datos */}
          <PersonalizedRsvpSection
            guestName={guest.name}
            guestSlug={guest.slug}
            passes={guest.passes}
          />

          <SaveDateSection
            date={WEDDING_CONFIG.date}
            ceremony={WEDDING_CONFIG.ceremony}
            reception={WEDDING_CONFIG.reception}
            bride={WEDDING_CONFIG.bride}
            groom={WEDDING_CONFIG.groom}
          />

          <GiftsSection gifts={WEDDING_CONFIG.gifts} />

          <PhotoGallery />

          <MessagesSection
            bride={WEDDING_CONFIG.bride}
            groom={WEDDING_CONFIG.groom}
          />

          <WeddingFooter
            bride={WEDDING_CONFIG.bride}
            groom={WEDDING_CONFIG.groom}
          />
        </div>
      )}
    </main>
  )
}
