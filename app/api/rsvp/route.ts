import { createClient } from "@/lib/supabase/server"
import { NextRequest, NextResponse } from "next/server"
import { getGuestBySlug } from "@/lib/guests"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { slug, confirmed, attendingCount, message } = body

    if (!slug) {
      return NextResponse.json({ error: "Slug requerido" }, { status: 400 })
    }

    if (typeof confirmed !== "boolean") {
      return NextResponse.json({ error: "El campo confirmed es requerido" }, { status: 400 })
    }

    // Verificar invitado en archivo local
    const localGuest = getGuestBySlug(slug)
    if (!localGuest) {
      return NextResponse.json({ error: "Invitado no encontrado" }, { status: 404 })
    }

    // Validar número de asistentes
    const finalAttendingCount = confirmed ? Number(attendingCount || 0) : 0

    if (confirmed && finalAttendingCount <= 0) {
      return NextResponse.json(
        { error: "Debes indicar cuántas personas asistirán" },
        { status: 400 }
      )
    }

    if (confirmed && finalAttendingCount > localGuest.passes) {
      return NextResponse.json(
        { error: `Solo tienes ${localGuest.passes} pases disponibles` },
        { status: 400 }
      )
    }

    const supabase = await createClient()

    // Verificar si el invitado existe en Supabase
    const { data: dbGuest, error: findError } = await supabase
      .from("guests")
      .select("slug, name, passes")
      .eq("slug", slug)
      .maybeSingle()

    if (findError) {
      console.error("Error consultando invitado en Supabase:", findError)
      return NextResponse.json(
        {
          error: "Error consultando invitado en la base de datos",
          details: findError.message,
        },
        { status: 500 }
      )
    }

    if (!dbGuest) {
      return NextResponse.json(
        {
          error: `El invitado con slug '${slug}' no existe en la tabla public.guests`,
        },
        { status: 404 }
      )
    }

    // Actualizar confirmación en Supabase
    const { error: updateError } = await supabase
      .from("guests")
      .update({
        confirmed,
        attending_count: finalAttendingCount,
        message: message?.trim() ? message.trim() : null,
        confirmed_at: new Date().toISOString(),
      })
      .eq("slug", slug)

    if (updateError) {
      console.error("Error actualizando confirmación:", updateError)
      return NextResponse.json(
        {
          error: "No se pudo guardar la confirmación en Supabase",
          details: updateError.message,
        },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      savedInDb: true,
      guest: {
        name: localGuest.name,
        slug: localGuest.slug,
        passes: localGuest.passes,
        confirmed,
        attending_count: finalAttendingCount,
        message: message?.trim() ? message.trim() : null,
      },
      message: confirmed
        ? `Confirmación exitosa para ${finalAttendingCount} persona(s)`
        : "Has indicado que no podrás asistir",
    })
  } catch (error) {
    console.error("RSVP POST Error:", error)
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

    // Verificar invitado en archivo local
    const localGuest = getGuestBySlug(slug)
    if (!localGuest) {
      return NextResponse.json({ error: "Invitado no encontrado" }, { status: 404 })
    }

    const supabase = await createClient()

    const { data, error } = await supabase
      .from("guests")
      .select("confirmed, attending_count, message, confirmed_at")
      .eq("slug", slug)
      .maybeSingle()

    if (error) {
      console.error("Error obteniendo confirmación:", error)
      return NextResponse.json(
        {
          error: "No se pudo obtener la confirmación desde Supabase",
          details: error.message,
        },
        { status: 500 }
      )
    }

    const guest = {
      name: localGuest.name,
      slug: localGuest.slug,
      passes: localGuest.passes,
      confirmed: data?.confirmed ?? null,
      attending_count: data?.attending_count ?? null,
      message: data?.message ?? null,
      confirmed_at: data?.confirmed_at ?? null,
    }

    return NextResponse.json({ guest })
  } catch (error) {
    console.error("GET Guest Error:", error)
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 })
  }
}
