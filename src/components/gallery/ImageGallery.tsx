import { useState, useEffect } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { fetchGalleryPages, getFullImageUrl, type ImageGalleryPage } from "../../types/gallery";

export default function ImageGallery() {
  const [galleries, setGalleries] = useState<ImageGalleryPage[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  const allImages = galleries.flatMap(g => g.gallery_images).sort((a, b) => a.order - b.order);

  useEffect(() => {
    fetchGalleryPages()
      .then(setGalleries)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const nextImage = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % allImages.length);
    }
  };
  const prevImage = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + allImages.length) % allImages.length);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-20">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-black text-slate-900 mb-2">Templates</h1>
          <p className="text-lg text-slate-600">Our Notary Templates</p>
        </div>

        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
          {allImages.map((img, idx) => (
            img.image && (
              <div
                key={img.id}
                onClick={() => openLightbox(idx)}
                className="group relative overflow-hidden rounded-lg cursor-pointer break-inside-avoid"
              >
                <img
                  src={getFullImageUrl(img.image.url)}
                  alt={img.image.title}
                  className="w-full h-auto hover:opacity-90 transition-opacity"
                />
                <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors" />
              </div>
            )
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && allImages[lightboxIndex]?.image && (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4" onClick={closeLightbox}>
          <button
            onClick={(e) => { e.stopPropagation(); closeLightbox(); }}
            className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full p-3 transition-colors z-10"
          >
            <X size={24} className="text-white" />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); prevImage(); }}
            className="absolute left-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full p-3 transition-colors z-10"
          >
            <ChevronLeft size={32} className="text-white" />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); nextImage(); }}
            className="absolute right-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full p-3 transition-colors z-10"
          >
            <ChevronRight size={32} className="text-white" />
          </button>

          <div className="max-w-7xl max-h-full" onClick={(e) => e.stopPropagation()}>
            <img
              src={getFullImageUrl(allImages[lightboxIndex].image!.url)}
              alt={allImages[lightboxIndex].image!.title}
              className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
            />
            {allImages[lightboxIndex].description && (
              <p className="text-white text-center mt-4 text-lg">{allImages[lightboxIndex].description}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
