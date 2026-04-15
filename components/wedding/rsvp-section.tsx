"use client"

import { useState } from "react"
import { MessageCircle, Send, User, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

interface RsvpSectionProps {
  whatsapp: string
  bride: string
  groom: string
}

export function RsvpSection({ whatsapp, bride, groom }: RsvpSectionProps) {
  const [name, setName] = useState("")
  const [guests, setGuests] = useState("1")
  const [attendance, setAttendance] = useState("yes")

  const handleSubmit = () => {
    const attendanceText = attendance === "yes" 
      ? `confirmo mi asistencia` 
      : `lamentablemente no podre asistir`
    
    const message = encodeURIComponent(
      `Hola ${bride} y ${groom}! Soy ${name || "[Tu nombre]"} y ${attendanceText} a su boda${attendance === "yes" ? `. Asistiremos ${guests} persona(s)` : ""}. Les deseo lo mejor!`
    )
    
    window.open(`https://wa.me/${whatsapp}?text=${message}`, '_blank')
  }

  return (
    <section className="py-16 px-4">
      <div className="max-w-md mx-auto">
        <h2 className="font-[family-name:var(--font-script)] text-4xl md:text-5xl text-center text-[#c9a45c] mb-4">
          Confirma tu Asistencia
        </h2>
        <p className="text-center text-xl text-[#5a4a3a] mb-8">
          Por favor confirma antes del 17 de Abril de 2026
        </p>
        
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-[#c9a45c]/20">
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-foreground">Tu Nombre</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="name"
                  placeholder="Escribe tu nombre"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-3">
              <Label className="text-foreground">Podras asistir?</Label>
              <RadioGroup value={attendance} onValueChange={setAttendance}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="yes" />
                  <Label htmlFor="yes" className="font-normal cursor-pointer">Si, ahi estare!</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="no" />
                  <Label htmlFor="no" className="font-normal cursor-pointer">No podre asistir</Label>
                </div>
              </RadioGroup>
            </div>

            {attendance === "yes" && (
              <div className="space-y-2 animate-in slide-in-from-top-2 duration-300">
                <Label htmlFor="guests" className="text-foreground">Numero de invitados</Label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="guests"
                    type="number"
                    min="1"
                    max="10"
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
            )}

            <Button 
              onClick={handleSubmit}
              className="w-full bg-green-600 hover:bg-green-700 text-white"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Confirmar por WhatsApp
              <Send className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
