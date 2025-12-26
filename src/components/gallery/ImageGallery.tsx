import { useState, useEffect } from "react";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { fetchGalleryPages, getFullImageUrl, type ImageGalleryPage } from "../../types/gallery";

export default function ImageGallery() {
  const [galleries, setGalleries] = useState<ImageGalleryPage[]>([]);
  const [selectedGallery, setSelectedGallery] = useState<ImageGalleryPage | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGalleryPages()
      .then(setGalleries)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const nextImage = () => {
    if (selectedGallery && lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % selectedGallery.gallery_images.length);
    }
  };
  const prevImage = () => {
    if (selectedGallery && lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + selectedGallery.gallery_images.length) % selectedGallery.gallery_images.length);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600"></div>
      </div>
    );
  }

  if (selectedGallery) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 py-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <button
            onClick={() => setSelectedGallery(null)}
            className="mb-8 flex items-center gap-2 text-slate-600 hover:text-blue-600 font-semibold transition-colors"
          >
            <ChevronLeft size={20} /> Back to Galleries
          </button>

          <div className="text-center mb-12">
            <h1 className="text-5xl font-black text-slate-900 mb-4">{selectedGallery.heading || selectedGallery.title}</h1>
            {selectedGallery.text && <p className="text-xl text-slate-600 mb-6">{selectedGallery.text}</p>}
            {selectedGallery.paragraph && (
              <div className="prose prose-lg max-w-4xl mx-auto text-slate-700" dangerouslySetInnerHTML={{ __html: selectedGallery.paragraph }} />
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {selectedGallery.gallery_images
              .sort((a, b) => a.order - b.order)
              .map((img, idx) => (
              <div
                key={img.id}
                onClick={() => openLightbox(idx)}
                className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer bg-white"
              >
                <div className="aspect-square overflow-hidden">
                  {img.image && (
                    <img
                      src={getFullImageUrl(img.image.url)}
                      alt={img.image.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  )}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                  <div className="text-white">
                    {img.description && <p className="text-sm font-medium">{img.description}</p>}
                  </div>
                </div>
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <ZoomIn size={20} className="text-slate-900" />
                </div>
              </div>
            ))}
          </div>

          {selectedGallery.ending_note && (
            <div className="bg-white rounded-3xl p-8 shadow-xl border-2 border-slate-200 max-w-4xl mx-auto">
              <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: selectedGallery.ending_note }} />
            </div>
          )}
        </div>

        {/* Lightbox */}
        {lightboxIndex !== null && selectedGallery.gallery_images[lightboxIndex]?.image && (
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
                src={getFullImageUrl(selectedGallery.gallery_images[lightboxIndex].image!.url)}
                alt={selectedGallery.gallery_images[lightboxIndex].image!.title}
                className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
              />
              {selectedGallery.gallery_images[lightboxIndex].description && (
                <p className="text-white text-center mt-4 text-lg">{selectedGallery.gallery_images[lightboxIndex].description}</p>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 py-20">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-black text-slate-900 mb-4">Image Galleries</h1>
          <p className="text-xl text-slate-600">Explore our beautiful collection of images</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {galleries.map((gallery) => (
            <div
              key={gallery.id}
              onClick={() => setSelectedGallery(gallery)}
              className="group relative overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer bg-white border-2 border-slate-200 hover:border-blue-400"
            >
              <div className="aspect-[4/3] overflow-hidden">
                {gallery.gallery_images[0]?.image && (
                  <img
                    src={getFullImageUrl(gallery.gallery_images[0].image.url)}
                    alt={gallery.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                )}
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end p-6">
                <div className="text-white">
                  <h3 className="text-2xl font-bold mb-2">{gallery.heading || gallery.title}</h3>
                  {gallery.text && <p className="text-sm opacity-90">{gallery.text}</p>}
                  <p className="text-xs mt-2 opacity-75">{gallery.gallery_images.length} images</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
