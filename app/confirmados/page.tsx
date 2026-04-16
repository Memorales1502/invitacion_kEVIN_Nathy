import { createClient } from "@/lib/supabase/server"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export const dynamic = "force-dynamic"
export const revalidate = 0

type GuestStatus = {
  id: string
  name: string
  slug: string
  passes: number
  confirmed: boolean | null
  attending_count: number | null
  confirmed_at: string | null
}

export default async function ConfirmadosPage() {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("guests")
    .select("id, name, slug, passes, confirmed, attending_count, confirmed_at")
    .order("confirmed_at", { ascending: false, nullsFirst: false })
    .order("name", { ascending: true })

  const invitados: GuestStatus[] = (data as GuestStatus[] | null) || []

  const confirmados = invitados.filter((guest) => guest.confirmed === true)
  const noAsistiran = invitados.filter((guest) => guest.confirmed === false)
  const pendientes = invitados.filter((guest) => guest.confirmed === null)

  const totalFamiliasConfirmadas = confirmados.length
  const totalPersonasConfirmadas = confirmados.reduce(
    (sum, guest) => sum + (guest.attending_count || 0),
    0
  )

  const totalNoAsistiran = noAsistiran.length
  const totalPendientes = pendientes.length

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
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="font-[family-name:var(--font-script)] text-5xl md:text-6xl text-[#c9a45c] mb-4">
              Estado de Invitados
            </h1>
            <p className="text-lg md:text-xl text-[#5a4a3a] max-w-2xl mx-auto">
              Aquí pueden visualizar confirmados, quienes no asistirán y la lista de pendientes 🤍
            </p>
          </div>

          {error ? (
            <div className="max-w-2xl mx-auto bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-red-200 text-center">
              <h2 className="text-2xl font-semibold text-red-600 mb-3">
                No se pudo cargar la información
              </h2>
              <p className="text-[#5a4a3a]">
                Verifica la conexión con Supabase o los permisos de lectura de la tabla.
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-[#c9a45c]/20 text-center">
                  <p className="text-sm uppercase tracking-[0.2em] text-[#c9a45c] mb-2">
                    Confirmados
                  </p>
                  <p className="text-4xl font-bold text-[#5a4a3a]">{totalFamiliasConfirmadas}</p>
                </div>

                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-[#c9a45c]/20 text-center">
                  <p className="text-sm uppercase tracking-[0.2em] text-[#c9a45c] mb-2">
                    Personas asistirán
                  </p>
                  <p className="text-4xl font-bold text-[#5a4a3a]">{totalPersonasConfirmadas}</p>
                </div>

                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-[#c9a45c]/20 text-center">
                  <p className="text-sm uppercase tracking-[0.2em] text-[#c9a45c] mb-2">
                    No asistirán
                  </p>
                  <p className="text-4xl font-bold text-[#5a4a3a]">{totalNoAsistiran}</p>
                </div>

                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-[#c9a45c]/20 text-center">
                  <p className="text-sm uppercase tracking-[0.2em] text-[#c9a45c] mb-2">
                    Pendientes
                  </p>
                  <p className="text-4xl font-bold text-[#5a4a3a]">{totalPendientes}</p>
                </div>
              </div>

              <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-4 md:p-6 shadow-lg border border-[#c9a45c]/20">
                <Tabs defaultValue="confirmados" className="w-full">
                  <TabsList className="w-full h-auto grid grid-cols-1 sm:grid-cols-3 bg-transparent gap-3 p-0 mb-6">
                    <TabsTrigger
                      value="confirmados"
                      className="rounded-2xl border border-[#c9a45c]/20 bg-white/80 py-3 text-[#5a4a3a] data-[state=active]:bg-[#c9a45c] data-[state=active]:text-white"
                    >
                      Confirmados ({confirmados.length})
                    </TabsTrigger>

                    <TabsTrigger
                      value="no-asistiran"
                      className="rounded-2xl border border-[#c9a45c]/20 bg-white/80 py-3 text-[#5a4a3a] data-[state=active]:bg-[#c9a45c] data-[state=active]:text-white"
                    >
                      No asistirán ({noAsistiran.length})
                    </TabsTrigger>

                    <TabsTrigger
                      value="pendientes"
                      className="rounded-2xl border border-[#c9a45c]/20 bg-white/80 py-3 text-[#5a4a3a] data-[state=active]:bg-[#c9a45c] data-[state=active]:text-white"
                    >
                      Pendientes ({pendientes.length})
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="confirmados">
                    {confirmados.length === 0 ? (
                      <EmptyState
                        title="Aún no hay confirmados"
                        description="Cuando los invitados confirmen su asistencia, aparecerán aquí."
                      />
                    ) : (
                      <div className="grid gap-6">
                        {confirmados.map((guest) => (
                          <article
                            key={guest.id}
                            className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-lg border border-[#c9a45c]/20"
                          >
                            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-4">
                              <div>
                                <h2 className="text-2xl md:text-3xl font-semibold text-[#5a4a3a]">
                                  {guest.name}
                                </h2>

                                <div className="flex flex-wrap gap-2 mt-3">
                                  <span className="inline-flex items-center rounded-full bg-green-100 text-green-700 px-3 py-1 text-sm font-medium">
                                    Confirmó asistencia
                                  </span>

                                  <span className="inline-flex items-center rounded-full bg-[#c9a45c]/10 text-[#8c6b2f] px-3 py-1 text-sm font-medium">
                                    Pases asignados: {guest.passes}
                                  </span>

                                  <span className="inline-flex items-center rounded-full bg-[#c9a45c]/10 text-[#8c6b2f] px-3 py-1 text-sm font-medium">
                                    Asistirán: {guest.attending_count || 0}
                                  </span>
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
                          </article>
                        ))}
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="no-asistiran">
                    {noAsistiran.length === 0 ? (
                      <EmptyState
                        title="Nadie ha rechazado aún"
                        description="Si algún invitado indica que no asistirá, aparecerá aquí."
                      />
                    ) : (
                      <div className="grid gap-6">
                        {noAsistiran.map((guest) => (
                          <article
                            key={guest.id}
                            className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-lg border border-[#c9a45c]/20"
                          >
                            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-4">
                              <div>
                                <h2 className="text-2xl md:text-3xl font-semibold text-[#5a4a3a]">
                                  {guest.name}
                                </h2>

                                <div className="flex flex-wrap gap-2 mt-3">
                                  <span className="inline-flex items-center rounded-full bg-red-100 text-red-700 px-3 py-1 text-sm font-medium">
                                    No asistirá
                                  </span>

                                  <span className="inline-flex items-center rounded-full bg-[#c9a45c]/10 text-[#8c6b2f] px-3 py-1 text-sm font-medium">
                                    Pases asignados: {guest.passes}
                                  </span>
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
                          </article>
                        ))}
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="pendientes">
                    {pendientes.length === 0 ? (
                      <EmptyState
                        title="No hay invitados pendientes"
                        description="Todos los invitados ya respondieron."
                      />
                    ) : (
                      <div className="grid gap-6">
                        {pendientes.map((guest) => (
                          <article
                            key={guest.id}
                            className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-lg border border-[#c9a45c]/20"
                          >
                            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-4">
                              <div>
                                <h2 className="text-2xl md:text-3xl font-semibold text-[#5a4a3a]">
                                  {guest.name}
                                </h2>

                                <div className="flex flex-wrap gap-2 mt-3">
                                  <span className="inline-flex items-center rounded-full bg-yellow-100 text-yellow-700 px-3 py-1 text-sm font-medium">
                                    Pendiente de respuesta
                                  </span>

                                  <span className="inline-flex items-center rounded-full bg-[#c9a45c]/10 text-[#8c6b2f] px-3 py-1 text-sm font-medium">
                                    Pases asignados: {guest.passes}
                                  </span>
                                </div>
                              </div>

                              <p className="text-sm text-[#5a4a3a]/60">Sin respuesta aún</p>
                            </div>
                          </article>
                        ))}
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </div>
            </>
          )}
        </div>
      </section>
    </main>
  )
}

function EmptyState({
  title,
  description,
}: {
  title: string
  description: string
}) {
  return (
    <div className="max-w-2xl mx-auto bg-white/80 backdrop-blur-sm rounded-2xl p-10 shadow-lg border border-[#c9a45c]/20 text-center">
      <h2 className="text-3xl font-semibold text-[#5a4a3a] mb-3">{title}</h2>
      <p className="text-lg text-[#5a4a3a]/80">{description}</p>
    </div>
  )
}
