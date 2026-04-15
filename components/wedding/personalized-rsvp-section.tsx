"use client"

import { useState } from "react"
import { Check, X, Users, MessageSquare, Loader2, CheckCircle, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

interface PersonalizedRsvpSectionProps {
  guestName: string
  guestSlug: string
  passes: number
  alreadyConfirmed?: boolean | null
  previousAttendingCount?: number | null
}

export function PersonalizedRsvpSection({
  guestName,
  guestSlug,
  passes,
  alreadyConfirmed,
  previousAttendingCount,
}: PersonalizedRsvpSectionProps) {
  const [attendingCount, setAttendingCount] = useState(previousAttendingCount || passes)
  const [message, setMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(alreadyConfirmed === true || alreadyConfirmed === false)
  const [response, setResponse] = useState<"yes" | "no" | null>(
    alreadyConfirmed === true ? "yes" : alreadyConfirmed === false ? "no" : null
  )
  const [attendance, setAttendance] = useState<"yes" | "no">("yes")
  const [error, setError] = useState<string | null>(null)

  const handleConfirm = async () => {
    const willAttend = attendance === "yes"
    setIsSubmitting(true)
    setError(null)

    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug: guestSlug,
          confirmed: willAttend,
          attendingCount: willAttend ? attendingCount : 0,
          message: message.trim() || null,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || "Error al confirmar")
      }

      setResponse(willAttend ? "yes" : "no")
      setSubmitted(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al enviar confirmacion")
    } finally {
      setIsSubmitting(false)
    }
  }

  // Si ya confirmo, mostrar estado
  if (submitted || alreadyConfirmed !== null && alreadyConfirmed !== undefined) {
    const finalResponse = response || (alreadyConfirmed ? "yes" : "no")
    const finalCount = attendingCount || previousAttendingCount || 0
    
    return (
      <section className="py-16 px-4">
        <div className="max-w-lg mx-auto text-center">
          <div
            className={`w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center ${
              finalResponse === "yes" ? "bg-green-100" : "bg-red-100"
            }`}
          >
            {finalResponse === "yes" ? (
              <Check className="w-10 h-10 text-green-600" />
            ) : (
              <X className="w-10 h-10 text-red-600" />
            )}
          </div>

          <h2 className="font-[family-name:var(--font-script)] text-4xl md:text-5xl text-[#c9a45c] mb-4">
            {finalResponse === "yes" ? "Asistencia Confirmada" : "No podras asistir"}
          </h2>

          {finalResponse === "yes" ? (
            <div className="space-y-4">
              <p className="text-xl text-[#5a4a3a]">
                Hemos registrado tu asistencia
              </p>
              <div className="bg-[#c9a45c]/10 rounded-xl p-6 inline-block">
                <p className="text-lg text-[#5a4a3a]/70">Invitado</p>
                <p className="text-2xl font-semibold text-[#5a4a3a]">{guestName}</p>
                <p className="text-lg text-[#5a4a3a]/70 mt-4">Personas confirmadas</p>
                <p className="text-4xl font-bold text-[#c9a45c]">{finalCount}</p>
              </div>
              <p className="text-xl text-[#5a4a3a]/70 mt-6">
                Te esperamos el 1 de Mayo de 2026
              </p>
            </div>
          ) : (
            <p className="text-xl text-[#5a4a3a]/70">
              Gracias por avisarnos. Te deseamos lo mejor.
            </p>
          )}
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 px-4">
      <div className="max-w-lg mx-auto">
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#c9a45c]/10 flex items-center justify-center">
            <Users className="w-8 h-8 text-[#c9a45c]" />
          </div>
          <h2 className="font-[family-name:var(--font-script)] text-4xl md:text-5xl text-[#c9a45c] mb-4">
            Confirma tu Asistencia
          </h2>
          <p className="text-xl text-[#5a4a3a]/70 mb-2">
            Por favor confirma antes del 17 de Abril de 2026
          </p>
        </div>

        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-[#c9a45c]/20">
          {/* Info del invitado */}
          <div className="text-center mb-8 pb-6 border-b border-[#c9a45c]/20">
            <p className="text-[#5a4a3a]/70 text-lg">Invitado</p>
            <p className="text-2xl font-semibold text-[#5a4a3a]">{guestName}</p>
            <div className="mt-4 inline-flex items-center gap-2 bg-[#c9a45c]/10 px-4 py-2 rounded-full">
              <Users className="w-5 h-5 text-[#c9a45c]" />
              <span className="text-[#5a4a3a] font-medium text-lg">
                {passes} {passes === 1 ? "pase disponible" : "pases disponibles"}
              </span>
            </div>
          </div>

          {/* Pregunta de asistencia */}
          <div className="space-y-3 mb-6">
            <Label className="text-lg text-[#5a4a3a]">¿Podras asistir?</Label>
            <RadioGroup 
              value={attendance} 
              onValueChange={(val) => setAttendance(val as "yes" | "no")} 
              className="space-y-3"
            >
              <div className="flex items-center space-x-3 p-4 rounded-lg border border-[#c9a45c]/20 hover:bg-[#c9a45c]/5 transition-colors cursor-pointer">
                <RadioGroupItem value="yes" id="yes" />
                <Label htmlFor="yes" className="flex items-center gap-2 font-normal cursor-pointer text-lg flex-1">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  Si, ahi estare!
                </Label>
              </div>
              <div className="flex items-center space-x-3 p-4 rounded-lg border border-[#c9a45c]/20 hover:bg-[#c9a45c]/5 transition-colors cursor-pointer">
                <RadioGroupItem value="no" id="no" />
                <Label htmlFor="no" className="flex items-center gap-2 font-normal cursor-pointer text-lg flex-1">
                  <XCircle className="w-5 h-5 text-red-500" />
                  No podre asistir
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Selector de cantidad - solo si asiste */}
          {attendance === "yes" && (
            <div className="mb-6 animate-in slide-in-from-top-2 duration-300">
              <p className="text-center text-[#5a4a3a]/70 mb-4 text-lg">
                ¿Cuantas personas asistiran?
              </p>
              <div className="flex justify-center gap-3 flex-wrap">
                {Array.from({ length: passes }, (_, i) => i + 1).map((num) => (
                  <button
                    key={num}
                    onClick={() => setAttendingCount(num)}
                    className={`w-14 h-14 rounded-full text-xl font-semibold transition-all ${
                      attendingCount === num
                        ? "bg-[#c9a45c] text-white shadow-lg scale-110"
                        : "bg-white border-2 border-[#c9a45c]/30 text-[#5a4a3a] hover:border-[#c9a45c]"
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>
              <p className="text-center text-sm text-[#5a4a3a]/60 mt-2">
                Selecciona el numero de personas que asistiran
              </p>
            </div>
          )}

          {/* Mensaje opcional */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-2">
              <MessageSquare className="w-5 h-5 text-[#c9a45c]" />
              <p className="text-[#5a4a3a]/70">Mensaje para los novios (opcional)</p>
            </div>
            <Textarea
              placeholder="Escribe un mensaje de felicitacion..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={3}
              className="bg-white/80 border-[#c9a45c]/30 focus:border-[#c9a45c] resize-none text-lg"
            />
          </div>

          {/* Error message */}
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-300 rounded-lg text-red-700 text-center">
              {error}
            </div>
          )}

          {/* Boton de confirmar */}
          <Button
            onClick={handleConfirm}
            disabled={isSubmitting}
            className={`w-full text-white text-lg py-6 ${
              attendance === "yes" 
                ? "bg-[#c9a45c] hover:bg-[#b8944c]" 
                : "bg-[#5a4a3a] hover:bg-[#4a3a2a]"
            }`}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Enviando...
              </>
            ) : attendance === "yes" ? (
              <>
                <Check className="w-5 h-5 mr-2" />
                Confirmar Asistencia ({attendingCount} {attendingCount === 1 ? "persona" : "personas"})
              </>
            ) : (
              <>
                <X className="w-5 h-5 mr-2" />
                Confirmar que no asistire
              </>
            )}
          </Button>

          <p className="text-center text-sm text-[#5a4a3a]/50 mt-4">
            Tu confirmacion quedara registrada automaticamente
          </p>
        </div>
      </div>
    </section>
  )
}
