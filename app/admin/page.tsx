"use client"

import { useState, useEffect } from "react"
import { Users, Check, X, Clock, RefreshCw, Download, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface Guest {
  id: string
  name: string
  slug: string
  passes: number
  confirmed: boolean | null
  attending_count: number | null
  message: string | null
  confirmed_at: string | null
}

export default function AdminPage() {
  const [guests, setGuests] = useState<Guest[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [password, setPassword] = useState("")
  const [authenticated, setAuthenticated] = useState(false)
  const [showMessages, setShowMessages] = useState(false)

  // Contrasena simple para acceso (en produccion usar algo mas seguro)
  const ADMIN_PASSWORD = "boda2026"

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === ADMIN_PASSWORD) {
      setAuthenticated(true)
      fetchGuests()
    } else {
      setError("Contrasena incorrecta")
    }
  }

  const fetchGuests = async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/admin/guests")
      const data = await res.json()
      
      if (!res.ok) {
        throw new Error(data.error || "Error al cargar invitados")
      }
      
      setGuests(data.guests || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al cargar datos")
    } finally {
      setLoading(false)
    }
  }

  const exportToCSV = () => {
    const headers = ["Nombre", "Pases", "Confirmado", "Asistiran", "Mensaje", "Fecha Confirmacion"]
    const rows = guests.map(g => [
      g.name,
      g.passes,
      g.confirmed === true ? "Si" : g.confirmed === false ? "No" : "Pendiente",
      g.attending_count || 0,
      g.message || "",
      g.confirmed_at ? new Date(g.confirmed_at).toLocaleString("es-GT") : ""
    ])
    
    const csv = [headers, ...rows].map(row => row.join(",")).join("\n")
    const blob = new Blob([csv], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "confirmaciones-boda.csv"
    a.click()
  }

  // Estadisticas
  const stats = {
    total: guests.length,
    totalPasses: guests.reduce((sum, g) => sum + g.passes, 0),
    confirmed: guests.filter(g => g.confirmed === true).length,
    declined: guests.filter(g => g.confirmed === false).length,
    pending: guests.filter(g => g.confirmed === null).length,
    attendingCount: guests.reduce((sum, g) => sum + (g.attending_count || 0), 0),
  }

  if (!authenticated) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-[#faf8f5] to-[#f5f0e8] flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#c9a45c]/10 flex items-center justify-center">
              <Users className="w-8 h-8 text-[#c9a45c]" />
            </div>
            <h1 className="text-2xl font-bold text-[#5a4a3a]">Panel de Administracion</h1>
            <p className="text-[#5a4a3a]/70 mt-2">Boda Kevin & Nathaly</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Input
                type="password"
                placeholder="Contrasena"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="text-center text-lg"
              />
            </div>
            {error && (
              <p className="text-red-500 text-center text-sm">{error}</p>
            )}
            <Button type="submit" className="w-full bg-[#c9a45c] hover:bg-[#b8944c]">
              Ingresar
            </Button>
          </form>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#faf8f5] to-[#f5f0e8] p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-[#5a4a3a]">Confirmaciones de Asistencia</h1>
              <p className="text-[#5a4a3a]/70">Boda Kevin & Nathaly - 1 de Mayo 2026</p>
            </div>
            <div className="flex gap-2">
              <Button onClick={fetchGuests} variant="outline" size="sm">
                <RefreshCw className="w-4 h-4 mr-2" />
                Actualizar
              </Button>
              <Button onClick={exportToCSV} variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Exportar CSV
              </Button>
              <Button 
                onClick={() => setShowMessages(!showMessages)} 
                variant="outline" 
                size="sm"
              >
                {showMessages ? <EyeOff className="w-4 h-4 mr-2" /> : <Eye className="w-4 h-4 mr-2" />}
                {showMessages ? "Ocultar mensajes" : "Ver mensajes"}
              </Button>
            </div>
          </div>
        </div>

        {/* Estadisticas */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow p-4 text-center">
            <p className="text-3xl font-bold text-[#c9a45c]">{stats.total}</p>
            <p className="text-sm text-[#5a4a3a]/70">Invitaciones</p>
            <p className="text-xs text-[#5a4a3a]/50">{stats.totalPasses} pases totales</p>
          </div>
          <div className="bg-white rounded-xl shadow p-4 text-center">
            <p className="text-3xl font-bold text-green-600">{stats.confirmed}</p>
            <p className="text-sm text-[#5a4a3a]/70">Confirmados</p>
            <p className="text-xs text-green-600">{stats.attendingCount} personas</p>
          </div>
          <div className="bg-white rounded-xl shadow p-4 text-center">
            <p className="text-3xl font-bold text-red-500">{stats.declined}</p>
            <p className="text-sm text-[#5a4a3a]/70">No asistiran</p>
          </div>
          <div className="bg-white rounded-xl shadow p-4 text-center">
            <p className="text-3xl font-bold text-yellow-600">{stats.pending}</p>
            <p className="text-sm text-[#5a4a3a]/70">Pendientes</p>
          </div>
        </div>

        {/* Tabla de invitados */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {loading ? (
            <div className="p-12 text-center">
              <RefreshCw className="w-8 h-8 animate-spin text-[#c9a45c] mx-auto mb-4" />
              <p className="text-[#5a4a3a]/70">Cargando invitados...</p>
            </div>
          ) : error ? (
            <div className="p-12 text-center">
              <p className="text-red-500">{error}</p>
              <Button onClick={fetchGuests} className="mt-4" variant="outline">
                Reintentar
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#c9a45c]/10">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-[#5a4a3a]">Invitado</th>
                    <th className="px-4 py-3 text-center text-sm font-semibold text-[#5a4a3a]">Pases</th>
                    <th className="px-4 py-3 text-center text-sm font-semibold text-[#5a4a3a]">Estado</th>
                    <th className="px-4 py-3 text-center text-sm font-semibold text-[#5a4a3a]">Asistiran</th>
                    {showMessages && (
                      <th className="px-4 py-3 text-left text-sm font-semibold text-[#5a4a3a]">Mensaje</th>
                    )}
                    <th className="px-4 py-3 text-center text-sm font-semibold text-[#5a4a3a]">Fecha</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {guests.map((guest) => (
                    <tr key={guest.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <p className="font-medium text-[#5a4a3a]">{guest.name}</p>
                        <p className="text-xs text-[#5a4a3a]/50">{guest.slug}</p>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className="text-[#c9a45c] font-semibold">{guest.passes}</span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        {guest.confirmed === true ? (
                          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-green-100 text-green-700 text-sm">
                            <Check className="w-4 h-4" /> Confirmado
                          </span>
                        ) : guest.confirmed === false ? (
                          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-red-100 text-red-700 text-sm">
                            <X className="w-4 h-4" /> No asiste
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-yellow-100 text-yellow-700 text-sm">
                            <Clock className="w-4 h-4" /> Pendiente
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-center">
                        {guest.confirmed === true ? (
                          <span className="text-green-600 font-bold text-lg">{guest.attending_count}</span>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </td>
                      {showMessages && (
                        <td className="px-4 py-3 max-w-xs">
                          {guest.message ? (
                            <p className="text-sm text-[#5a4a3a]/70 truncate" title={guest.message}>
                              {guest.message}
                            </p>
                          ) : (
                            <span className="text-gray-400 text-sm">-</span>
                          )}
                        </td>
                      )}
                      <td className="px-4 py-3 text-center text-sm text-[#5a4a3a]/70">
                        {guest.confirmed_at
                          ? new Date(guest.confirmed_at).toLocaleDateString("es-GT", {
                              day: "2-digit",
                              month: "short",
                              hour: "2-digit",
                              minute: "2-digit",
                            })
                          : "-"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
