"use client"

import { useState, useRef } from "react"
import { Envelope } from "@/components/wedding/envelope"
import { AudioPlayer } from "@/components/wedding/audio-player"
import { WeddingHeader } from "@/components/wedding/wedding-header"
import { ParentsSection } from "@/components/wedding/parents-section"
import { CoupleSection } from "@/components/wedding/couple-section"
import { CalendarSection } from "@/components/wedding/calendar-section"
import { EventsSection } from "@/components/wedding/events-section"
import { ScheduleSection } from "@/components/wedding/schedule-section"
import { RsvpSection } from "@/components/wedding/rsvp-section"
import { SaveDateSection } from "@/components/wedding/save-date-section"
import { GiftsSection } from "@/components/wedding/gifts-section"
import { MessagesSection } from "@/components/wedding/messages-section"
import { WeddingFooter } from "@/components/wedding/wedding-footer"

// ============================================
// CONFIGURACION DE LA BODA - EDITA AQUI TUS DATOS
// ============================================
const WEDDING_CONFIG = {
  // Nombres de los novios
  bride: "Nathaly",
  groom: "Kevin",
  brideFullName: "Sandra Nathaly García García",
  groomFullName: "Kevin Emanuel Antonio López Deocuté",

  // Fecha del evento
  date: new Date(2026, 4, 1), // Mayo es mes 4 (0-indexed)
  dateString: "01.05.2026",

  // Cita biblica
  biblicalQuote: "El amor es paciente, es bondadoso. El amor no es envidioso ni jactancioso ni orgulloso.",
  biblicalReference: "1 Corintios 13:4",

  // Nombres de los padres
  parents: {
    brideFather: "Julio Enrique García Alvizures",
    brideMother: "Sandra Isabel García Oscal de García",
    groomFather: "Marco Antonio Lopéz Rodriguez",
    groomMother: "Mayra Elizabeth Deocuté Raymundo",
  },

  // Ceremonia religiosa
  ceremony: {
    time: "15:00",
    church: "Parroquia Laguna Bermeja",
    address: "Calle Principal, Laguna Bermeja, zona 7, Santa Catarina Pinula",
    mapsUrl: "https://maps.app.goo.gl/apGV57mBSAH1NiUE7",
  },

  // Recepcion
  reception: {
    time: "17:00",
    venue: "Finca Don Pepe",
    address: "Carretera Principal, Laguna Bermeja, zona 7, Santa Catarina pinula",
    mapsUrl: "https://maps.app.goo.gl/p9jkehoAmaKkt55e6",
  },

  // WhatsApp para confirmacion (sin el +)
  whatsapp: "50230811932",

  // Mesa de regalos
  gifts: {
    message: "Tu presencia es nuestro mejor regalo; sin embargo, si deseas obsequiarnos algo, el dia del evento encontraras un espacio destinado para recibir aportes en efectivo.",
  },

  // Itinerario del dia
  schedule: [
    { time: "15:00", event: "Misa", icon: "church" },
    { time: "16:30", event: "Sesion de Fotos", icon: "camera" },
    { time: "17:00", event: "Ingreso de Novios", icon: "party" },
    { time: "17:30", event: "Brindis", icon: "cocktail" },
    { time: "18:00", event: "Cena", icon: "dinner" },
    { time: "18:30", event: "Primer Baile", icon: "dance" },
    { time: "19:00", event: "Fiesta", icon: "party" },
  ],

  // Imagen de la pareja (opcional)
  coupleImage: "/images/couple.jpeg",

  // Cancion de fondo (coloca tu archivo en public/)
  songUrl: "/primera.mp3",
}

export default function WeddingInvitation() {
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  const handleOpenEnvelope = () => {
    setIsEnvelopeOpen(true)
    // Intentar reproducir la musica cuando se abre el sobre
    if (audioRef.current) {
      audioRef.current.play().then(() => {
        setIsPlaying(true)
      }).catch(() => {
        // El navegador bloqueo la reproduccion automatica
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
      {/* Fondo con imagen estilo boda */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/final-xCOTv0UGLMpmlVuFxfNWsMzSpUlM69.png')`,
          filter: 'blur(8px) brightness(1.1)',
          transform: 'scale(1.1)',
        }}
      />
      {/* Overlay para legibilidad */}
      <div className="fixed inset-0 bg-gradient-to-b from-white/85 via-white/80 to-white/85" />

      {/* Audio player oculto */}
      <audio ref={audioRef} src={WEDDING_CONFIG.songUrl} loop />

      {/* Control de musica flotante */}
      {isEnvelopeOpen && (
        <AudioPlayer isPlaying={isPlaying} onToggle={toggleMusic} />
      )}

      {/* Sobre de la invitacion */}
      {!isEnvelopeOpen && (
        <Envelope
          bride={WEDDING_CONFIG.bride}
          groom={WEDDING_CONFIG.groom}
          date={WEDDING_CONFIG.dateString}
          onOpen={handleOpenEnvelope}
        />
      )}

      {/* Contenido de la invitacion */}
      {isEnvelopeOpen && (
        <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000">
          {/* Header con logo y fecha */}
          <WeddingHeader
            bride={WEDDING_CONFIG.bride}
            groom={WEDDING_CONFIG.groom}
            date={WEDDING_CONFIG.dateString}
            quote={WEDDING_CONFIG.biblicalQuote}
            quoteReference={WEDDING_CONFIG.biblicalReference}
          />

          {/* Seccion de padres */}
          <ParentsSection parents={WEDDING_CONFIG.parents} />

          {/* Seccion de la pareja */}
          <CoupleSection
            bride={WEDDING_CONFIG.bride}
            groom={WEDDING_CONFIG.groom}
            brideFullName={WEDDING_CONFIG.brideFullName}
            groomFullName={WEDDING_CONFIG.groomFullName}
            image={WEDDING_CONFIG.coupleImage}
          />

          {/* Calendario */}
          <CalendarSection date={WEDDING_CONFIG.date} />

          {/* Eventos: Misa y Recepcion */}
          <EventsSection
            ceremony={WEDDING_CONFIG.ceremony}
            reception={WEDDING_CONFIG.reception}
          />

          {/* Itinerario */}
          <ScheduleSection schedule={WEDDING_CONFIG.schedule} />

          {/* RSVP - Confirmacion */}
          <RsvpSection
            whatsapp={WEDDING_CONFIG.whatsapp}
            bride={WEDDING_CONFIG.bride}
            groom={WEDDING_CONFIG.groom}
          />

          {/* Guardar fecha */}
          <SaveDateSection
            date={WEDDING_CONFIG.date}
            ceremony={WEDDING_CONFIG.ceremony}
            reception={WEDDING_CONFIG.reception}
            bride={WEDDING_CONFIG.bride}
            groom={WEDDING_CONFIG.groom}
          />

          {/* Mesa de regalos */}
          <GiftsSection gifts={WEDDING_CONFIG.gifts} />

          {/* Mensajes para los novios */}
          <MessagesSection
            bride={WEDDING_CONFIG.bride}
            groom={WEDDING_CONFIG.groom}
          />

          {/* Footer */}
          <WeddingFooter
            bride={WEDDING_CONFIG.bride}
            groom={WEDDING_CONFIG.groom}
          />
        </div>
      )}
    </main>
  )
}
