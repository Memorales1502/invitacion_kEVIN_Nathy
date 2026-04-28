"use client"

import { useState } from "react"
import { createClient } from "@supabase/supabase-js"

type UploadedPhoto = {
  url: string
  path: string
  name: string
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

function cleanFileName(name: string) {
  return name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-")
    .replace(/[^a-zA-Z0-9.\-_]/g, "")
    .toLowerCase()
}

export function PhotoShareForm() {
  const [firstName, setFirstName] = useState("")
  const [message, setMessage] = useState("")
  const [photos, setPhotos] = useState<File[]>([])
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState("")
  const [error, setError] = useState("")

  function handlePhotosChange(event: React.ChangeEvent<HTMLInputElement>) {
    const selected = Array.from(event.target.files || [])

    if (selected.length > 5) {
      setError("Solo puedes subir máximo 5 fotos por carga.")
      event.target.value = ""
      setPhotos([])
      return
    }

    const invalidFile = selected.find((file) => !file.type.startsWith("image/"))

    if (invalidFile) {
      setError("Solo se permiten archivos de imagen.")
      event.target.value = ""
      setPhotos([])
      return
    }

    setError("")
    setPhotos(selected)
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError("")
    setSuccess("")

    if (!firstName.trim()) {
      setError("Por favor ingresa tu nombre.")
      return
    }

    if (photos.length === 0) {
      setError("Debes seleccionar al menos una foto.")
      return
    }

    if (photos.length > 5) {
      setError("Solo puedes subir máximo 5 fotos por carga.")
      return
    }

    try {
      setLoading(true)

      const batchId = crypto.randomUUID()
      const uploadedPhotos: UploadedPhoto[] = []

      for (const photo of photos) {
        const safeName = cleanFileName(photo.name || "foto.jpg")
        const filePath = `${batchId}/${Date.now()}-${safeName}`

        const { error: uploadError } = await supabase.storage
          .from("event-photos")
          .upload(filePath, photo, {
            contentType: photo.type,
            upsert: false,
          })

        if (uploadError) {
          throw new Error("No se pudo subir una de las fotos. Intenta nuevamente.")
        }

        const { data: publicUrlData } = supabase.storage
          .from("event-photos")
          .getPublicUrl(filePath)

        uploadedPhotos.push({
          url: publicUrlData.publicUrl,
          path: filePath,
          name: safeName,
        })
      }

      const { error: insertError } = await supabase
        .from("photo_submissions")
        .insert({
          first_name: firstName.trim(),
          message: message.trim() || null,
          photos: uploadedPhotos,
        })

      if (insertError) {
        throw new Error("Las fotos subieron, pero no se pudo guardar el registro.")
      }

      setSuccess("¡Gracias! Tus fotos fueron compartidas con los novios 🤍")
      setFirstName("")
      setMessage("")
      setPhotos([])

      const fileInput = document.getElementById("photos") as HTMLInputElement | null
      if (fileInput) fileInput.value = ""
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ocurrió un error al subir las fotos.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto bg-white/80 backdrop-blur-sm rounded-3xl p-6 md:p-8 shadow-lg border border-[#c9a45c]/20">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-[#5a4a3a] font-medium mb-2">
            Nombre
          </label>
          <input
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
            placeholder="Escribe tu nombre"
            className="w-full rounded-xl border border-[#c9a45c]/30 bg-white/80 px-4 py-3 text-[#5a4a3a] outline-none focus:border-[#c9a45c]"
          />
        </div>

        <div>
          <label className="block text-[#5a4a3a] font-medium mb-2">
            Mensaje
          </label>
          <textarea
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            placeholder="Escribe un mensaje para los novios"
            rows={4}
            className="w-full rounded-xl border border-[#c9a45c]/30 bg-white/80 px-4 py-3 text-[#5a4a3a] outline-none focus:border-[#c9a45c] resize-none"
          />
        </div>

        <div>
          <label className="block text-[#5a4a3a] font-medium mb-2">
            Sube tus fotos
          </label>

          <div className="rounded-2xl border border-dashed border-[#c9a45c]/40 bg-[#faf8f5] p-5 text-center">
            <input
              id="photos"
              type="file"
              accept="image/*"
              multiple
              onChange={handlePhotosChange}
              className="block w-full text-sm text-[#5a4a3a] file:mr-4 file:rounded-full file:border-0 file:bg-[#c9a45c] file:px-4 file:py-2 file:text-sm file:font-medium file:text-white hover:file:bg-[#b8944c]"
            />

            <p className="mt-3 text-sm text-[#5a4a3a]/70">
              Puedes subir máximo 5 fotos por carga. Si quieres compartir más, puedes enviar otro formulario.
            </p>

            {photos.length > 0 && (
              <p className="mt-3 font-medium text-[#5a4a3a]">
                {photos.length} foto(s) seleccionada(s)
              </p>
            )}
          </div>
        </div>

        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-red-600">
            {error}
          </div>
        )}

        {success && (
          <div className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-green-700">
            {success}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-full bg-[#c9a45c] px-6 py-4 text-lg font-medium text-white transition hover:bg-[#b8944c] disabled:opacity-70"
        >
          {loading ? "Subiendo fotos..." : "Compartir con los novios"}
        </button>
      </form>
    </div>
  )
}
