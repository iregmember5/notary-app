import React, { useState } from "react";
import type { LandingPageData, Feature } from "../../types/landing";
import EasyIcon from "./IconRenderer";

interface FeaturesProps {
  data: LandingPageData;
}

const Features: React.FC<FeaturesProps> = ({ data }) => {
  const { features_head, features_introduction, features } = data;
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-scroll effect
  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === (features?.length || 1) - 1 ? 0 : prev + 1
      );
    }, 2000);
    return () => clearInterval(interval);
  }, [features?.length]);

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? (features?.length || 1) - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev === (features?.length || 1) - 1 ? 0 : prev + 1
    );
  };

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
  };

  if (
    !features_head &&
    !features_introduction &&
    (!features || features.length === 0)
  ) {
    return null;
  }

  return (
    <section
      id="features"
      className="py-20 sm:py-28 relative overflow-hidden bg-gradient-to-b from-white via-slate-50/50 to-white"
    >
      {/* Professional Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Subtle Gradient Accents */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-blue-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-indigo-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header - Professional Notary Style */}
        <div className="text-center mb-12 md:mb-16 lg:mb-20 max-w-3xl mx-auto px-4">
          {features_head && (
            <div className="mb-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold mb-5 bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 border border-blue-200/50 shadow-sm">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                FEATURES
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight mb-5 text-slate-900">
                {features_head}
              </h2>
            </div>
          )}

          {features_introduction && (
            <p className="text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed text-slate-600 font-medium">
              {features_introduction}
            </p>
          )}
        </div>

        {/* Features Carousel */}
        {features && features.length > 0 ? (
          <div className="relative max-w-6xl mx-auto px-4">
            {/* Carousel Container */}
            <div className="relative overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-out"
                style={{
                  transform: `translateX(-${currentIndex * 100}%)`,
                }}
              >
                {features.map((feature: Feature) => (
                  <div
                    key={feature.id}
                    id={`feature-${feature.id}`}
                    className="w-full flex-shrink-0 px-2 sm:px-4"
                  >
                    {/* Modern Professional Card */}
                    <div className="relative h-full p-8 sm:p-12 rounded-3xl transition-all duration-500 bg-white border-2 border-slate-200 hover:border-blue-300 hover:shadow-2xl overflow-hidden group">
                      {/* Gradient Overlay on Hover */}
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-indigo-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />

                      {/* Top Accent Line */}
                      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

                      {/* Two column layout: text left, image right */}
                      <div className="flex flex-col lg:flex-row gap-10 items-center">
                        {/* Left: Text content */}
                        <div className="flex-1 space-y-6">
                          {/* Icon - Professional Style */}
                          {feature.icon && (
                            <div className="mb-6">
                              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 relative overflow-hidden bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg">
                                <EasyIcon
                                  icon={feature.icon}
                                  size={36}
                                  color="#FFFFFF"
                                  className="relative z-10 transition-transform duration-300 group-hover:rotate-6 sm:w-10 sm:h-10"
                                />
                              </div>
                            </div>
                          )}

                          {/* Title - Bold & Professional */}
                          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold mb-5 leading-tight text-slate-900">
                            {feature.title}
                          </h3>

                          {/* Description - Clear & Readable */}
                          <p className="text-base sm:text-lg leading-relaxed text-slate-600 font-medium">
                            {feature.description}
                          </p>
                        </div>

                        {/* Right: Image - Professional Frame */}
                        {feature.image && (
                          <div className="flex-1 lg:max-w-md">
                            <div className="relative rounded-2xl overflow-hidden shadow-xl border-4 border-white group-hover:shadow-2xl transition-shadow duration-500">
                              <img
                                src={`https://esign-admin.signmary.com${feature.image.url}`}
                                alt={feature.title}
                                className="w-full h-64 lg:h-80 object-cover transform group-hover:scale-105 transition-transform duration-500"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Buttons - Modern Style */}
            <div className="flex items-center justify-between mt-10 sm:mt-12 px-4 sm:px-0">
              {/* Previous Button */}
              <button
                onClick={handlePrev}
                className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-xl transition-all duration-300 bg-white border-2 border-slate-300 hover:border-blue-500 hover:bg-blue-50 text-slate-700 hover:text-blue-600 hover:scale-110 active:scale-95 shadow-md hover:shadow-lg"
                aria-label="Previous feature"
              >
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>

              {/* Dots Indicator - Modern */}
              <div className="flex gap-2 sm:gap-3">
                {features.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handleDotClick(index)}
                    className={`transition-all duration-300 rounded-full ${
                      index === currentIndex
                        ? "w-10 sm:w-12 h-2 bg-gradient-to-r from-blue-500 to-indigo-500 shadow-md"
                        : "w-2 h-2 bg-slate-300 hover:bg-slate-400"
                    }`}
                    aria-label={`Go to feature ${index + 1}`}
                  />
                ))}
              </div>

              {/* Next Button */}
              <button
                onClick={handleNext}
                className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-xl transition-all duration-300 bg-white border-2 border-slate-300 hover:border-blue-500 hover:bg-blue-50 text-slate-700 hover:text-blue-600 hover:scale-110 active:scale-95 shadow-md hover:shadow-lg"
                aria-label="Next feature"
              >
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>

            {/* Counter - Professional */}
            <div className="flex justify-center mt-6 text-sm font-semibold">
              <span className="text-blue-600 text-lg">{currentIndex + 1}</span>
              <span className="mx-2 text-slate-400">/</span>
              <span className="text-slate-600">{features.length}</span>
            </div>
          </div>
        ) : (
          // Empty state
          <div className="text-center py-12 max-w-xl mx-auto px-4">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl flex items-center justify-center mx-auto mb-4 bg-theme-primary/10">
              <EasyIcon
                icon="FiSettings"
                size={28}
                color="var(--color-primary)"
                className="sm:w-8 sm:h-8"
              />
            </div>
            <h3 className="text-lg sm:text-xl font-bold mb-3 text-theme-text">
              Features Coming Soon
            </h3>
            <p className="text-sm sm:text-base leading-relaxed text-pretty text-theme-neutral">
              We're working on adding amazing features to enhance your
              experience. Check back soon for updates!
            </p>
          </div>
        )}
      </div>

      <style>{`
        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </section>
  );
};

export default Features;
