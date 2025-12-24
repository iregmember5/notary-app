import React, { useEffect, useRef } from "react";
import type { Theme } from "../../../../types/features-page";

interface PricingWidgetBlockProps {
  value: any;
  theme: Theme;
}

export const PricingWidgetBlock: React.FC<PricingWidgetBlockProps> = ({
  value,
  theme,
}) => {
  if (!value) return null;

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !value.widget_code) return;

    // Extract widget ID from the HTML
    const idMatch = value.widget_code.match(/id="([^"]+)"/); 
    const widgetId = idMatch ? idMatch[1] : 'widget-default';

    // Extract script src from the HTML
    const srcMatch = value.widget_code.match(/script\.src\s*=\s*['"]([^'"]+)['"]/); 
    const scriptSrc = srcMatch ? srcMatch[1] : null;

    if (!scriptSrc) return;

    // Clear and create widget container
    containerRef.current.innerHTML = '';
    const widgetDiv = document.createElement('div');
    widgetDiv.id = widgetId;
    containerRef.current.appendChild(widgetDiv);

    // Load the script
    const script = document.createElement('script');
    script.src = scriptSrc;
    script.async = true;
    document.head.appendChild(script);

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, [value.widget_code]);

  return (
    <section className="py-16" style={{ backgroundColor: theme.bgColor }}>
      <div className="container mx-auto px-4">
        {value.heading && (
          <h2
            className="text-4xl font-bold text-center mb-4"
            style={{ color: theme.primaryColor }}
          >
            {value.heading}
          </h2>
        )}
        {value.description && (
          <p
            className="text-xl text-center mb-8"
            style={{ color: theme.neutralColor }}
          >
            {value.description}
          </p>
        )}
        <div className="w-full mx-auto max-w-6xl" ref={containerRef}>
          <div style={{ padding: '40px 20px', textAlign: 'center', color: '#666' }}>
            Loading pricing widget...
          </div>
        </div>
        {value.show_cta && value.cta && value.cta.text && (
          <div className="text-center mt-8">
            <a
              href={value.cta.url || '#'}
              className="inline-block px-8 py-3 rounded-lg font-semibold transition-colors"
              style={{
                backgroundColor: theme.primaryColor,
                color: theme.bgColor,
              }}
            >
              {value.cta.text}
            </a>
          </div>
        )}
      </div>
    </section>
  );
};
