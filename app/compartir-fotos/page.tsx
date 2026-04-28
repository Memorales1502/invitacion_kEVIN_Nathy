import { PhotoShareForm } from "@/components/wedding/photo-share-form"

export const dynamic = "force-dynamic"
export const revalidate = 0

export default function CompartirFotosPage() {
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
        <div className="max-w-3xl mx-auto text-center mb-10">
          <p className="text-sm uppercase tracking-[0.35em] text-[#c9a45c] mb-4">
            Kevin & Nathaly
          </p>

          <h1 className="font-[family-name:var(--font-script)] text-5xl md:text-6xl text-[#c9a45c] mb-4">
            Comparte tus Fotos
          </h1>

          <p className="text-lg md:text-xl text-[#5a4a3a]/80">
            Gracias por acompañarnos en este día tan especial. Déjanos un mensaje y comparte tus fotos con los novios 🤍
          </p>
        </div>

        <PhotoShareForm />
      </section>
    </main>
  )
}
