import React, { useEffect, useRef } from "react";
import type { LandingPageData } from "../../types/landing";

interface PricingProps {
  data: LandingPageData;
}

const Pricing: React.FC<PricingProps> = ({ data }) => {
  const section = data.pricing_section;
  const slug = "untitled-pricing-table-79";
  const containerId = `widget-${slug}`;
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.id = containerId;
      containerRef.current.innerHTML = `
        <div style="
          padding: 60px 20px;
          text-align: center;
          color: #666;
          font-family: system-ui, -apple-system, sans-serif;
          font-size: 18px;
        ">
          Loading pricing widget...
        </div>
      `;
    }

    const script = document.createElement('script');
    script.src = `https://pricing-bundler-green.vercel.app/widget-loader.js?slug=${slug}`;
    script.async = true;
    containerRef.current?.appendChild(script);

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [slug]);

  if (!section || !section.heading) {
    return null;
  }

  return (
    <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-theme-neutral/5">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-theme-text mb-3 sm:mb-4">
            {section.heading}
          </h2>
          {section.description && (
            <p className="text-base sm:text-lg md:text-xl text-theme-neutral max-w-3xl mx-auto">
              {section.description}
            </p>
          )}
        </div>

        <div className="w-full mx-auto max-w-6xl">
          <div ref={containerRef} />
        </div>

        {section.ending_note && (
          <div className="text-center mt-8 sm:mt-12">
            <p className="text-sm sm:text-base text-theme-neutral max-w-2xl mx-auto">
              {section.ending_note}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Pricing;
