import { createClient } from "@/lib/supabase/server"
import { NextRequest, NextResponse } from "next/server"
import { GUESTS, getGuestBySlug } from "@/lib/guests"

// Almacenamiento temporal en memoria para confirmaciones (fallback)
const confirmations = new Map<string, {
  confirmed: boolean
  attendingCount: number
  message: string
  confirmedAt: string
}>()

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { slug, confirmed, attendingCount, message } = body

    if (!slug) {
      return NextResponse.json({ error: "Slug requerido" }, { status: 400 })
    }

    // Verificar invitado en archivo local
    const localGuest = getGuestBySlug(slug)
    if (!localGuest) {
      return NextResponse.json({ error: "Invitado no encontrado" }, { status: 404 })
    }

    // Validar que no se exceda el numero de pases
    if (confirmed && attendingCount > localGuest.passes) {
      return NextResponse.json(
        { error: `Solo tienes ${localGuest.passes} pases disponibles` },
        { status: 400 }
      )
    }

    // Intentar guardar en Supabase
    let savedInDb = false
    try {
      const supabase = await createClient()
      
      // Verificar si el invitado existe en la base de datos
      const { data: dbGuest } = await supabase
        .from("guests")
        .select("*")
        .eq("slug", slug)
        .single()

      if (dbGuest) {
        // Actualizar en base de datos
        const { error } = await supabase
          .from("guests")
          .update({
            confirmed,
            attending_count: confirmed ? attendingCount : 0,
            message: message || null,
            confirmed_at: new Date().toISOString(),
          })
          .eq("slug", slug)

        if (!error) {
          savedInDb = true
        }
      }
    } catch (dbError) {
      console.log("[v0] Base de datos no disponible, usando almacenamiento local")
    }

    // Guardar en memoria como respaldo
    confirmations.set(slug, {
      confirmed,
      attendingCount: confirmed ? attendingCount : 0,
      message: message || "",
      confirmedAt: new Date().toISOString(),
    })

    return NextResponse.json({
      success: true,
      savedInDb,
      guest: {
        name: localGuest.name,
        slug: localGuest.slug,
        passes: localGuest.passes,
        confirmed,
        attending_count: confirmed ? attendingCount : 0,
      },
      message: confirmed
        ? `Confirmacion exitosa para ${attendingCount} persona(s)`
        : "Has indicado que no podras asistir",
    })
  } catch (error) {
    console.error("RSVP Error:", error)
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const slug = searchParams.get("slug")

    if (!slug) {
      return NextResponse.json({ error: "Slug requerido" }, { status: 400 })
    }

    // Buscar en archivo local
    const localGuest = getGuestBySlug(slug)
    if (!localGuest) {
      return NextResponse.json({ error: "Invitado no encontrado" }, { status: 404 })
    }

    // Intentar obtener estado de confirmacion de la base de datos
    let dbConfirmation = null
    try {
      const supabase = await createClient()
      const { data } = await supabase
        .from("guests")
        .select("confirmed, attending_count, message, confirmed_at")
        .eq("slug", slug)
        .single()
      
      if (data) {
        dbConfirmation = data
      }
    } catch {
      // Base de datos no disponible
    }

    // Verificar confirmacion en memoria
    const memoryConfirmation = confirmations.get(slug)

    // Combinar datos
    const guest = {
      name: localGuest.name,
      slug: localGuest.slug,
      passes: localGuest.passes,
      confirmed: dbConfirmation?.confirmed ?? memoryConfirmation?.confirmed ?? null,
      attending_count: dbConfirmation?.attending_count ?? memoryConfirmation?.attendingCount ?? null,
      message: dbConfirmation?.message ?? memoryConfirmation?.message ?? null,
      confirmed_at: dbConfirmation?.confirmed_at ?? memoryConfirmation?.confirmedAt ?? null,
    }

    return NextResponse.json({ guest })
  } catch (error) {
    console.error("GET Guest Error:", error)
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 })
  }
}
