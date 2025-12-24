import React, { useEffect, useRef } from "react";
import type { LandingPageData } from "../../types/landing";

interface PricingProps {
  data: LandingPageData;
}

const Pricing: React.FC<PricingProps> = ({ data }) => {
  const section = data.pricing_section;
  const widgetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (section?.widget_code && widgetRef.current) {
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = section.widget_code;

      const scripts = tempDiv.querySelectorAll("script");
      scripts.forEach((script) => {
        const newScript = document.createElement("script");
        if (script.src) {
          newScript.src = script.src;
          newScript.async = true;
        } else {
          newScript.textContent = script.textContent;
        }
        document.head.appendChild(newScript);
      });

      const nonScriptContent = tempDiv.querySelectorAll(":not(script)");
      nonScriptContent.forEach((el) => {
        widgetRef.current?.appendChild(el.cloneNode(true));
      });
    }
  }, [section?.widget_code]);

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

        {section.widget_code ? (
          <div ref={widgetRef} className="max-w-6xl mx-auto" />
        ) : (
          <div className="text-center">
            <p className="text-sm sm:text-base text-theme-neutral mb-6 sm:mb-8">
              Pricing information coming soon...
            </p>
            {section.show_cta && section.cta && (
              <a
                href={section.cta.url || "#"}
                className="inline-block px-6 sm:px-8 py-3 sm:py-4 bg-theme-primary text-white rounded-lg hover:bg-theme-secondary transition-colors font-semibold text-sm sm:text-base"
              >
                {section.cta.text}
              </a>
            )}
          </div>
        )}

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
