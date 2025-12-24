import React, { useEffect, useRef } from "react";
import type { Theme } from "../../../types/features-page";

interface PricingSectionProps {
  heading?: string;
  description?: string;
  widgetCode?: string;
  showCta?: boolean;
  ctaText?: string;
  ctaUrl?: string;
  theme: Theme;
}

export const PricingSection: React.FC<PricingSectionProps> = ({
  heading,
  description,
  widgetCode,
  showCta,
  ctaText,
  ctaUrl,
}) => {
  if (!heading && !widgetCode && !showCta) return null;

  const widgetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!widgetRef.current || !widgetCode) return;

    // Extract widget ID from the HTML
    const idMatch = widgetCode.match(/id="([^"]+)"/); 
    const widgetId = idMatch ? idMatch[1] : 'widget-default';

    // Extract script src from the HTML
    const srcMatch = widgetCode.match(/script\.src\s*=\s*['"]([^'"]+)['"]/); 
    const scriptSrc = srcMatch ? srcMatch[1] : null;

    if (!scriptSrc) return;

    // Clear and create widget container
    widgetRef.current.innerHTML = '';
    const widgetDiv = document.createElement('div');
    widgetDiv.id = widgetId;
    widgetRef.current.appendChild(widgetDiv);

    // Load the script
    const script = document.createElement('script');
    script.src = scriptSrc;
    script.async = true;
    document.head.appendChild(script);

    return () => {
      if (widgetRef.current) {
        widgetRef.current.innerHTML = '';
      }
    };
  }, [widgetCode]);

  return (
    <section className="py-16 sm:py-24 bg-theme-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          {heading && (
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-theme-text">
              {heading}
            </h2>
          )}
          {description && (
            <p className="text-xl max-w-3xl mx-auto text-theme-neutral">
              {description}
            </p>
          )}
        </div>

        {widgetCode && (
          <div ref={widgetRef} className="mb-12 w-full mx-auto max-w-6xl">
            <div style={{ padding: '40px 20px', textAlign: 'center', color: '#666' }}>
              Loading pricing widget...
            </div>
          </div>
        )}

        {showCta && ctaText && (
          <div className="text-center">
            <a
              href={ctaUrl || "#"}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-white font-semibold shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105"
              style={{ background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-accent) 100%)' }}
            >
              {ctaText}
            </a>
          </div>
        )}
      </div>
    </section>
  );
};