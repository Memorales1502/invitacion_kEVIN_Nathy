import { createClient } from "@/lib/supabase/server"
import { NextRequest, NextResponse } from "next/server"
import { getGuestBySlug } from "@/lib/guests"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    console.log("RSVP BODY:", body)

    const slug = String(body?.slug ?? "").trim()
    const confirmed = body?.confirmed === true
    const attendingCount = Number(body?.attendingCount ?? 0)
    const message =
      typeof body?.message === "string" ? body.message.trim() : null

    if (!slug) {
      return NextResponse.json({ error: "Slug requerido" }, { status: 400 })
    }

    const localGuest = getGuestBySlug(slug)
    if (!localGuest) {
      return NextResponse.json({ error: "Invitado no encontrado" }, { status: 404 })
    }

    const finalAttendingCount = confirmed ? attendingCount : 0

    if (confirmed && (!Number.isFinite(finalAttendingCount) || finalAttendingCount <= 0)) {
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

    const { data: dbGuest, error: findError } = await supabase
      .from("guests")
      .select("slug")
      .eq("slug", slug)
      .maybeSingle()

    if (findError) {
      console.error("Error consultando invitado:", findError)
      return NextResponse.json(
        {
          error: "Error consultando invitado en la base de datos",
          supabase: {
            message: findError.message,
            details: findError.details,
            hint: findError.hint,
            code: findError.code,
          },
        },
        { status: 500 }
      )
    }

    if (!dbGuest) {
      return NextResponse.json(
        { error: `El invitado con slug '${slug}' no existe en public.guests` },
        { status: 404 }
      )
    }

    const payload = {
      confirmed,
      attending_count: finalAttendingCount,
      message,
      confirmed_at: new Date().toISOString(),
    }

    console.log("RSVP UPDATE PAYLOAD:", payload)

    const { error: updateError } = await supabase
      .from("guests")
      .update(payload)
      .eq("slug", slug)

    if (updateError) {
      console.error("Error actualizando confirmación:", updateError)
      return NextResponse.json(
        {
          error: "No se pudo guardar la confirmación en Supabase",
          supabase: {
            message: updateError.message,
            details: updateError.details,
            hint: updateError.hint,
            code: updateError.code,
          },
          payload,
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
        message,
      },
      message: confirmed
        ? `Confirmación exitosa para ${finalAttendingCount} persona(s)`
        : "Has indicado que no podrás asistir",
    })
  } catch (error) {
    console.error("RSVP POST Error:", error)
    return NextResponse.json(
      {
        error: "Error interno del servidor",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const slug = searchParams.get("slug")

    if (!slug) {
      return NextResponse.json({ error: "Slug requerido" }, { status: 400 })
    }

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
      return NextResponse.json(
        {
          error: "No se pudo obtener la confirmación desde Supabase",
          supabase: {
            message: error.message,
            details: error.details,
            hint: error.hint,
            code: error.code,
          },
        },
        { status: 500 }
      )
    }

    return NextResponse.json({
      guest: {
        name: localGuest.name,
        slug: localGuest.slug,
        passes: localGuest.passes,
        confirmed: data?.confirmed ?? null,
        attending_count: data?.attending_count ?? null,
        message: data?.message ?? null,
        confirmed_at: data?.confirmed_at ?? null,
      },
    })
  } catch (error) {
    return NextResponse.json(
      {
        error: "Error interno del servidor",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    )
  }
}
