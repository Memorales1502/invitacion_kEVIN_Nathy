"use client"

import { Gift, Landmark, QrCode } from "lucide-react"
import Image from "next/image"

interface GiftsSectionProps {
  gifts: {
    message: string
  }
}

export function GiftsSection({ gifts }: GiftsSectionProps) {
  // Datos de la cuenta bancaria
  const bankInfo = {
    bank: "Banco Industrial",
    accountType: "Cuenta Monetaria",
    accountNumber: "7179774679",
    accountHolder: "Sandra Nathaly G.",
  }

  // URL para generar QR de la cuenta (usando un servicio de QR)
  const qrData = `Banco: ${bankInfo.bank}\nCuenta: ${bankInfo.accountNumber}\nTitular: ${bankInfo.accountHolder}`
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(qrData)}`

  return (
    <section className="py-16 px-4">
      <div className="max-w-lg mx-auto">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#c9a45c]/10 flex items-center justify-center">
            <Gift className="w-8 h-8 text-[#c9a45c]" />
          </div>
          <h2 className="font-[family-name:var(--font-script)] text-4xl md:text-5xl text-[#c9a45c] mb-6">
            Mesa de Regalos
          </h2>
          
          {/* Mensaje principal */}
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-[#c9a45c]/20 mb-6">
            <p className="text-[#5a4a3a] text-xl leading-relaxed font-medium">
              Tu presencia es nuestro mejor regalo; sin embargo, si deseas obsequiarnos algo, el dia del evento encontraras un espacio destinado para recibir aportes en efectivo.
            </p>
          </div>

          {/* Información bancaria */}
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-[#c9a45c]/20">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Landmark className="w-6 h-6 text-[#c9a45c]" />
              <p className="text-[#5a4a3a] text-lg font-semibold">
                O si prefieres, puedes realizar una transferencia
              </p>
            </div>
            
            {/* Datos de la cuenta */}
            <div className="bg-[#f8f5f0] rounded-xl p-6 mb-6">
              <div className="space-y-3 text-left">
                <div className="flex justify-between items-center border-b border-[#c9a45c]/20 pb-2">
                  <span className="text-[#5a4a3a] font-medium">Banco:</span>
                  <span className="text-[#5a4a3a] font-bold">{bankInfo.bank}</span>
                </div>
                <div className="flex justify-between items-center border-b border-[#c9a45c]/20 pb-2">
                  <span className="text-[#5a4a3a] font-medium">Tipo:</span>
                  <span className="text-[#5a4a3a] font-bold">{bankInfo.accountType}</span>
                </div>
                <div className="flex justify-between items-center border-b border-[#c9a45c]/20 pb-2">
                  <span className="text-[#5a4a3a] font-medium">No. Cuenta:</span>
                  <span className="text-[#c9a45c] font-bold text-lg">{bankInfo.accountNumber}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#5a4a3a] font-medium">A nombre de:</span>
                  <span className="text-[#5a4a3a] font-bold">{bankInfo.accountHolder}</span>
                </div>
              </div>
            </div>

            {/* Código QR */}
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-2 mb-3">
                <QrCode className="w-5 h-5 text-[#c9a45c]" />
                <p className="text-[#5a4a3a] font-medium">Escanea el codigo QR</p>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-md border-2 border-[#c9a45c]/30">
                <Image
                  src={qrUrl}
                  alt="Código QR para transferencia"
                  width={180}
                  height={180}
                  className="rounded-lg"
                />
              </div>
              <p className="text-[#5a4a3a]/70 text-sm mt-3">
                Escanea para ver los datos de la cuenta
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
