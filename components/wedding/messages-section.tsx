"use client"

import { useState } from "react"
import { Send, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

interface MessagesSectionProps {
  bride: string
  groom: string
}

// Numeros de WhatsApp de los novios
const GROOM_WHATSAPP = "50230811932" // Kevin
const BRIDE_WHATSAPP = "50246154154" // Nathaly

export function MessagesSection({ bride, groom }: MessagesSectionProps) {
  const [name, setName] = useState("")
  const [message, setMessage] = useState("")
  const [sent, setSent] = useState(false)

  const sendToWhatsApp = (phone: string, senderName: string, messageText: string) => {
    const text = encodeURIComponent(
      `Mensaje para la Boda de ${groom} & ${bride}\n\n` +
      `De: ${senderName}\n\n` +
      `Mensaje:\n"${messageText}"\n\n` +
      `Con carino y buenos deseos para su matrimonio`
    )
    return `https://wa.me/${phone}?text=${text}`
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !message.trim()) return

    // Abrir WhatsApp para Kevin (novio)
    const groomUrl = sendToWhatsApp(GROOM_WHATSAPP, name.trim(), message.trim())
    window.open(groomUrl, '_blank')

    // Mostrar opcion para enviar tambien a la novia
    setSent(true)
  }

  const sendToBride = () => {
    const brideUrl = sendToWhatsApp(BRIDE_WHATSAPP, name.trim(), message.trim())
    window.open(brideUrl, '_blank')
    
    // Limpiar formulario
    setName("")
    setMessage("")
    setSent(false)
  }

  const resetForm = () => {
    setName("")
    setMessage("")
    setSent(false)
  }

  return (
    <section className="py-16 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#c9a45c]/10 flex items-center justify-center">
            <MessageSquare className="w-8 h-8 text-[#c9a45c]" />
          </div>
          <h2 className="font-[family-name:var(--font-script)] text-4xl md:text-5xl text-[#c9a45c] mb-4">
            Mensajes para {groom} & {bride}
          </h2>
          <p className="text-xl text-[#5a4a3a]">
            Dejanos tus buenos deseos y bendiciones
          </p>
        </div>

        {/* Form */}
        {!sent ? (
          <form onSubmit={handleSubmit} className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-[#c9a45c]/20">
            <div className="space-y-4">
              <div>
                <Input
                  placeholder="Tu nombre"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-white/80 border-[#c9a45c]/30 focus:border-[#c9a45c] text-lg"
                  required
                />
              </div>
              <div>
                <Textarea
                  placeholder="Escribe tu mensaje de felicitacion..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  className="bg-white/80 border-[#c9a45c]/30 focus:border-[#c9a45c] resize-none text-lg"
                  required
                />
              </div>
              <Button 
                type="submit" 
                className="w-full bg-[#c9a45c] hover:bg-[#b8944c] text-white text-lg py-6"
              >
                <Send className="w-5 h-5 mr-2" />
                Enviar Mensaje por WhatsApp
              </Button>
            </div>
          </form>
        ) : (
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-[#c9a45c]/20 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold text-[#5a4a3a] mb-2">
              Mensaje enviado a {groom}
            </h3>
            <p className="text-lg text-[#5a4a3a] mb-6">
              Tambien puedes enviar el mismo mensaje a {bride}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button 
                onClick={sendToBride}
                className="bg-[#c9a45c] hover:bg-[#b8944c] text-white"
              >
                <Send className="w-4 h-4 mr-2" />
                Enviar tambien a {bride}
              </Button>
              <Button 
                onClick={resetForm}
                variant="outline"
                className="border-[#c9a45c] text-[#c9a45c] hover:bg-[#c9a45c] hover:text-white"
              >
                Enviar otro mensaje
              </Button>
            </div>
          </div>
        )}

        {/* Nota */}
        <p className="text-center text-[#5a4a3a] mt-6 text-base">
          Tu mensaje sera enviado directamente al WhatsApp de los novios
        </p>
      </div>
    </section>
  )
}
