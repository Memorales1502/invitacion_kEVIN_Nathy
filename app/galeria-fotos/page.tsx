import Image from "next/image"
import { createClient } from "@/lib/supabase/server"

export const dynamic = "force-dynamic"
export const revalidate = 0

type PhotoItem = {
  url: string
  path: string
  name: string
}

type PhotoSubmission = {
  id: string
  first_name: string
  message: string | null
  photos: PhotoItem[]
  created_at: string
}

export default async function GaleriaFotosPage() {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("photo_submissions")
    .select("id, first_name, message, photos, created_at")
    .order("created_at", { ascending: false })

  const submissions: PhotoSubmission[] = (data as PhotoSubmission[] | null) || []

  const totalFotos = submissions.reduce((sum, item) => {
    return sum + (Array.isArray(item.photos) ? item.photos.length : 0)
  }, 0)

  return (
    <main className="min-h-screen relative overflow-hidden">
      <div
        className="fixed inset-0 bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/final-xCOTv0UGLMpmlVuFxfNWsMzSpUlM69.png')",
          backgroundSize: "80%",
          filter: "blur(6px) brightness(0.9)",
          transform: "scale(1.0)",
        }}
      />
      <div className="fixed inset-0 bg-gradient-to-b from-white/85 via-white/80 to-white/85" />

      <section className="relative z-10 px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-sm uppercase tracking-[0.35em] text-[#c9a45c] mb-4">
              Kevin & Nathaly
            </p>

            <h1 className="font-[family-name:var(--font-script)] text-5xl md:text-6xl text-[#c9a45c] mb-4">
              Galería de Fotos
            </h1>

            <p className="text-lg md:text-xl text-[#5a4a3a] max-w-2xl mx-auto">
              Aquí podrán visualizar y descargar las fotos que sus invitados compartan 🤍
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-[#c9a45c]/20 text-center">
              <p className="text-sm uppercase tracking-[0.2em] text-[#c9a45c] mb-2">
                Envíos recibidos
              </p>
              <p className="text-4xl font-bold text-[#5a4a3a]">
                {submissions.length}
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-[#c9a45c]/20 text-center">
              <p className="text-sm uppercase tracking-[0.2em] text-[#c9a45c] mb-2">
                Fotos compartidas
              </p>
              <p className="text-4xl font-bold text-[#5a4a3a]">
                {totalFotos}
              </p>
            </div>
          </div>

          {error ? (
            <div className="max-w-2xl mx-auto bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-red-200 text-center">
              <h2 className="text-2xl font-semibold text-red-600 mb-3">
                No se pudo cargar la galería
              </h2>
              <p className="text-[#5a4a3a]">
                Verifica la conexión con Supabase o los permisos de lectura.
              </p>
            </div>
          ) : submissions.length === 0 ? (
            <div className="max-w-2xl mx-auto bg-white/80 backdrop-blur-sm rounded-2xl p-10 shadow-lg border border-[#c9a45c]/20 text-center">
              <h2 className="text-3xl font-semibold text-[#5a4a3a] mb-3">
                Aún no hay fotos compartidas
              </h2>
              <p className="text-lg text-[#5a4a3a]/80">
                Cuando los invitados suban fotos desde el QR, aparecerán aquí.
              </p>
            </div>
          ) : (
            <div className="grid gap-8">
              {submissions.map((item) => (
                <article
                  key={item.id}
                  className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 md:p-8 shadow-lg border border-[#c9a45c]/20"
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-5">
                    <div>
                      <h2 className="text-2xl md:text-3xl font-semibold text-[#5a4a3a]">
                        {item.first_name}
                      </h2>

                      {item.message && (
                        <p className="mt-3 text-lg text-[#5a4a3a]/90 whitespace-pre-line italic">
                          “{item.message}”
                        </p>
                      )}
                    </div>

                    <p className="text-sm text-[#5a4a3a]/60">
                      {new Date(item.created_at).toLocaleString("es-GT", {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {Array.isArray(item.photos) &&
                      item.photos.map((photo, index) => (
                        <div
                          key={`${item.id}-${index}`}
                          className="overflow-hidden rounded-2xl border border-[#c9a45c]/20 bg-white shadow-sm"
                        >
                          <div className="relative w-full aspect-square">
                            <Image
                              src={photo.url}
                              alt={`Foto ${index + 1} compartida por ${item.first_name}`}
                              fill
                              className="object-cover"
                              unoptimized
                            />
                          </div>

                          <div className="p-3">
                            <a
                              href={`/api/photo-download?path=${encodeURIComponent(photo.path)}&name=${encodeURIComponent(photo.name || `foto-${index + 1}.jpg`)}`}
                              className="block w-full rounded-full bg-[#c9a45c] px-4 py-2 text-center text-sm font-medium text-white hover:bg-[#b8944c] transition"
                            >
                              Descargar foto
                            </a>
                          </div>
                        </div>
                      ))}
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
