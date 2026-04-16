import { createClient } from "@/lib/supabase/server"

export const dynamic = "force-dynamic"
export const revalidate = 0

type GuestMessage = {
  id: string
  name: string
  slug: string
  message: string | null
  confirmed: boolean | null
  confirmed_at: string | null
}

export default async function MensajesPage() {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("guests")
    .select("id, name, slug, message, confirmed, confirmed_at")
    .not("message", "is", null)
    .order("confirmed_at", { ascending: false })

  const mensajes: GuestMessage[] =
    (data as GuestMessage[] | null)?.filter(
      (guest) => guest.message && guest.message.trim() !== ""
    ) || []

  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Fondo igual al estilo principal */}
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
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="font-[family-name:var(--font-script)] text-5xl md:text-6xl text-[#c9a45c] mb-4">
              Mensajes de Nuestros Invitados
            </h1>
            <p className="text-lg md:text-xl text-[#5a4a3a] max-w-2xl mx-auto">
              Cada palabra compartida con nosotros hace aún más especial este momento 🤍
            </p>
          </div>

          {error ? (
            <div className="max-w-2xl mx-auto bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-red-200 text-center">
              <h2 className="text-2xl font-semibold text-red-600 mb-3">
                No se pudieron cargar los mensajes
              </h2>
              <p className="text-[#5a4a3a]">
                Verifica la conexión con Supabase o los permisos de lectura de la tabla.
              </p>
            </div>
          ) : mensajes.length === 0 ? (
            <div className="max-w-2xl mx-auto bg-white/80 backdrop-blur-sm rounded-2xl p-10 shadow-lg border border-[#c9a45c]/20 text-center">
              <h2 className="text-3xl font-semibold text-[#5a4a3a] mb-3">
                Aún no hay mensajes
              </h2>
              <p className="text-lg text-[#5a4a3a]/80">
                Cuando los invitados dejen mensajes al confirmar su asistencia, aparecerán aquí.
              </p>
            </div>
          ) : (
            <div className="grid gap-6">
              {mensajes.map((guest) => (
                <article
                  key={guest.id}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-lg border border-[#c9a45c]/20"
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-4">
                    <div>
                      <h2 className="text-2xl md:text-3xl font-semibold text-[#5a4a3a]">
                        {guest.name}
                      </h2>

                      <div className="mt-2">
                        {guest.confirmed === true ? (
                          <span className="inline-flex items-center rounded-full bg-green-100 text-green-700 px-3 py-1 text-sm font-medium">
                            Confirmó asistencia
                          </span>
                        ) : guest.confirmed === false ? (
                          <span className="inline-flex items-center rounded-full bg-red-100 text-red-700 px-3 py-1 text-sm font-medium">
                            No asistirá
                          </span>
                        ) : (
                          <span className="inline-flex items-center rounded-full bg-yellow-100 text-yellow-700 px-3 py-1 text-sm font-medium">
                            Pendiente
                          </span>
                        )}
                      </div>
                    </div>

                    {guest.confirmed_at && (
                      <p className="text-sm text-[#5a4a3a]/60">
                        {new Date(guest.confirmed_at).toLocaleString("es-GT", {
                          dateStyle: "medium",
                          timeStyle: "short",
                        })}
                      </p>
                    )}
                  </div>

                  <div className="border-t border-[#c9a45c]/20 pt-4">
                    <p className="text-lg leading-8 text-[#5a4a3a] whitespace-pre-line italic">
                      “{guest.message}”
                    </p>
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
