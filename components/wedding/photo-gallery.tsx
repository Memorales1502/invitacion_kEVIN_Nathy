"use client"

import { useState, useRef } from "react"
import { Camera, Upload, X, Image as ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"

export function PhotoGallery() {
  const [photos, setPhotos] = useState<string[]>([])
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    Array.from(files).forEach((file) => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader()
        reader.onload = (event) => {
          if (event.target?.result) {
            setPhotos((prev) => [...prev, event.target!.result as string])
          }
        }
        reader.readAsDataURL(file)
      }
    })
  }

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-transparent via-muted/30 to-transparent">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
            <Camera className="w-8 h-8 text-primary" />
          </div>
          <h2 className="font-[family-name:var(--font-script)] text-4xl md:text-5xl text-primary mb-4">
            Galeria de Fotos
          </h2>
          <p className="text-muted-foreground">
            Comparte tus mejores momentos del evento con nosotros
          </p>
        </div>

        {/* Upload area */}
        <div 
          className="border-2 border-dashed border-primary/30 rounded-2xl p-8 text-center hover:border-primary/50 transition-colors cursor-pointer mb-8"
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileSelect}
            className="hidden"
          />
          <Upload className="w-12 h-12 mx-auto mb-4 text-primary/50" />
          <p className="text-lg font-medium text-foreground mb-2">
            Sube tus fotos aqui
          </p>
          <p className="text-sm text-muted-foreground">
            Haz clic o arrastra tus imagenes
          </p>
          <Button className="mt-4 bg-primary hover:bg-primary/90">
            <Camera className="w-4 h-4 mr-2" />
            Seleccionar Fotos
          </Button>
        </div>

        {/* Photo grid */}
        {photos.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {photos.map((photo, index) => (
              <div 
                key={index}
                className="relative aspect-square rounded-lg overflow-hidden cursor-pointer group"
                onClick={() => setSelectedPhoto(photo)}
              >
                <img 
                  src={photo} 
                  alt={`Foto ${index + 1}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
              </div>
            ))}
          </div>
        )}

        {photos.length === 0 && (
          <div className="text-center py-12">
            <ImageIcon className="w-16 h-16 mx-auto mb-4 text-muted-foreground/30" />
            <p className="text-muted-foreground">
              Aun no hay fotos. Se el primero en compartir!
            </p>
          </div>
        )}

        {/* Lightbox */}
        {selectedPhoto && (
          <div 
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedPhoto(null)}
          >
            <button 
              className="absolute top-4 right-4 text-white hover:text-gray-300"
              onClick={() => setSelectedPhoto(null)}
            >
              <X className="w-8 h-8" />
            </button>
            <img 
              src={selectedPhoto} 
              alt="Foto ampliada"
              className="max-w-full max-h-full object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        )}
      </div>
    </section>
  )
}
