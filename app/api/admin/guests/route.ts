import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"
import { GUESTS } from "@/lib/guests"

export async function GET() {
  try {
    // Intentar cargar desde base de datos
    let dbGuests: Record<string, { confirmed: boolean | null; attending_count: number | null; message: string | null; confirmed_at: string | null }> = {}
    
    try {
      const supabase = await createClient()
      const { data: guests } = await supabase
        .from("guests")
        .select("slug, confirmed, attending_count, message, confirmed_at")

      if (guests) {
        guests.forEach(g => {
          dbGuests[g.slug] = {
            confirmed: g.confirmed,
            attending_count: g.attending_count,
            message: g.message,
            confirmed_at: g.confirmed_at,
          }
        })
      }
    } catch {
      console.log("[v0] Base de datos no disponible, usando solo archivo local")
    }

    // Combinar datos del archivo local con confirmaciones de la DB
    const combinedGuests = GUESTS.map((guest, index) => ({
      id: `local-${index}`,
      name: guest.name,
      slug: guest.slug,
      passes: guest.passes,
      confirmed: dbGuests[guest.slug]?.confirmed ?? null,
      attending_count: dbGuests[guest.slug]?.attending_count ?? null,
      message: dbGuests[guest.slug]?.message ?? null,
      confirmed_at: dbGuests[guest.slug]?.confirmed_at ?? null,
    }))

    return NextResponse.json({ guests: combinedGuests })
  } catch (error) {
    console.error("Admin Guests Error:", error)
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 })
  }
}
