import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"
export const revalidate = 0

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)

    const path = searchParams.get("path")
    const name = searchParams.get("name") || "foto-boda.jpg"

    if (!path) {
      return NextResponse.json(
        { error: "Ruta de foto no encontrada" },
        { status: 400 }
      )
    }

    const supabase = await createClient()

    const { data, error } = await supabase.storage
      .from("event-photos")
      .download(path)

    if (error || !data) {
      return NextResponse.json(
        { error: "No se pudo descargar la foto" },
        { status: 404 }
      )
    }

    return new Response(data, {
      headers: {
        "Content-Type": data.type || "image/jpeg",
        "Content-Disposition": `attachment; filename="${name}"`,
      },
    })
  } catch (error) {
    console.error("Download photo error:", error)

    return NextResponse.json(
      { error: "Error al descargar la foto" },
      { status: 500 }
    )
  }
}
